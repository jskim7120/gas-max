import React, { useEffect, BaseSyntheticEvent } from "react";
import { useSelector, useDispatch } from "app/store";
import {
  setTabs,
  setActiveTab,
  removeTab,
  removeAllTabs,
} from "app/state/tab/tabSlice";
import { openModal } from "app/state/modal/modalSlice";
import { toggleSidebar } from "app/state/sidebar/sidebarSlice";
import { getContent } from "./tabContent";
import {
  TabContainer,
  TabHeaderWrapper,
  List,
  TabContentWrapper,
  TabBorderLine,
} from "./style";
import {
  SidebarOpen,
  SidebarClose,
  CloseCircle,
  Home,
  Info,
  Refresh,
  Close,
} from "components/allSvgIcon";

interface TabProps {
  className?: string;
  style?: any;
}

interface ITabHeader {
  header: any;
  isActive: boolean;
  onClick: () => void;
  closeTab: (arg: string) => void;
}

const TabHeader = ({ header, isActive, onClick, closeTab }: ITabHeader) => {
  if (header.menuId === "HOME")
    return (
      <List className="home" isActive={isActive} onClick={onClick}>
        <Home color={isActive ? "#fff" : "#707070"} />
      </List>
    );

  return (
    <List
      isActive={isActive}
      onClick={(e: BaseSyntheticEvent) => {
        e.preventDefault();
        onClick();
      }}
    >
      {header.menuName}
      <span
        onClick={(e: BaseSyntheticEvent) => {
          e.stopPropagation();
          closeTab(header.menuId);
        }}
      >
        <CloseCircle />
      </span>
    </List>
  );
};

let content: React.ReactNode;
let tabHeader: Array<any>;
let activeTabId: any;

const Tab = (props: TabProps): JSX.Element => {
  const dispatch = useDispatch();
  let tabState = useSelector((state) => state.tab);
  const { isOpen } = useSelector((state) => state.sidebar);

  useEffect(() => {
    if (tabState.tabs.length <= 2 && sessionStorage.getItem("active-tab")) {
      const storageTab = JSON.parse(`${sessionStorage.getItem("tabs")}`);
      const activeTab = sessionStorage.getItem("active-tab");
      dispatch(setTabs({ tabs: storageTab, activeTabId: activeTab }));
    }
  }, []);

  tabHeader = tabState.tabs;
  activeTabId = tabState.activeTabId;
  const { menuName, depthFullName } = tabHeader.find(
    (tab) => tab.menuId === activeTabId
  );

  content = getContent(activeTabId, menuName, depthFullName);

  const closeTab = (menuId: string) => {
    dispatch(removeTab({ menuId: menuId }));
  };

  const changeTab = (menuId: string) => {
    dispatch(setActiveTab({ activeTabId: menuId }));
  };

  return (
    <TabContainer>
      <TabHeaderWrapper>
        <div className="sideBar" onClick={() => dispatch(toggleSidebar())}>
          {isOpen ? <SidebarClose /> : <SidebarOpen />}
        </div>
        <ul>
          {tabHeader?.map((header: any, index: number) => (
            <TabHeader
              key={index}
              header={header}
              isActive={activeTabId === header.menuId}
              onClick={() => changeTab(header.menuId)}
              closeTab={closeTab}
            />
          ))}
        </ul>
        <div className="subIconCnt">
          <span onClick={() => dispatch(openModal({ type: "infoModal" }))}>
            <Info />
          </span>
          <span
            style={{
              marginLeft: "8px",
            }}
          >
            <Refresh />
          </span>
          <span
            onClick={() => dispatch(removeAllTabs())}
            style={{
              marginLeft: "8px",
            }}
          >
            <Close />
          </span>
        </div>
        <TabBorderLine isHome={activeTabId === "HOME"} isOpen={isOpen} />
      </TabHeaderWrapper>

      <TabContentWrapper className="tab-content">{content}</TabContentWrapper>
    </TabContainer>
  );
};

export default React.memo(Tab);
