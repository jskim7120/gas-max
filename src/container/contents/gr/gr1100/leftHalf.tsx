import React, { useEffect } from "react";
import API from "app/axios";
import { GR1100SEARCH } from "app/path";
import { useForm } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { InputSize, FieldKind } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import Grid from "./grid";
import {
  Input,
  Input2,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Label,
  DividerGray,
} from "components/form/style";
import { ButtonWrapper } from "./style";

function LeftHalf({
  depthFullName,
  setData,
}: {
  depthFullName: string;
  setData: any;
}) {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await API.get(GR1100SEARCH);
      console.log("data::::", data);
      setData(data);
    } catch (error) {
      console.log("GR1100 DATA fetch error =======>", error);
    }
  };
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1100",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onSubmit",
  });

  console.log("dataCommonDic:", dataCommonDic);

  return (
    <div>
      <form>
        <div className="top-header">
          <p>매입처 관리</p>
          <p className="big">영업소</p>
          <Select name="areaCode" kind={FieldKind.BORDER}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
        <Wrapper style={{ position: "relative" }}>
          <Field>
            <FormGroup>
              <Label>구분</Label>
              <Select
                name="sBuGubun"
                kind={FieldKind.BORDER}
                style={{ marginLeft: "5px" }}
              >
                {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <Input
              label="매입처명"
              register={register("cuAddr")}
              errors={errors["cuAddr"]?.message}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i100}
            />
          </Field>
          <Field>
            <FormGroup>
              <Label>거래상태</Label>
              <Select
                name="sBuStae"
                kind={FieldKind.BORDER}
                style={{ marginLeft: "5px" }}
              >
                {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Field>
          <ButtonWrapper>
            <Button
              text="검색"
              icon={<MagnifyingGlassBig />}
              kind={ButtonType.ROUND}
              type="submit"
            />
            <Button
              text="엑셀"
              icon={<ExcelIcon />}
              kind={ButtonType.ROUND}
              color={ButtonColor.SECONDARY}
              type="button"
            />
          </ButtonWrapper>
        </Wrapper>
      </form>
    </div>
  );
}

export default LeftHalf;
