import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import ReLoginForm from "container/login/form2";
import AuthenticationLayout from "container/mainLayout/authenticationLayout";

const ModalWrapper = styled.div`
  width: auto;
  height: auto;
  background: #fff;

  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function ReLoginModal() {
  return (
    <Draggable handle=".handle">
      <ModalWrapper>
        <AuthenticationLayout>
          <ReLoginForm />
        </AuthenticationLayout>
      </ModalWrapper>
    </Draggable>
  );
}

export default ReLoginModal;
