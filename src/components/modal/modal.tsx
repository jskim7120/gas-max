import React, { Suspense } from "react";
import styled from "styled-components";
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
import CC1200Modal from "./customModals/cc1200Modal";
import EN1500Modal from "./customModals/en1500Modal";
import PT1105Modal from "./customModals/pt1105Modal";
import PT1205Modal from "./customModals/pt1205Modal";
import ReLoginModal from "./customModals/reLoginModal";
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
      props.type === "gr1300Modal" ||
      props.type === "en1500Modal" ||
      props.type === "pt1105Modal" ||
      props.type === "pt1205Modal" ||
      props.type === "cc1200Modal" ||
      props.type === "reLoginModal") &&
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

function Popup({
  isOpen,
  setIsOpen,
  type,
  onClose,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  type: string;
  onClose?: any;
}) {
  const modalClose = () => {
    if (type !== "customerModal" && type !== "delModal") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <PopupArea>
      <PopupBack onClick={modalClose} />
      <PopupContiner type={type}>
        <Suspense fallback={<div>...loading</div>}>
          {type === "customerModal" && (
            <CustomerModal
              setIsOpen={setIsOpen}
              onClose={onClose ? onClose : () => console.log("modal")}
            />
          )}
          {type === "menuModal" && <MenuModal />}
          {type === "accountModal" && <AccountModal />}
          {type === "infoModal" && <InfoModal />}
          {type === "cm1105Modal" && <CM1105Modal setIsOpen={setIsOpen} />}
          {type === "cm1106Modal" && <CM1106Modal />}
          {type === "gr1200Modal" && <GR1200Modal />}
          {type === "gr1300Modal" && <GR1300Modal />}
          {type === "delModal" && <DelModal />}
          {type === "cc1100Modal" && <CC1100Modal />}
          {type === "cc1200Modal" && <CC1200Modal />}
          {type === "en1500Modal" && <EN1500Modal />}
          {type === "pt1105Modal" && <PT1105Modal />}
          {type === "pt1205Modal" && <PT1205Modal />}
          {type === "reLoginModal" && <ReLoginModal />}
        </Suspense>
      </PopupContiner>
    </PopupArea>
  );
}

export default Popup;
