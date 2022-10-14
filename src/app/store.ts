import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "features/employee/employeeSlice";
import menuReducer from "features/menu/menuSlice";
import favoriteReducer from "features/favorite/favoriteSlice";
import tabReducer from "features/tab/tabSlice";
import modalReducer from "features/modal/modalSlice";
import sidebarReducer from "features/sidebar/sidebarSlice";
import authReducer from "features/auth/authSlice";

import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    menu: menuReducer,
    favMenu: favoriteReducer,
    tab: tabReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
