import React from "react";
import styled from "styled-components";
import PT1205 from "container/contents/pt/pt1205";
import Draggable from "react-draggable";

const ModalWrapper = styled.div`
  width: 1450px;
  height: 810px;
  height: auto;
  align-items: center;
  background: #fff;

  border: 2px solid #ccc;
  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function PT1205Modal() {
  return (
    <Draggable handle=".handle">
      <ModalWrapper>
        <PT1205 />
      </ModalWrapper>
    </Draggable>
  );
}

export default PT1205Modal;
