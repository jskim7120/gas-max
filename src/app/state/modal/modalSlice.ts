import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  cm1105: any;
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  cm1105: {},
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
  },
});

export const { openModal, closeModal, addCM1105 } = modalSlice.actions;

export default modalSlice.reducer;
