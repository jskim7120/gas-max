import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const CheckSvg = (): string => {
  return `"<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>"`;
};

const CheckdSvg = (): string => {
  return `"<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-right-down"><polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path></svg>"`;
};

const InputCheckBoxItem = styled.label`
  display: block;
  margin-right: 10px;
  padding: 3px 0;
  line-height: 1;
  border: 1px solid red;

  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    margin-top: -2px;
    background-size: 16px;
    background-position: center center;
    background-repeat: no-repeat;
    border: 1px solid ${(props) => `background-image: url(${CheckSvg()})`};
    vertical-align: middle;
  }

  &:hover {
    input + i {
      ${(props) => `background-image: url(${CheckSvg()})`};
    }
    input:checked + i {
      ${(props) => `background-image: url(${CheckdSvg()})`};
    }
  }
  input {
    display: none;
    &:checked + i {
      ${(props) => `background-image: url(${CheckdSvg()})`};
    }
    &:disabled + i {
      ${(props) => `background-image: url(${CheckSvg()})`};
    }
    &:checked:disabled + i {
      ${(props) => `background-image: url(${CheckdSvg()})`};
    }
  }
`;

interface ICheckBoxProps {
  name: string;
  id?: string;
  text?: string;
  value?: boolean;
  change?: (value: boolean, id?: string) => void;
  disabled?: boolean;
}

function CheckBox(props: ICheckBoxProps): JSX.Element {
  const [value, setValue] = useState<boolean>(props.value ? true : false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue(checked);
    if (props.change) {
      props.change(checked, props.id);
    }
  };
  useEffect(() => {
    setValue(props.value ? true : false);
  }, [props.value]);
  return (
    <InputCheckBoxItem>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={value}
        onChange={onChange}
        disabled={props.disabled}
      />
      <i />
      {props.text ? props.text : ""}
    </InputCheckBoxItem>
  );
}

export default React.memo(CheckBox);
