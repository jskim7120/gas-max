import React, { forwardRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  ButtonColor,
  ButtonSize,
  ButtonTextColor,
  ButtonType,
} from "../componentsType";

const BtnAttribute = (kind: ButtonType, color: ButtonColor) => {
  let attributes: any = {};

  if (kind === ButtonType.FORM) {
    attributes = {
      border: "#707070",
      borderRad: "4px",
      fontSize: "12px",
      fontFamily: "SegoeUI",
      height: "21px",
    };

    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#ECECEC";
      attributes.color = "#0057AA";
    } else if (color === ButtonColor.SECONDARY) {
      attributes.bg = "linear-gradient(#FFB300, #E67F09)";
      attributes.color = "#FFF";
    }
  } else if (kind === ButtonType.LOGIN) {
    attributes = {
      borderRad: "4px",
      fontSize: "16px",
      fontFamily: "NotoSansKRRegular",
      height: "40px",
    };

    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#0098FF";
      attributes.border = "#0098FF";
      attributes.color = "#fff";
    } else if (color === ButtonColor.SECONDARY) {
      attributes.bg = "#9A9A9A";
      attributes.border = "#9A9A9A";
      attributes.color = "#fff";
    }
  }
  return attributes;
};

const ButtonComponent = styled.button<{
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  icon?: React.ReactNode;
  disabled?: boolean;
  isHover?: boolean;
  fullWidth?: boolean;
  color: ButtonColor;
  kind: ButtonType;
}>`
  ${(props) => {
    return css`
      height: ${BtnAttribute(props.kind, props.color).height};
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: "NotoSansKRRegular";
      font-size: ${BtnAttribute(props.kind, props.color).fontSize}
      text-decoration: none;
      border-radius: 2px;
      transition: all 0.3s ease;
      box-sizing: border-box;
      background: ${BtnAttribute(props.kind, props.color).bg};
      border: 1px solid ${BtnAttribute(props.kind, props.color).border};
      border-radius: ${BtnAttribute(props.kind, props.color).borderRad};
      color: ${BtnAttribute(props.kind, props.color).color};
      padding: 0 5px;
      &:hover,
      &:focus {
        //background-color: #5284ce;
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
  kind?: ButtonType;
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
  const color = props.color ? props.color : ButtonColor.PRIMARY;
  return (
    <ButtonComponent
      size={props.size}
      textColor={props.textColor ? props.textColor : ButtonTextColor.BLACK}
      onMouseEnter={hoverHandler}
      onMouseLeave={leaveHandler}
      isHover={hover}
      color={props.color ? props.color : ButtonColor.PRIMARY}
      fullWidth={props.fullWidth}
      disabled={props.disabled && props.disabled}
      ref={ref}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      kind={props.kind ? props.kind : ButtonType.FORM}
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
          <div
            style={{
              height: "15px",
              width: "1px",
              background: color === ButtonColor.SECONDARY ? "#fff" : "#707070",
              marginLeft: "5px",
            }}
          ></div>
        </span>
      )}
      {props.text}
    </ButtonComponent>
  );
}

export default forwardRef<HTMLButtonElement, IButtonProps>(Button);
