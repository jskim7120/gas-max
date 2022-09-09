import React, { useState, useEffect } from "react";
import { TabHeaderWrapper, List, TabContentWrapper } from "./style";

interface TabProps {
  header: any[];
  defaultIndex: number;
  content: any[];
  handleClick: (index: number) => void;
  className?: string;
  style?: any;
}

interface ITabHeader {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const TabHeader = ({ title, isActive, onClick }: ITabHeader) => {
  return (
    <List isActive={isActive} onClick={onClick}>
      {title}
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
        {props.header?.map((title: string, index: number) => (
          <TabHeader
            key={index}
            title={title}
            isActive={tabActive === index}
            onClick={() => {
              setTabActive(index);
              // props.handleClick(index);
            }}
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
