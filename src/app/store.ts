import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "app/state/menu/menuSlice";
import tabReducer from "app/state/tab/tabSlice";
import modalReducer from "app/state/modal/modalSlice";
import sidebarReducer from "app/state/sidebar/sidebarSlice";
import authReducer from "app/state/auth/authSlice";
import { commonGubunApi } from "app/api/commonGubun";

import { authApi } from "app/api/auth";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    tab: tabReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [commonGubunApi.reducerPath]: commonGubunApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(commonGubunApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
