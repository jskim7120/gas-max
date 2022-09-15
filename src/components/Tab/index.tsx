import React, { useEffect, BaseSyntheticEvent } from "react";
import { useSelector, useDispatch } from "app/store";
import { TabHeaderWrapper, List, TabContentWrapper } from "./style";
import { getContent } from "components/Tab/tabContent";
import { setTabs, setActiveTab, removeTab } from "features/tab/tabSlice";
interface TabProps {
  className?: string;
  style?: any;
}

interface ITabHeader {
  header: any;
  isActive: boolean;
  onClick: () => void;
  closeTab: (arg: any) => void;
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
        data-menuid={header.menuId}
        onClick={(e: BaseSyntheticEvent) => {
          e.stopPropagation();
          closeTab(e);
        }}
      >
        X
      </span>
    </List>
  );
};

let content: React.ReactNode;
let tabHeader: Array<any>;
let activeTabId: any;

const Tab = (props: TabProps): JSX.Element => {
  // console.log("Tab dotroos:");
  const dispatch = useDispatch();

  let tabState = useSelector((state) => state.tab);

  useEffect(() => {
    if (tabState.tabs.length <= 1 && sessionStorage.getItem("active-tab")) {
      console.log("tabState length is less than or equal to 1");
      const storageTab = JSON.parse(`${sessionStorage.getItem("tabs")}`);
      const activeTab = sessionStorage.getItem("active-tab");
      dispatch(setTabs({ tabs: storageTab, activeTabId: activeTab }));
    }
  }, []);

  tabHeader = tabState.tabs;
  activeTabId = tabState.activeTabId;

  content = getContent(activeTabId);

  const closeTab = (e: any) => {
    const menuId = e.target.getAttribute("data-menuid");
    dispatch(removeTab({ menuId: menuId }));
  };

  const changeTab = (menuId: string) => {
    dispatch(setActiveTab({ activeTabId: menuId }));
  };

  return (
    <>
      <TabHeaderWrapper>
        {tabHeader?.map((header: any, index: number) => (
          <TabHeader
            key={index}
            header={header}
            isActive={activeTabId === header.menuId}
            onClick={() => changeTab(header.menuId)}
            closeTab={closeTab}
          />
        ))}
      </TabHeaderWrapper>

      <TabContentWrapper>{content}</TabContentWrapper>
    </>
  );
};

export default React.memo(Tab);
