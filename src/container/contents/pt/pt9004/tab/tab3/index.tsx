import React from "react";
import { Controller } from "react-hook-form";
import { SearchWrapper } from "container/contents/commonStyle";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

function Tab3({
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
        <Select register={register("swCode2")} width={InputSize.i120}>
          {dataCommonDic?.swCode2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>관리책임자</Label>
        <Select register={register("cuCustgubun2")} width={InputSize.i120}>
          {dataCommonDic?.cuCustgubun2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>연체기간</Label>
        <Select register={register("sOver2")} width={InputSize.i120}>
          {dataCommonDic?.sOver2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label>개월 (2023-06)</Label>
      </FormGroup>
      <FormGroup>
        <Label style={{ minWidth: "80px" }}>지역구분</Label>
        <Select register={register("cuJyCode2")} width={InputSize.i120}>
          {dataCommonDic?.cuJyCode2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>수금 방법 </Label>
        <Select register={register("cuSukumtype2")} width={InputSize.i120}>
          {dataCommonDic?.cuSukumtype2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>거래상태</Label>
        <Select register={register("cuStae2")} width={InputSize.i120}>
          {dataCommonDic?.cuStae2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>정렬순서</Label>
        <Select register={register("sOrd2")} width={InputSize.i120}>
          {dataCommonDic?.sOrd2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
    </SearchWrapper>
  );
}

export default Tab3;
