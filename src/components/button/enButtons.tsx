import React from "react";
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
  return (
    <div className="buttons">
      <Button
        text="등록"
        icon={<Plus />}
        style={{ marginRight: "5px" }}
        onClick={() => {
          setIsAddBtnClicked(true);
          setIsCancelBtnDisabled(false);
          formRef.current.resetForm("clear");
          formRef.current?.setImage64 && formRef.current?.setImage64("");
        }}
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
      />
      <Button
        text="저장"
        icon={<Update />}
        style={{ marginRight: "5px" }}
        color={ButtonColor.SECONDARY}
        onClick={() => {
          formRef.current.crud(null);
        }}
      />
      <Button
        text="취소"
        icon={<Reset />}
        onClick={() => {
          setIsAddBtnClicked(false);
          formRef.current.resetForm("reset");
        }}
        disabled={isCancelBtnDisabled}
      />
    </div>
  );
}

export default ENButtons;
