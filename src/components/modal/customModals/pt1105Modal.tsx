import React from "react";
import styled from "styled-components";
import PT1105 from "container/contents/pt/pt1105";
import Draggable from "react-draggable";

const ModalWrapper = styled.div`
  width: 1000px;
  height: 610px;
  height: auto;
  background: #fff;

  border: 2px solid #ccc;
  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function PT1105Modal() {
  return (
    <Draggable handle=".handle">
      <ModalWrapper>
        <PT1105 />
      </ModalWrapper>
    </Draggable>
  );
}

export default PT1105Modal;
