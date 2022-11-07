import styled, { css } from "styled-components";
import { InputSize, FieldKind } from "components/componentsType";

// import {
//   Path,
//   UseFormRegister,
//   FieldError,
//   FieldValues,
// } from "react-hook-form";
// import { IFormProps } from "container/contents/en1100/type";

export const getInputSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.sm:
      return `100px`;
    case InputSize.en1300:
      return `130px`;
    case InputSize.md:
      return `250px`;
    case InputSize.lg:
      return `425px`;
    case InputSize.xl:
      return `500px`;
  }
};

export const getInputKind = (kind?: FieldKind) => {
  switch (kind) {
    case FieldKind.BORDER:
      return {
        border: "1px solid #e6e5e5",
      };
  }
};

interface IInputProps {
  // name: Path<IFormProps>;
  // register: UseFormRegister<IFormProps>;
  // errors?: FieldError | any;
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
}: IInputProps) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      <FormGroup>
        {/* {label !== undefined && <Label labelLong={labelLong}>{label}</Label>} */}
        {label !== undefined &&
          (label === "~" ? (
            <Label style={{ minWidth: "auto" }} labelLong={labelLong}>
              {label}
            </Label>
          ) : (
            <Label labelLong={labelLong}>{label}</Label>
          ))}
        <InputForm
          type={type ? type : "text"}
          inputSize={inputSize && inputSize}
          fullWidth={fullWidth && fullWidth}
          {...register}
          value={value && value}
          placeholder={placeholder}
          style={style}
          className={className}
          maxLength={maxLength && maxLength}
          kind={kind && kind}
          textAlign={textAlign && textAlign}
        />
      </FormGroup>
      <ErrorText>{errors && errors}</ErrorText>
    </InputWrapper>
  );
};
export const SelectCom = ({
  label,
  labelLong,
  errors,
  selectOption,
  defaultValue,
}: IInputProps) => {
  return (
    <div>
      <FormGroup>
        {label !== undefined && <Label labelLong={labelLong}>{label}</Label>}
        <Select value={defaultValue} onChange={() => {}}>
          {selectOption?.map((obj: any, idx: any) => (
            <option key={idx} value={obj.code1}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ErrorText>{errors && errors}</ErrorText>
    </div>
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
  border-radius: 4px;
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
    border: 1px solid #e8ecf1;
    // border-left: 1px solid #e8ecf1;
    // border-top: 1px solid #000;
    // border-bottom: 1px solid #000;
  }
  &.rectangle {
    border: 1px solid rgba(187, 187, 187, 0.38);
    border-radius: 4px;
    background: rgba(104, 103, 103, 0.09);
    padding: 5px;

    label {
      font-family: "NotoSansKRRegular";
      font-size: 10px;
      background: #a7a7a7;
      border-radius: 2px;
      padding: 1px 2px;
      color: #fff;
    }
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

export const Select = styled.select<{ kind?: FieldKind }>`
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
