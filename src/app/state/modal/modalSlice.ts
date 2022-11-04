import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  isDelete: boolean;
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  isDelete: false,
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

    deleteAction: (state, action) => {
      state.isDelete = action.payload.isDelete;
    },
  },
});

export const { openModal, closeModal, deleteAction } = modalSlice.actions;

export default modalSlice.reducer;
