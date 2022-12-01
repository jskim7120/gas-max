import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { GR1600SEARCH } from "app/path";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import { LeftSection, RightSection, MainWrapper, DetailHeader } from "../style";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import RightHalf from "./right";
import Grid from "./grid";

let values1: any;
let labels1: any;
let values2: any;
let labels2: any;

interface ISEARCH {
  areaCode: string;
  sBuGubun: string;
  sBuName: string;
}

function GR1600({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1600",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
      });

      values1 = [];
      labels1 = [];
      values2 = [];
      labels2 = [];

      dataCommonDic?.jpDangaType.map((item: any) => {
        values1.push(item.code);
        labels1.push(item.codeName);
      });

      dataCommonDic?.jpVatKind.map((item: any) => {
        values2.push(item.code);
        labels2.push(item.codeName);
      });
    }
  }, [dataCommonDic]);

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

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <DetailHeader>
        <Field flex>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>
          <Select {...register("areaCode")}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      </DetailHeader>
      <MainWrapper>
        <LeftSection>
          <form onSubmit={handleSubmit(submit)}>
            <div style={{ marginBottom: "5px" }}>
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
            </div>
            <Grid data={data ? data : []} setSelected={setSelected} />
          </form>
        </LeftSection>

        <RightSection>
          <RightHalf
            selected={selected}
            values1={values1}
            values2={values2}
            labels1={labels1}
            labels2={labels2}
            fetchLeftData={handleSubmit(submit)}
          />
        </RightSection>
      </MainWrapper>

      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
