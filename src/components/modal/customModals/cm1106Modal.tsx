import React from "react";
import styled from "styled-components";
import FormCM1106 from "container/contents/cm1106";
const ModalWrapper = styled.div`
  width: 80vw;
  min-height: 80vh;
  height: auto;
  background: #fff;
`;

function CM1106Modal() {
  return (
    <ModalWrapper>
      <FormCM1106 />
    </ModalWrapper>
  );
}

export default CM1106Modal;
