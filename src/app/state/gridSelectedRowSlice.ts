import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  selectedRowIndex: number;
}

const initialState: initialStateType = {
  selectedRowIndex: 0,
};

const gridSelectedRowSlice = createSlice({
  name: "selectedRow",
  initialState,
  reducers: {
    setRowIndex: (state, action) => {
      state.selectedRowIndex = action.payload.selectedRowIndex;
      sessionStorage.setItem(
        "selectedRowIndex",
        action.payload.selectedRowIndex
      );
    },
  },
});

export const { setRowIndex } = gridSelectedRowSlice.actions;

export default gridSelectedRowSlice.reducer;
