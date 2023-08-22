import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  source: string;
  info: any;
  search: {
    fieldName: string;
    text: string;
  };
}

const initialState: initialStateType = {
  source: "",
  info: {},
  search: {
    fieldName: "",
    text: "",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState: initialState,

  reducers: {
    addSource: (state, action) => {
      state.source = action.payload.source;
    },
    addInfo: (state, action) => {
      state.info = action.payload.info;
      state.source = action.payload.source;
    },
    removeInfo: (state, action) => {
      state.info = initialState.info;
    },
    addSearchText: (state, action) => {
      state.search = action.payload.search;
    },
    removeSearchText: (state, action) => {
      state.search = initialState.search;
    },
  },
});

export const {
  addSource,
  addInfo,
  removeInfo,
  addSearchText,
  removeSearchText,
} = footerSlice.actions;

export default footerSlice.reducer;
