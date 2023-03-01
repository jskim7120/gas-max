import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  username: string;
  password: string;
}
interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
}
interface IAuthError {
  error: string;
  message: string;
  path: string;
  status: number;
}

export interface initialStateType {
  loading: boolean;
  token: string | null;
  areaCode: string;
  error: any | null;
  message: string;
}

const initialState: initialStateType = {
  loading: false,
  token: null,
  areaCode: "",
  error: null,
  message: "",
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  extraReducers: (builder) => {},
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; token: string }>
    ) => {
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("areaCode");
    },

    setToken: (state, action: PayloadAction<{ token: string | null }>) => {
      state.token = action.payload.token;
    },

    setAreaCode: (state, action: PayloadAction<{ areaCode: string }>) => {
      state.areaCode = action.payload.areaCode;
    },
  },
});

export const { logout, setToken, setAreaCode } = AuthSlice.actions;
export default AuthSlice.reducer;
