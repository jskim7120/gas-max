import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { GR9005SEARCH } from "app/path";
import { IGR9005SEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "./grid";
import { columns, fields } from "./data";
import CustomTopPart from "container/contents/customTopPart";

function GR9005({
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
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, control } = useForm<IGR9005SEARCH>({
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
    getCommonDictionary({ groupId: "GR", functionName: "GR9005" });
  }, []);

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      bcBuCode: dataCommonDic?.bcBuCode[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    // try {
    //   setLoading(true);
    //   const { data } = await API.get(GR9005SEARCH, { params: params });
    //   console.log("data irev:", data);
    //   if (data) {
    //     setData(data);
    //     setLoading(false);
    //     setSelectedRowIndex(0);
    //   }
    // } catch (err) {
    //   console.log("GR9003 data search fetch error =======>", err);
    // }

    setLoading(true);
    const data = await apiGet(GR9005SEARCH, params);
    if (data) {
      setData(data);
      setLoading(false);
      setSelectedRowIndex(0);
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  const submit = (data: IGR9005SEARCH) => {
    console.log("IISEARCH:", data);
    fetchData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "47px" }}>영업소</Label>
                <Select register={register("areaCode")}>
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </>
            )}
            <div className="buttons ml30">
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
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
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
        </SearchWrapper>
      </form>
      <WrapperContent>
        <Grid
          data={data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </WrapperContent>
    </>
  );
}

export default GR9005;
