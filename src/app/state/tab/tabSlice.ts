import { createSlice } from "@reduxjs/toolkit";

type TabProps = {
  menuId: string;
  menuName: string;
  depthFullName: string;
  rowIndex: number;
};

export interface initialStateType {
  tabs: Array<TabProps>;
  activeTabId: string;
}

const initialState: initialStateType = {
  tabs: [
    {
      menuId: "HOME",
      menuName: "HOME",
      depthFullName: "HOME",
      rowIndex: 0,
    },
  ],
  activeTabId: "HOME",
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {
      const limit = 10;
      const hasMenuId = state.tabs.some(
        (tab) => tab.menuId === action.payload.menuId
      );

      if (!hasMenuId) {
        const length = state.tabs.length;
        if (length < limit) {
          state.tabs = [
            ...state.tabs,
            {
              menuId: action.payload.menuId,
              menuName: action.payload.menuName,
              depthFullName: action.payload.depthFullName,
              rowIndex: 0,
            },
          ];
          sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
          state.activeTabId = action.payload.menuId;
          sessionStorage.setItem("active-tab", state.activeTabId);
        }
      } else {
        state.activeTabId = action.payload.menuId;
        sessionStorage.setItem("active-tab", state.activeTabId);
      }
    },
    removeTab: (state, action) => {
      if (state.tabs.length > 1) {
        state.tabs = state.tabs.filter(
          (tab) => tab.menuId !== action.payload.menuId
        );
        const firstMenuId = state.tabs[0].menuId;
        state.activeTabId = firstMenuId;
      }
      sessionStorage.setItem("active-tab", state.activeTabId);
      sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
    },
    removeAllTabs: (state) => {
      state.tabs = [
        {
          menuId: "HOME",
          menuName: "HOME",
          depthFullName: "HOME",
          rowIndex: 0,
        },
      ];
      state.activeTabId = "HOME";
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload.activeTabId;
      sessionStorage.setItem("active-tab", state.activeTabId);
      sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
    },
    setTabs: (state, action) => {
      state.tabs = action.payload.tabs;
      state.activeTabId = action.payload.activeTabId;
    },
    refreshTabs: (state) => {
      window.location.reload();
    },

    setRowIndex: (state, action) => {
      const tab = state.tabs.find(
        (tab) => tab.menuId === action.payload.menuId
      );
      if (tab) {
        tab.rowIndex = action.payload.rowIndex;
      }
    },
  },
});

export const {
  addTab,
  removeTab,
  removeAllTabs,
  setActiveTab,
  setTabs,
  refreshTabs,
  setRowIndex,
} = tabSlice.actions;

export default tabSlice.reducer;
