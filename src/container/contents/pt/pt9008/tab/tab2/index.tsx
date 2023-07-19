import React from "react";
import { Controller } from "react-hook-form";
import { SearchWrapper } from "container/contents/commonStyle";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

function Tab2({
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
        <Label style={{ minWidth: "80px" }}>기간</Label>
        <Controller
          control={control}
          name="sDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
        <Controller
          control={control}
          name="eDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />

        <CheckBox
          //title="수금 사원"
          rtl
          style={{ marginLeft: "40px" }}
          register={register("sawonChk")}
        />
        <Label style={{ minWidth: "67px" }}>수금 사원</Label>
        <Select register={register("swCode")} width={InputSize.i120}>
          {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "110px" }}>관리책임자</Label>
        <Select register={register("cuCustgubun")} width={InputSize.i120}>
          {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Input
          label="건물명"
          labelStyle={{ minWidth: "80px" }}
          register={register("cuName")}
          inputSize={InputSize.i200}
        />
        <Label style={{ minWidth: "179px" }}>수금 방법</Label>
        <Select register={register("cuSukumtype")} width={InputSize.i120}>
          {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "110px" }}>지역구분</Label>
        <Select register={register("cuJyCode")} width={InputSize.i120}>
          {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
    </SearchWrapper>
  );
}

export default Tab2;
