import React, { BaseSyntheticEvent } from "react";
import { useSelector, useDispatch } from "app/store";
import { TabHeaderWrapper, List, TabContentWrapper } from "./style";
import { getContent } from "components/Tab/tabContent";
import { setActiveTab, removeTab } from "features/tab/tabSlice";
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

const Tab = (props: TabProps): JSX.Element => {
  console.log("Tab dotroos:");
  const dispatch = useDispatch();
  tabHeader = useSelector((state) => state.tab.tabs);
  const activeTabId = useSelector((state) => state.tab.activeTabId);

  content = getContent(activeTabId);
  // console.log("content:", content);

  const CloseTab = (e: any) => {
    const menuId = e.target.getAttribute("data-menuid");
    dispatch(removeTab({ menuId: menuId }));
  };

  const ClickOnTab = (menuId: string) => {
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
            onClick={() => ClickOnTab(header.menuId)}
            closeTab={CloseTab}
          />
        ))}
      </TabHeaderWrapper>

      <TabContentWrapper>{content}</TabContentWrapper>
    </>
  );
};

export default React.memo(Tab);
