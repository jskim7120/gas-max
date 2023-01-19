import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  cm1105: {
    cuCode: string;
    areaCode: string;
    status: string;
  };
  gr1200: {
    index: number | undefined;
    areaCode: string;
    bcBuCode: string;
    bcChitType: string;

    jpCode: string | undefined;
    jpCost: number | undefined;
    jpDanga: number | undefined;
    jpGubun: string | undefined;
    jpKg: number | undefined;
    jpName: string | undefined;
    jpSvyn: string | undefined;
  };
  isDelete: {
    menuId: string;
    isDelete: boolean;
  };
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  cm1105: {
    cuCode: "",
    areaCode: "",
    status: "",
  },
  gr1200: {
    index: undefined,
    areaCode: "",
    bcBuCode: "",
    bcChitType: "",
    jpCode: undefined,
    jpCost: undefined,
    jpDanga: undefined,
    jpGubun: undefined,
    jpKg: undefined,
    jpName: undefined,
    jpSvyn: undefined,
  },
  isDelete: {
    menuId: "",
    isDelete: false,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,

  reducers: {
    openModal: (state, actions) => {
      state.modalIsOpen = true;
      state.type = actions.payload.type;
    },

    closeModal: (state) => {
      state.modalIsOpen = false;
      state.type = "";
    },

    addCM1105: (state, action) => {
      state.cm1105.cuCode = action.payload.cuCode;
      state.cm1105.areaCode = action.payload.areaCode;
      state.cm1105.status = action.payload.status ?? "";
    },

    addGR1200: (state, action) => {
      state.gr1200.index = action.payload.index;
      state.gr1200.areaCode = action.payload.areaCode;
      state.gr1200.bcBuCode = action.payload.bcBuCode;
      state.gr1200.bcChitType = action.payload.bcChitType;

      state.gr1200.jpCode = action.payload.jpCode;
      state.gr1200.jpCost = action.payload.jpCost;
      state.gr1200.jpDanga = action.payload.jpDanga;
      state.gr1200.jpGubun = action.payload.jpGubun;
      state.gr1200.jpKg = action.payload.jpKg;
      state.gr1200.jpName = action.payload.jpName;
      state.gr1200.jpSvyn = action.payload.jpSvyn;
    },

    addDeleteMenuId: (state, action) => {
      state.isDelete.menuId = action.payload.menuId;
    },
    setIsDelete: (state, action) => {
      state.isDelete.isDelete = action.payload.isDelete;
    },
  },
});

export const {
  openModal,
  closeModal,
  addCM1105,
  addGR1200,
  addDeleteMenuId,
  setIsDelete,
} = modalSlice.actions;

export default modalSlice.reducer;
