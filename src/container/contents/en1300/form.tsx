import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "app/store";
import CheckBox from "components/checkbox";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  DividerGray,
  Field,
  ErrorText,
  FormGroup,
  Label,
} from "components/form/style";
import { useGetCommonGubunQuery } from "app/api/commonGubun";
import { IFormProps } from "./type";
import { schema } from "./validation";
import API from "app/axios";
import { useGetAreaCodeQuery } from "app/api/areaCode";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1800/";

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { data: areaCode } = useGetAreaCodeQuery();
    const { data: jpGubun, isError: isJpGubun } = useGetCommonGubunQuery("3");
    const { data: jpKgDanwi, isError: isJpKgDanwi } =
      useGetCommonGubunQuery("6");
    const { data: jpUnit, isError: isJpUnit } = useGetCommonGubunQuery("7");
    const { data: jpKind, isError: isJpKind } = useGetCommonGubunQuery("8");

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          swWorkOut: selected?.swWorkOut === "Y",
        });
      }
    }, [selected]);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IFormProps>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
      if (JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            swWorkOut: selected?.swWorkOut === "Y",
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = `${base}delete`;
        const formValues = getValues();

        try {
          const response = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("Deleted");
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IFormProps) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          toast.success("Action successfull");
          setIsAddBtnClicked(false);
          await fetchData();
        } else {
          toast.error(response?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        {/* <p>{isAddBtnClicked ? "true" : "false"}</p> */}
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {areaCode?.map((obj, idx) => (
                  <option key={idx} value={obj.areaCode}>
                    {obj.areaCode}본사
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["areaCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Input
            label="코드"
            register={register("jpCode")}
            errors={errors["jpCode"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="품명"
            register={register("jpName")}
            errors={errors["jpName"]?.message}
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="규격"
            register={register("jpSpec")}
            errors={errors["jpSpec"]?.message}
          />
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>가스구분</Label>
              {isJpGubun ? (
                "error occured"
              ) : (
                <Select {...register("jpGubun")}>
                  {jpGubun?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGubun"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field style={{ display: "flex" }}>
            <Input
              label="용량"
              register={register("jpKg")}
              errors={errors["jpKg"]?.message}
              style={{ width: "50px", textAlign: "end" }}
            />
            <FormGroup>
              {isJpKgDanwi ? (
                "error occured"
              ) : (
                <Select {...register("jpKgDanwi")}>
                  {jpKgDanwi?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jpKgDanwi"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>단위</Label>
              {isJpUnit ? (
                "error occured"
              ) : (
                <Select {...register("jpUnit")}>
                  {jpUnit?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jpUnit"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>가스분류</Label>
              <Select {...register("jpGasType")}>
                {areaCode?.map((obj, idx) => (
                  <option key={idx} value={obj.jpUnit}>
                    {obj.jpUnit}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGasType"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>품목구분</Label>
              {isJpKind ? (
                "error occured"
              ) : (
                <Select {...register("jpKind")}>
                  {jpKind?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jpKind"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>용도구분</Label>
              <Select {...register("jpGasuse")}>
                {areaCode?.map((obj, idx) => (
                  <option key={idx} value={obj.jpUnit}>
                    {obj.jpUnit}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGasuse"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Field>
            <Input
              label="가스판매단가"
              register={register("jpOutdanga")}
              errors={errors["jpOutdanga"]?.message}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              label="용기판매단가"
              register={register("jpOuttong")}
              errors={errors["jpOuttong"]?.message}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              label="가스매입원가"
              register={register("jpIndanga")}
              errors={errors["jpIndanga"]?.message}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              label="용기구입단가"
              register={register("jpIntong")}
              errors={errors["jpIntong"]?.message}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              label="사원배달수수료"
              register={register("jpBaedal")}
              errors={errors["jpBaedal"]?.message}
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <FormGroup style={{ alignItems: "center" }}>
            <Label>재고사용 유무</Label>
            <CheckBox
              title="사용(Y)"
              rtl
              register={{ ...register("jpJaegoYn") }}
            />
            <CheckBox
              title="안함(N)"
              rtl
              register={{ ...register("jpJaegoYn") }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jpJaegoYn"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              label="순번(조회순서)"
              register={register("jpSort")}
              errors={errors["jpSort"]?.message}
            />
          </Field>
        </Wrapper>
        <ToastContainer />
      </form>
    );
  }
);

export default Form;