import React from "react";
import styled from "styled-components";
import { useDispatch } from "app/store";
import {
  closeModal,
  setIsDelete,
  addDeleteMenuId,
} from "app/state/modal/modalSlice";
import Draggable from "components/modal/draggable";
import { WhiteClose } from "components/allSvgIcon";

const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 300px;
  height: 150px;
  border: 2px solid #ccc;
  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);

  .modal_header {
    width: 100%;
    height: 25px;
    background: #0b97f6;
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

function DelModal() {
  const dispatch = useDispatch();

  return (
    <Draggable>
      <Container>
        <div className="modal_header">
          <span
            style={{
              marginRight: "4px",
              marginTop: "2px",
            }}
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
        </div>
        <div className="modal_title">삭제하시겠습니까?</div>

        <div className="btn_cnt">
          <button
            onClick={() => {
              dispatch(setIsDelete({ isDelete: true }));
              dispatch(closeModal());
            }}
            className="modal_btn del"
          >
            삭제
          </button>
          <button
            onClick={() => {
              dispatch(setIsDelete({ isDelete: false }));
              dispatch(addDeleteMenuId({ menuId: "" }));
              dispatch(closeModal());
            }}
            className="modal_btn close"
          >
            취소
          </button>
        </div>
      </Container>
    </Draggable>
  );
}

export default DelModal;
