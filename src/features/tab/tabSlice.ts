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
    {
      menuId: "M18CO9503",
      menuName: "사원코드 관리",
      depthFullName: "공통관리 > 운영/코드정보 > 사원코드 관리",
    },
    {
      menuId: "M00SD1400",
      menuName: "검침등록",
      depthFullName: "등록 > 검침등록",
    },
  ],
  activeTabId: "M00SD1400",
};

const tabSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addTab: (state, action) => {
      const limit = 10;
      const hasMenuId = state.tabs.some(
        (tab) => tab.menuId === action.payload.menuId
      );

      if (!hasMenuId) {
        const length = state.tabs.length;
        if (length >= limit) {
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
      sessionStorage.setItem("active-tab", state.activeTabId);
      sessionStorage.setItem("tabs", JSON.stringify(state.tabs));
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
  },
});

export const { addTab, removeTab, removeAllTabs, setActiveTab, setTabs } =
  tabSlice.actions;

export default tabSlice.reducer;
