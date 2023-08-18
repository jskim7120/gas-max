import React from "react";
import { ModalWrapper } from "./style";
import Form from "container/contents/cc/cc1200/modalForm";

const customStyle = {
  width: "305px",
};
function CC1200Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <ModalWrapper style={{ ...customStyle }}>
      <Form setModalOpen={setIsOpen} />
    </ModalWrapper>
  );
}

export default CC1200Modal;
