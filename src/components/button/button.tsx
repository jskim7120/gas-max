import React, { forwardRef, useState } from "react";
import styled, { css } from "styled-components";
import { ButtonColor, ButtonSize, ButtonTextColor } from "../componentsType";

const BtnColor = (color?: ButtonColor) => {
  switch (color) {
    case ButtonColor.BLUE:
      return {
        bg: "#5284ce",
        border: "#FFF",
        hover: "#5284CE",
        disabled: "gray",
      };
    case ButtonColor.AUZRE:
      return {
        bg: "#00B4D8",
        border: "#FFF",
        hover: "00B4D8",
        disabled: "gray",
      };
  }
};

const ButtonComponent = styled.button<{
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  icon?: React.ReactNode;
  disabled?: boolean;
  isHover?: boolean;
  fullWidth?: boolean;
  color?: ButtonColor;
}>`
  ${(props) => {
    return css`
      height: 33px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: "NotoSansKRRegular";
      font-size: 14px;
      text-decoration: none;
      border-radius: 2px;
      transition: all 0.3s ease;
      box-sizing: border-box;
      background-color: ${BtnColor(props.color)?.bg};
      border: 1px solid ${BtnColor(props.color)?.border};
      border-radius: 999px;
      color: #fff;
      padding: 0 13px;
      &:hover,
      &:focus {
        background-color: #5284ce;
      }
      &:disabled {
        background-color: #5284ce;
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
  color?: ButtonColor;
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
      color={props.color ? props.color : ButtonColor.BLUE}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "7px",
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
