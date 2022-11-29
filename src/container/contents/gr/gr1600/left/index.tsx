import React, { useEffect } from "react";
import API from "app/axios";
import { GR1600SEARCH } from "app/path";
import { useForm } from "react-hook-form";
import { InputSize, FieldKind } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import Grid from "./grid";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
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
  dataCommonDic,
}: {
  depthFullName: string;
  data: any;
  setData: any;
  setSelected: any;
  dataCommonDic: any;
}) {
  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
      });
    }
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

  return (
    <div>
      <div style={{ marginBottom: "5px" }}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="top-header">
            <p>{depthFullName}</p>
            <p className="big">영업소</p>
            <Select {...register("areaCode")}>
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
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <Field flex>
              <FormGroup>
                <Label
                  style={{
                    minWidth: "auto",
                    padding: "3px 0 3px 12px",
                  }}
                >
                  구분
                </Label>
                <Select {...register("sBuGubun")}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <Input
                label="매입처명"
                labelStyle={{
                  minWidth: "auto",
                  marginLeft: "15px",
                  padding: "3px 0 3px 12px",
                }}
                register={register("sBuName")}
                errors={errors["sBuName"]?.message}
                inputSize={InputSize.i100}
              />
            </Field>
            <div style={{ display: "flex", alignItems: "center" }}>
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
                style={{ marginRight: "5px", height: "26px" }}
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
