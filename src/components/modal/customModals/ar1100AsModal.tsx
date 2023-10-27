import React from "react";
import Draggable from "react-draggable";
import Form from "container/contents/ar/ar1100/tabs/tab5/AR1100AsModal";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1150px",
};

function AR1100AsModal({
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

export default AR1100AsModal;
