import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonType,
  InputSize,
  FieldKind,
} from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlassBig,
  MagnifyingGlass,
  ResetGray,
} from "components/allSvgIcon";
import { Select, Label, FormGroup, Input } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";
import { CustomAreaCodePart } from "container/contents/customTopPart";
import { IAR1100SEARCH } from "./model";
import Grid from "components/grid";
import API from "app/axios";
import { AR1100SEARCH, AR1100SELECT } from "app/path";
import { DateWithoutDash } from "helpers/dateFormat";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { fields, columns } from "./data";
import getTabContent from "./getTabContent";

function AR1100({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "AR",
    functionName: "AR1100",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [data65Dictionary, setData65Dictionary] = useState({});
  const [tabId, setTabId] = useState(0);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { register, handleSubmit, reset, control } = useForm<IAR1100SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      console.log(dataCommonDic);
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected) {
      fetchData65({
        areaCode: selected?.areaCode,
        pjCuCode: selected?.cuCode,
        pjDate: selected?.pjDate,
        pjSno: selected?.pjSno,
        pjType: selected?.pjType,
      });
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataSearch } = await API.get(AR1100SEARCH, {
        params: params,
      });

      if (dataSearch) {
        setData(dataSearch);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      console.log("AR1100 data search fetch error =======>", err);
    }
  };

  const fetchData65 = async (params: any) => {
    try {
      const { data: dataSelect } = await API.get(AR1100SELECT, {
        params: params,
      });
      console.log("dataSelect:::", dataSelect?.detailData[0]);
      if (dataSelect) {
        setData65(dataSelect?.detailData[0]);
        setData65Dictionary({
          pjVatDiv: dataSelect?.pjVatDiv,
          pjSwCode: dataSelect?.pjSwCode,
          proxyType: dataSelect?.proxyType,
          pjInkumtype: dataSelect?.pjInkumtype,
          saleType: dataSelect?.saleType,
        });
      } else {
        setData65({});
        setData65Dictionary({});
      }
    } catch (err) {
      setData65({});
      setData65Dictionary({});
      console.log("fetch AR1100 select err:::", err);
    }
  };

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sInkumtype: dataCommonDic?.sInkumtype[0].code,
      sInserttype: dataCommonDic?.sInserttype[0].code,
      sProxytype: dataCommonDic?.sProxytype[0].code,
    });
  };

  const submit = async (params: IAR1100SEARCH) => {
    // params.sDate =
    //   typeof params.sDate === "string"
    //     ? formatDateByRemoveDash(params.sDate)
    //     : formatDateToStringWithoutDash(params.sDate);
    params.sDate = DateWithoutDash(params.sDate);

    fetchData(params);
  };
  return (
    <>
      <SearchWrapper className="h35 mt5">
        <CustomAreaCodePart
          areaCode={areaCode}
          dataCommonDic={dataCommonDic}
          depthFullName={depthFullName}
          register={register}
        />
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {}}
          />
          <Button
            text="취소"
            icon={<ResetGray />}
            color={ButtonColor.LIGHT}
            onClick={() => {}}
          />
        </div>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper>
            <div>
              <FormGroup>
                <Label>판매일자</Label>
                <Controller
                  control={control}
                  {...register("sDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
                <Input
                  register={register("sCustomer")}
                  inputSize={InputSize.i200}
                />

                <Label>사원</Label>
                <Select {...register("sSawon")} width={InputSize.i100}>
                  {dataCommonDic?.sSawon?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>입금구분</Label>
                <Select {...register("sInkumtype")} width={InputSize.i100}>
                  {dataCommonDic?.sInkumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>대납구분</Label>
                <Select {...register("sProxytype")} width={InputSize.i100}>
                  {dataCommonDic?.sProxytype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>등록구분</Label>
                <Select {...register("sInserttype")} width={InputSize.i100}>
                  {dataCommonDic?.sInserttype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
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
                  style={{ marginRight: "10px", minWidth: "max-content" }}
                />
                <Button
                  text="취소"
                  icon={<ResetGray />}
                  style={{ marginRight: "10px", minWidth: "max-content" }}
                  type="button"
                  color={ButtonColor.LIGHT}
                  //onClick={cancel}
                />
              </FormGroup>
              <FormGroup>
                <Label>거래상태 :</Label>
                <CheckBox
                  register={{ ...register("sSalestate1") }}
                  title="접수"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalestate2") }}
                  title="배송중"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalestate3") }}
                  title="완료"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalestate4") }}
                  title="예약"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalestate5") }}
                  title="취소"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalestate6") }}
                  title="연기"
                  rtl
                  style={{ width: "80px" }}
                />
                <Label>거래구분 :</Label>
                <CheckBox
                  register={{ ...register("sSalesGubun1") }}
                  title="중량"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalesGubun2") }}
                  title="체적"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalesGubun3") }}
                  title="용기"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalesGubun4") }}
                  title="기구"
                  rtl
                  style={{ width: "80px" }}
                />
                <CheckBox
                  register={{ ...register("sSalesGubun5") }}
                  title="A/S"
                  rtl
                  style={{ width: "80px" }}
                />
              </FormGroup>
            </div>
          </SearchWrapper>
        </form>
        <Grid
          areaCode={areaCode}
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          style={{
            height: `calc(100% - 368px)`,
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
          {getTabContent(tabId, data65, data65Dictionary)}
        </TabContentWrapper>
      </WrapperContent>
    </>
  );
}

export default AR1100;
