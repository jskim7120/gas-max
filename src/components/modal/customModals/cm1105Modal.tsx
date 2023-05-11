import React from "react";
import styled from "styled-components";
import Draggable from "components/modal/draggable";
import FormCM1105 from "container/contents/cm/cm1105/form";
const ModalWrapper = styled.div`
  width: 1200px;
  height: auto;
  background: #fff;

  border: 2px solid #ccc;
  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function CM1105Modal() {
  return (
    <Draggable>
      <ModalWrapper>
        <FormCM1105 />
      </ModalWrapper>
    </Draggable>
  );
}

export default CM1105Modal;
