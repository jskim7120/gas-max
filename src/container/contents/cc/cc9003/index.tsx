import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9003SEARCH } from "./model";
import BasicGrid from "components/basicGrid";
import { MainWrapper, SearchWrapper, LeftSide } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields, layout } from "./data";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

const radioOptions = [
  {
    label: "일계표",
    id: "0",
  },
  {
    label: "월계표",
    id: "1",
  },
];

function CC9003({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
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
  } = CreateReport("CC", "CC9003", menuId, CC1100SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ICC9003SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ICC9003SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init: any = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        sMonth: dataCommonDic?.sMonth[0].code,
      });
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
      <SearchWrapper className="h35 mt5">
        <FormGroup></FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ border: "none" }}>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">
            <SearchWrapper className="h35" style={{ justifyContent: "start" }}>
              <FormGroup>
                <Item style={{ marginRight: "5px" }}>
                  <RadioButton
                    type="radio"
                    value={radioOptions[0].id}
                    {...register(`sChk1`)}
                    id={radioOptions[0].id}
                  />
                  <RadioButtonLabel htmlFor={`${radioOptions[0].label}`}>
                    {radioOptions[0].label}
                  </RadioButtonLabel>
                </Item>
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
              </FormGroup>
              <FormGroup style={{ marginLeft: "55px" }}>
                <Item style={{ marginRight: "5px" }}>
                  <RadioButton
                    type="radio"
                    value={radioOptions[1].id}
                    {...register(`sChk1`)}
                    id={radioOptions[1].id}
                  />
                  <RadioButtonLabel htmlFor={`${radioOptions[1].label}`}>
                    {radioOptions[1].label}
                  </RadioButtonLabel>
                </Item>
                <Controller
                  control={control}
                  {...register("sMonth")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "95px" }}>영업소</Label>
                <Select register={register("areaCode")} width={InputSize.i120}>
                  {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
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
                style={{ margin: " 0 5px 0 50px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
            </SearchWrapper>
          </form>
          <BasicGrid
            ref={gridRef}
            areaCode="00"
            data={data}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 47px)` }}
            layout={layout}
          />
        </LeftSide>
      </MainWrapper>
    </>
  );
}

export default CC9003;
