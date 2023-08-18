import React from "react";
import Form from "container/contents/gr/gr1300/tabs/modalForm";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "254px",
  height: "387px",
};

function GR1300Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <ModalWrapper style={{ ...customStyle }}>
      <Form setModalOpen={setIsOpen} />
    </ModalWrapper>
  );
}

export default GR1300Modal;
