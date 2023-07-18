import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9009SEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Field, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
import { columns, fields } from "./data";
import CheckBox from "components/checkbox";

const radioOptions = [
  {
    label: "통장 입출금 자료조회 안함",
    id: "0",
  },
  {
    label: "전체 영업소 현금 조회",
    id: "1",
  },
];

function GR9006({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("CC", "CC9009", menuId, CC1100SEARCH);

  const { register, handleSubmit, reset, control } = useForm<ICC9009SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ICC9009SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init: any = dataCommonDic.dataInit[0];
      reset({});
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper className="h35" style={{ justifyContent: "flex-start" }}>
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
            <Field style={{ width: "227px", marginLeft: "30px" }}>
              <FormGroup>
                <CheckBox register={{ ...register("sChk1") }} />
                <Label>통장 입출금 자료조회 안함</Label>
              </FormGroup>
            </Field>
            <Field style={{ width: "227px" }}>
              <FormGroup>
                <CheckBox register={{ ...register("sChk1") }} />
                <Label>전체 영업소 현금 조회</Label>
              </FormGroup>
            </Field>
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
    </>
  );
}

export default GR9006;
