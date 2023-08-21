import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "app/store";
import { setIsDelete, addDeleteMenuId } from "app/state/modal/modalSlice";
import Draggable from "react-draggable";
import { WhiteClose } from "components/allSvgIcon";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "300px",
  height: "150px",
};

const Container = styled.div`
  .custom_header {
    display: flex;
    justify-content: flex-end;
  }

  .modal_title {
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    margin-top: 20px;
  }

  .btn_cnt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 35px auto 0;
    width: 90%;

    .modal_btn {
      width: 128px;
      height: 32px;
      display: inline-block;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;

      &.del {
        background: rgba(22, 119, 255, 1);
        color: #fff;
        border: 1px solid #1677ff;
        &:hover {
          background: rgba(22, 119, 255, 0.9);
        }
      }

      &.close {
        background: #e6e6e6;
        color: #333;
        border: 1px solid #ccc;
        &:hover {
          background: #f2f2f2;
        }
      }
    }
  }
`;

function DelModal({ setIsOpen }: { setIsOpen: Function }) {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === "F4") {
        event.preventDefault();
        handleClickDel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClickDel = () => {
    dispatch(setIsDelete({ isDelete: true }));
    setIsOpen(false);
  };

  const handleClickClose = () => {
    dispatch(addDeleteMenuId({ menuId: "" }));
    setIsOpen(false);
  };

  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <Container>
          <div className="handle modal_header custom_header h20">
            <span
              className="close_btn"
              style={{
                marginRight: "4px",
                marginTop: "2px",
              }}
              onClick={handleClickClose}
            >
              <WhiteClose />
            </span>
          </div>
          <div className="modal_title">삭제하시겠습니까?</div>

          <div className="btn_cnt">
            <button onClick={handleClickDel} className="modal_btn del">
              삭제
            </button>
            <button onClick={handleClickClose} className="modal_btn close">
              취소
            </button>
          </div>
        </Container>
      </ModalWrapper>
    </Draggable>
  );
}

export default DelModal;
