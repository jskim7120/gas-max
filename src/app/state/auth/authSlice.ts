import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API, { baseURL } from "app/axios";

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
  error: any | null;
  message: string;
}

const initialState: initialStateType = {
  loading: false,
  token: null,
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
    },
    setToken: (state, action: PayloadAction<{ token: string | null }>) => {
      state.token = action.payload.token;
    },
  },
});

export const { logout, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;