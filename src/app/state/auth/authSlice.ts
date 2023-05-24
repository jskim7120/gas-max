import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateType {
  token: string | null;
  areaCode: string;
  username: string;
}

const initialState: initialStateType = {
  token: null,
  areaCode: "",
  username: "",
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
      }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.areaCode = action.payload.areaCode;
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("areaCode");
      localStorage.removeItem("username");
    },

    setReloginInfo: (
      state,
      action: PayloadAction<{ token: string; areaCode: string }>
    ) => {
      state.token = action.payload.token;
      state.areaCode = action.payload.areaCode;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("areaCode", action.payload.areaCode);
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
