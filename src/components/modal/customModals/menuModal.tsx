import React from "react";
import { useDispatch } from "app/store";
import { closeModal } from "features/modal/modalSlice";
import styled from "styled-components";
import { User, MenuModalBtn } from "components/allSvgIcon";

const ModalWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 301px;
  background: #ececec;
  display: flex;
  flex-direction: column;
  padding: 2px;
  padding-top: 29px;

  .closeBtn {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f80d0d;
    top: 5.5px;
    right: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
  div:nth-child(2) {
    height: 57px;
  }

  .section {
    position: relative;
    border-radius: 11px;
    background: #50becf;
    border-radius: 11px;
    margin-bottom: 4px;
    padding: 10px 5px;
    width: 50px;
    height: 162px;

    p {
      writing-mode: vertical-lr;
      text-orientation: mixed;
      color: #fff;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      line-height: 25px;
      margin: auto 0;
      height: 100%;
    }

    span {
      color: #000;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 34px;
      height: 100%;
      border-radius: 16px;
      border: 1px solid #707070;
      padding: 10px 5px;
      width: 263px;
    }
  }
`;

function MenuModal() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper>
      <button className="closeBtn" onClick={() => dispatch(closeModal())}>
        <MenuModalBtn />
      </button>
      <div className="section">
        <p>정보</p>
        <span>.....</span>
      </div>
      <div className="section">
        <p>거래이력</p>
        <span>.....</span>
      </div>
      <div className="section">
        <p>매출</p>
        <span>.....</span>
      </div>
    </ModalWrapper>
  );
}

export default MenuModal;
