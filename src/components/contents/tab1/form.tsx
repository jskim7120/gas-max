import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useForm, Path, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";
import { ErrorText, FormWrapper, FormGroup, Wrapper } from "./style";
import { IFormProps } from "./type";
import { schema } from "./validation";

export default function Form({
  selectedCustomer,
  getFormValues,
}: {
  selectedCustomer: any;
  getFormValues: (arg: Object) => void;
}) {
  const dispatch = useDispatch();
  const [isClickedAdd, setIsClikedAdd] = useState(false);

  useEffect(() => {
    if (JSON.stringify(selectedCustomer) !== "{}") {
      reset(selectedCustomer);
    }
  }, [selectedCustomer]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const resetForm = (type: string) => {
    if (JSON.stringify(selectedCustomer) !== "{}") {
      console.log("type:", type);
      let newData: any = {};

      if (type === "clear") {
        for (const [key, value] of Object.entries(selectedCustomer)) {
          newData[key] = null;
        }
        setIsClikedAdd(true);
      } else if (type === "reset") {
        for (const [key, value] of Object.entries(selectedCustomer)) {
          newData[key] = value;
        }
      }
      reset(newData);
    }
  };

  const update = (data: IFormProps) => {
    getFormValues({ ...getValues(), action: "update" });
    if (isClickedAdd) {
      //createCustomer
    } else {
      //updateCustomer
    }
  };

  const remove = async () => {
    setIsClikedAdd(false);
    console.log("delete");
    console.log(getValues());

    await dispatch(deleteEmployee(getValues()));
    await dispatch(getEmployees());
  };

  return JSON.stringify(selectedCustomer) !== "{}" ? (
    <form onSubmit={handleSubmit(update)}>
      <div>
        <button
          type="button"
          style={{ marginRight: "2px" }}
          onClick={() => resetForm("clear")}
        >
          add
        </button>
        <button type="submit" style={{ marginRight: "2px" }}>
          update
        </button>
        <button type="button" style={{ marginRight: "2px" }} onClick={remove}>
          delete
        </button>
        <button type="button" onClick={() => resetForm("reset")}>
          cancel
        </button>
      </div>
      <FormWrapper>
        <Wrapper>
          <FormGroup>
            <label>opt:</label>
            <input {...register("opt")} type="number" />
          </FormGroup>
          <div>
            <ErrorText>{errors["opt"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swAddr1:</label>
            <input {...register("swAddr1")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swAddr1"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swAddr2:</label>
            <input {...register("swAddr2")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swAddr2"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swBigo:</label>
            <input {...register("swBigo")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swBigo"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swCaCode:</label>
            <input {...register("swCaCode")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swCaCode"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swCaName:</label>
            <input {...register("swCaName")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swCaName"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swCode:</label>
            <input {...register("swCode")} type="number" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swCode"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swDriverNo:</label>
            <input {...register("swDriverNo")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swDriverNo"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swDriverType:</label>
            <input {...register("swDriverType")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swDriverType"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swGubun:</label>
            <input {...register("swGubun")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swGubun"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swHp:</label>
            <input {...register("swHp")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swHp"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swIndate:</label>
            <input {...register("swIndate")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swIndate"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swJdate1:</label>
            <input {...register("swJdate1")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swJdate1"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swJdate2:</label>
            <input {...register("swJdate2")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swJdate2"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swJuminno:</label>
            <input {...register("swJuminno")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swJuminno"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swName:</label>
            <input {...register("swName")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swName"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swPaydate:</label>
            <input {...register("swPaydate")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swPaydate"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swPaykum:</label>
            <input {...register("swPaykum")} type="number" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swPaykum"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swPaytype:</label>
            <input {...register("swPaytype")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swPaytype"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swTel:</label>
            <input {...register("swTel")} type="number" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swTel"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swWorkOut:</label>
            <input {...register("swWorkOut")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swWorkOut"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <label>swZipcode:</label>
            <input {...register("swZipcode")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["swZipcode"]?.message}</ErrorText>
          </div>
        </Wrapper>
      </FormWrapper>

      {/* {(type === "input" || "date") && (
                    <input
                      {...register(name)}
                      type={inputType}
                      
                    />
                  )}

                  {type === "select" && (
                    <select {...register(name)}>
                      {options?.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  )} */}

      {/* {type === "date" && (
                    <Controller
                      control={control}
                      name={name}
                      render={({
                        field: { onChange, onBlur, value: selectedValue, ref },
                      }) => (
                        <DatePicker
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={
                            new Date(
                              selectedValue ? selectedValue : new Date(value)
                            )
                          }
                        />
                      )}
                    />
                  )} */}
    </form>
  ) : (
    <div className="text-center p-3">
      <span className="spinner-border spinner-border-lg align-center"></span>
    </div>
  );
}
