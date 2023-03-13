import React from "react";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";

function FourButtons({
  onClickAdd,
  onClickDelete,
  onClickUpdate,
  onClickReset,
  isAddBtnClicked,
  isCancelBtnDisabled,
}: {
  onClickAdd: any;
  onClickDelete: any;
  onClickUpdate: any;
  onClickReset: any;
  isAddBtnClicked: any;
  isCancelBtnDisabled: any;
}) {
  return (
    <div className="buttons">
      <Button
        text="등록"
        icon={<Plus />}
        style={{ marginRight: "5px" }}
        onClick={onClickAdd}
      />
      <Button
        text="삭제"
        icon={<Trash />}
        style={{ marginRight: "5px" }}
        onClick={onClickDelete}
        disabled={isAddBtnClicked}
      />
      <Button
        text="저장"
        icon={<Update />}
        style={{ marginRight: "5px" }}
        color={ButtonColor.SECONDARY}
        onClick={onClickUpdate}
      />
      <Button
        text="취소"
        icon={<Reset />}
        onClick={onClickReset}
        disabled={isCancelBtnDisabled}
      />
    </div>
  );
}

export default FourButtons;
