import React from "react";
import { Controller } from "react-hook-form";
import { SearchWrapper } from "container/contents/commonStyle";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

function Tab1({
  register,
  dataCommonDic,
  control,
}: {
  register: Function;
  dataCommonDic: any;
  control: any;
}) {
  return (
    <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
      <FormGroup>
        <Label style={{ minWidth: "80px" }}>담당사원</Label>
        <Select register={register("swCode")} width={InputSize.i120}>
          {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "206px" }}>관리책임자</Label>
        <Select register={register("cuCustgubun")} width={InputSize.i120}>
          {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "80px" }}>지역구분</Label>
        <Select register={register("cuJyCode")} width={InputSize.i120}>
          {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label style={{ marginLeft: "-65px" }}>기간</Label>
        <CheckBox
          //title="기간"
          rtl
          style={{ marginLeft: "6px" }}
          register={register("dateChk")}
        />
        <Controller
          control={control}
          {...register("sDate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "120px" }}
              showMonthYearPicker
            />
          )}
        />
        <Controller
          control={control}
          {...register("eDate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "120px" }}
              showMonthYearPicker
            />
          )}
        />
        <Label style={{ minWidth: "80px" }}>수금 방법</Label>
        <Select register={register("cuSukumtype")} width={InputSize.i120}>
          {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "80px" }}>거래상태</Label>
        <Select register={register("cuStae")} width={InputSize.i120}>
          {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "80px" }}>정렬순서 </Label>
        <Select register={register("sOrd")} width={InputSize.i120}>
          {dataCommonDic?.sOrd?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <CheckBox
          title="내역별 조회"
          rtl
          style={{ marginLeft: "6px" }}
          register={register("sChk")}
        />
      </FormGroup>
    </SearchWrapper>
  );
}

export default Tab1;
