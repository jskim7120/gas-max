import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import Loader from "components/loader";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { columns, fields } from "./data";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { ButtonColor } from "components/componentsType";
import { ButtonType, InputSize } from "components/componentsType";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { CM1300SEARCH, CM130065 } from "app/path";
import {
  Divider,
  Field,
  FormGroup,
  Input,
  Select,
  Label,
} from "components/form/style";
import { useDispatch, useSelector } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import FormCM1300User from "./cm1300User";
import GridLeft from "components/grid";
import { BuildingInfoText } from "components/text";
import { ISEARCH } from "./model";

function CM1300({
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

  const { register, handleSubmit, reset, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [data65, setData65] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selected65, setSelected65] = useState<any>({});
  const [selectedRowIndex65, setSelectedRowIndex65] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isAddBtnClicked2, setIsAddBtnClicked2] = useState<boolean>(false);
  const [aptGubun, setAptGubun] = useState<any>([]);
  const [aptJyCode, setAptJyCode] = useState<any>([]);
  const [aptSwCode, setAptSwCode] = useState<any>([]);

  const { isDelete } = useSelector((state) => state.modal);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CM", functionName: "CM1300" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      reset({ areaCode: dataCommonDic?.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (selected && JSON.stringify(selected) !== "{}") {
      fetchData65();
    }
  }, [selected]);

  const submit = async (data: ISEARCH) => {
    fetchData({ ...data });
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    const dataSearch = await apiGet(CM1300SEARCH, params);

    if (dataSearch) {
      setData(dataSearch);
      setSelected(dataSearch[0]);
    } else {
      setData([]);
      setSelected({});
    }

    setLoading(false);
  };
  const fetchData65 = async () => {
    const data65 = await apiGet(CM130065, {
      areaCode: selected?.areaCode,
      aptCode: selected?.aptCode,
    });

    if (data65) {
      if (data65?.userCustomer && data65?.userCustomer?.length > 0) {
        setData65(data65.userCustomer);
        setSelected65(data65.userCustomer[0]);
      } else {
        setData65([]);
        setSelected65({});
      }

      if (data65?.aptGubun) {
        setAptGubun(data65?.aptGubun);
      } else {
        setAptGubun([]);
      }

      if (data65?.aptJyCode) {
        setAptJyCode(data65?.aptJyCode);
      } else {
        setAptJyCode([]);
      }

      if (data65?.aptSwCode) {
        setAptSwCode(data65?.aptSwCode);
      } else {
        setAptSwCode([]);
      }
    } else {
      setData65([]);
      setSelected65({});
      setAptSwCode([]);
      setAptJyCode([]);
      setAptGubun([]);
    }
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

  const onClickAdd = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
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
              text="건물등록"
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

      <MainWrapper
        style={{
          height: "calc(100% + 18px)",
        }}
      >
        <LeftSide>
          <SearchWrapper>
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <Field>
                <FormGroup>
                  <BuildingInfoText text="건물" />
                  <Input
                    label="코드"
                    labelStyle={{ minWidth: "70px" }}
                    register={register("aptCode")}
                    inputSize={InputSize.i80}
                  />
                  <Input
                    label="건물명"
                    labelStyle={{ minWidth: "80px" }}
                    register={register("aptName")}
                    inputSize={InputSize.i120}
                  />
                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlassBig />}
                    kind={ButtonType.ROUND}
                    type="submit"
                    loader={
                      loading && (
                        <>
                          <Loader
                            color="white"
                            size={21}
                            style={{ marginRight: "10px" }}
                          />
                        </>
                      )
                    }
                  />
                </FormGroup>
              </Field>
            </form>
          </SearchWrapper>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            setIsAddBtnClicked={setIsAddBtnClicked}
            setIsAddBtnClicked2={setIsAddBtnClicked2}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 73px)` }}
          />
        </LeftSide>
        <RightSide style={{ width: "1000px" }}>
          <Form
            areaCode={watch("areaCode")}
            dataCommonDic={dataCommonDic}
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            setSelected={setSelected}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
            aptGubun={aptGubun}
            aptJyCode={aptJyCode}
            aptSwCode={aptSwCode}
          />

          <Divider style={{ border: "1px solid #707070" }} />
          <FormCM1300User
            data={data65}
            setData={setData65}
            mainSelected={selected}
            selected={selected65}
            setSelected={setSelected65}
            ownAreaCode={ownAreaCode}
            fetchData={fetchData65}
            aptCode={selected?.aptCode}
            areaCode={watch("areaCode")}
            mainIsAddBtnClicked={isAddBtnClicked}
            isAddBtnClicked={isAddBtnClicked2}
            setIsAddBtnClicked={setIsAddBtnClicked2}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1300;