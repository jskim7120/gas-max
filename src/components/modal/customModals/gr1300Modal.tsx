import React from "react";
import styled from "styled-components";
import Form from "container/contents/gr/gr1300/tabs/modalForm";
const ModalWrapper = styled.div`
  width: 254px;
  height: 387px;
  background: #fff;
`;

function GR1300Modal() {
  return (
    <ModalWrapper>
      <Form />
    </ModalWrapper>
  );
}

export default GR1300Modal;
