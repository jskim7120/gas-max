import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9003SEARCH } from "./model";
import BasicGrid from "components/basicGrid";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
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
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
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
        <SearchWrapper className="h35 ">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper>
          <FormGroup>
            <Item>
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
              name="sDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Label style={{ minWidth: "30px" }}></Label>
            <Item>
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
              name="sMonth"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Label style={{ minWidth: "80px" }}>영업소</Label>
            <Select register={register("areaCode")} width={InputSize.i120}>
              {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <div className="buttons ml30">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlassBig width="15" />}
                color={ButtonColor.DANGER}
                type="submit"
                loader={
                  loading && (
                    <Loader
                      size={16}
                      style={{
                        marginRight: "12px",
                      }}
                    />
                  )
                }
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
            </div>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode={ownAreaCode}
        data={data}
        fields={fields}
        columns={columns}
        menuId={menuId}
        rowIndex={0}
        style={{ height: `calc(100% - 83px)` }}
        layout={layout}
      />
    </>
  );
}

export default CC9003;
