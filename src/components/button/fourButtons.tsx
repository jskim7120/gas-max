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
  btn1Name,
  btn2Name,
  btn3Name,
  btn4Name,
}: {
  onClickAdd: any;
  onClickDelete: any;
  onClickUpdate: any;
  onClickReset: any;
  isAddBtnClicked: any;
  isCancelBtnDisabled: any;
  btn1Name?: string;
  btn2Name?: string;
  btn3Name?: string;
  btn4Name?: string;
}) {
  return (
    <div className="buttons">
      <Button
        text={btn1Name ? btn1Name : "등록"}
        icon={<Plus />}
        style={{ marginRight: "5px" }}
        onClick={onClickAdd}
      />
      <Button
        text={btn2Name ? btn2Name : "삭제"}
        icon={<Trash />}
        style={{ marginRight: "5px" }}
        onClick={onClickDelete}
        disabled={isAddBtnClicked}
      />
      <Button
        text={btn3Name ? btn3Name : "저장"}
        icon={<Update />}
        style={{ marginRight: "5px" }}
        color={ButtonColor.SECONDARY}
        onClick={onClickUpdate}
      />
      <Button
        text={btn4Name ? btn4Name : "취소"}
        icon={<Reset />}
        onClick={onClickReset}
        disabled={isCancelBtnDisabled}
      />
    </div>
  );
}

export default FourButtons;
