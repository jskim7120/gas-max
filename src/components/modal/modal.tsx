import React, { MouseEventHandler, Suspense } from "react";
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
import AR1100BpSaleModal from "./customModals/ar1100BpSaleModal";
import AR1100BupumModal from "./customModals/ar1100BupumModal";
import AR1100AsModal from "./customModals/ar1100AsModal";
import AR1100Sukum01Modal from "./customModals/ar1100Sukum01Modal";
import AR1100Sukum02Modal from "./customModals/ar1100Sukum02Modal";

const PopupArea = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const PopupBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const PopupContainer = styled.div<{ type: string }>`
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
      props.type === "reLoginModal" ||
      props.type === "ar1100BpSaleModal" ||
      props.type === "ar1100BupumModal" ||
      props.type === "ar1100AsModal" ||
      props.type === "ar1100Sukum01Modal" ||
      props.type === "ar1100Sukum02Modal" ||
      props.type === "delModal") &&
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
      top: 34px;
      right: 0;
    `}
`;

function Popup({
  isOpen,
  setIsOpen,
  type,
  onClose,
  params,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  type: string;
  onClose?: MouseEventHandler;
  params?: any;
}) {
  const modalClose = () => {
    if (
      type !== "customerModal" &&
      type !== "delModal" &&
      type !== "cm1105Modal"
    ) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <PopupArea>
      <PopupBack onClick={modalClose} />
      <PopupContainer type={type}>
        <Suspense fallback={<div>...loading</div>}>
          {type === "menuModal" && <MenuModal />}
          {type === "accountModal" && <AccountModal />}
          {type === "infoModal" && <InfoModal />}
          {type === "customerModal" && (
            // <CustomerModal
            //   setIsOpen={setIsOpen}
            //   onClose={onClose ? onClose : () => console.log("modal")}
            // />
            <CustomerModal setIsOpen={setIsOpen} />
          )}
          {type === "delModal" && <DelModal setIsOpen={setIsOpen} />}
          {type === "reLoginModal" && <ReLoginModal setIsOpen={setIsOpen} />}
          {type === "cm1105Modal" && <CM1105Modal setIsOpen={setIsOpen} />}
          {type === "cm1106Modal" && <CM1106Modal setIsOpen={setIsOpen} />}
          {type === "gr1200Modal" && <GR1200Modal setIsOpen={setIsOpen} />}
          {type === "gr1300Modal" && <GR1300Modal setIsOpen={setIsOpen} />}
          {type === "cc1100Modal" && <CC1100Modal setIsOpen={setIsOpen} />}
          {type === "cc1200Modal" && <CC1200Modal setIsOpen={setIsOpen} />}
          {type === "pt1105Modal" && <PT1105Modal setIsOpen={setIsOpen} />}
          {type === "pt1205Modal" && <PT1205Modal setIsOpen={setIsOpen} />}
          {type === "en1500Modal" && <EN1500Modal setIsOpen={setIsOpen} />}
          {type === "ar1100BpSaleModal" && (
            <AR1100BpSaleModal setIsOpen={setIsOpen} />
          )}
          {type === "ar1100BupumModal" && (
            <AR1100BupumModal setIsOpen={setIsOpen} />
          )}

          {type === "ar1100AsModal" && (
            <AR1100AsModal
              setIsOpen={setIsOpen}
              params={params ? params : {}}
            />
          )}
          {type === "ar1100Sukum01Modal" && (
            <AR1100Sukum01Modal
              setIsOpen={setIsOpen}
              params={params ? params : {}}
            />
          )}
          {type === "ar1100Sukum02Modal" && (
            <AR1100Sukum02Modal
              setIsOpen={setIsOpen}
              params={params ? params : {}}
            />
          )}
        </Suspense>
      </PopupContainer>
    </PopupArea>
  );
}

export default Popup;
