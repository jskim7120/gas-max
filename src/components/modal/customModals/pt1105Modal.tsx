import React from "react";
import styled from "styled-components";
import FormIP1105 from "container/contents/pt/pt1105";
const ModalWrapper = styled.div`
  width: 800px;
  height: 610px;
  height: auto;
  background: #fff;
`;

function PT1105Modal() {
  return (
    <ModalWrapper>
      <FormIP1105 />
    </ModalWrapper>
  );
}

export default PT1105Modal;
