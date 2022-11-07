import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  cm1105: any;
  isDelete: {
    menuId: string;
    isDelete: boolean;
  };
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  cm1105: {},
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
  addDeleteMenuId,
  setIsDelete,
} = modalSlice.actions;

export default modalSlice.reducer;
