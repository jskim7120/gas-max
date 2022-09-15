import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "realgrid/dist/realgrid-style.css";
import Main from "container/Layout/Main";
import Layout from "container/Layout/AppLayout";

import "./App.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
