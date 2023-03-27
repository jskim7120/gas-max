import React from "react";
import styled, { css } from "styled-components";
import { InputSize, FieldKind } from "components/componentsType";
import MaskedInput from "react-text-mask";

export const getInputSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.i40:
      return `40px`;
    case InputSize.i50:
      return `50px`;
    case InputSize.i60:
      return `60px`;
    case InputSize.i70:
      return `70px`;
    case InputSize.i80:
      return `80px`;
    case InputSize.i85:
      return `85px`;
    case InputSize.i90:
      return `90px`;
    case InputSize.i100:
      return `100px`;
    case InputSize.i110:
      return `110px`;
    case InputSize.i120:
      return `120px`;
    case InputSize.i130:
      return `130px`;
    case InputSize.i140:
      return `140px`;
    case InputSize.i145:
      return `145px`;
    case InputSize.i150:
      return `150px`;
    case InputSize.i175:
      return `175px`;
    case InputSize.i180:
      return `180px`;
    case InputSize.i200:
      return `200px`;
    case InputSize.i250:
      return `250px`;
    case InputSize.i290:
      return `290px`;
    case InputSize.i300:
      return `300px`;
    case InputSize.i367:
      return `367px`;
    case InputSize.i400:
      return `400px`;
    case InputSize.i468:
      return `468px`;
    case InputSize.i500:
      return `500px`;
    case InputSize.i515:
      return `515px`;
    case InputSize.i550:
      return `550px`;
    case InputSize.i616:
      return `616px`;
    case InputSize.xxs:
      return `30px`;
    case InputSize.xs:
      return `60px`;
    case InputSize.sm:
      return `100px`;
    case InputSize.md:
      return `250px`;
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
        border: "1px solid rgb(188, 185 ,185)",
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
  value?: string | number;
  placeholder?: string;
  style?: any;
  className?: string;
  selectOption?: any;
  defaultValue?: any;
  optionSlt?: any;
  maxLength?: any;
  minLength?: string;
  kind?: FieldKind;
  textAlign?: string;
  labelStyle?: any;
  onChange?: any;
  readOnly?: boolean;
  mask?: any;
  minWidth?: InputSize;
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
  minLength,
  kind,
  textAlign,

  labelStyle,
  onChange,
  readOnly,
  mask,
  minWidth,
}: IInputProps) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      <FormGroup
        className={className && className}
        inputSize={inputSize}
        fullWidth={fullWidth}
        kind={kind}
        textAlign={textAlign}
        minWidth={minWidth && minWidth}
      >
        {label !== undefined && (
          <Label
            labelLong={labelLong}
            style={labelStyle && labelStyle}
            className={className && className}
          >
            {label}
          </Label>
        )}

        {mask ? (
          <MaskedInput
            mask={mask}
            value={value}
            onChange={onChange}
            name={name}
            guide={false}
            readOnly={readOnly}
            className="maskedInput"
            maxLength={maxLength}
            type={type ? type : "text"}
          />
        ) : (
          <InputForm
            id={register?.name}
            type={type ? type : "text"}
            inputSize={inputSize && inputSize}
            fullWidth={fullWidth && fullWidth}
            {...register}
            value={value && value}
            placeholder={placeholder}
            style={style}
            className={className}
            maxLength={maxLength && maxLength}
            minLength={minLength && minLength}
            kind={kind && kind}
            textAlign={textAlign && textAlign}
            readOnly={readOnly}
            onChange={onChange}
            minWidth={minWidth && minWidth}
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

const InputCommonProp = css<{
  inputSize?: InputSize;
  fullWidth?: boolean;
  kind?: FieldKind;
  textAlign?: string;
  minWidth?: InputSize;
}>`
  height: 30px;
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "100%"};
  min-width: ${(props) =>
    props.minWidth ? getInputSize(props.minWidth) : "auto"};
  flex: ${(props) => props.fullWidth && "1"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  border: ${(props) =>
    props.kind
      ? getInputKind(props.kind)?.border
      : `1px solid rgb(188, 185 ,185)`};
  background: aliceblue;
  border-radius: ${(props) =>
    props.kind ? getInputKind(props.kind)?.borderRadius : "4px"};

  outline: none;
  display: inline-block;
  padding: 0 6px;
  font-family: "NotoSansKRRegular";
  font-size: 15px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:hover,
  &:focus {
    background: #fffacd;
  }
  &:read-only {
    background: #ebeae6;
  }
`;

export const InputForm = styled.input<{
  inputSize?: InputSize;
  fullWidth?: boolean;
  kind?: FieldKind;
  textAlign?: string;
  readOnly?: boolean;
  minWidth?: InputSize;
}>`
  ${InputCommonProp};

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

  &.h27 {
    height: 27px;
  }

  &:read-only {
    // border: none;
    // background: transparent;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  text-align: end;
  margin-right: 5px;
`;

export const FormGroup = styled.div<{
  //edgeer propsuud zuvhun maskedInput-d heregtei
  inputSize?: InputSize;
  fullWidth?: boolean;
  kind?: FieldKind;
  textAlign?: string;
  minWidth?: InputSize;
}>`
  display: flex;
  align-items: center;
  //gap: 4px;

  input,
  select {
    margin: 3px;
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
    font-size: 15px;
    line-height: 35px;
  }

  .maskedInput {
    ${InputCommonProp};
  }

  p {
    font-family: "NotoSansKRRegular";
    font-size: 15px;

    &.blue {
      color: #0a2afb;
    }
  }
`;

export const Label = styled.label<{
  labelLong?: boolean;
  style?: any;
  align?: string;
}>`
  text-align: ${(props) => props.align + "!important"};
  font-family: "NotoSansKRRegular";
  font-size: 15px;
  font-weight: 550;
  min-width: ${(props) => (props.labelLong ? "200px" : "120px")};
  height: 30px;
  text-align: right;
  padding: 3px 7px 0px 0px;
  background: transparent;
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

  &.lable-check {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
`;

export const Field = styled.div<{ flex?: boolean; fullWidth?: boolean }>`
  display: ${(props) => props.flex && "flex"};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  p {
    font-family: "NotoSansKRRegular";
    font-size: 15px;
    display: flex;
    align-items: center;
  }

  .gray-title {
    width: 65px;
    background: #e8ecf1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &.outer-border {
    border: 1px solid #ccc;
  }

  .cm1105Label {
    label {
      min-width: 150px;
    }
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
  height: 2px;
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
  width?: InputSize;
  fullWidth?: boolean;
  textAlign?: string;
}>`
  height: 30px;
  border-radius: 4px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 15px;
  border: 1px solid #e6e5e5;
  background: aliceblue;

  &.h27 {
    height: 27px;
  }

  &:hover,
  &:focus {
    background: #fffacd;
  }

  &:disabled {
    background: #ebeae6;
  }

  option {
    background: #fff;
  }

  border: ${(props) =>
    props.kind
      ? getInputKind(props.kind)?.border
      : `1px solid rgb(188, 185 ,185)`};
  width: ${(props) =>
    props.fullWidth
      ? "100%"
      : props.width
      ? getInputSize(props.width)
      : "auto"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
`;

export const TextArea = styled.textarea`
  border: 1px solid transparent;
  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  box-sizing: border-box;

  &:hover {
    border: 1px solid #e6e5e5;
    background: #fffacd;
  }
`;

export const Input2 = styled.input<{ inputSize?: InputSize }>`
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "50px"};
  height: 30px;
  border: 1px solid rgb(188, 185, 185);
  border-radius: 4px;
  background: aliceblue;

  padding: 0 6px;
  margin: 0 5px;

  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 15px;

  &:hover {
    border: 1px solid #e6e5e5;
    background: #fffacd;
  }
`;

interface IInputLoginProps {
  type?: string;
  label?: string;
  register?: any;
  errors?: any;
  inputSize?: InputSize;
  fullWidth?: boolean;
  value?: string | number;
  placeholder?: string;
  style?: any;
  className?: string;
  kind?: FieldKind;
  textAlign?: string;
}

export const InputLogin = ({
  type,
  label,
  register,
  errors,
  inputSize,
  fullWidth,
  value,
  placeholder,
  style,
  className,
  kind,
  textAlign,
}: IInputLoginProps) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      <FormGroup
        className={className && className}
        inputSize={inputSize}
        fullWidth={fullWidth}
        kind={kind}
        textAlign={textAlign}
      >
        {label !== undefined && (
          <Label className={className && className}>{label}</Label>
        )}
        <InputForm
          id={register?.name}
          type={type ? type : "text"}
          inputSize={inputSize && inputSize}
          fullWidth={fullWidth && fullWidth}
          {...register}
          value={value && value}
          placeholder={placeholder}
          style={style}
          className={className}
          kind={kind && kind}
          textAlign={textAlign && textAlign}
        />
      </FormGroup>
      <ErrorText>{errors && errors}</ErrorText>
    </InputWrapper>
  );
};

export const BottomStyleDiv = styled.div<{ bottomSize?: InputSize }>`
  bottom: ${(props) =>
    props.bottomSize ? getInputSize(props.bottomSize) : "80px"};
  position: absolute;
  padding: 10px;
`;

export const ParagraphBorderBotton = styled.div`
  border-bottom : 1px solid
  width: 100%;
`;

export const StcTable = styled.table`
  width: 330px;
  height: 147px;
  font-size: 15px;
  position: absolute;
  right: 0;
  bottom: 80px;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #707070;
    font-weight: 500;
    p {
      text-align: center;
    }
  }
`;
