import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import FormCM1106 from "container/contents/cm/cm1106";
const ModalWrapper = styled.div`
  width: 1200px;
  height: 610px;
  height: auto;
  background: #fff;

  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function CM1106Modal() {
  return (
    <Draggable handle=".handle">
      <ModalWrapper>
        <FormCM1106 />
      </ModalWrapper>
    </Draggable>
  );
}

export default CM1106Modal;
