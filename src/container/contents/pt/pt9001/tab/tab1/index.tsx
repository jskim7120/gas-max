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
        <Label style={{ minWidth: "80px" }}>구분</Label>
        <Select register={register("cuGubun")} width={InputSize.i120}>
          {dataCommonDic?.cuGubun?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "224px" }}>지역구분</Label>
        <Select register={register("cuJyCode")} width={InputSize.i120}>
          {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>거래상태</Label>
        <Select register={register("cuStae")} width={InputSize.i120}>
          {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label style={{ minWidth: "42px" }}>기간</Label>
        <CheckBox
          //title="기간"
          rtl
          style={{ marginLeft: "5px" }}
          register={register("dateChk")}
        />
        <Label style={{ minWidth: "4px" }}></Label>
        <Controller
          control={control}
          name="sDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
        <Label style={{ minWidth: "8px" }}></Label>
        <Controller
          control={control}
          name="eDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
        <Label style={{ minWidth: "90px" }}>장부구분</Label>
        <Select register={register("cuJangbu")} width={InputSize.i120}>
          {dataCommonDic?.cuJangbu?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>담당사원</Label>
        <Select register={register("swCode")} width={InputSize.i120}>
          {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>정렬순서</Label>
        <Select register={register("sOrd")} width={InputSize.i120}>
          {dataCommonDic?.sOrd?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
    </SearchWrapper>
  );
}

export default Tab1;
