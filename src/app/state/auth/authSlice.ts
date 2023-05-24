import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "app/axios";

export interface initialStateType {
  token: string | null;
  areaCode: string;
  username: string;
  loginCo: string;
  email: string;
}

const initialState: initialStateType = {
  token: null,
  areaCode: "",
  username: "",
  loginCo: "",
  email: "",
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  extraReducers: (builder) => {},
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        username: string;
        areaCode: string;
        loginCo: string;
        email: string;
      }>
    ) => {
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;

      state.token = action.payload.token;
      state.username = action.payload.username;
      state.areaCode = action.payload.areaCode;
      state.loginCo = action.payload.loginCo;
      state.email = action.payload.email;
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("areaCode");
      localStorage.removeItem("username");
      localStorage.removeItem("loginCo");
      localStorage.removeItem("email");
    },

    setReloginInfo: (
      state,
      action: PayloadAction<{
        token: string;
        areaCode: string;
        loginCo: string;
        email: string;
      }>
    ) => {
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;

      state.token = action.payload.token;
      state.areaCode = action.payload.areaCode;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("areaCode", action.payload.areaCode);
      localStorage.setItem("loginCo", action.payload.loginCo);
      localStorage.setItem("email", action.payload.email);
    },

    //setToken: (state, action: PayloadAction<{ token: string | null }>) => {
    //  state.token = action.payload.token;
    //},

    //setAreaCode: (state, action: PayloadAction<{ areaCode: string }>) => {
    //  state.areaCode = action.payload.areaCode;
    //},

    //setUsername: (state, action: PayloadAction<{ username: string }>) => {
    //  state.username = action.payload.username;
    //},
  },
});

export const { logout, setUser, setReloginInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
