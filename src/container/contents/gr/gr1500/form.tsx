import React, {
  useImperativeHandle,
  useEffect,
  useState,
  BaseSyntheticEvent,
} from "react";
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
import {
  Plus,
  ResetGray,
  Trash,
  Update,
  MagnifyingGlass,
} from "components/allSvgIcon";
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
import FourButtons from "components/button/fourButtons";
import { SearchBtn } from "components/daum";

interface IForm {
  selected: any;
  selected2: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: Function;
  setSelected2: Function;
  setSelectedRowIndex: any;
  menuId: string;
}

const Form = React.forwardRef(
  (
    {
      selected,
      selected2,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelected2,
      setSelectedRowIndex,
      menuId,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
    const [isCancelBtnDisabled, setIsCancelBtnDisabled] =
      useState<boolean>(true);

    const [buMisu, setBuMisu] = useState();
    const [bjOutkum, setBjOutkum] = useState();
    const [bjDc, setBjDc] = useState();
    const [baNow, setBaNow] = useState();
    const dispatch = useDispatch();

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "GR",
      functionName: "GR1500",
    });

    const { isDelete } = useSelector((state) => state.modal);

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
      setIsAddBtnClicked(false);
    }, [selected]);

    useEffect(() => {
      if (JSON.stringify(selected2) !== "{}") {
        resetForm2("reset");
      }
      setIsAddBtnClicked(false);
    }, [selected2]);

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
    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm2,
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
        }
        if (type === "reset") {
          setBuMisu(selected.curUnpay);
          reset({
            bjBuName: selected.buCode,
            buMisu: selected.curUnpay,
          });
        }
      }
    };
    const resetForm2 = async (type: string) => {
      if (selected2 !== undefined && JSON.stringify(selected2) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          for (const [key, value] of Object.entries(selected2)) {
            newData[key] = null;
          }
          reset({ ...newData });
        }
        if (type === "reset") {
          setBjOutkum(selected2.bjOutkum);
          setBjDc(selected2.bjDc);
          //setBaNow(selected.curUnpay);
          reset({
            bjDate: selected2.bjDate,
            bjOutkum: selected2.bjOutkum,
            bjDc: selected2.bjDc,
            //BaNow: selected2.buBigo,
            bjAcbCode: selected2.bjOuttypName,
            bjBigo: selected2.bjBigo,
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

    const onClickAdd = () => {
      setIsAddBtnClicked(true);
      setIsCancelBtnDisabled(false);
      //resetForm("clear");
    };
    const onClickDelete = () => {
      dispatch(openModal({ type: "delModal" }));
      dispatch(addDeleteMenuId({ menuId: menuId }));
    };
    const onClickReset = () => {
      // crud(null);
    };
    const onClickUpdate = () => {
      // setIsAddBtnClicked(false);
      // resetForm("reset");
    };

    return (
      <div style={{ minWidth: "350px" }}>
        <FormHeadCnt>
          <FourButtons
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              marginRight: "10px",
            }}
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            onClickReset={onClickReset}
            onClickUpdate={onClickUpdate}
            isAddBtnClicked={isAddBtnClicked}
            isCancelBtnDisabled={isCancelBtnDisabled}
          />
        </FormHeadCnt>
        <form
          autoComplete="off"
          style={{
            marginTop: "20px",
          }}
        >
          <FormGroup>
            <Input
              label="매입처 코드"
              register={register("bjBuCode")}
              inputSize={InputSize.i150}
            />
            <SearchBtn type="button" onClick={() => {}}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
          <FormGroup>
            <Label>매입처명</Label>
            <Select register={register("bjBuName")} width={InputSize.i150}>
              {dataCommonDic?.bjBuName?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <DividerGR />
          <Wrapper>
            <Input
              label="결재 은행"
              register={register("buBank")}
              inputSize={InputSize.i60}
            />
            <Input
              textAlign="center"
              register={register("buBankno")}
              style={{ width: "84px" }}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="예금주"
              register={register("buBankju")}
              inputSize={InputSize.i150}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="비 고"
              register={register("buBigo")}
              inputSize={InputSize.i150}
            />
          </Wrapper>
          <Wrapper>
            <Input
              label="담당자명"
              register={register("buDamdang")}
              inputSize={InputSize.i150}
            />
          </Wrapper>
          <Wrapper>
            <Input
              textAlign="right"
              label="미지급액"
              //register={register("buMisu")}
              value={buMisu}
              onChange={(e: any) => setBuMisu(e.target.value)}
              inputSize={InputSize.i150}
              mask={currencyMask}
            />
          </Wrapper>

          <DividerGR />

          <Field flex style={{ alignItems: "center" }}>
            <Label>지급 일자</Label>
            <Controller
              control={control}
              {...register("bjDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                />
              )}
            />
          </Field>
          <Wrapper>
            <Input
              label="지급액"
              textAlign="right"
              //register={register("bjOutkum")}
              value={bjOutkum}
              onChange={(e: BaseSyntheticEvent) => setBjOutkum(e.target.value)}
              inputSize={InputSize.i150}
              mask={currencyMask}
            />
          </Wrapper>
          <Wrapper>
            <Input
              textAlign="right"
              label="D / C"
              //register={register("bjDc")}
              value={bjDc}
              onChange={(e: any) => setBjDc(e.target.value)}
              inputSize={InputSize.i150}
              mask={currencyMask}
            />
          </Wrapper>
          <Wrapper>
            {/* // bjDc = buMisu - bjOutkum - bjDc */}
            <Input
              textAlign="right"
              label="지금후 잔액"
              // register={register("bjDc")}
              value={baNow}
              onChange={(e: any) => setBaNow(e.target.value)}
              inputSize={InputSize.i150}
              mask={currencyMask}
            />
          </Wrapper>
          <FormGroup>
            <Label>지급 방법</Label>
            <Select register={register("bjOuttype")} width={InputSize.i150}>
              {dataCommonDic?.bjOuttype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>출금 통장</Label>
            <Select register={register("bjAcbCode")} width={InputSize.i150}>
              {dataCommonDic?.bjAcbCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Wrapper>
            <Input
              label="비 고"
              register={register("bjBigo")}
              inputSize={InputSize.i150}
            />
          </Wrapper>
        </form>
      </div>
    );
  }
);

export default Form;
