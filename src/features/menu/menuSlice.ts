import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api/index";

export interface initialStateType {
  loading: boolean;
  menu: any;
}

const initialState: initialStateType = {
  loading: false,
  menu: [],
};

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  const response = await API.get("menu/list");
  return response.data as any;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(
      getMenu.fulfilled,
      (state: initialStateType, action: any) => {
        state.loading = true;
        state.menu = action.payload;
      }
    );
  },
  reducers: {},
});

export default menuSlice.reducer;
