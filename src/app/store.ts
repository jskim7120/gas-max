import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "features/employee/employeeSlice";
import menuReducer from "features/menu/menuSlice";
import favoriteReducer from "features/favorite/favoriteSlice";
import tabReducer from "features/tab/tabSlice";
import modalReducer from "features/modal/modalSlice";
import cookiesReducer from "features/cookies/cookiesSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    menu: menuReducer,
    favMenu: favoriteReducer,
    tab: tabReducer,
    modal: modalReducer,
    cookies: cookiesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
