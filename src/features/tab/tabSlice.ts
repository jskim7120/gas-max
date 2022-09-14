import { createSlice } from "@reduxjs/toolkit";

type TabProps = {
  menuId: string;
  menuName: string;
  depthFullName: string;
};

export interface initialStateType {
  tabs: Array<TabProps>;
  activeTabId: string;
}

const initialState: initialStateType = {
  tabs: [
    {
      menuId: "M00SD1100",
      menuName: "판매등록",
      depthFullName: "등록 > 판매등록",
    },
  ],
  activeTabId: "M00SD1100",
};

const tabSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addTab: (state, action) => {
      const limit = 5;
      const hasMenuId = state.tabs.some(
        (tab) => tab.menuId === action.payload.menuId
      );

      if (!hasMenuId) {
        const length = state.tabs.length;
        if (length > limit) {
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
      }

      state.activeTabId = action.payload.menuId;
    },
    removeTab: (state, action) => {
      if (state.tabs.length > 1) {
        state.tabs = state.tabs.filter(
          (tab) => tab.menuId !== action.payload.menuId
        );
        const firstMenuId = state.tabs[0].menuId;
        state.activeTabId = firstMenuId;
      }
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload.activeTabId;
    },
  },
});

export const { addTab, removeTab, setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
