import React from "react";
import Draggable from "react-draggable";
import FormCM1105 from "container/contents/cm/cm1105/form";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1200px",
};

function CM1105Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <FormCM1105 setIsModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default CM1105Modal;
