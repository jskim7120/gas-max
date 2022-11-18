// REACT
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// COMPONENTS
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDate from "components/customDatePicker";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  DividerGray,
  Field,
  FormGroup,
  Input,
  Label,
  Select,
  Divider,
  Wrapper,
} from "components/form/style";
// FORM
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
//API
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { ICM1200SEARCH } from "./modul";
import API from "app/axios";
import { CM1200DELETE, CM1200INSERT, CM1200UPDATE } from "app/path";

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: {
      selected: any;
      fetchData: any;
      setData: any;
      selectedRowIndex: number;
      setSelected: any;
      setSelectedRowIndex: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [rdangaCalc, setRdangaCalc] = useState("");
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [rdangaTotal, setRdangaTotal] = useState(0);
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CM",
      functionName: "CM1200",
    });

    console.log("selected", selected);

    const {
      handleSubmit,
      reset,
      register,
      getValues,
      formState: { errors },
    } = useForm<ICM1200SEARCH>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
      if (addr) {
        reset({
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr1: addr ? addr?.split("/")[2] : "",
          cuAddr2: addr ? addr?.split("/")[3] : "",
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addr]);

    useEffect(() => {
      reset({
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        cuSwCode: dataCommonDic?.cuSwCode[0].code,
        cuCustgubun: dataCommonDic?.cuCustgubun[0].code,

        cuRh20: dataCommonDic?.cuRh20[0].code,
        cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
        cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,

        // areaCode: dataCommonDic?.areaCode[0].code,
        // cuGumTurm: dataCommonDic?.cuGumTurm[0].code,
        // cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
        // tankMakeVol1: dataCommonDic?.tankMakeVol1[0].code,
        // tankMakeVol2: dataCommonDic?.tankMakeVol2[0].code,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCommonDic]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      setIsAddBtnClicked,
      crud,
    }));

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
        }

        if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
            cuAptnameYn: selected?.cuAptnameYn === "Y",
            chkCuZipCode: selected?.chkCuZipCode === "Y",
            chkCuRh20: selected?.chkCuRh20 === "Y",
            chkCuRdange: selected?.chkCuRdange === "Y",
          });
          setRdangaTotal(0);
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(CM1200DELETE, formValues);
          if (response.status === 200) {
            toast.success("Deleted", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            toast.error(response?.response?.message);
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1200SEARCH) => {
      const formValues = getValues();
      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;

      formValues.areaCode = "00";
      formValues.cuAptnameYn = formValues.cuAptnameYn ? "Y" : "N";
      formValues.chkCuZipCode = formValues.chkCuZipCode ? "Y" : "N";
      formValues.chkCuRh20 = formValues.chkCuRh20 ? "Y" : "N";
      formValues.chkCuRdange = formValues.chkCuRdange ? "Y" : "N";

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              console.log("prev", prev);
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("Action successful", {
            autoClose: 500,
          });

          setIsAddBtnClicked(false);
        } else {
          toast.error(response?.response?.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    const renderRdangaATM = (e: any) => {
      setRdangaCalc(e.target.value);
      var bill = e.target.value;
      var number = Number(getValues("cuRdangaAmt"));

      const total =
        bill !== "X"
          ? eval(`${selected?.cuRdanga} ${bill} ${number}`)
          : eval(`${selected?.cuRdanga} ${`*`} ${number}/100`);

      setRdangaTotal(total);
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        {/* 1-1 Wrapper */}
        <Divider />
        <Wrapper grid col={3}>
          <Input
            label="건물코드"
            maxLength="3"
            name="cuCode"
            labelStyle={{
              aligin: "center",
            }}
            register={register("cuCode")}
            errors={errors["cuCode"]?.message}
          />
          <Input label="건물명" register={register("cuName")} />
          <CheckBox
            title="건물명 지로 출력 안함."
            register={register("cuAptnameYn")}
            rtl={true}
          />
        </Wrapper>
        <DividerGray />
        {/* 1-2 Wrapper */}
        <Wrapper col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title=""
                  register={register("chkCuZipCode")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuZipcode")}
                inputSize={InputSize.xs}
              />

              <DaumAddress setAddress={setAddress} />
            </FormGroup>
          </Field>
          <Input register={register("cuAddr1")} inputSize={InputSize.md} />
          <Input register={register("cuAddr2")} inputSize={InputSize.md} />
        </Wrapper>
        <DividerGray />
        {/* 1-3 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("cuSwCode")} fullWidth>
                {dataCommonDic?.cuSwCode?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>지역분류</Label>
              <Select {...register("cuJyCode")} style={{ width: "60%" }}>
                {dataCommonDic?.cuJyCode?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <SearchBtn
                type="button"
                onClick={() => console.log("cuZipCode BTN")}
              >
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>관리자분류</Label>
              <Select {...register("cuCustgubun")} fullWidth>
                {dataCommonDic?.cuCustgubun?.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
        </Wrapper>
        <Divider />
        {/* 2-1 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="조정기"
                  register={register("chkCuRh20")}
                  rtl={false}
                />
              </Label>
              <Select
                {...register("cuRh20")}
                inputWidth="175px"
                textAlign="right"
              >
                {dataCommonDic?.cuRh20?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <p>mmH20</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="루베단가 "
                  register={register("chkCuRdange")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuRdangaType")} inputWidth="175px">
                {dataCommonDic?.cuRdangaType.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <p>{selected?.cuRdanga} 원</p>
              <Select
                {...register("cuRdangaSign")}
                onChange={(e: any) => renderRdangaATM(e)}
                style={{ minWidth: "15%" }}
              >
                {dataCommonDic?.cuRdangaSign.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
              <Input
                inputSize={InputSize.xs}
                textAlign="right"
                register={register("cuRdangaAmt")}
              />
              <p>
                {rdangaCalc === "X" ? "%" : rdangaCalc === "+" ? "원" : "원"}
              </p>
              <p>=</p>
              <p>{rdangaTotal} 원</p>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
