import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  isOpen: boolean;
}

const initialState: initialStateType = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
