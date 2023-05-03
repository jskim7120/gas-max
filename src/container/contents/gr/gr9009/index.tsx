import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { GR9009SEARCH } from "app/path";
import { IGR9009SEARCH } from "./model";
import API from "app/axios";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "../grid2";
import { columns, fields } from "./data";
import CustomTopPart from "container/contents/customTopPart";

function GR9009({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR9009",
  });

  const { register, handleSubmit, reset, control } = useForm<IGR9009SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        bcBuCode: dataCommonDic?.bcBuCode[0].code,
      });
    }
  };

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      bcBuCode: dataCommonDic?.bcBuCode[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dats } = await API.get(GR9009SEARCH, { params: params });

      if (dats) {
        setData(dats);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log("GR9003 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  const submit = (data: IGR9009SEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper className="h35">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>충전소</Label>
              <Select width={InputSize.i130} register={register("bcBuCode")}>
                {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label style={{ minWidth: "80px" }}>기간</Label>

              <Controller
                control={control}
                {...register("sDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
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
                  />
                )}
              />
            </FormGroup>

            <div className="buttons">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                color={ButtonColor.DANGER}
                type="submit"
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={13}
                        borderWidth="2px"
                        style={{ marginRight: "10px" }}
                      />
                    </>
                  )
                }
                style={{ marginRight: "5px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ marginRight: "5px" }}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={cancel}
              />
              <Button
                text="엑셀"
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid data={data} columns={columns} fields={fields} />
      </WrapperContent>
    </>
  );
}

export default GR9009;
