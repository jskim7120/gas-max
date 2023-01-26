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
      fontSize: "14px",
      fontFamily: "SegoeUI",
      fontWeight: "normal",
      height: "25px",
      padding: "0 5px",
      lineHeight: "13px",
      lineMarginLeft: "5px",
      iconMarginRight: "7px",
    };

    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#17A2B8";
      attributes.color = "#FFF";
      attributes.bgHover = "#1EC5DF";
      attributes.lineColor = "#fff";
    }
    if (color === ButtonColor.SECONDARY) {
      attributes.bg = "linear-gradient(#FFB300, #E67F09)";
      attributes.color = "#FFF";
      attributes.bgHover =
        "linear-gradient(#F5D998 5%, #F4D38E 10%, #F3CD85 15%, #F2C77B 20%, #F1C171 25%, #F0BC69 30%, #E67F09 100%)";
      attributes.lineColor = "#fff";
    }
    if (color === ButtonColor.WARNING) {
      attributes.bg = "linear-gradient(#FF4E00, #7A1710)";
      attributes.color = "#FFF";
      attributes.lineColor = "#fff";
    }
    if (color === ButtonColor.SUCCESS) {
      attributes.bg = "linear-gradient(#96E165, #19953A)";
      attributes.color = "#FFF";
      attributes.lineColor = "#fff";
    }
    if (color === ButtonColor.LIGHT) {
      attributes.bg = "linear-gradient(#FFFFFF, #CFCFCF)";
      attributes.color = "#0A0A0A";
      attributes.lineColor = "#707070";
    }
    if (color === ButtonColor.DANGER) {
      attributes.bg = "#FF6600";
      attributes.color = "#FFF";
      attributes.lineColor = "#FFF";
    }
  } else if (kind === ButtonType.LOGIN) {
    attributes = {
      borderRad: "4px",
      fontSize: "16px",
      fontFamily: "NotoSansKRRegular",
      fontWeight: "normal",
      height: "40px",
      padding: "0 5px",
      lineHeight: "13px",
      lineMarginLeft: "5px",
      iconMarginRight: "7px",
    };

    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#0098FF";
      attributes.border = "#0098FF";
      attributes.color = "#fff";
      attributes.lineColor = "#fff";
    } else if (color === ButtonColor.SECONDARY) {
      attributes.bg = "#9A9A9A";
      attributes.border = "#9A9A9A";
      attributes.color = "#fff";
      attributes.lineColor = "#fff";
    }
  } else if (kind === ButtonType.ROUND) {
    attributes = {
      borderRad: "15px",
      fontSize: "12px",
      fontFamily: "NotoSansKRRegular",
      fontWeight: "normal",
      height: "30px",
      padding: "0 8px",
      lineHeight: "16px",
      lineMarginLeft: "6px",
      iconMarginRight: "3px",
    };
    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#FF0000";
      attributes.border = "#FF0000";
      attributes.color = "#fff";
      attributes.lineColor = "#fff";
    } else if (color === ButtonColor.SECONDARY) {
      attributes.bg = "#ECECEC";
      attributes.border = "#707070";
      attributes.color = "#0A0A0A";
      attributes.lineColor = "#707070";
    }
  } else if (kind === ButtonType.SQUARE_BIG) {
    attributes = {
      borderRad: "4px",
      fontSize: "14px",
      fontFamily: "SegoeUI",
      fontWeight: "500",
      height: "30px",
      padding: "0 6px",
      lineHeight: "0px",
      lineMarginLeft: "0px",
      iconMarginRight: "5px",
    };
    if (color === ButtonColor.PRIMARY) {
      attributes.bg = "#5284CE";
      attributes.border = "#5284CE";
      attributes.color = "#fff";
      attributes.lineColor = "#fff";
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
      width: ${props.fullWidth ? "100%" : "auto"};
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${BtnAttribute(props.kind, props.color).fontFamily};
      font-size: ${BtnAttribute(props.kind, props.color).fontSize};
      font-weight: ${BtnAttribute(props.kind, props.color)?.fontWeight};
      text-decoration: none;
      border-radius: 2px;
      transition: all 0.3s ease;
      box-sizing: border-box;
      background: ${BtnAttribute(props.kind, props.color).bg};
      border: 1px solid ${BtnAttribute(props.kind, props.color).border};
      border-radius: ${BtnAttribute(props.kind, props.color).borderRad};
      color: ${BtnAttribute(props.kind, props.color).color};
      padding: ${BtnAttribute(props.kind, props.color).padding};
      &:hover {
        background: ${BtnAttribute(props.kind, props.color).bgHover};
      }
      &:focus {
        //background-color: #5284ce;
      }
      &:disabled {
        background-color: #5284ce;
        cursor: default;
      }
      line-height: 12px;
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
  withoutLine?: boolean;
  loader?: React.ReactNode;
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
            marginRight: BtnAttribute(
              props.kind ? props.kind : ButtonType.FORM,
              props.color ? props.color : ButtonColor.PRIMARY
            ).iconMarginRight,
          }}
        >
          {props.icon}
          {!props.withoutLine && (
            <div
              style={{
                height: BtnAttribute(
                  props.kind ? props.kind : ButtonType.FORM,
                  props.color ? props.color : ButtonColor.PRIMARY
                ).lineHeight,
                width: "1px",

                background: BtnAttribute(
                  props.kind ? props.kind : ButtonType.FORM,
                  props.color ? props.color : ButtonColor.PRIMARY
                ).lineColor,
                marginLeft: BtnAttribute(
                  props.kind ? props.kind : ButtonType.FORM,
                  props.color ? props.color : ButtonColor.PRIMARY
                ).lineMarginLeft,
              }}
            ></div>
          )}
        </span>
      )}

      {props.loader && props.loader}
      {props.text}
    </ButtonComponent>
  );
}

export default forwardRef<HTMLButtonElement, IButtonProps>(Button);
