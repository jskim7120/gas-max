import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "app/store";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { Plus, ResetGray, Trash, Update } from "components/allSvgIcon";
import { FormHeadCnt, DividerGR } from "./style";
import {} from "app/path";
import { IGR1500SEARCH } from "./model";
import Button from "components/button/button";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  Field,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize, ButtonColor } from "components/componentsType";
import { currencyMask } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  menuId: string;
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
      menuId,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const dispatch = useDispatch();

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "GR",
      functionName: "GR1500",
    });

    const { isDelete } = useSelector((state) => state.modal);

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
        });
      }
      setIsAddBtnClicked(false);
    }, [selected]);

    useEffect(() => {
      if (isDelete.menuId === menuId && isDelete.isDelete) {
        deleteRowGrid();
      }
    }, [isDelete.isDelete]);

    const { register, handleSubmit, reset, control, getValues } =
      useForm<IGR1500SEARCH>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset({ ...newData });
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
      //   if (type === "delete") {
      //     const formValues = getValues();
      //     try {
      //       const response = await API.post(GR1500DELETE, formValues);
      //       if (response.status === 200) {
      //         toast.success("삭제했습니다", {
      //           autoClose: 500,
      //         });
      //         await handleSubmit(submit)();
      //       }
      //     } catch (err) {
      //       toast.error("Couldn't delete", {
      //         autoClose: 500,
      //       });
      //     }
      //   }
      //   if (type === null) {
      //     handleSubmit(submit)();
      //   }
    };

    const submit = async (data: IGR1500SEARCH) => {
      //form aldaagui uyd ajillana
      //   const path = isAddBtnClicked ? GR1500INSERT : GR1500UPDATE;
      //   const formValues = getValues();
      //   formValues.areaCode = selected.areaCode;
      //   try {
      //     const response: any = await API.post(path, formValues);
      //     if (response.status === 200) {
      //       if (isAddBtnClicked) {
      //         setData((prev: any) => [formValues, ...prev]);
      //         setSelectedRowIndex(0);
      //       } else {
      //         setData((prev: any) => {
      //           prev[selectedRowIndex] = formValues;
      //           return [...prev];
      //         });
      //       }
      //       setSelected(formValues);
      //       toast.success("저장이 성공하였습니다", {
      //         autoClose: 500,
      //       });
      //       setIsAddBtnClicked(false);
      //     } else {
      //       toast.error(response?.message, {
      //         autoClose: 500,
      //       });
      //     }
      //   } catch (err: any) {
      //     toast.error(err?.message, {
      //       autoClose: 500,
      //     });
      //   }
    };

    function deleteRowGrid() {
      try {
        setIsAddBtnClicked(false);
        crud("delete");
        dispatch(addDeleteMenuId({ menuId: "" }));
        dispatch(setIsDelete({ isDelete: false }));
        dispatch(closeModal());
      } catch (error) {}
    }

    return (
      <div style={{ minWidth: "350px" }}>
        {/* <FormContainer /> */}
        <FormHeadCnt>
          <Button
            text="등록"
            icon={<Plus />}
            onClick={() => {
              // setIsAddBtnClicked(true);
              // resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            onClick={() => {
              dispatch(openModal({ type: "delModal" }));
              dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            color={ButtonColor.SUCCESS}
            onClick={() => {
              // crud(null);
            }}
          />
          <Button
            text="취소"
            icon={<ResetGray />}
            color={ButtonColor.LIGHT}
            onClick={() => {
              // setIsAddBtnClicked(false);
              // resetForm("reset");
            }}
            style={{ padding: "0 3px" }}
          />
        </FormHeadCnt>
        <form
          style={{
            marginTop: "20px",
          }}
        >
          <Wrapper>
            <Input
              label="매입처코드"
              register={register("bjBuCode")}
              inputSize={InputSize.i180}
            />
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Label>매입처명</Label>
              <Select {...register("bjBuName")} width={InputSize.i180}>
                {dataCommonDic?.bjBuName?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <DividerGR />
          <Wrapper>
            <Input
              label="결재은행"
              register={register("buBank")}
              inputSize={InputSize.i60}
            />
            <Input
              textAlign="center"
              register={register("buBankno")}
              inputSize={InputSize.i120}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="예금주"
              register={register("buBankju")}
              inputSize={InputSize.i180}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="비고"
              register={register("buBigo")}
              inputSize={InputSize.i180}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="담당자명"
              register={register("buDamdang")}
              inputSize={InputSize.i180}
            />
          </Wrapper>
          <Wrapper>
            <Input
              textAlign="right"
              label="미지급액"
              register={register("buMisu")}
              inputSize={InputSize.i180}
              mask={currencyMask}
            />
          </Wrapper>

          <DividerGR />

          <Field flex style={{ alignItems: "center" }}>
            <Label>지급일자</Label>
            <Controller
              control={control}
              {...register("bjDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Wrapper>
            <Input
              label="지 급 액"
              textAlign="right"
              register={register("bjOutkum")}
              inputSize={InputSize.i180}
              mask={currencyMask}
            />
          </Wrapper>
          <Wrapper>
            <Input
              textAlign="right"
              label="D / C"
              register={register("bjDc")}
              inputSize={InputSize.i180}
              mask={currencyMask}
            />
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Label>지급방법</Label>
              <Select {...register("bjOuttype")} width={InputSize.i180}>
                {dataCommonDic?.bjOuttype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Label>출금통장</Label>
              <Select {...register("bjAcbCode")} width={InputSize.i180}>
                {dataCommonDic?.bjAcbCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <Input
              label="비 고"
              register={register("bjBigo")}
              inputSize={InputSize.i180}
            />
          </Wrapper>
        </form>
      </div>
    );
  }
);

export default Form;
