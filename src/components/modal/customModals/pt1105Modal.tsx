import React from "react";
import PT1105 from "container/contents/pt/pt1105";
import Draggable from "react-draggable";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1000px",
  height: "610px",
};

function PT1105Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <PT1105 setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default PT1105Modal;
