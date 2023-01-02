import React from "react";
import { TabHeaderWrapper, List } from "./style";

interface TabProps {
  className?: string;
  style?: any;
  tabHeader: Array<string>;
  onClick: (id: number) => void;
  tabId: number;
}

const Tab = (props: TabProps): JSX.Element => {
  return (
    <TabHeaderWrapper>
      {props.tabHeader?.map((header: any, index: number) => (
        <List
          key={index}
          isActive={props.tabId === index}
          onClick={() => props.onClick(index)}
        >
          {header}
        </List>
      ))}
    </TabHeaderWrapper>
  );
};

export default React.memo(Tab);
