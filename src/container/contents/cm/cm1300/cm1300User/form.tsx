import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { ICM1300User } from "./model";
import { schema } from "../validation";
import { InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import {
  CM1300INSERTSEQ2,
  CM1300CUSTOMERINSERT,
  CM1300CUSTOMERUPDATE,
} from "app/path";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  userData: any;
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
      userData,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CM",
      functionName: "CM1300",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ICM1300User>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      } else {
        resetForm("clear");
      }
    }, [selected]);

    useEffect(() => {
      if (userData.length > 0) {
        let initData: any = {};
        for (const [key, value] of Object.entries(userData[0])) {
          initData[key] = value;
        }
        reset({
          ...initData,
          cuCode1: userData[0]?.cuCode?.replaceAll("-", "").substring(0, 3),
          cuCode2: userData[0]?.cuCode?.replaceAll("-", "").substring(3, 8),
        });
      } else
        reset({
          cuCode1: "",
          cuCode2: "",
          cuUserName: "",
          cuName: "",
        });
    }, [userData]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const fetchCodes = async (areaCode: string, cuCodeHead: string) => {
      try {
        const response: any = await API.get(CM1300INSERTSEQ2, {
          params: { aptCode: cuCodeHead, areaCode: areaCode },
        });
        if (response.status === 200 && response.data[0].tempAptCode) {
          return response.data;
        } else {
          toast.error("can't get aptCode", {
            autoClose: 500,
          });
        }
      } catch (err) {
        toast.error("Error occured during get aptCode", {
          autoClose: 500,
        });
      }
      return null;
    };

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          let cuCodeHead = selected.cuCode.substr(0, 3);
          const data = await fetchCodes(selected.areaCode, cuCodeHead);
          if (data) {
            for (const [key, value] of Object.entries(selected)) {
              newData[key] = null;
            }
            reset({
              ...newData,
              cuCode1: data[0]?.tempAptCode.substr(0, 3),
              cuCode2: data[0]?.tempAptCode.substr(4),
            });
          }
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
            cuCode1: selected?.cuCode?.replaceAll("-", "").substring(0, 3),
            cuCode2: selected?.cuCode?.replaceAll("-", "").substring(3, 8),
          });
        }
      } else {
        reset({
          cuCode1: "",
          cuCode2: "",
          cuUserName: "",
          cuName: "",
        });
      }
    };
    const crud = async (type: string | null) => {
      // if (type === "delete") {
      //   const path = `${base}delete`;
      //   const formValues = getValues();

      //   try {
      //     const response = await API.post(path, formValues);
      //     if (response.status === 200) {
      //       toast.success("삭제했습니다", {
      //         autoClose: 500,
      //       });
      //       await fetchData();
      //     }
      //   } catch (err) {
      //     toast.error("Couldn't delete");
      //   }
      // }
      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1300User) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked
        ? CM1300CUSTOMERINSERT
        : CM1300CUSTOMERUPDATE;
      const formValues = getValues();
      console.log("formValues", formValues);
      formValues.cuCode = formValues.cuCode1 + "-" + formValues.cuCode2;
      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{
          padding: "15px 50px 10px",
          height: "auto",
        }}
      >
        <Wrapper grid col={1} style={{ gap: "3px" }}>
          <div style={{ display: "flex" }}>
            <Input
              label="거래처코드"
              register={register("cuCode1")}
              errors={errors["cuCode1"]?.message}
              inputSize={InputSize.xs}
              readOnly
            />
            <Input
              register={register("cuCode2")}
              errors={errors["cuCode2"]?.message}
              inputSize={InputSize.xs}
              readOnly
            />
          </div>
          <Field>
            <FormGroup>
              <Label>건물명</Label>
              <Input inputSize={InputSize.i130} register={register("cuName")} />
            </FormGroup>
            <div>
              <ErrorText>{errors["cuName"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <Label>사용자명</Label>
              <Input
                inputSize={InputSize.i130}
                register={register("cuUserName")}
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["cuUserName"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
      </form>
    );
  }
);

export default Form;
