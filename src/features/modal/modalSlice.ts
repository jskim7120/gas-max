import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,

  reducers: {
    openModal: (state, value: any) => {
      state.modalIsOpen = true;
    },

    closeModal: (state, value: any) => {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
