import React, { useImperativeHandle, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1300INSERT, EN1300UPDATE, EN1300DELETE, EN130011 } from "app/path";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { ISANGPUM, emptyObj } from "./model";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { currencyMask, removeCommas2 } from "helpers/currency";

interface IForm {
  selected: any;
  setSelected: any;
  fetchData: any;
  setData: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const radioOptions = [
  {
    label: "사용(Y)",
    id: "Y",
  },
  {
    label: "안함(N)",
    id: "N",
  },
];

const Form = React.forwardRef(
  (
    {
      selected,
      setSelected,
      fetchData,
      setData,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1300",
    });

    const { register, handleSubmit, reset, getValues, control, setFocus } =
      useForm<ISANGPUM>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCode11 = async (code: string) => {
      try {
        const response: any = await API.get(EN130011, {
          params: { areaCode: code },
        });

        if (response.status === 200) {
          return response?.data;
        } else {
          alert(response?.response?.data?.message);
          resetButtonCombination();
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    };

    const codeChangeHandler = async (aCode: any) => {
      try {
        const temp = await fetchCode11(aCode);
        if (temp !== null) {
          setFocus("jpName");
          reset({
            ...emptyObj,
            ...temp,
            jpCode: temp.tempCode,
          });
        }
      } catch (err: any) {
        console.log("jpCode generate error", err);
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        await codeChangeHandler(areaCode);
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          if (selected?.areaCode !== areaCode) {
            setAreaCode(selected.areaCode);
          }
          reset({
            ...selected,
          });
        }
        return;
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues: any = getValues();
        delete formValues.jpIndanga;
        delete formValues.jpOutdanga;
        delete formValues.jpIntong;
        delete formValues.jpBaedal;
        delete formValues.jpOuttong;

        try {
          const response: any = await API.post(EN1300DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData("pos");
          } else {
            alert(response?.response?.data?.message);
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ISANGPUM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1300INSERT : EN1300UPDATE;
      const formValues = getValues();

      isAddBtnClicked && (formValues.areaCode = areaCode);
      formValues.jpOutdanga =
        formValues.jpOutdanga && +removeCommas2(formValues.jpOutdanga);
      formValues.jpIndanga =
        formValues.jpIndanga && +removeCommas2(formValues.jpIndanga);
      formValues.jpIntong =
        formValues.jpIntong && +removeCommas2(formValues.jpIntong);
      formValues.jpOuttong =
        formValues.jpOuttong && +removeCommas2(formValues.jpOuttong);
      formValues.jpBaedal =
        formValues.jpBaedal && +removeCommas2(formValues.jpBaedal);
      formValues.jpSort = formValues.jpSort && +formValues.jpSort;

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setIsAddBtnClicked(false);
            await fetchData("pos");
          } else {
            await fetchData();
          }

          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          alert(response?.response?.data?.message);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px", width: "328px" }}
        autoComplete="off"
      >
        <FormGroup>
          <Label>영 업 소</Label>
          <Select
            width={InputSize.i130}
            value={areaCode}
            onChange={(e) => {
              setAreaCode(e.target.value);
              codeChangeHandler(e.target.value);
            }}
            disabled={!isAddBtnClicked}
          >
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input
            label="코 드"
            register={register("jpCode")}
            maxLength="4"
            inputSize={InputSize.i130}
            readOnly
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="품 명"
            register={register("jpName")}
            inputSize={InputSize.i130}
            maxLength="30"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="규 격"
            register={register("jpSpec")}
            inputSize={InputSize.i130}
            maxLength="10"
          />
        </FormGroup>

        <FormGroup>
          <Label>가스 구분</Label>
          <Select register={register("jpGubun")} width={InputSize.i130}>
            {dataCommonDic?.jpGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Controller
            control={control}
            {...register("jpKg")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="용 량"
                value={value}
                name={name}
                onChange={onChange}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                textAlign="right"
                inputSize={InputSize.i60}
              />
            )}
          />

          <Select register={register("jpKgDanwi")} style={{ minWidth: "64px" }}>
            {dataCommonDic?.jpKgDanwi?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>단 위</Label>
          <Select register={register("jpUnit")} width={InputSize.i130}>
            {dataCommonDic?.jpUnit?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input
            label="비 중(1L)"
            register={register("jpSpecific")}
            inputSize={InputSize.i130}
            textAlign="right"
          />
        </FormGroup>

        <FormGroup>
          <Label>가스 분류</Label>
          <Select register={register("jpGasType")} width={InputSize.i130}>
            {dataCommonDic?.jpGasType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>품목 구분</Label>
          <Select register={register("jpKind")} width={InputSize.i130}>
            {dataCommonDic?.jpKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>용도 구분</Label>
          <Select register={register("jpGasuse")} width={InputSize.i130}>
            {dataCommonDic?.jpGasuse?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Divider />
        <FormGroup>
          <Label>Vat 구분</Label>
          <Select register={register("jpVatKind")} width={InputSize.i130}>
            {dataCommonDic?.jpVatKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            {...register("jpOutdanga")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="가스판매 단가"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            {...register("jpOuttong")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="용기판매 단가"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            {...register("jpIndanga")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="가스매입 원가"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            {...register("jpIntong")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="용기구입 단가"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            {...register("jpBaedal")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="사원 배달 수수료"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <Divider />

        <FormGroup>
          <Label>재고사용 유무</Label>
          {radioOptions.map((option, index) => (
            <Item key={index}>
              <RadioButton
                type="radio"
                value={option.id}
                {...register(`jpJaegoYn`)}
                id={option.id}
              />
              <RadioButtonLabel htmlFor={`${option.label}`}>
                {option.label}
              </RadioButtonLabel>
            </Item>
          ))}
        </FormGroup>
        <FormGroup>
          <Input
            style={{ textAlign: "end" }}
            label="순번(조회 순서)"
            register={register("jpSort")}
            inputSize={InputSize.i130}
            textAlign="right"
          />
        </FormGroup>
      </form>
    );
  }
);

export default Form;
