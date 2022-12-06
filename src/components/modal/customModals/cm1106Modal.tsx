import React from "react";
import styled from "styled-components";
import FormCM1106 from "container/contents/cm/cm1106";
const ModalWrapper = styled.div`
  width: 1200px;
  height: 610px;
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
