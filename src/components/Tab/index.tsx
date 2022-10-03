import React, { useEffect, BaseSyntheticEvent } from "react";
import { useSelector, useDispatch } from "app/store";
import {
  setTabs,
  setActiveTab,
  removeTab,
  removeAllTabs,
} from "features/tab/tabSlice";
import { openModal } from "features/modal/modalSlice";
import { getContent } from "./tabContent";
import {
  TabContainer,
  TabHeaderWrapper,
  List,
  TabContentWrapper,
} from "./style";
import { CloseCircle, Home, Info, Refresh, Close } from "components/AllSvgIcon";
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
      <List className="home" isActive={isActive} onClick={() => onClick()}>
        <Home />
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
let activeTabName: string;

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
  activeTabName = tabHeader.find((tab) => tab.menuId === activeTabId).menuName;

  content = getContent(activeTabId, activeTabName);

  const closeTab = (menuId: string) => {
    dispatch(removeTab({ menuId: menuId }));
  };

  const changeTab = (menuId: string) => {
    dispatch(setActiveTab({ activeTabId: menuId }));
  };

  return (
    <TabContainer>
      <TabHeaderWrapper>
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
        <div style={{ display: "flex", marginRight: "25px" }}>
          <span onClick={() => dispatch(openModal({ type: "infoModal" }))}>
            <Info />
          </span>

          {/* <Dropdown
            icon={<Info />}
            content={
              <div
                style={{
                  width: "490px",
                  height: "550px",
                }}
              ></div>
            }
          /> */}
          <a
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            <Refresh />
          </a>
          <a
            onClick={() => dispatch(removeAllTabs())}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            <Close />
          </a>
        </div>
        <div
          style={{
            position: "absolute",
            top: "74px",
            left: isOpen ? "82px" : "0px",
            right: "0px",
            height: "3px",
            background: activeTabId === "HOME" ? "#8CB808" : "#FC6767",
          }}
        ></div>
      </TabHeaderWrapper>

      <TabContentWrapper className="tab-content">{content}</TabContentWrapper>
    </TabContainer>
  );
};

export default React.memo(Tab);
