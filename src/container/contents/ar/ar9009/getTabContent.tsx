import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import { SearchWrapper } from "container/contents/commonStyle";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  data: any
) {
  switch (id) {
    case 0:
      return (
        <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
          <FormGroup>
            <Input
              label="건물명"
              register={register("aptName")}
              labelStyle={{ minWidth: "80px" }}
              inputSize={InputSize.i200}
            />
            <Label style={{ minWidth: "90px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              register={register("chkGubun")}
              title="당월 검수/수금 조회"
              rtl
              style={{ marginLeft: "35px" }}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i200}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>소비자형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
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
        </SearchWrapper>
      );
    case 1:
      return (
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode2")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>지역구분</Label>
            <Select register={register("cuJyCode2")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>소비자형태</Label>
            <Select register={register("cuCutype2")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      );
    case 2:
      return (
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode3")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>지역구분</Label>
            <Select register={register("cuJyCode3")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>소비자형태</Label>
            <Select register={register("cuCutype3")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      );
    case 3:
      return (
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode4")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>지역구분</Label>
            <Select register={register("cuJyCode4")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>소비자형태</Label>
            <Select register={register("cuCutype4")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      );
  }
  return null;
}

export default getTabContent;
