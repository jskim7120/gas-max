import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "app/store";
import {
  openModal,
  closeModal,
  deleteAction,
} from "app/state/modal/modalSlice";

const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 300px;
  height: 150px;
  .modal_title {
    font-size: 17px;
    font-weight: 400;
    text-align: center;
    margin-top: 24px;
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
      border-radius: 5px;
      &.del {
        background: #ff4d4d;
        color: #fff;
        &:hover {
          cursor: pointer;
          background: #ff3333;
        }
      }
      &.close {
        background: #f2f2f2;
        &:hover {
          cursor: pointer;
          background: #e6e6e6;
        }
      }
    }
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "315px",
    height: "175px",
  },
};

function DelModal() {
  const dispatch = useDispatch();
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  return (
    <Container>
      <div className="modal_title">정말 삭제하시겠습니까?</div>
      <div className="btn_cnt">
        <button
          onClick={() => {
            dispatch(deleteAction({ isDelete: true }));
            // dispatch(closeModal());
          }}
          className="modal_btn del"
        >
          삭제
        </button>
        <button
          onClick={() => {
            dispatch(deleteAction({ isDelete: false }));
            dispatch(closeModal());
          }}
          className="modal_btn close"
        >
          취소
        </button>
      </div>
    </Container>
  );
}

export default DelModal;
