import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "app/store";
import { apiGet } from "app/axios";
import { AR1100SEARCH, AR1100SELECT } from "app/path";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlass,
  ResetGray,
} from "components/allSvgIcon";
import { addCM1106 } from "app/state/modal/modalSlice";
import CreateReport from "app/hook/createReport";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { Select, Label, FormGroup, Input } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";
import Grid from "components/grid";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import { DateWithoutDash } from "helpers/dateFormat";
import { fields, columns } from "./data";
import { IAR1100SEARCH } from "./model";
import getTabContent from "./getTabContent";

function AR1100({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("AR", "AR1100", menuId, AR1100SEARCH);

  const tabRef = useRef() as React.MutableRefObject<any>;

  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [data65, setData65] = useState({});
  const [data65Dictionary, setData65Dictionary] = useState({});
  const [tabId, setTabId] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IAR1100SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetSearchForm("reset");
      const params = prepareParams();
      params.sDate = DateWithoutDash(params.sDate);
      fetchData(params);
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        btnRef1.current.classList.remove("active");
        setIsAddBtnClicked(false);
      }

      fetchData65({
        areaCode: selected?.areaCode,
        pjCuCode: selected?.cuCode,
        pjDate: DateWithoutDash(selected?.pjDate),
        pjSno: selected?.pjSno,
        pjType: selected?.pjType,
      });

      dispatch(
        addCM1106({
          areaCode: selected.areaCode,
          cuCode: selected.cuCode,
          source: "AR1100",
        })
      );
    }
  }, [selected]);

  const fetchDataWithParams = () => {
    const params = getValues();
    params.sDate = DateWithoutDash(params.sDate);
    fetchData(params);
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(AR1100SELECT, params);

    if (res && Object.keys(res)?.length > 0) {
      setData65(res?.detailData[0]);
      setData65Dictionary({
        pjVatDiv: res?.pjVatDiv,
        pjSwCode: res?.pjSwCode,
        proxyType: res?.proxyType,
        pjInkumtype: res?.pjInkumtype,
        saleType: res?.saleType,
      });
    } else {
      setData65({});
      setData65Dictionary({});
    }
  };

  const prepareParams = () => {
    const init = dataCommonDic.dataInit[0];
    return {
      areaCode: dataCommonDic.areaCode[0].code,
      sDate: init.sDate,
      sInkumtype: init.sInkumtype,
      sInserttype: init.sInserttype,
      sProxytype: init.sProxytype,
      sSawon: init.sSawon,
      sSalestate0: init.sSalesatae.charAt(0) === "Y",
      sSalestate1: init.sSalesatae.charAt(1) === "Y",
      sSalestate2: init.sSalesatae.charAt(2) === "Y",
      sSalestate3: init.sSalesatae.charAt(3) === "Y",
      sSalestate4: init.sSalesatae.charAt(4) === "Y",
      sSalestate5: init.sSalesatae.charAt(5) === "Y",

      sSalegubun0: init.sSalegubun.charAt(0) === "Y",
      sSalegubun1: init.sSalegubun.charAt(1) === "Y",
      sSalegubun2: init.sSalegubun.charAt(2) === "Y",
      sSalegubun3: init.sSalegubun.charAt(3) === "Y",
      sSalegubun4: init.sSalegubun.charAt(4) === "Y",
    };
  };

  const resetSearchForm = (type: string) => {
    if (type === "reset") {
      const params = prepareParams();
      reset(params);
    }
    if (type === "clear") {
    }
  };

  const submit = async (params: IAR1100SEARCH) => {
    params.sDate = DateWithoutDash(params.sDate);
    fetchData(params);
  };

  const handleClickBtnAdd = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
    tabRef.current.resetForm("clear");
    document.getElementById("footerSearchId")?.focus();
  };

  const handleClickBtnDel = () => {
    if (isAddBtnClicked) {
      setIsAddBtnClicked(false);
      btnRef1.current.classList.remove("active");
    }
    tabRef.current.crud("delete");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "90px" }}>영업소</Label>
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
              onClick={handleClickBtnAdd}
              ref={btnRef1}
            />
            <Button text="삭제" icon={<Trash />} onClick={handleClickBtnDel} />

            <Button
              text="취소"
              icon={<ResetGray />}
              color={ButtonColor.LIGHT}
              onClick={() => {}}
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper>
            <div>
              <FormGroup>
                <Label style={{ minWidth: "90px" }}>판매 일자</Label>
                <Controller
                  control={control}
                  {...register("sDate")}
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
                <Input
                  register={register("sCustomer")}
                  inputSize={InputSize.i200}
                />

                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlass />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={13}
                          borderWidth="2px"
                          style={{ marginRight: "10px" }}
                        />
                      </>
                    )
                  }
                  style={{ marginRight: "10px" }}
                />

                <Label style={{ minWidth: "90px" }}>사원</Label>
                <Select register={register("sSawon")} width={InputSize.i100}>
                  {dataCommonDic?.sSawon?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label style={{ minWidth: "90px" }}>입금 구분</Label>
                <Select
                  register={register("sInkumtype")}
                  width={InputSize.i100}
                >
                  {dataCommonDic?.sInkumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label style={{ minWidth: "90px" }}>대납 구분</Label>
                <Select
                  register={register("sProxytype")}
                  width={InputSize.i100}
                >
                  {dataCommonDic?.sProxytype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label style={{ minWidth: "90px" }}>등록 구분</Label>
                <Select
                  register={register("sInserttype")}
                  width={InputSize.i100}
                >
                  {dataCommonDic?.sInserttype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "90px", marginRight: "5px" }}>
                  거래 상태
                </Label>
                <CheckBox
                  register={register("sSalestate0")}
                  title="접수"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalestate1")}
                  title="배송중"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalestate2")}
                  title="완료"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalestate3")}
                  title="예약"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalestate4")}
                  title="취소"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalestate5")}
                  title="연기"
                  rtl
                  style={{ width: "80px" }}
                />
                <Label style={{ minWidth: "90px", marginRight: "5px" }}>
                  거래 구분
                </Label>
                <CheckBox
                  register={register("sSalegubun0")}
                  title="중량"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalegubun1")}
                  title="체적"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalegubun2")}
                  title="용기"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalegubun3")}
                  title="기구"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={register("sSalegubun4")}
                  title="A/S"
                  rtl
                  style={{ width: "80px" }}
                />
              </FormGroup>
            </div>
          </SearchWrapper>
        </form>
        <Grid
          areaCode={ownAreaCode}
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          menuId={menuId}
          rowIndex={data?.length > 1 ? data.length - 1 : 0}
          style={{
            height: `calc(50%)`,
            borderBottom: "1px solid #707070",
            marginBottom: "3px",
          }}
          evenFill
        />
        <PlainTab
          tabHeader={[
            "중량 판매-1",
            "중량 판매-N",
            "체적 공급",
            "용기 입출",
            "부품 판매",
            "시설 판매",
            "A/S",
          ]}
          onClick={(id) => setTabId(id)}
          tabId={tabId}
        />

        <TabContentWrapper>
          {getTabContent(
            tabId,
            data65,
            selected,
            data65Dictionary,
            isAddBtnClicked,
            setIsAddBtnClicked,
            getValues("areaCode"),
            fetchDataWithParams,
            menuId,
            tabRef
          )}
        </TabContentWrapper>
      </WrapperContent>
    </>
  );
}

export default AR1100;
