import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "app/store";
import { apiGet, apiPost } from "app/axios";
import {
  CM1300INSERTSEQ2,
  CM1300CUSTOMERINSERT,
  CM1300CUSTOMERUPDATE,
  CM130065,
} from "app/path";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { ICM1300User, emptyObj } from "./model";
import { columns, fields } from "./data";
import { FormGroup, Input, Label } from "components/form/style";
import { PersonInfoText } from "components/text";
import Grid from "components/grid";
import FourButtons from "components/button/fourButtons";
import { InputSize } from "components/componentsType";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

const DELETECONSTANT = "CM1300USERDELETE";

function FormCM1300User({
  data,
  setData,
  ownAreaCode,
  selected,
  mainSelected,
  setSelected,
  fetchData,
  aptCode,
  areaCode,
  isAddBtnClicked,
  mainIsAddBtnClicked,
  setIsAddBtnClicked,
  menuId,
}: {
  data: Array<any>;
  setData: Function;
  ownAreaCode: string;
  selected: any;
  mainSelected: any;
  setSelected: Function;
  fetchData: Function;
  aptCode: string;
  areaCode: string;
  isAddBtnClicked: boolean;
  mainIsAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  menuId: string;
}) {
  const dispatch = useDispatch();

  const { isDelete } = useSelector((state) => state.modal);

  const { register, handleSubmit, reset, getValues } = useForm<ICM1300User>({
    mode: "onChange",
  });

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      resetForm("reset");
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    } else {
      resetForm("clear");
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
    setIsAddBtnClicked(true);
    setIsAddBtnClicked(false);
    resetForm("reset");
  };

  const resetForm = async (type: string) => {
    if (type === "clear") {
      if (mainSelected?.areaCode && aptCode) {
        const res: any = await apiGet(CM1300INSERTSEQ2, {
          aptCode: aptCode,
          areaCode: mainSelected?.areaCode,
        });

        if (res[0]?.tempAptCode) {
          reset({
            ...emptyObj,
            cuCode1: res[0]?.tempAptCode?.split("-")[0],
            cuCode2: res[0]?.tempAptCode?.split("-")[1],
          });
        } else {
          reset({
            ...emptyObj,
          });
        }
      }
    }
    if (type === "reset") {
      if (selected && Object.keys(selected).length > 0) {
        reset({
          ...selected,
          cuCode1: selected?.cuCode?.split("-")[0],
          cuCode2: selected?.cuCode?.split("-")[1],
        });
      }
    }
    if (type === "emptClear") {
      reset({
        ...emptyObj,
      });
    }
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      const formValues = getValues();
      //delete procedure bhgui tul tur hoooson
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
    formValues.areaCode = mainSelected?.areaCode;

    const res = await apiPost(path, formValues, "저장이 성공하였습니다");
  };

  return (
    <>
      {/* <div style={{ width: "1px", background: "#707070" }}></div> */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", flexGrow: 1 }}>
          <PersonInfoText text="사용자" style={{ padding: "10px" }} />
          <Grid
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `406px` }}
            gridNumber={1}
          />
        </div>
        <div style={{ width: "1px", background: "#707070" }}></div>
        <div style={{ paddingTop: "7px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <FourButtons
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginRight: "10px",
              }}
              onClickAdd={onClickAdd}
              onClickDelete={onClickDelete}
              onClickUpdate={onClickUpdate}
              onClickReset={onClickReset}
              isAddBtnClicked={isAddBtnClicked}
            />
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            style={{
              padding: "10px 7px 0px 34px",
            }}
            autoComplete="off"
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
              <Label>건 물 명</Label>
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
      </div>
    </>
  );
}

export default FormCM1300User;
