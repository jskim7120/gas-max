import { createSlice } from "@reduxjs/toolkit";

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
    areaCode: string;
    bcBuCode: string;
    bcChitType: string;
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
    areaCode: "",
    bcBuCode: "",
    bcChitType: "",
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
      state.gr1200.areaCode = action.payload.areaCode;
      state.gr1200.bcBuCode = action.payload.bcBuCode;
      state.gr1200.bcChitType = action.payload.bcChitType;
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
