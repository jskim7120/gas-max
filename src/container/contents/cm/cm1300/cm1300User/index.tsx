import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "app/store";
import { apiGet, apiPost } from "app/axios";
import {
  CM1300INSERTSEQ2,
  CM1300CUSTOMERINSERT,
  CM1300CUSTOMERUPDATE,
} from "app/path";
import { addDeleteMenuId } from "app/state/modal/modalSlice";
import { ICM1300User, emptyObj } from "./model";
import { columns, fields } from "./data";
import { FormGroup, Input, Label } from "components/form/style";
import { PersonInfoText } from "components/text";
import Grid from "components/grid";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import setFooterDetail from "container/contents/footer/footerDetailFunc";
import { SearchWrapper } from "container/contents/commonStyle";
import useModal from "app/hook/useModal";

const DELETECONSTANT = "CM1300USERDELETE";

function FormCM1300User({
  data,
  ownAreaCode,
  selected,
  mainSelected,
  setSelected,
  fetchData,
  isAddBtnClicked,
  setIsAddBtnClicked,
  mainIsAddBtnClicked,
  menuId,
}: {
  data: Array<any>;
  ownAreaCode: string;
  selected: any;
  mainSelected: any;
  setSelected: Function;
  fetchData: Function;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  mainIsAddBtnClicked: boolean;
  menuId: string;
}) {
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const dispatch = useDispatch();
  const { showDeleteModal, openModal } = useModal();
  const tabState = useSelector((state) => state.tab.tabs);
  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === 1)?.row;
  const [userData, setUserData] = useState<any[]>([]);

  //const { isDelete } = useSelector((state) => state.modal);

  const { register, handleSubmit, reset, getValues } = useForm<ICM1300User>({
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  useEffect(() => {
    if (mainIsAddBtnClicked) {
      resetForm("emptClear");
      setUserData([]);
    } else {
      setUserData(data);
      resetForm("reset");
    }
  }, [mainIsAddBtnClicked]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        btnRef1.current.classList.remove("active");
        setIsAddBtnClicked(false);
      }

      resetForm("reset");
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    } else {
      resetForm("emptClear");
    }
  }, [selected]);

  /*
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
*/
  const onClickAdd = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
    resetForm("clear");
  };

  const onClickDelete = () => {
    openModal();
    dispatch(addDeleteMenuId({ menuId: DELETECONSTANT }));
  };

  const onClickUpdate = () => {
    crud(null);
  };

  const onClickReset = () => {
    btnRef1.current.classList.remove("active");
    setIsAddBtnClicked(false);
    resetForm("reset");
  };

  const resetForm = async (type: string) => {
    if (type === "clear") {
      if (mainSelected?.areaCode && mainSelected?.aptCode) {
        const res: any = await apiGet(CM1300INSERTSEQ2, {
          aptCode: mainSelected.aptCode,
          areaCode: mainSelected.areaCode,
        });

        if (res && res[0]?.tempAptCode) {
          reset({
            ...emptyObj,
            areaCode: mainSelected.areaCode,
            cuCode: res[0]?.tempAptCode,
            cuCode1: res[0]?.tempAptCode?.split("-")[0],
            cuCode2: res[0]?.tempAptCode?.split("-")[1],
          });
        }
      }
    }
    if (type === "reset") {
      if (selected && Object.keys(selected)?.length > 0) {
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

    const res = await apiPost(path, formValues, "저장이 성공하였습니다");

    if (res) {
      const par = {
        areaCode: mainSelected.areaCode,
        aptCode: mainSelected.aptCode,
      };
      if (isAddBtnClicked) {
        await fetchData(par, "last");
      } else {
        await fetchData(par);
      }
    }
  };

  return (
    <>
      {showDeleteModal()}
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", flexGrow: 1 }}>
          <PersonInfoText text="사용자" style={{ margin: "7px 10px" }} />
          <Grid
            areaCode={ownAreaCode}
            data={userData}
            setSelected={setSelected}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={rowIndex}
            style={{ height: `408px`, borderLeft: "none" }}
            gridNumber={1}
          />
        </div>

        <div style={{ width: "1px", background: "#00000033" }}></div>

        <div style={{ margin: "7px 10px 7px 7px" }}>
          <SearchWrapper
            style={{
              background: "transparent",
              borderBottom: "none",
              padding: "0",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <div className="buttons" style={{ gap: "5px" }}>
              <Button
                text="등록"
                icon={<Plus />}
                type="button"
                onClick={onClickAdd}
                ref={btnRef1}
                disabled={mainIsAddBtnClicked}
              />
              <Button
                text="삭제"
                icon={<Trash />}
                type="button"
                onClick={onClickDelete}
                disabled={isAddBtnClicked || mainIsAddBtnClicked}
                ref={btnRef2}
              />
              <Button
                text="저장"
                icon={<Update />}
                type="button"
                color={ButtonColor.SECONDARY}
                onClick={onClickUpdate}
                disabled={mainIsAddBtnClicked}
                ref={btnRef3}
              />
              <Button
                text="취소"
                icon={<Reset />}
                type="button"
                onClick={onClickReset}
                disabled={mainIsAddBtnClicked}
                ref={btnRef4}
              />
            </div>
          </SearchWrapper>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">
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
