import React, { Suspense } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "app/store";
import { closeModal } from "app/state/modal/modalSlice";
import CustomerModal from "./customModals/customerModal";
import MenuModal from "./customModals/menuModal";
import InfoModal from "./customModals/infoModal";
import CM1105Modal from "./customModals/cm1105Modal";
import CM1106Modal from "./customModals/cm1106Modal";
import GR1200Modal from "./customModals/gr1200Modal";
import GR1300Modal from "./customModals/gr1300Modal";
import AccountModal from "./customModals/accountModal";
import DelModal from "./customModals/delModal";
import CC1100Modal from "./customModals/cc1100Modal";

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
    (props.type === "customerModal" ||
      props.type === "cm1105Modal" ||
      props.type === "cm1106Modal" ||
      props.type === "gr1200Modal" ||
      props.type === "cc1100Modal" ||
      props.type === "gr1300Modal") &&
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

  const modalClose = () => {
    if (type !== "customerModal" && type !== "delModal") {
      dispatch(closeModal());
    }
  };

  if (modalIsOpen)
    return (
      <PopupArea>
        <PopupBack onClick={modalClose} />
        <PopupContiner type={type}>
          <Suspense fallback={<div>...loading</div>}>
            {type === "customerModal" && <CustomerModal />}
            {type === "menuModal" && <MenuModal />}
            {type === "accountModal" && <AccountModal />}
            {type === "infoModal" && <InfoModal />}
            {type === "cm1105Modal" && <CM1105Modal />}
            {type === "cm1106Modal" && <CM1106Modal />}
            {type === "gr1200Modal" && <GR1200Modal />}
            {type === "gr1300Modal" && <GR1300Modal />}
            {type === "delModal" && <DelModal />}
            {type === "cc1100Modal" && <CC1100Modal />}
          </Suspense>
        </PopupContiner>
      </PopupArea>
    );
  else return <></>;
}

export default Popup;
