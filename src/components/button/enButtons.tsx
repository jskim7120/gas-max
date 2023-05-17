import React, { MutableRefObject, useEffect, useRef } from "react";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";

function ENButtons({
  menuId,
  formRef,
  dispatch,
  isAddBtnClicked,
  setIsAddBtnClicked,
  isCancelBtnDisabled,
  setIsCancelBtnDisabled,
}: {
  menuId: string;
  formRef: any;
  dispatch: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  isCancelBtnDisabled: boolean;
  setIsCancelBtnDisabled: Function;
}) {
  const btnRef1 = useRef() as MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as MutableRefObject<HTMLButtonElement>;

  return (
    <div className="buttons">
      <Button
        text="등록"
        icon={<Plus />}
        style={{ marginRight: "5px" }}
        onClick={() => {
          btnRef1.current.classList.add("active");
          btnRef4.current.classList.remove("active");
          setIsAddBtnClicked(true);
          // setIsCancelBtnDisabled(false);
          formRef.current.resetForm("clear");
          formRef.current?.setImage64 && formRef.current?.setImage64("");
        }}
        ref={btnRef1}
      />
      <Button
        text="삭제"
        icon={<Trash />}
        style={{ marginRight: "5px" }}
        onClick={() => {
          dispatch(openModal({ type: "delModal" }));
          dispatch(addDeleteMenuId({ menuId: menuId }));
        }}
        disabled={isAddBtnClicked}
        ref={btnRef2}
      />
      <Button
        text="저장"
        icon={<Update />}
        style={{ marginRight: "5px" }}
        color={ButtonColor.SECONDARY}
        onClick={() => {
          formRef.current.crud(null);
        }}
        ref={btnRef3}
      />
      <Button
        text="취소"
        icon={<Reset />}
        onClick={() => {
          btnRef1.current.classList.remove("active");
          btnRef4.current.classList.add("active");
          setIsAddBtnClicked(false);
          formRef.current.resetForm("reset");
        }}
        ref={btnRef4}
      />
    </div>
  );
}

export default ENButtons;
