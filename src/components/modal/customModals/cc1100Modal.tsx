import React from "react";
import styled from "styled-components";
import Form from "container/contents/cc/cc1100/modalForm";
const ModalWrapper = styled.div`
  width: 305px;
  background: #fff;
`;

function CC1100Modal() {
  return (
    <ModalWrapper>
      <Form />
    </ModalWrapper>
  );
}

export default CC1100Modal;
