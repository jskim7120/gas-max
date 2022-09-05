import React from "react";
import styled from "styled-components";

const Outer = styled.div`
  position: relative;
  border-radius: 50%;
  border: 1px solid red;
  width: 24px;
  height: 24px;
`;

const Inner = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
`;

const IconCreator = ({ Icon, style }: { Icon: JSX.Element; style?: any }) => (
  <Outer style={style}>
    <Inner>{Icon}</Inner>
  </Outer>
);

export default IconCreator;
