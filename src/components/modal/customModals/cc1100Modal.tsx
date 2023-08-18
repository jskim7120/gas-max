import React from "react";
import Form from "container/contents/cc/cc1100/modalForm";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "305px",
};

function CC1100Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <ModalWrapper style={{ ...customStyle }}>
      <Form setModalOpen={setIsOpen} />
    </ModalWrapper>
  );
}

export default CC1100Modal;
