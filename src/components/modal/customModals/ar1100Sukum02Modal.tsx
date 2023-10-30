import React from "react";
import Draggable from "react-draggable";
import Form from "container/contents/ar/ar1100/tabs/tab6/modal2/AR1100Sukum02Modal";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1150px",
};

function ar1100Sukum02Modal({
  setIsOpen,
  params,
}: {
  setIsOpen: Function;
  params: any;
}) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <Form setModalOpen={setIsOpen} params={params} />
      </ModalWrapper>
    </Draggable>
  );
}

export default ar1100Sukum02Modal;
