import React from "react";
import styled from "styled-components";
import FormCM1105 from "container/contents/cm1105/form";
const ModalWrapper = styled.div`
  width: 80vw;
  min-height: 80vh;
  height: auto;
  background: #fff;
`;

function CM1105Modal() {
  return (
    <ModalWrapper>
      <FormCM1105 />
    </ModalWrapper>
  );
}

export default CM1105Modal;
