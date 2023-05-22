import React from "react";
import Form from "./form2";
import AuthenticationLayout from "container/mainLayout/authenticationLayout";

function ReLogin() {
  return (
    <AuthenticationLayout>
      <div style={{ width: "100%", padding: "0 23px", textAlign: "center" }}>
        <Form />
      </div>
    </AuthenticationLayout>
  );
}

export default ReLogin;
