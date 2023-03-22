import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "app/store";
import API from "app/axios";
import {
  CM1300INSERTSEQ2,
  CM1300CUSTOMERINSERT,
  CM1300CUSTOMERUPDATE,
} from "app/path";
import { ICM1300User } from "./model";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { FormGroup, Input, Label } from "components/form/style";
import { SearchWrapper } from "container/contents/commonStyle";
import { PersonInfoText } from "components/text";
import Grid from "components/grid";
import FourButtons from "components/button/fourButtons";
import { InputSize } from "components/componentsType";

const DELETECONSTANT = "CM1300USERDELETE";

function FormCM1300User({
  data,
  setData,
  ownAreaCode,
  selected,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
  fetchData,
}: {
  data: Array<any>;
  setData: Function;
  ownAreaCode: string;
  selected: any;
  setSelected: Function;
  selectedRowIndex: number;
  setSelectedRowIndex: Function;
  fetchData: Function;
}) {
  const dispatch = useDispatch();

  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const { isDelete } = useSelector((state) => state.modal);

  const { register, handleSubmit, reset, getValues } = useForm<ICM1300User>({
    mode: "onChange",
  });

  useEffect(() => {
    if (selected && JSON.stringify(selected) !== "{}") {
      resetForm("reset");
    }
    setIsAddBtnClicked(false);
  }, [selected]);

  useEffect(() => {
    if (isDelete.menuId === DELETECONSTANT && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

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
    resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: DELETECONSTANT }));
  };

  const onClickUpdate = () => {
    crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    resetForm("reset");
  };

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
      if (type === "clear") {
        let newData: any = {};
        let cuCodeHead = selected.cuCode.split("-")[0];

        const dataC = await fetchCodes(selected.areaCode, cuCodeHead);
        if (dataC) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }

          reset({
            ...newData,
            cuCode1: dataC[0]?.tempAptCode?.split("-")[0],
            cuCode2: dataC[0]?.tempAptCode?.split("-")[1],
          });
        }
      } else if (type === "reset") {
        reset({
          ...selected,
          cuCode1: selected?.cuCode?.split("-")[0],
          cuCode2: selected?.cuCode?.split("-")[1],
        });
      }
    }
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      const formValues = getValues();
      //delete procedure bhgui tul tur hoooson

      // try {
      //   const response = await API.post(path, formValues);
      //   if (response.status === 200) {
      //     toast.success("삭제했습니다", {
      //       autoClose: 500,
      //     });
      //     await fetchData();
      //   }
      // } catch (err) {
      // toast.error("Couldn't delete", {
      //   autoClose: 500,
      // });
      // }
    }
    if (type === null) {
      handleSubmit(submit)();
    }
  };

  const submit = async (data: ICM1300User) => {
    //form aldaagui uyd ajillana
    const path = isAddBtnClicked ? CM1300CUSTOMERINSERT : CM1300CUSTOMERUPDATE;
    const formValues = getValues();
    formValues.cuCode = formValues.cuCode1 + "-" + formValues.cuCode2;
    formValues.areaCode = selected.areaCode;

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
        setIsCancelBtnDisabled(true);
      } else {
        toast.error(response.response.data?.message, {
          autoClose: 500,
        });
      }
    } catch (err: any) {
      toast.error(err?.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <>
      <SearchWrapper className="h35">
        <div></div>
        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
      </SearchWrapper>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", flexGrow: 1 }}>
          <PersonInfoText text="사용자" style={{ padding: "10px" }} />
          <Grid
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            fields={fields}
            columns={columns}
            style={{ height: `282px` }}
          />
        </div>
        <div style={{ width: "1px", background: "#707070" }}></div>

        <form
          onSubmit={handleSubmit(submit)}
          style={{
            padding: "30px 40px 10px 0",
          }}
        >
          <FormGroup>
            <Input
              label="거래처코드"
              register={register("cuCode1")}
              inputSize={InputSize.i60}
              readOnly
            />
            <Input
              register={register("cuCode2")}
              inputSize={InputSize.i80}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label>건물명</Label>
            <Input register={register("cuName")} style={{ width: "146px" }} />
          </FormGroup>
          <FormGroup>
            <Label>사용자명</Label>
            <Input
              register={register("cuUsername")}
              style={{ width: "146px" }}
            />
          </FormGroup>
        </form>
      </div>
    </>
  );
}

export default FormCM1300User;
