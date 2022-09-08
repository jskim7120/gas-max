import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "features/employee/employeeSlice";
import menuReducer from "features/menu/menuSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    menu: menuReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
