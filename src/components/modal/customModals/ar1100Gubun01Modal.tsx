import React from "react";
import Draggable from "react-draggable";
import Form from "container/contents/ar/ar1100/tabs/tab6/modal1/AR1100Gubun01Modal";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1150px",
};

function ar1100Gubun01Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <Form setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default ar1100Gubun01Modal;
