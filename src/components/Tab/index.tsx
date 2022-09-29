import React, { useEffect, BaseSyntheticEvent } from "react";
import { useSelector, useDispatch } from "app/store";
import { setTabs, setActiveTab, removeTab } from "features/tab/tabSlice";
// import Switch from "components/switch";
import { getContent } from "./tabContent";
import {
  TabContainer,
  TabHeaderWrapper,
  List,
  TabContentWrapper,
} from "./style";
import { CloseCircle } from "components/AllSvgIcon";
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
        {/* <Switch /> */}
        <ul style={{ marginLeft: "15px" }}>
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
      </TabHeaderWrapper>
      <TabContentWrapper>{content}</TabContentWrapper>
    </TabContainer>
  );
};

export default React.memo(Tab);
