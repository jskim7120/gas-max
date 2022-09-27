import React, { forwardRef, useState } from "react";
import styled, { css } from "styled-components";
import { ButtonColor, ButtonSize, ButtonTextColor } from "../ComponentsType";

const ButtonComponent = styled.button<{
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  icon?: React.ReactNode;
  disabled?: boolean;
  isHover?: boolean;
  fullWidth?: boolean;
}>`
  ${(props) => {
    return css`
      height: 33px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: "NotoSans";
      text-decoration: none;
      border-radius: 2px;
      transition: all 0.3s ease;
      box-sizing: border-box;
      background-color: #5284ce;
      border: 1px solid #fff;
      border-radius: 99px;
      color: #fff;
      &:hover,
      &:focus {
        background-color: #fff;
      }
      &:disabled {
        background-color: #fff;
        cursor: default;
      }
      width: ${props.fullWidth ? "100%" : "auto"};
    `;
  }}
`;

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: ButtonSize;
  //color?: ButtonColor;
  color?: string;
  textColor?: ButtonTextColor;
  icon?: React.ReactNode;
  isHover?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

function Button(
  props: IButtonProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const [hover, setHover] = useState<boolean | undefined>(false);
  const hoverHandler = () => {
    setHover(true);
  };
  const leaveHandler = () => {
    setHover(false);
  };

  return (
    <ButtonComponent
      size={props.size}
      textColor={props.textColor ? props.textColor : ButtonTextColor.BLACK}
      onMouseEnter={hoverHandler}
      onMouseLeave={leaveHandler}
      isHover={hover}
      fullWidth={props.fullWidth}
      disabled={props.disabled && props.disabled}
      ref={ref}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      type={props.type && props.type}
      {...props}
    >
      {props.icon && (
        <span
          style={{
            width: "34px",
            height: "34px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.icon}
        </span>
      )}
      {props.text}
    </ButtonComponent>
  );
}

export default forwardRef<HTMLButtonElement, IButtonProps>(Button);