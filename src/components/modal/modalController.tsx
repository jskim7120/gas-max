import React, { Suspense } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "app/store";
import { closeModal } from "features/modal/modalSlice";
import CustomerModal from "./customModals/customerModal";
import MenuModal from "./customModals/menuModal";
import InfoModal from "./customModals/infoModal";
import AccountModal from "./customModals/accountModal";

const PopupArea = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const PopupBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.2;
`;

const PopupContiner = styled.div<{ type: string }>`
  z-index: 1;
  position: fixed;

  ${(props) =>
    props.type === "customerModal" &&
    `
      top: 50%;
      left: 50%;  
      transform: translate(-50%, -50%);    
    `}

  ${(props) =>
    props.type === "menuModal" &&
    `
      bottom: 80px;
      right: 0;
      `}

  ${(props) =>
    props.type === "infoModal" &&
    `
      top: 77px;
      right: 0;
    `}

  ${(props) =>
    props.type === "accountModal" &&
    `
      top: 77px;
      right: 0;
    `}
`;

function Popup() {
  const dispatch = useDispatch();
  const { modalIsOpen, type } = useSelector((state) => state.modal);

  if (modalIsOpen)
    return (
      <PopupArea>
        <PopupBack onClick={() => dispatch(closeModal())} />
        <PopupContiner type={type}>
          <Suspense fallback={<div>...loading</div>}>
            {type === "customerModal" && <CustomerModal />}
            {type === "menuModal" && <MenuModal />}
            {type === "accountModal" && <AccountModal />}
            {type === "infoModal" && <InfoModal />}
          </Suspense>
        </PopupContiner>
      </PopupArea>
    );
  else return <></>;
}

export default Popup;
