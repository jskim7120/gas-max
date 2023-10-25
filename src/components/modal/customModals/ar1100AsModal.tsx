import React from "react";
import Draggable from "react-draggable";
import Form from "container/contents/ar/ar1100/tabs/tab5/AR1100AsModal";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1150px",
};

function AR1100AsModal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <Form setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default AR1100AsModal;
