import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "realgrid/dist/realgrid-style.css";
import "style/font.css";
import "style/App.css";

import Main from "container/mainLayout/main";
import AuthenticationLayout from "container/mainLayout/authenticationLayout";
import Login from "container/login";
import Layout from "container/mainLayout/appLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Route>
        <Route path="/" element={<AuthenticationLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
