import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  data: any;
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  data: {},
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
    addData: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { openModal, closeModal, addData } = modalSlice.actions;

export default modalSlice.reducer;
