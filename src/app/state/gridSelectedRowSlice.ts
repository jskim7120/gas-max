import { createSlice } from "@reduxjs/toolkit";

interface ISelectedIndex {
  tabId: string;
  rowIndex: string;
}

export interface initialStateType {
  rows: Array<ISelectedIndex>;
}

const initialState: initialStateType = {
  rows: [],
};

const gridSelectedRowSlice = createSlice({
  name: "gridRows",
  initialState,
  reducers: {
    setRowIndex: (state, action) => {
      state.rows = [
        ...state.rows.filter((row) => row.tabId !== action.payload.tabId),
        {
          tabId: action.payload.tabId,
          rowIndex: action.payload.rowIndex,
        },
      ];
      sessionStorage.setItem("gridRows", JSON.stringify(state.rows));
    },
    removeRowIndex: (state, action) => {
      state.rows = [
        ...state.rows.filter((row) => row.tabId !== action.payload.tabId),
      ];
      sessionStorage.setItem("gridRows", JSON.stringify(state.rows));
    },
    removeAllRowIndexes: (state) => {
      state.rows = [];
      sessionStorage.removeItem("gridRows");
    },
  },
});

export const { setRowIndex, removeRowIndex, removeAllRowIndexes } =
  gridSelectedRowSlice.actions;

export default gridSelectedRowSlice.reducer;
