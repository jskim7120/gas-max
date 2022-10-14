import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "api";

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

export const login = createAsyncThunk(
  "auth/login",
  async (user: IAuth, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", user);
      return (await response.data) as IAuthResponse;
    } catch (error: any) {
      alert(error.message);
      return rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: initialStateType, action: any) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (
        state: initialStateType,
        { payload: { accessToken, refreshToken, username } }: PayloadAction<any>
      ) => {
        state.loading = false;
        state.token = accessToken;
        localStorage.setItem("token", accessToken);
      }
    );
    builder.addCase(login.rejected, (state: initialStateType, action: any) => {
      state.loading = false;
      state.error = "error " + action.payload?.error;
      state.message = action.payload?.message;
    });
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
