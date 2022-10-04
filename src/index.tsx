import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "app/store";
import { getEmployees } from "features/employee/employeeSlice";
import { getMenu } from "features/menu/menuSlice";
import { getFavMenu } from "features/favorite/favoriteSlice";
import Modal from "components/modal/modalController";

store.dispatch(getEmployees());
store.dispatch(getMenu());
store.dispatch(getFavMenu());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Modal />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
