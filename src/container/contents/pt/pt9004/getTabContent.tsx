import { Controller } from "react-hook-form";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import { SearchWrapper } from "container/contents/commonStyle";
import CustomDatePicker from "components/customDatePicker";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  data: any,
  control: any
) {
  switch (id) {
    case 0:
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
            <Select register={register("cuCustgubun1")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun1?.map((obj: any, idx: number) => (
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
            <Select register={register("cuSukumtype1")} width={InputSize.i120}>
              {dataCommonDic?.cuSukumtype1?.map((obj: any, idx: number) => (
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
    case 1:
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
    case 2:
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
  return null;
}

export default getTabContent;
