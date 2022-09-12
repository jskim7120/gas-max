import React, { useState, useEffect } from "react";
import { TabHeaderWrapper, List, TabContentWrapper } from "./style";

interface TabProps {
  header: any[];
  defaultIndex: number;
  content: any[];
  handleClick: (index: number) => void;
  className?: string;
  style?: any;
  closeTab: (arg: any) => void;
}

interface ITabHeader {
  header: any;
  isActive: boolean;
  onClick: () => void;
  closeTab: (arg: any) => void;
}

const TabHeader = ({ header, isActive, onClick, closeTab }: ITabHeader) => {
  return (
    <List isActive={isActive} onClick={onClick}>
      {header.menuName}
      <span data-menuId={header.menuId} onClick={closeTab}>
        X
      </span>
    </List>
  );
};

const Tab = (props: TabProps): JSX.Element => {
  const [tabActive, setTabActive] = useState(
    props.defaultIndex ? props.defaultIndex : 0
  );

  useEffect(() => {
    setTabActive(props.defaultIndex);
  }, [props.defaultIndex]);

  return (
    <>
      <TabHeaderWrapper>
        {props.header?.map((header: any, index: number) => (
          <TabHeader
            key={index}
            header={header}
            isActive={tabActive === index}
            onClick={() => {
              setTabActive(index);
              // props.handleClick(index);
            }}
            closeTab={props.closeTab}
          />
        ))}
      </TabHeaderWrapper>
      {props.content?.map((component: any, index: number) => (
        <TabContentWrapper
          key={index}
          style={{ display: index === tabActive ? "block" : "none" }}
        >
          {component}
        </TabContentWrapper>
      ))}
    </>
  );
};

export default React.memo(Tab);
