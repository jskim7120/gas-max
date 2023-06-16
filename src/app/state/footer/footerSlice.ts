import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  source: string;

  info: {
    areaCode: string;
    barcodeYn: string;
    cuAddr1n2: string;
    cuBigo1: string;
    cuBigo2: string;
    cuCmisu: string;
    cuCode: string;
    cuGongdate: string;
    cuHdate: string;
    cuHdateT: string;
    cuHp: string;
    cuJmisu: string;
    cuNo: string;
    cuSaddr1: string;
    cuSangho: string;
    cuStae: string;
    cuStaeName: string;
    cuSukumtype: string;
    cuSukumtypeName: string;
    cuSwCode: string;
    cuSwName: string;
    cuTel: string;
    cuTel2: string;
    cuTongkum: string;
    cuType: string;
    cuTypeName: string;
    cuUsername: string;
    cuViewName: string;
    jTransYn: string;
    mTransYn: string;
    tTransYn: string;
  };

  search: {
    fieldName: string;
    text: string;
  };
}

const initialState: initialStateType = {
  source: "",

  info: {
    areaCode: "",
    barcodeYn: "",
    cuAddr1n2: "",
    cuBigo1: "",
    cuBigo2: "",
    cuCmisu: "",
    cuCode: "",
    cuGongdate: "",
    cuHdate: "",
    cuHdateT: "",
    cuHp: "",
    cuJmisu: "",
    cuNo: "",
    cuSaddr1: "",
    cuSangho: "",
    cuStae: "",
    cuStaeName: "",
    cuSukumtype: "",
    cuSukumtypeName: "",
    cuSwCode: "",
    cuSwName: "",
    cuTel: "",
    cuTel2: "",
    cuTongkum: "",
    cuType: "",
    cuTypeName: "",
    cuUsername: "",
    cuViewName: "",
    jTransYn: "",
    mTransYn: "",
    tTransYn: "",
  },
  search: {
    fieldName: "",
    text: "",
  },
};

const footerSlice = createSlice({
  name: "footer",
  initialState: initialState,

  reducers: {
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

export const { addInfo, removeInfo, addSearchText, removeSearchText } =
  footerSlice.actions;

export default footerSlice.reducer;
