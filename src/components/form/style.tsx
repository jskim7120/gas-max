import React, { useState } from "react";
import styled, { css } from "styled-components";
import { InputSize, FieldKind } from "components/componentsType";

export const getInputSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.xxs:
      return `30px`;
    case InputSize.xs:
      return `50px`;
    case InputSize.sm:
      return `100px`;
    case InputSize.en1300:
      return `130px`;
    case InputSize.md:
      return `250px`;
    case InputSize.md290:
      return `290px`;
    case InputSize.lg:
      return `425px`;
    case InputSize.xl:
      return `500px`;
    case InputSize.xxl:
      return `600px`;
  }
};

export const getInputKind = (kind?: FieldKind) => {
  switch (kind) {
    case FieldKind.BORDER:
      return {
        border: "1px solid #e6e5e5",
      };
    case FieldKind.RECTANGLE:
      return {
        border: "1px solid #e6e5e5",
        borderRadius: "0px",
      };
  }
};

export const getSelectSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.md:
      return {
        width: "100%",
      };
  }
};

interface IInputProps {
  type?: string;
  label?: string;
  name?: string;
  labelLong?: boolean;
  register?: any;
  errors?: any;
  inputSize?: InputSize;
  fullWidth?: boolean;
  grow?: boolean;
  value?: string;
  placeholder?: string;
  style?: any;
  className?: string;
  selectOption?: any;
  defaultValue?: any;
  optionSlt?: any;
  maxLength?: string;
  kind?: FieldKind;
  textAlign?: string;
  formatNumber?: string;
  labelStyle?: any;
  onChange?: Function;
}

export const Input = ({
  type,
  label,
  name,
  labelLong,
  register,
  errors,
  inputSize,
  fullWidth,
  value,
  placeholder,
  style,
  className,
  maxLength,
  kind,
  textAlign,
  formatNumber,
  labelStyle,
  onChange,
}: IInputProps) => {
  const [inputValue, setInputValue] = useState("");

  // format input value
  const handleInput = (e: any, forNum?: string) => {
    switch (forNum) {
      case "telNumber":
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setInputValue(formattedPhoneNumber);
        return;
      case "comDecNumber":
        const formattedDecNumber = formatNumFraction(e.target.value);
        setInputValue(formattedDecNumber);
        return;
      case "comNumber":
        const formattedNumber = formatNum(e.target.value);
        setInputValue(formattedNumber);
        return;
    }
  };

  // format number with fraction
  function formatNumFraction(value: any) {
    if (value == "" || !value) {
      return;
    }

    const val = value.replaceAll(",", "").replaceAll(".", "");
    if (val % 100 === 0) {
      value = val / 100 + ".00";
    } else {
      value = val / 100;
    }

    value = parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return value;
  }

  // format number with comma
  function formatNum(value: any) {
    if (!value) {
      value = 0;
      return value;
    }
    const number = parseFloat(value.replaceAll(",", ""));
    const forNum = number.toLocaleString();
    return forNum;
  }

  function formatPhoneNumber(value: any) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      5
    )}-${phoneNumber.slice(5, 10)}`;
  }
  return (
    <InputWrapper fullWidth={fullWidth}>
      <FormGroup className={className && className}>
        {/* {label !== undefined && <Label labelLong={labelLong}>{label}</Label>} */}
        {label !== undefined &&
          (label === "~" ? (
            <Label
              style={{ minWidth: "auto" }}
              labelLong={labelLong}
              className={className && className}
            >
              {label}
            </Label>
          ) : (
            <Label
              labelLong={labelLong}
              style={labelStyle && labelStyle}
              className={className && className}
            >
              {label}
            </Label>
          ))}
        {formatNumber ? (
          <InputForm
            id={register.name}
            type={type ? type : "text"}
            inputSize={inputSize && inputSize}
            fullWidth={fullWidth && fullWidth}
            {...register}
            value={formatNumber ? inputValue : value && value}
            placeholder={placeholder}
            style={style}
            className={className}
            maxLength={maxLength && maxLength}
            kind={kind && kind}
            textAlign={textAlign && textAlign}
            onChange={formatNumber ? (e) => handleInput(e, formatNumber) : null}
          />
        ) : (
          <InputForm
            id={register.name}
            type={type ? type : "text"}
            inputSize={inputSize && inputSize}
            fullWidth={fullWidth && fullWidth}
            {...register}
            value={formatNumber ? inputValue : value && value}
            placeholder={placeholder}
            style={style}
            className={className}
            maxLength={maxLength && maxLength}
            kind={kind && kind}
            textAlign={textAlign && textAlign}
            onChange={onChange && onChange}
          />
        )}
      </FormGroup>
      <ErrorText>{errors && errors}</ErrorText>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  flex: ${(props) => props.fullWidth && "1"};
`;

export const InputForm = styled.input<{
  inputSize?: InputSize;
  fullWidth?: boolean;
  kind?: FieldKind;
  textAlign?: string;
}>`
  height: 25px;
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "100%"};
  flex: ${(props) => props.fullWidth && "1"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  border-radius: ${(props) =>
    props.kind ? getInputKind(props.kind)?.borderRadius : "4px"};

  outline: none;
  display: inline-block;
  padding: 0 6px;
  font-family: "NotoSansKRRegular";
  font-size: 12px;

  &:hover,
  &:focus {
    border: 1px solid #e6e5e5;
    background: #fffacd;
  }

  &.login {
    border: 1px solid #bbb;
    font-size: 14px;
    &:hover,
    &:focus {
      background: #fff;
    }
  }

  &.small {
    height: 22px;
    margin: 2px;
  }

  border: ${(props) =>
    props.kind ? getInputKind(props.kind)?.border : "1px solid transparent"};
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  text-align: end;
  margin-right: 5px;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  input,
  select {
    margin: 5px 5px 5px 5px;
  }

  &.small {
    gap: 0;
  }

  &.jccenter {
    justify-content: center;
  }

  label.login {
    color: #707070;
    font-size: 12px;
    line-height: 21px;
  }
  span {
    font-size: 12px;
    line-height: 35px;
  }
`;

export const Label = styled.label<{ labelLong?: boolean; style?: any }>`
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  font-weight: 600;
  min-width: ${(props) => (props.labelLong ? "200px" : "105px")};
  height: 35px;
  text-align: right;
  padding: 7px 10px;
  background: #f5fcff;
  white-space: nowrap;

  &.small {
    text-align: center;
    height: 27px;
    margin: 0px;
    padding: 3px 0 0 0;
  }

  &.gray {
    background: rgba(104, 103, 103, 0.35);
  }

  &.green {
    background: #d3e175;
  }
  &.light-green {
    background: #ebf69c;
  }
  &.white {
    background: #fff;
  }

  &.brgray {
    border-right: 1px solid #e6e5e5;
  }
`;

export const Field = styled.div<{ flex?: boolean }>`
  display: ${(props) => props.flex && "flex"};

  p {
    font-family: "NotoSansKRRegular";
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  .gray-title {
    width: 55px;
    background: #e8ecf1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.outer-border {
    border: 1px solid #ccc;
  }

  &.rectangle {
    border: 1px solid rgba(187, 187, 187, 0.38);
    border-radius: 4px;
    background: rgba(104, 103, 103, 0.09);
    padding: 5px;

    label {
      min-width: 50px;
      font-family: "NotoSansKRRegular";
      font-size: 10px;
      background: #a7a7a7;
      border-radius: 2px;
      padding: 1px 2px;
      color: #fff;
      text-align: center;
    }
  }
  &.br {
    border-right: 1px solid #e6e5e5;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: #000;
`;
export const DividerGray = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e5e5;
`;

export const DividerDark = styled.div`
  height: 1px;
  width: 100%;
  background: #ccc;
`;

export const Wrapper = styled.div<{
  column?: boolean;
  gap?: string;
  padding?: string;
  grid?: boolean;
  col?: number;
  bg?: string;
  fields?: string;
}>`
  width: 100%;
  display: ${(props) => (props.grid ? "grid" : "flex")};
  flex-wrap: ${(props) => props.grid && "wrap"};
  flex-basis: ${(props) => props.grid && "auto"};

  flex-direction: ${(props) =>
    !props.grid && props.column ? "column" : "row"};
  grid-template-columns: ${(props) =>
    props.grid && `repeat(${props.col ? props.col : "3"},1fr)`};
  grid-template-columns: ${(props) =>
    props.grid && props.fields && `${props.fields}`};
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  background: ${(props) => (props.bg ? props.bg : "transparent")};
  align-items: ${(props) => props.grid && "center"};
`;

export const Select = styled.select<{
  kind?: FieldKind;
  size?: InputSize;
  fullWidth?: boolean;
  textAlign?: string;
}>`
  height: 25px;
  border-radius: 4px;

  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  min-width: 130px;

  &:hover,
  &:focus {
    border: 1px solid #e6e5e5;
    background: #fffacd;
  }
  option {
    background: #fff;
  }

  border: ${(props) =>
    props.kind ? getInputKind(props.kind)?.border : "1px solid transparent"};

  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
`;

export const InfoDesc = styled.div`
  display: flex;
  margin-left: 20px;
  span {
    font-size: 12px;
    color: #1b8c8e;
  }
`;

export const PaymentLineCnt = styled.div`
  display: flex;
  border: 1px solid #bbbbbb;
  width: 632px;
  .title {
    writing-mode: vertical-rl;
    text-align: center;
    font-size: 14px;
    width: 22px;
    height: 78px;
    letter-spacing: 11px;
    background: rgba(104, 103, 103, 0.35);
  }
  table tbody tr td {
    height: 45px;
  }
`;

// export const TextArea = styled.textarea<{}>``;
