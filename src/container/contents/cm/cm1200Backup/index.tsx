import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { ISEARCH } from "./model";
import GridLeft from "components/grid";
import Form from "./form";
import {
  SearchWrapper,
  LeftSide,
  RightSide,
  MainWrapper,
} from "../../commonStyle";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { ButtonType } from "components/componentsType";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import Loader from "components/loader";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
} from "app/state/modal/modalSlice";
import { useDispatch, useSelector } from "app/store";
import { CM1200SEARCH } from "app/path";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { fields, columns } from "./data";
import { setRowIndex } from "app/state/tab/tabSlice";

function CM1200({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const dispatch = useDispatch();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, reset, handleSubmit, watch, getValues } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [dataChk, setDataChk] = useState(true);

  const { isDelete } = useSelector((state) => state.modal);
  const tabState = useSelector((state) => state.tab.tabs);
  const isOpen = useSelector((state) => state.sidebar);
  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === 0)?.row;

  useEffect(() => {
    getCommonDictionary({ groupId: "CM", functionName: "CM1200" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      reset({ areaCode: dataCommonDic?.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code }, "last");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (watch("areaCode")) {
      if (isAddBtnClicked) {
        formRef.current.resetForm("clear");
      }
    }
  }, [watch("areaCode")]);

  const submit = async (data: any) => {
    fetchData(data);
  };

  function deleteRowGrid() {
    try {
      setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const fetchData = async (params: any = null, flag: string = "") => {
    if (params === null) {
      params = getValues();
    }

    if (!dataChk) {
      delete params.dataChk;
      delete params.sCuName;
    }

    setLoading(true);
    const dataS = await apiGet(CM1200SEARCH, {
      ...params,
    });

    if (dataS) {
      setData(dataS);
      if (flag === "last") {
        const lastIndex = dataS && dataS.length > 0 ? dataS.length - 1 : 0;
        setSelected(dataS[lastIndex]);
        dispatch(setRowIndex({ menuId: menuId, rowIndex: lastIndex }));
      }
    } else {
      setData([]);
      setSelected({});
    }

    setLoading(false);
  };

  const onClickAdd = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
    formRef.current.resetForm("clear");
    formRef.current.setUserInfo([]);
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    btnRef1.current.classList.remove("active");
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "72px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}

          <div className="buttons ml30">
            <Button
              text="등록"
              icon={<Plus />}
              type="button"
              onClick={onClickAdd}
              ref={btnRef1}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              type="button"
              onClick={onClickDelete}
              disabled={isAddBtnClicked}
              ref={btnRef2}
            />
            <Button
              text="저장"
              icon={<Update />}
              type="button"
              color={ButtonColor.SECONDARY}
              onClick={onClickUpdate}
              ref={btnRef3}
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={onClickReset}
              ref={btnRef4}
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <SearchWrapper>
            <form
              onSubmit={handleSubmit(submit)}
              style={{ padding: "5px 0px" }}
              autoComplete="off"
            >
              <FormGroup>
                <Label className="lable-check" style={{ minWidth: "auto" }}>
                  <CheckBox
                    register={{ ...register("dataChk") }}
                    title="건물명"
                    onChange={(e: any) => setDataChk(e.target.checked)}
                    checked={dataChk}
                  />
                </Label>
                <Input
                  register={register("sCuName", {
                    required: false,
                  })}
                  readOnly={!dataChk}
                />

                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig />}
                  kind={ButtonType.ROUND}
                  type="submit"
                  style={{ minWidth: "80px" }}
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={19}
                          style={{ marginRight: "10px" }}
                          borderWidth="3px"
                        />
                      </>
                    )
                  }
                />
              </FormGroup>
            </form>
          </SearchWrapper>

          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            style={{ height: `calc(100% - 48px)`, minWidth: "409px" }}
            menuId={menuId}
            rowIndex={rowIndex}
          />
        </LeftSide>
        <RightSide style={{ padding: "0 10px" }}>
          <Form
            ref={formRef}
            dataCommonDic={dataCommonDic}
            fetchData={fetchData}
            setData={setData}
            selected={selected}
            setSelected={setSelected}
            areaCode={watch("areaCode")}
            ownAreaCode={ownAreaCode}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1200;
