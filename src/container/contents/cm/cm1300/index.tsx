import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import CreateScreen from "app/hook/createScreen";
import { CM1300SEARCH, CM130065 } from "app/path";
import { useSelector } from "app/store";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import Button from "components/button/button";
import Loader from "components/loader";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { ButtonColor } from "components/componentsType";
import { ButtonType, InputSize } from "components/componentsType";
import GridLeft from "components/grid";
import { BuildingInfoText } from "components/text";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import {
  Divider,
  FormGroup,
  Input,
  Select,
  Label,
} from "components/form/style";
import { columns, fields } from "./data";
import Form from "./form";
import CM1300User from "./cm1300User";
import { ISEARCH } from "./model";

const leftSideWidth: number = 903;

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

  const { handleSubmit, register, reset, watch, getValues } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    activeTabId,
    fetchData,
    showDraggableLine,
    isOpen,
    rowIndex,
    dispatch,
    dataCommonDic,
    linePos,
  } = CreateScreen("CM", "CM1300", menuId, CM1300SEARCH, leftSideWidth);

  const { isDelete } = useSelector((state: any) => state.modal);
  const [data65, setData65] = useState([]);
  const [selected65, setSelected65] = useState<any>({});
  const [isAddBtnClicked2, setIsAddBtnClicked2] = useState<boolean>(false);
  const [aptGubun, setAptGubun] = useState<any>([]);
  const [aptJyCode, setAptJyCode] = useState<any>([]);
  const [aptSwCode, setAptSwCode] = useState<any>([]);

  // const [data, setData] = useState([]);
  // const [selected, setSelected] = useState<any>({});
  // const [selectedRowIndex65, setSelectedRowIndex65] = useState<number>(0);
  // const [loading, setLoading] = useState(false);
  // const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  // const [getCommonDictionary, { data: dataCommonDic }] =
  //   useGetCommonDictionaryMutation();
  // useEffect(() => {
  //   getCommonDictionary({ groupId: "CM", functionName: "CM1300" });
  // }, []);
  // const fetchData = async (params: any) => {
  //   setLoading(true);
  //   const dataSearch = await apiGet(CM1300SEARCH, params);

  //   if (dataSearch) {
  //     setData(dataSearch);
  //     setSelected(dataSearch[0]);
  //   } else {
  //     setData([]);
  //     setSelected({});
  //   }

  //   setLoading(false);
  // };

  useEffect(() => {
    if (dataCommonDic) {
      console.log("datacommondic>>>>>>>>>>>>>>", dataCommonDic);

      reset({ areaCode: dataCommonDic?.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic.areaCode[0].code }, "last");
      formRef.current.resetForm("fillcombos");
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

  useEffect(() => {
    if (selected) {
      if (isAddBtnClicked) {
        btnRef1.current.classList.remove("active");
        setIsAddBtnClicked(false);
      }

      if (selected.aptCode && selected.areaCode) {
        fetchData65({
          areaCode: selected.areaCode,
          aptCode: selected.aptCode,
        });
      }
    }
  }, [selected]);

  const submit = async (params: ISEARCH) => {
    fetchData(params);
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(CM130065, params);
    console.log("65=====================>", res);

    if (res) {
      if (res?.userCustomer && res?.userCustomer?.length > 0) {
        setData65(res.userCustomer);

        setSelected65(
          res.userCustomer[
            res.userCustomer.length > 0 ? res.userCustomer.length - 1 : 0
          ]
        );
      } else {
        setData65([]);
        setSelected65({});
      }

      if (res?.aptGubun) {
        setAptGubun(res?.aptGubun);
      } else {
        setAptGubun([]);
      }

      if (res?.aptJyCode) {
        setAptJyCode(res?.aptJyCode);
      } else {
        setAptJyCode([]);
      }

      if (res?.aptSwCode) {
        setAptSwCode(res?.aptSwCode);
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

      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <SearchWrapper
            style={{ minWidth: `${leftSideWidth}px`, padding: "3px 15px" }}
          >
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <FormGroup>
                <BuildingInfoText text="건물" />
                <Input
                  label="코드"
                  labelStyle={{ minWidth: "73px" }}
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
                  style={{ minWidth: "80px", marginLeft: "15px" }}
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
            setIsAddBtnClicked2={setIsAddBtnClicked2}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={rowIndex}
            style={{
              height: `calc(100% - 44px)`,
              minWidth: `${leftSideWidth}px`,
            }}
          />
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <div style={{ width: "925px" }}>
            <Form
              ref={formRef}
              dataCommonDic={dataCommonDic}
              areaCode={watch("areaCode")}
              selected={selected}
              fetchData={fetchData}
              setData={setData}
              setSelected={setSelected}
              isAddBtnClicked={isAddBtnClicked}
              setIsAddBtnClicked={setIsAddBtnClicked}
              aptGubun={aptGubun}
              setAptGubun={setAptGubun}
              aptJyCode={aptJyCode}
              setAptJyCode={setAptJyCode}
              aptSwCode={aptSwCode}
              setAptSwCode={setAptSwCode}
              prepareSearchFormValues={getValues()}
            />

            <Divider style={{ border: "1px solid #707070" }} />

            <CM1300User
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
              menuId={menuId}
            />
          </div>
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CM1300;
