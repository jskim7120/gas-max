import { useState, useEffect } from "react";
import { GR9009SEARCH } from "app/path";
import { IGR9009SEARCH } from "./model";
import API from "app/axios";
import { TopBar, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "./grid";
import { columns, fields } from "./data";

function GR9009({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR9009",
  });

  console.log("GR9009:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<IGR9009SEARCH>({
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
      const { data } = await API.get(GR9009SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("GR9003 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetForm();
    setDataChk(true);
    setData([]);
  };

  const submit = (data: IGR9009SEARCH) => {
    console.log("IISEARCH:", data);
    fetchData(data);
  };

  return (
    <>
      <TopBar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "20px" }}>{depthFullName}</p>
          <p>
            <b>영업소</b>
          </p>

          <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
      </TopBar>
      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div>
              <Wrapper grid col={2} fields="1fr 1.5fr">
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>충전소</Label>
                  <Select
                    width={InputSize.i130}
                    {...register("bcBuCode")}
                    kind={FieldKind.BORDER}
                  >
                    {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>기간</Label>
                  <Field style={{ minWidth: "120px" }}>
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
                  </Field>
                  <Field style={{ minWidth: "120px" }}>
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
                  </Field>
                </FormGroup>
              </Wrapper>
            </div>

            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
            >
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
                style={{ marginRight: "10px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ marginRight: "10px" }}
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

        <Grid
          data={data.length > 0 && data}
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

export default GR9009;
