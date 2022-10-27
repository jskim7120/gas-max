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
      menuId: "HOME",
      menuName: "HOME",
      depthFullName: "HOME",
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
  },
});

export const {
  addTab,
  removeTab,
  removeAllTabs,
  setActiveTab,
  setTabs,
  refreshTabs,
} = tabSlice.actions;

export default tabSlice.reducer;
