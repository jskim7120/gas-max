import React from "react";
import Table from "components/table";
import { Input, Label, Select } from "components/form/style";
import { InputSize } from "components/componentsType";
import { SearchWrapper } from "container/contents/commonStyle";
import CheckBox from "components/checkbox";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  data: any
) {
  switch (id) {
    case 0:
      return (
        <div>
          <SearchWrapper>
            <Input label="건물명" register={register("aptName")} />
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              register={{ ...register("chkGubun") }}
              title="당월 검수/수금 조회"
              rtl
              style={{ width: "80px" }}
            />
          </SearchWrapper>
          <SearchWrapper>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>소비자형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>관리책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </SearchWrapper>
        </div>
      );
    case 1:
      return (
        <div>
          <SearchWrapper>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode2")} width={InputSize.i120}>
              {dataCommonDic?.swCode2?.map((obj: any, idx: number) => (
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
            <Label style={{ minWidth: "80px" }}>소비자형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </SearchWrapper>
        </div>
      );
    case 2:
      return (
        <div>
          <SearchWrapper>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>소비자형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>관리책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </SearchWrapper>
        </div>
      );
    case 3:
      return (
        <div>
          <SearchWrapper>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>소비자형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>관리책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </SearchWrapper>
        </div>
      );
  }
  return null;
}

export default getTabContent;
