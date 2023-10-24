import React from "react";
import Draggable from "react-draggable";
import Form from "container/contents/ar/ar1100/tabs/tab4/AR1100BpSaleModal";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "921px",
};

function AR1100BpSaleModal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <Form setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default AR1100BpSaleModal;
