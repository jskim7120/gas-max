import React, { useImperativeHandle, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import {
  Input,
  Select,
  FormGroup,
  Label,
  BottomStyleDiv,
} from "components/form/style";
import { PersonInfoText } from "components/text";
import { IPTFORMMODEL } from "./model";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { InfoText } from "components/text";
import { currencyMask, removeCommas } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  dataCommonDic: any;
  totMisukum?: number;
  totSukum?: number;
  totDc?: number;
}

const Form = React.forwardRef(
  (
    { selected, fetchData, dataCommonDic, totMisukum, totSukum, totDc }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const stateCC1100 = useSelector((state: any) => state.modal.cc1100);

    const { register, reset, control, watch, getValues } =
      useForm<IPTFORMMODEL>({
        mode: "onChange",
      });

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (watch("msKumack") !== undefined && watch("msDc") !== undefined) {
        calc();
      }
    }, [watch("msKumack"), watch("msDc")]);

    // useEffect(() => {}, [stateCC1100]);

    const calc = () => {
      const calc =
        (getValues("cuJmisu")
          ? +removeCommas(getValues("cuJmisu"), "number")
          : 0) -
        (watch("msKumack") ? +removeCommas(watch("msKumack"), "number") : 0) -
        (watch("msDc") ? +removeCommas(watch("msDc"), "number") : 0);

      reset((formValues: any) => ({
        ...formValues,
        msJanack: calc,
      }));
    };

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
      } else if (type === "reset") {
        reset({
          ...selected,
          msSwCode: selected?.cuSwCode,
          msSukumType: selected?.cuSukumtype,
          msDate: selected?.msDate ? selected?.msDate : new Date(),
          msKumack: 0,
          msDc: 0,
          msJanack: selected?.cuJmisu,
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
        style={{ width: "335px", padding: "10px" }}
      >
        <PersonInfoText text="수금 처리" />
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>일 자</Label>
          <Controller
            control={control}
            name="msDate"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "130px" }} />
            )}
          />
        </FormGroup>
        <br />
        <div
          style={{
            border: "2px solid rgb(188,185 ,185)",
            marginLeft: "-2px",
          }}
        >
          <FormGroup>
            <Input
              label="거 래 처"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuName")}
              inputSize={InputSize.i140}
            />
            <SearchBtn type="button">
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>

          <Input
            label=""
            labelStyle={{ minWidth: "90px" }}
            register={register("cuCode")}
            inputSize={InputSize.i140}
            readOnly
          />
          <Controller
            control={control}
            name="cuJmisu"
            render={({ field }) => (
              <Input
                {...field}
                mask={currencyMask}
                labelStyle={{ minWidth: "90px" }}
                label="미수금액"
                textAlign="right"
                inputSize={InputSize.i140}
                readOnly
              />
            )}
          />
        </div>
        <br />
        <Controller
          control={control}
          name="msDc"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              labelStyle={{ minWidth: "90px" }}
              label="D / C"
              textAlign="right"
              inputSize={InputSize.i140}
            />
          )}
        />
        <Controller
          control={control}
          name="msKumack"
          render={({ field }) => (
            <Input
              {...field}
              labelStyle={{ minWidth: "90px" }}
              label="수 금 액"
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i140}
            />
          )}
        />
        <br />
        <Controller
          control={control}
          name="msJanack"
          render={({ field }) => (
            <Input
              {...field}
              labelStyle={{ minWidth: "90px" }}
              label="수금 후 잔액"
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i140}
              readOnly
            />
          )}
        />
        <br />
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>수금 방법</Label>
          <Select
            register={register("msSukumtype")}
            onChange={handleSelectCode}
            width={InputSize.i140}
          >
            {dataCommonDic?.msSukumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "90px" }}>사 원</Label>
          <Select
            register={register("msSwCode")}
            onChange={handleSelectCode}
            width={InputSize.i140}
          >
            {dataCommonDic?.msSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Controller
          control={control}
          name="msBigo"
          render={({ field }) => (
            <Input
              {...field}
              labelStyle={{ minWidth: "90px" }}
              label="비 고"
              textAlign="right"
              inputSize={InputSize.i140}
            />
          )}
        />
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
                labelStyle={{ minWidth: "90px" }}
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
                labelStyle={{ minWidth: "90px" }}
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
                labelStyle={{ minWidth: "90px" }}
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
