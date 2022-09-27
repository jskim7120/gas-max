import React, { FC, useState } from "react";
import ReactSwitch from "react-switch";
import styled, { css } from "styled-components";

const CheckedText = styled.span`
  position: absolute;
  margin-left: 11px;
  margin-top: 2px;
  font-family: NotoSansKRRegular;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: center;
  color: #fff;
`;
const UncheckedText = styled.span`
  position: absolute;
  margin-left: 2px;
  margin-top: 2px;
  font-family: NotoSansKRRegular;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: center;
  color: #fff;
`;
const Switch = (props: any) => {
  const [value, setValue] = useState(props.value ? true : false);
  return (
    <ReactSwitch
      uncheckedIcon={<UncheckedText>OFF</UncheckedText>}
      checkedIcon={<CheckedText>ON</CheckedText>}
      onChange={(checked, event) => {
        setValue(checked);
      }}
      checked={value}
      onColor="#0098FF"
      offColor="#707070"
      width={54}
      height={22}
      handleDiameter={16}
    />
  );
};
export default Switch;
