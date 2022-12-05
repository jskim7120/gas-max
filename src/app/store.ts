import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "app/state/menu/menuSlice";
import tabReducer from "app/state/tab/tabSlice";
import modalReducer from "app/state/modal/modalSlice";
import footerReducer from "app/state/modal/footerSlice";
import sidebarReducer from "app/state/sidebar/sidebarSlice";
import authReducer from "app/state/auth/authSlice";
import { commonGubunApi } from "app/api/commonGubun";
import { authApi } from "app/api/auth";
import { commonDictionaryApi } from "app/api/commonDictionary";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    tab: tabReducer,
    modal: modalReducer,
    footer: footerReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [commonGubunApi.reducerPath]: commonGubunApi.reducer,
    [commonDictionaryApi.reducerPath]: commonDictionaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(commonGubunApi.middleware)
      .concat(commonDictionaryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
