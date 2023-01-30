import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { SearchWrapper } from "../../commonStyle";
import Button from "components/button/button";
import {
  Document,
  Settings2,
  MagnifyingGlassBig,
  Users,
} from "components/allSvgIcon";
import { ButtonColor } from "components/componentsType";
import {
  Select,
  Wrapper,
  Label,
  Field,
  FormGroup,
  Input,
} from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import API from "app/axios";
import { RV1100SEARCH } from "app/path";
import { ISEARCH } from "./model";
import CheckBox from "components/checkbox";

function RV1100({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV1100",
  });

  console.log("dataCommonDic:::::", dataCommonDic);

  const { register, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  const fetchData = async (params: ISEARCH) => {
    const { data } = await API.get(RV1100SEARCH, { params: params });
    console.log("data::::::", data);
  };

  return (
    <div>
      <SearchWrapper style={{ height: "35px", marginTop: "4px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>

          <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
        <div className="buttons">
          <Button
            text="지로 출력"
            icon={<Document />}
            type="button"
            color={ButtonColor.LIGHT}
          />
          <Button
            text="체적환경"
            icon={<Settings2 />}
            type="button"
            color={ButtonColor.LIGHT}
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <div style={{ width: "70%" }}>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 0.8fr 1.5fr">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>검침년월</Label>
              <Controller
                control={control}
                {...register("sGjGumym")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
              <Label style={{ minWidth: "auto" }}>회차</Label>
              <Select {...register("sGjSno")} style={{ width: "100%" }}>
                {dataCommonDic?.sGjSno?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "80px" }}>검침일자</Label>
              <Controller
                control={control}
                {...register("sGjDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ marginLeft: "0px" }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <CheckBox
                register={{ ...register("sGjPerYn") }}
                title="연체적요일"
              />
              <Controller
                control={control}
                {...register("sGjPerDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
            </FormGroup>
            {/* 
            <Button
              text="검색"
              icon={<MagnifyingGlassBig />}
              type="button"
              color={ButtonColor.SECONDARY}
            />
            <Button
              text="회차별 미검침"
              icon={<Users />}
              type="button"
              color={ButtonColor.LIGHT}
              style={{ marginLeft: "5px" }}
            />
            <Button
              text="전체 미검침"
              icon={<Users />}
              type="button"
              color={ButtonColor.LIGHT}
              style={{ marginLeft: "5px" }}
            />
            */}
          </Wrapper>

          <Wrapper grid col={4} fields="1.2fr 0.8fr 0.8fr 1.5fr">
            <FormGroup>
              <Input
                label="건물명"
                register={register("sCuName")}
                labelStyle={{ minWidth: "70px" }}
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ minWidth: "80px" }}>담당사원</Label>
              <Select {...register("sSwCode")}>
                {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {/*

            <Input label="지역분류" register={register("sJyCode")} />
            <FormGroup>
              <Label>관리책임자</Label>
              <Select {...register("sCuCustgubun")}>
                {dataCommonDic?.sCustgubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>수금방법</Label>
              <Select {...register("sSukumtype")}>
                {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            */}
          </Wrapper>
        </div>
      </SearchWrapper>
    </div>
  );
}

export default RV1100;
