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
import { IPTFORMMODEL } from "./model";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { InfoText } from "components/text";
import { currencyMask } from "helpers/currency";

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

    const { register, reset, control } = useForm<IPTFORMMODEL>({
      mode: "onChange",
    });

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {}, [stateCC1100]);

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
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>일 자</Label>
          <Controller
            control={control}
            name="msDate"
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                style={{ width: "130px" }}
                value={value == null ? new Date() : value}
                onChange={onChange}
              />
            )}
          />
        </FormGroup>
        <br />
        <div style={{ borderStyle: "groove", alignItems: "center" }}>
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
          />
          <Controller
            control={control}
            name="cuJmisu"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ minWidth: "90px" }}
                label="미수금액"
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
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
              labelStyle={{ minWidth: "90px" }}
              label="D / C"
              mask={currencyMask}
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
            style={{ borderBottom: "1px solid #707070" }}
          />
          <Controller
            control={control}
            name="totMisukum"
            render={({ field: { name } }) => (
              <Input
                labelStyle={{ minWidth: "90px" }}
                label="미수금 총계"
                value={totMisukum}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
                readOnly
              />
            )}
          />
          <Controller
            control={control}
            name="totSukum"
            render={({ field: { name } }) => (
              <Input
                labelStyle={{ minWidth: "90px" }}
                label="수금 총계"
                value={totSukum}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
                readOnly
              />
            )}
          />
          <Controller
            control={control}
            name="totDc"
            render={({ field: { name } }) => (
              <Input
                labelStyle={{ minWidth: "90px" }}
                label="D/C 총계"
                value={totDc}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
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
