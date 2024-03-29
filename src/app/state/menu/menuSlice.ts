import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "app/axios";

export interface initialStateType {
  menu: any;
}

const initialState: initialStateType = {
  menu: [],
};

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
  const res = await apiGet("/app/SY1100/list");
  if (res !== null) {
    return res;
  }
  return [];
});

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(
      getMenu.fulfilled,
      (state: initialStateType, action: any) => {
        state.menu = action.payload;
      }
    );
  },
  reducers: {},
});

export default menuSlice.reducer;
