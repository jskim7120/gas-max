import React, { useState } from "react";
import { TabHeaderWrapper, List } from "./style";

interface TabProps {
  className?: string;
  style?: any;
  tabHeader: Array<string>;
  onClick?: (id: number) => void;
}

const Tab = (props: TabProps): JSX.Element => {
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <TabHeaderWrapper>
      {props.tabHeader?.map((header: any, index: number) => (
        <List
          key={index}
          isActive={activeTabId === index}
          onClick={() => {
            setActiveTabId(index);
            props.onClick && props.onClick(index);
          }}
        >
          {header}
        </List>
      ))}
    </TabHeaderWrapper>
  );
};

export default React.memo(Tab);
