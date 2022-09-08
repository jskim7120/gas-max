import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "app/store";
import "./index.css";
import { getEmployees } from "features/employee/employeeSlice";
import { getMenu } from "features/menu/menuSlice";

store.dispatch(getEmployees());
store.dispatch(getMenu());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
