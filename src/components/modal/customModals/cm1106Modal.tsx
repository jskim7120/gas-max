import React from "react";
import Draggable from "react-draggable";
import FormCM1106 from "container/contents/cm/cm1106";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1200px",
  height: "610px",
};

function CM1106Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <FormCM1106 setIsModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default CM1106Modal;
