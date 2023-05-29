import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import CreateScreen from "app/hook/createScreen";
import { useSelector } from "app/store";
import { CM1200SEARCH, CM120065 } from "app/path";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
} from "app/state/modal/modalSlice";
import GridLeft from "components/grid";
import { ButtonColor } from "components/componentsType";
import { ButtonType } from "components/componentsType";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import Loader from "components/loader";
import Button from "components/button/button";
import {
  SearchWrapper,
  LeftSide,
  RightSide,
  MainWrapper,
} from "../../commonStyle";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import { ISEARCH } from "./model";
import Form from "./form";
import { fields, columns } from "./data";

const leftSideWidth: number = 530;

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

  const { handleSubmit, reset, watch, register, getValues, control } =
    useForm<ISEARCH>({
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
  } = CreateScreen("CM", "CM1200", menuId, CM1200SEARCH, leftSideWidth);

  const { isDelete } = useSelector((state) => state.modal);
  const [selectedSupplyTab, setSelectedSupplyTab] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any[]>([]);

  const [cuCustgubunDic, setCuCustgubunDic] = useState<any[]>([]);
  const [cuJyCodeDic, setCuJyCodeDic] = useState<any[]>([]);
  const [cuSwCodeDic, setCuSwCodeDic] = useState<any[]>([]);

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

  useEffect(() => {
    if (selected) {
      if (isAddBtnClicked) {
        btnRef1.current.classList.remove("active");
        setIsAddBtnClicked(false);
      }

      if (selected.cuCode && selected.areaCode) {
        fetchData65({
          areaCode: selected.areaCode,
          cuCode: selected.cuCode,
        });
      }
    }
  }, [selected]);

  const prepareSearchFormValues = () => {
    const params: any = getValues();
    if (params.dataChk === undefined || params.dataChk === false) {
      delete params.sCuName;
      delete params.dataChk;
    }

    return params;
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(CM120065, params);

    if (res) {
      if (res?.userInfo) {
        setUserInfo(res.userInfo);
      } else {
        setUserInfo([]);
      }

      if (res?.supplyTab) {
        setSelectedSupplyTab(res?.supplyTab[0]);
      } else {
        setSelectedSupplyTab({});
      }

      if (res?.cuCustgubun) {
        setCuCustgubunDic(res.cuCustgubun);
      }

      if (res?.cuJyCode) {
        setCuJyCodeDic(res.cuJyCode);
      }

      if (res?.cuSwCode) {
        setCuSwCodeDic(res.cuSwCode);
      }
    } else {
      setUserInfo([]);
      setSelectedSupplyTab({});
      setCuCustgubunDic([]);
      setCuJyCodeDic([]);
      setCuSwCodeDic([]);
    }
  };

  const submit = async (p: any) => {
    const params = prepareSearchFormValues();
    fetchData(params);
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
    setUserInfo([]);
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
        <LeftSide style={{ width: `${linePos}px` }}>
          <SearchWrapper
            style={{ minWidth: `${leftSideWidth}px`, padding: "3px 15px" }}
          >
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <FormGroup>
                <Label className="lable-check" style={{ minWidth: "auto" }}>
                  <Controller
                    control={control}
                    {...register("dataChk")}
                    render={({ field: { onChange, value, name } }) => (
                      <CheckBox
                        title="건물명"
                        checked={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Label>

                <Input
                  register={register("sCuName")}
                  readOnly={!watch("dataChk")}
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
          <Form
            ref={formRef}
            dataCommonDic={dataCommonDic}
            fetchData={fetchData}
            areaCode={watch("areaCode")}
            selected={selected}
            ownAreaCode={ownAreaCode}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
            prepareSearchFormValues={prepareSearchFormValues}
            userInfo={userInfo}
            cuCustgubunDic={cuCustgubunDic}
            setCuCustgubunDic={setCuCustgubunDic}
            cuJyCodeDic={cuJyCodeDic}
            setCuJyCodeDic={setCuJyCodeDic}
            selectedSupplyTab={selectedSupplyTab}
            cuSwCodeDic={cuSwCodeDic}
            setCuSwCodeDic={setCuSwCodeDic}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CM1200;
