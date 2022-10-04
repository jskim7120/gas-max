import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "realgrid/dist/realgrid-style.css";
import "style/font.css";
import "style/App.css";
import Main from "container/Layout/Main";
import Layout from "container/Layout/AppLayout";
import AuthenticationLayout from "container/Layout/AuthenticationLayout";
import Login from "container/login";

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
