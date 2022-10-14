import React from "react";
import Form from "./form";
import AuthenticationLayout from "container/mainLayout/authenticationLayout";

function Login() {
  return (
    <AuthenticationLayout>
      <div style={{ width: "100%", padding: "0 23px", textAlign: "center" }}>
        <Form />
      </div>
    </AuthenticationLayout>
  );
}

export default Login;
