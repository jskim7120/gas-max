import React, { useEffect } from "react";
import API from "app/axios";
import { GR1600SEARCH } from "app/path";
import { useForm } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { InputSize, FieldKind } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";
import { MagnifyingGlassBig, ExcelIcon, Reset } from "components/allSvgIcon";
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
interface ISEARCH {
  areaCode: string;
  sBuGubun: string;
  sBuName: string;
}
function LeftHalf({
  depthFullName,
  data,
  setData,
  setSelected,
}: {
  depthFullName: string;
  data: any;
  setData: any;
  setSelected: any;
}) {
  const fetchData = async (params: ISEARCH) => {
    try {
      const { data: SEARCHDATA } = await API.get(GR1600SEARCH, {
        params: params,
      });

      setData(SEARCHDATA);
    } catch (error) {
      console.log("GR1600 DATA fetch error =======>", error);
    }
  };
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1600",
  });

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sBuGubun: dataCommonDic?.sBuGubun[0].code,
    });
  }, [dataCommonDic]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  return (
    <div>
      <div style={{ marginBottom: "5px" }}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="top-header">
            <p>매입 단가 관리</p>
            <p className="big">영업소</p>
            <Select {...register("areaCode")} kind={FieldKind.BORDER}>
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </div>
          <Field
            flex
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
              borderRight: "3px solid #707070",
            }}
          >
            <Field>
              <FormGroup>
                <Label style={{ background: "transparent" }}>구분</Label>
                <Select
                  kind={FieldKind.BORDER}
                  style={{ marginLeft: "5px" }}
                  {...register("sBuGubun")}
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
                labelStyle={{ background: "transparent" }}
                register={register("sBuName")}
                errors={errors["sBuName"]?.message}
                kind={FieldKind.BORDER}
                inputSize={InputSize.i100}
              />
            </Field>
            <div className="button-wrapper">
              <Button
                text="검색"
                icon={<MagnifyingGlassBig width="17.188" height="17.141" />}
                kind={ButtonType.ROUND}
                type="submit"
                style={{ marginRight: "5px", height: "26px" }}
              />

              <Button
                text="엑셀"
                icon={<ExcelIcon />}
                kind={ButtonType.ROUND}
                color={ButtonColor.SECONDARY}
                type="button"
              />
            </div>
          </Field>
        </form>
      </div>
      <Grid data={data ? data : []} setSelected={setSelected} />
    </div>
  );
}

export default LeftHalf;
