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
  style,
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
  style?: any;
}) {
  return (
    <div className="buttons ml30" style={style}>
      <Button
        text={btn1Name ? btn1Name : "등록"}
        icon={<Plus />}
        type="button"
        onClick={onClickAdd}
      />
      <Button
        text={btn2Name ? btn2Name : "삭제"}
        icon={<Trash />}
        type="button"
        onClick={onClickDelete}
        disabled={isAddBtnClicked}
      />
      <Button
        text={btn3Name ? btn3Name : "저장"}
        icon={<Update />}
        type="button"
        color={ButtonColor.SECONDARY}
        onClick={onClickUpdate}
      />
      <Button
        text={btn4Name ? btn4Name : "취소"}
        icon={<Reset />}
        type="button"
        onClick={onClickReset}
      />
    </div>
  );
}

export default FourButtons;
