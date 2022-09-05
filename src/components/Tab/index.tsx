import React, { useState, useEffect } from "react";
import { TabHeaderWrapper, List, TabContentWrapper } from "./style";

interface TabProps {
  data: any;
  defaultIndex: number;
  handleClick: (index: number) => void;
  className?: string;
  style?: any;
}

interface ITabHeader {
  title: string;
  isActive: boolean;
  className: string;
  onClick: () => void;
}

interface Object {
  title: string;
}

const TabHeader = ({ title, isActive, onClick, className }: ITabHeader) => {
  return (
    <List isActive={isActive} onClick={onClick} className={className}>
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
    <TabHeaderWrapper
      className={props.className ? props.className : "plain-tab"}
    >
      {props.data?.map((obj: Object, index: number) => (
        <TabHeader
          key={index}
          title={obj.title}
          isActive={tabActive === index}
          className={props.className ? props.className : "plain-tab"}
          onClick={() => {
            setTabActive(index);
            props.handleClick(index);
          }}
        />
      ))}
    </TabHeaderWrapper>
  );
};

export const TabContent = ({
  children,
  visible,
}: {
  children: any;
  visible: boolean;
}) => {
  return (
    <TabContentWrapper style={{ display: `${visible} ? "block" :"none"` }}>
      {children}
    </TabContentWrapper>
  );
};

export default React.memo(Tab);
