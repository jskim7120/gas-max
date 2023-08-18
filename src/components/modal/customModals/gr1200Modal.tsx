import React from "react";
import Form from "container/contents/gr/gr1200/tabs/modalForm";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "254px",
  height: "387px",
};

function GR1200Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <ModalWrapper style={{ ...customStyle }}>
      <Form setModalOpen={setIsOpen} />
    </ModalWrapper>
  );
}

export default GR1200Modal;
