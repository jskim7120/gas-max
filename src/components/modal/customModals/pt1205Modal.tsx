import React from "react";
import PT1205 from "container/contents/pt/pt1205";
import Draggable from "react-draggable";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "1450px",
  height: "610px",
};

function PT1205Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <PT1205 setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default PT1205Modal;
