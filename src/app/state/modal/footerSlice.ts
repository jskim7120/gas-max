import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
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
}

const initialState: initialStateType = {
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
};

const footerSlice = createSlice({
  name: "footer",
  initialState: initialState,

  reducers: {
    add: (state, action) => {
      state.info = action.payload.info;
    },
    remove: (state, action) => {
      state.info = initialState.info;
    },
  },
});

export const { add, remove } = footerSlice.actions;

export default footerSlice.reducer;
