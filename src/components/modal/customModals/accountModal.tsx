import React from "react";
import styled from "styled-components";
import JoaImg from "assets/image/JOA.png";
import { useDispatch, useSelector } from "app/store";
import { logout } from "app/state/auth/authSlice";

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

  .logoutBtn {
    margin-top: 15px;
  }
`;

function AccountModal() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <ModalWrapper>
      <img src={JoaImg} />
      <label>{auth?.loginCo}</label>
      <label>{auth?.email}</label>
      <button
        className="logoutBtn"
        onClick={() => {
          dispatch(logout());
          window.location.assign("/");
        }}
      >
        로그아웃
      </button>
    </ModalWrapper>
  );
}

export default AccountModal;
