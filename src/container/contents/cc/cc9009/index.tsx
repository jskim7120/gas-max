import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { GR9009SEARCH } from "app/path";
import { ICC9009SEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
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

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, control } = useForm<ICC9009SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({});
    }
  };

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC9009" });
  }, []);

  useEffect(() => {}, [dataCommonDic]);

  const fetchData = async (params: any) => {
    // try {
    //   setLoading(true);
    //   const { data } = await API.get(GR9009SEARCH, { params: params });

    //   if (data) {
    //     setData(data);
    //     setLoading(false);
    //   }
    // } catch (err) {
    //   console.log("CC9009 data search fetch error =======>", err);
    // }

    setLoading(true);
    const data = await apiGet(GR9009SEARCH, params);

    if (data) {
      setData(data);
      setLoading(false);
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  const submit = (data: ICC9009SEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          <p className="blue" style={{ marginLeft: "30px" }}>
            ※ 연비는 일자별 주유전,후 유량이 동일하다는 가정하에 산출한 평균연비
            입니다.
          </p>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>

      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper
            className="h35"
            style={{ justifyContent: "flex-start", gap: "250px" }}
          >
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>영업소</Label>
              <Select width={InputSize.i130} register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label style={{ minWidth: "80px" }}>기간</Label>
              <Controller
                control={control}
                {...register("sDateF")}
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
                {...register("sDateT")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />

              <Label style={{ minWidth: "70px" }}>차량</Label>
              <Select width={InputSize.i130} register={register("carCode")}>
                {dataCommonDic?.carCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
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
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid
          areaCode={areaCode}
          data={data}
          columns={columns}
          fields={fields}
          style={{ height: `calc(100% - 35px)` }}
        />
      </WrapperContent>
    </>
  );
}

export default GR9009;
