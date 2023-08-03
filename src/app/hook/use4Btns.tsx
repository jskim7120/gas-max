import { useRef, MouseEventHandler, useState } from "react";
import { Update, Plus, Trash, Reset } from "components/allSvgIcon";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";

function use4Btns() {
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const addBtnClick = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
  };

  const addBtnUnclick = () => {
    btnRef1.current.classList.remove("active");
    setIsAddBtnClicked(false);
  };

  const show4Btns = ({
    handleClickAdd,
    handleClickDelete,
    handleClickUpdate,
    handleClickReset,
  }: {
    handleClickAdd: MouseEventHandler;
    handleClickDelete: MouseEventHandler;
    handleClickUpdate: MouseEventHandler;
    handleClickReset: MouseEventHandler;
  }) => {
    return (
      <>
        <Button
          text="등록"
          icon={<Plus />}
          type="button"
          onClick={(e: any) => {
            addBtnClick();
            handleClickAdd(e);
          }}
          ref={btnRef1}
        />
        <Button
          text="삭제"
          icon={<Trash />}
          type="button"
          onClick={handleClickDelete}
          disabled={isAddBtnClicked}
          ref={btnRef2}
        />
        <Button
          text="저장"
          icon={<Update />}
          type="button"
          color={ButtonColor.SECONDARY}
          onClick={handleClickUpdate}
          ref={btnRef3}
        />
        <Button
          text="취소"
          icon={<Reset />}
          type="button"
          onClick={(e) => {
            addBtnUnclick();
            handleClickReset(e);
          }}
          ref={btnRef4}
        />
      </>
    );
  };

  return {
    show4Btns,
    addBtnClick,
    addBtnUnclick,
    isAddBtnClicked,
    setIsAddBtnClicked,
  };
}

export default use4Btns;
