import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "app/store";
import API from "app/axios";
import {
  CM1300INSERTSEQ2,
  CM1300CUSTOMERINSERT,
  CM1300CUSTOMERUPDATE,
  CM130065,
} from "app/path";
import { ICM1300User, emptyObj } from "./model";
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
import setFooterDetail from "container/contents/footer/footerDetailFunc";

const DELETECONSTANT = "CM1300USERDELETE";

function FormCM1300User({
  data,
  setData,
  ownAreaCode,
  selected,
  mainSelected,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
  fetchData,
  aptCode,
  areaCode,
  isAddBtnClicked,
  mainIsAddBtnClicked,
  setIsAddBtnClicked,
  isCancelBtnDisabled,
  setIsCancelBtnDisabled,
}: {
  data: Array<any>;
  setData: Function;
  ownAreaCode: string;
  selected: any;
  mainSelected: any;
  setSelected: Function;
  selectedRowIndex: number;
  setSelectedRowIndex: Function;
  fetchData: Function;
  aptCode: string;
  areaCode: string;
  isAddBtnClicked: boolean;
  mainIsAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  isCancelBtnDisabled: boolean;
  setIsCancelBtnDisabled: Function;
}) {
  const dispatch = useDispatch();

  // const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  // const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const { isDelete } = useSelector((state) => state.modal);

  const { register, handleSubmit, reset, getValues } = useForm<ICM1300User>({
    mode: "onChange",
  });

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
      resetForm("reset");
    } else {
      resetForm("clear");
    }
    setIsAddBtnClicked(false);
  }, [selected]);

  useEffect(() => {
    if (mainIsAddBtnClicked) {
      setData([]);
      resetForm("emptClear");
      setIsAddBtnClicked(true);
      setIsCancelBtnDisabled(false);
    } else {
      setIsAddBtnClicked(false);
      fetchData65();
    }
  }, [mainIsAddBtnClicked]);

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
    setIsAddBtnClicked(true);
    setIsAddBtnClicked(false);
    resetForm("reset");
  };

  const fetchCodes = async (areaC: string, aptC: string) => {
    try {
      const response: any = await API.get(CM1300INSERTSEQ2, {
        params: { aptCode: aptC, areaCode: areaC },
      });
      if (response.status === 200) {
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

  const fetchData65 = async () => {
    try {
      const { data: data65 } = await API.get(CM130065, {
        params: {
          areaCode: mainSelected?.areaCode,
          aptCode: mainSelected?.aptCode,
        },
      });

      if (data65) {
        if (data65?.userCustomer && data65?.userCustomer?.length > 0) {
          setData(data65.userCustomer);
          setSelected(data65.userCustomer[0]);
        } else {
          setData([]);
          setSelected({});
        }

        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("CM1300 data search fetch error =======>", err);
    }
  };
  const resetForm = async (type: string) => {
    if (type === "clear") {
      if (areaCode !== "" && aptCode !== "") {
        // let newData: any = {};

        const dataC = await fetchCodes(areaCode, aptCode);
        if (dataC[0]?.tempAptCode) {
          // for (const [key] of Object.entries(selected)) {
          //   newData[key] = null;
          // }

          reset({
            ...emptyObj,
            cuCode1: dataC[0]?.tempAptCode?.split("-")[0],
            cuCode2: dataC[0]?.tempAptCode?.split("-")[1],
          });
        } else {
          reset({
            ...emptyObj,
          });
        }
      }
    }
    if (type === "reset") {
      if (selected !== undefined && Object.keys(selected).length > 0) {
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
    formValues.areaCode = areaCode;

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
