import React, { useImperativeHandle, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

import {
  Input,
  Select,
  FormGroup,
  Label,
  BottomStyleDiv,
} from "components/form/style";
import { IPTFORMMODEL } from "./formModel";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { InfoText } from "components/text";
import { currencyMask, removeCommas } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  setSelected: any;
  dataCommonDic: any;
  totMisukum?: number;
  totSukum?: number;
  totDc?: number;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      setSelected,
      dataCommonDic,
      totMisukum,
      totSukum,
      totDc,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const stateCC1100 = useSelector((state: any) => state.modal.cc1100);

    const { register, handleSubmit, reset, getValues, control, watch } =
      useForm<IPTFORMMODEL>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (watch("gsKumack") !== undefined && watch("gsDc") !== undefined) {
        calc();
      }
    }, [watch("gsKumack"), watch("gsDc")]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const calc = () => {
      const calc =
        (getValues("cuCmisu")
          ? +removeCommas(getValues("cuCmisu"), "number")
          : 0) -
        (watch("gsKumack") ? +removeCommas(watch("gsKumack"), "number") : 0) -
        (watch("gsDc") ? +removeCommas(watch("gsDc"), "number") : 0);

      reset((formValues: any) => ({
        ...formValues,
        gsJanack: calc,
      }));
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
      } else if (type === "reset") {
        reset({
          ...selected,
          gsDate: selected?.gsDate ? selected.gsDate : new Date(),
          gsKumack: 0,
          gsDc: 0,
          gsJanack: selected?.cuCmisu,
        });
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
      }

      if (type === null) {
        // handleSubmit(submit)();
      }
    };

    const handleSelectCode = async (event: any) => {};

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "330px", padding: "10px" }}
      >
        <div>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>일 자</Label>
            <Controller
              control={control}
              name="gsDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
          </FormGroup>
          <br></br>
          <div
            style={{
              border: "2px solid rgb(188,185 ,185)",
              marginLeft: "-2px",
            }}
          >
            <FormGroup>
              <Controller
                control={control}
                name="cuCode"
                render={({ field }) => (
                  <Input
                    {...field}
                    labelStyle={{ minWidth: "80px" }}
                    label="비 고"
                    inputSize={InputSize.i140}
                  />
                )}
              />
              <SearchBtn type="button">
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
            <Controller
              control={control}
              name="cuName"
              render={({ field }) => (
                <Input
                  {...field}
                  labelStyle={{ minWidth: "80px" }}
                  label="건 물 명"
                  inputSize={InputSize.i140}
                />
              )}
            />
            <Controller
              control={control}
              name="cuUsername"
              render={({ field }) => (
                <Input
                  {...field}
                  labelStyle={{ minWidth: "80px" }}
                  label="사용자명"
                  inputSize={InputSize.i140}
                />
              )}
            />
            <Controller
              control={control}
              name="cuCmisu"
              render={({ field }) => (
                <Input
                  {...field}
                  labelStyle={{ minWidth: "80px" }}
                  label="미수금액"
                  inputSize={InputSize.i140}
                  textAlign="right"
                  mask={currencyMask}
                />
              )}
            />
          </div>
          <br />
          <Controller
            control={control}
            name="gsDc"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="D / C"
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
          <Controller
            control={control}
            name="gsKumack"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="수 금 액"
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
          <br />
          <Controller
            control={control}
            name="gsJanack"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="수금 후 잔액"
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
          <br />
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>수금 방법</Label>
            <Select
              register={register("gsSukumType")}
              onChange={handleSelectCode}
              width={InputSize.i140}
            >
              {dataCommonDic?.gsSukumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>사 원</Label>
            <Select
              register={register("gsSwCode")}
              onChange={handleSelectCode}
              width={InputSize.i140}
            >
              {dataCommonDic?.gsSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Controller
            control={control}
            name="gsBigo"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="비 고"
                inputSize={InputSize.i140}
              />
            )}
          />
        </div>

        <BottomStyleDiv>
          <InfoText
            text={"수금처리는 선입선출 방식으로 자동 처리됨"}
            style={{ borderBottom: "1px solid rgb(188,185 ,185)" }}
          />
          <Controller
            control={control}
            name="totMisukum"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="미수금 총계"
                value={totMisukum}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                readOnly
              />
            )}
          />
          <Controller
            control={control}
            name="totSukum"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="수금 총계"
                value={totSukum}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                readOnly
              />
            )}
          />
          <Controller
            control={control}
            name="totDc"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "80px" }}
                label="D/C 총계"
                value={totDc}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                readOnly
              />
            )}
          />
        </BottomStyleDiv>
      </form>
    );
  }
);

export default Form;
