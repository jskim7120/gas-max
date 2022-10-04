import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api/index";

export interface initialStateType {
  loading: boolean;
  favMenu: any;
}

const initialState: initialStateType = {
  loading: false,
  favMenu: [],
};

export const getFavMenu = createAsyncThunk("menu/list", async () => {
  const response = await API.get("menu/favoriteMenu");
  return response.data as any;
});

const favoriteSlice = createSlice({
  name: "favMenu",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(
      getFavMenu.fulfilled,
      (state: initialStateType, action: any) => {
        state.loading = true;
        state.favMenu = action.payload;
      }
    );
  },
  reducers: {},
});

export default favoriteSlice.reducer;
