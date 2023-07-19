import React from "react";
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
        <Select register={register("swCode1")} width={InputSize.i120}>
          {dataCommonDic?.swCode1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>관리책임자</Label>
        <Select register={register("cuCustgubun1")} width={InputSize.i120}>
          {dataCommonDic?.cuCustgubun1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label style={{ minWidth: "80px" }}>지역구분</Label>
        <Select register={register("cuJyCode1")} width={InputSize.i120}>
          {dataCommonDic?.cuJyCode1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "90px" }}>수금 방법</Label>
        <Select register={register("cuSukumtype1")} width={InputSize.i120}>
          {dataCommonDic?.cuSukumtype1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "80px" }}>거래상태</Label>
        <Select register={register("cuStae1")} width={InputSize.i120}>
          {dataCommonDic?.cuStae1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <Label style={{ minWidth: "80px" }}>정렬순서</Label>
        <Select register={register("sOrd1")} width={InputSize.i120}>
          {dataCommonDic?.sOrd1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        <CheckBox
          title="세로양식 인쇄"
          rtl
          style={{ marginLeft: "10px" }}
          register={register("sChk1")}
        />
      </FormGroup>
    </SearchWrapper>
  );
}

export default Tab1;
