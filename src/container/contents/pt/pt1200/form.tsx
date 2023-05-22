import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { EN1400DELETE, EN140011 } from "app/path";
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
import { MagnifyingGlass, IconInfo } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { addCC1100, openModal } from "app/state/modal/modalSlice";
import { InfoText } from "components/text";
import { currencyMask } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
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
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
      totMisukum,
      totSukum,
      totDc,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const stateCC1100 = useSelector((state: any) => state.modal.cc1100);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<IPTFORMMODEL>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {}, [stateCC1100]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      console.log(dataCommonDic);
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("bpName")?.focus();
          const path = EN140011;

          // try {
          //   const response: any = await API.get(path, {
          //     params: { areaCode: selected.areaCode },
          //   });
          //   if (response.status === 200) {
          //     for (const [key, value] of Object.entries(selected)) {
          //       newData[key] = null;
          //     }
          //     newData.bpCode = response.data.tempCode;
          //     newData.areaCode = selected.areaCode;
          //     reset(newData);
          //   } else {
          //     toast.error(response.response.data?.message, {
          //       autoClose: 500,
          //     });
          //   }
          // } catch (err: any) {
          //   console.log("areaCode select error", err);
          // }

          const res: any = await apiGet(path, { areaCode: selected.areaCode });
          if (res) {
            for (const [key, value] of Object.entries(selected)) {
              newData[key] = null;
            }
            newData.bpCode = res.data.tempCode;
            newData.areaCode = selected.areaCode;
            reset(newData);
          }
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        // try {
        //   const response = await API.post(EN1400DELETE, formValues);
        //   if (response.status === 200) {
        //     toast.success("삭제하였습니다", {
        //       autoClose: 500,
        //     });
        //     await fetchData();
        //   }
        // } catch (err) {
        //   toast.error("Couldn't delete", {
        //     autoClose: 500,
        //   });
        // }

        const res = await apiPost(EN1400DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
      }

      if (type === null) {
        // handleSubmit(submit)();
      }
    };

    const handleSelectCode = async (event: any) => {};

    const handleSearchBtnClick = () => {
      dispatch(addCC1100({}));
      dispatch(openModal({ type: "cc1100Modal" }));
    };

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "320px" }}
      >
        <div style={{ padding: "10px" }}>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>일 자</Label>
            <Controller
              control={control}
              {...register("gsDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value == null ? new Date() : value}
                  onChange={onChange}
                />
              )}
            />
          </FormGroup>
          <br></br>
          <div style={{ borderStyle: "groove", alignItems: "center" }}>
            <FormGroup>
              <Controller
                control={control}
                {...register("cuCode")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    labelStyle={{ minWidth: "80px" }}
                    label="비 고"
                    value={value}
                    onChange={onChange}
                    inputSize={InputSize.i140}
                    name={name}
                  />
                )}
              />
              <SearchBtn type="button">
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
            <Controller
              control={control}
              {...register("cuName")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  labelStyle={{ minWidth: "80px" }}
                  label="건 물 명"
                  value={value}
                  onChange={onChange}
                  inputSize={InputSize.i140}
                  name={name}
                />
              )}
            />
            <Controller
              control={control}
              {...register("cuUsername")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  labelStyle={{ minWidth: "80px" }}
                  label="사용자명"
                  value={value}
                  onChange={onChange}
                  inputSize={InputSize.i140}
                  name={name}
                />
              )}
            />
            <Controller
              control={control}
              {...register("cuCmisu")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  labelStyle={{ minWidth: "80px" }}
                  label="미수금액"
                  value={value}
                  onChange={onChange}
                  inputSize={InputSize.i140}
                  textAlign="right"
                  mask={currencyMask}
                  name={name}
                />
              )}
            />
          </div>
          <br />
          <Controller
            control={control}
            {...register("gsDc")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="D / C"
                value={value}
                onChange={onChange}
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            {...register("gsKumack")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="수 금 액"
                value={value}
                onChange={onChange}
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
                name={name}
              />
            )}
          />
          <br />
          <Controller
            control={control}
            {...register("gsJanack")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="수금 후 잔액"
                value={value}
                onChange={onChange}
                inputSize={InputSize.i140}
                textAlign="right"
                mask={currencyMask}
                name={name}
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
            {...register("gsBigo")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="비 고"
                value={value}
                onChange={onChange}
                inputSize={InputSize.i140}
                name={name}
              />
            )}
          />
        </div>

        <BottomStyleDiv bottomSize={InputSize.i80}>
          <InfoText
            text={"수금처리는 선입선출 방식으로 자동 처리됨"}
            style={{ borderBottom: "1px solid" }}
          />
          <Controller
            control={control}
            {...register("totMisukum")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="미수금 총계"
                value={totMisukum}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            {...register("totSukum")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="수금 총계"
                value={totSukum}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            {...register("totDc")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "80px" }}
                label="D/C 총계"
                value={totDc}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i140}
                name={name}
              />
            )}
          />
        </BottomStyleDiv>
      </form>
    );
  }
);

export default Form;
