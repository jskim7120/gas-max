import React from "react";
import styled from "styled-components";
import JoaImg from "assets/image/JOA.png";
import { useDispatch } from "app/store";
import { logout } from "features/auth/authSlice";

const ModalWrapper = styled.div`
  width: 165px;
  height: 208px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: SegoeUI;
  font-size: 12px;
  color: #0057aa;
`;

function AccountModal() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper>
      <img src={JoaImg} />
      <label>조아테크1</label>
      <label>jskim7120@daum.net</label>
      <button
        onClick={() => {
          dispatch(logout());
          window.location.assign("/login");
        }}
      >
        로그아웃
      </button>
    </ModalWrapper>
  );
}

export default AccountModal;
