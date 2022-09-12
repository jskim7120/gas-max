import { createSlice } from "@reduxjs/toolkit";

type TabProps = {
  menuId: string;
  menuName: string;
  depthFullName: string;
};

export interface initialStateType {
  tabs: Array<TabProps>;
}

const initialState: initialStateType = {
  tabs: [],
};

const tabSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    addTab: (state, action) => {
      const length = state.tabs.length;
      if (length > 5) {
        state.tabs = state.tabs.filter(
          (tab: TabProps, idx: number) => idx !== 0
        );
      }

      state.tabs = [
        ...state.tabs,
        {
          menuId: action.payload.menuId,
          menuName: action.payload.menuName,
          depthFullName: action.payload.depthFullName,
        },
      ];
    },
  },
});

export const { addTab } = tabSlice.actions;

export default tabSlice.reducer;
