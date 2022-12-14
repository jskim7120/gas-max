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
    case InputSize.i150:
      return `150px`;
    case InputSize.i175:
      return `175px`;
    case InputSize.i200:
      return `200px`;
    case InputSize.xxs:
      return `30px`;
    case InputSize.xs:
      return `60px`;
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
  formatNumber?: string;
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
  formatNumber,
}: IInputProps) => {
  // const [inputValue, setInputValue] = useState("123");
  // const [formatNumberic, setFormatNumberic] = useState({
  //   value: "" as any,
  //   status: false,
  // });

  // useEffect(() => {
  //   if (codeFormatNumber?.clear) {
  //     setFormatNumberic({
  //       value: "",
  //       status: false,
  //     });
  //   } else if (codeFormatNumber?.numbericDefValue === 0) {
  //     setFormatNumberic({
  //       value: 0,
  //       status: false,
  //     });
  //   } else {
  //     setFormatNumberic({
  //       value: codeFormatNumber?.numbericDefValue,
  //       status: false,
  //     });
  //   }
  // }, [codeFormatNumber]);

  // format input value
  // const handleInput = (e: any, forNum?: string) => {
  //   console.log("e: forNum", e, forNum);
  //   switch (forNum) {
  //     case "telNumber":
  //       const formattedPhoneNumber = formatPhoneNumber(e.target.value);
  //       setInputValue(formattedPhoneNumber);
  //       return;
  //     case "comDecNumber":
  //       const formattedDecNumber = formatNumFraction(e.target.value);
  //       setInputValue(formattedDecNumber);
  //       return;
  //     case "comNumber":
  //       const formattedNumber = formatNum(e.target.value);
  //       setInputValue(formattedNumber);
  //       return;
  //     case "corpNumber":
  //       const formattedCorpNumber = formatCorporateNumber(e.target.value);
  //       setInputValue(formattedCorpNumber);
  //       return;
  //     case "usegbichigdehgui":
  //       const xsx = formatCodeNumber(e.target.value);
  //       setInputValue(xsx);
  //       return;
  //   }
  // };

  // // format number with fraction
  // function formatNumFraction(value: any) {
  //   if (value == "" || !value) {
  //     return;
  //   }

  //   const val = value.replaceAll(",", "").replaceAll(".", "");
  //   if (val % 100 === 0) {
  //     value = val / 100 + ".00";
  //   } else {
  //     value = val / 100;
  //   }

  //   value = parseFloat(value).toLocaleString(undefined, {
  //     minimumFractionDigits: 2,
  //   });
  //   return value;
  // }

  // // format number with comma
  // function formatNum(value: any) {
  //   if (!value) {
  //     value = 0;
  //     return value;
  //   }
  //   const number = parseFloat(value.replaceAll(",", ""));
  //   const forNum = number.toLocaleString();
  //   return forNum;
  // }

  // function formatPhoneNumber(value: any) {
  //   if (!value) return value;
  //   const phoneNumber = value.replace(/[^\d]/g, "");
  //   const phoneNumberLength = phoneNumber.length;
  //   if (phoneNumberLength < 4) return phoneNumber;
  //   if (phoneNumberLength < 6) {
  //     return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  //   }
  //   return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
  //     3,
  //     5
  //   )}-${phoneNumber.slice(5, 10)}`;
  // }

  // const formatCodeNumber = (value: any) => {
  //   // return setFormatNumberic({
  //   //   value: e.replace(/[a-zA-Z]/, ""),
  //   //   status: true,
  //   // });
  //   return value.replace(/[a-zA-Z]/, "");
  // };
  // function formatCorporateNumber(value: any) {
  //   if (!value) return value;
  //   const corpNumber = value.replace(/[^\d]/g, "");
  //   const corpNumberLength = corpNumber.length;
  //   if (corpNumberLength < 7) return corpNumber;
  //   return `${corpNumber.slice(0, 6)}-${corpNumber.slice(6, 13)}`;
  // }

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
}>`
  height: 25px;
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "100%"};
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
  font-size: 12px;

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
}>`
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

  .maskedInput {
    ${InputCommonProp};
  }
`;

export const Label = styled.label<{
  labelLong?: boolean;
  style?: any;
  align?: string;
}>`
  text-align: ${(props) => props.align + "!important"};
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  font-weight: 550;
  min-width: ${(props) => (props.labelLong ? "200px" : "105px")};
  height: 25px;
  text-align: right;
  padding: 3px 10px;
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
    text-align: center;
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
  height: 25px;
  border-radius: 4px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  border: 1px solid #e6e5e5;
  background: aliceblue;

  &:hover,
  &:focus {
    background: #fffacd;
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
  height: 25px;
  border: 1px solid rgb(188, 185, 185);
  border-radius: 4px;
  background: aliceblue;

  padding: 0 6px;
  margin: 0 5px;

  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 12px;

  &:hover {
    border: 1px solid #e6e5e5;
    background: #fffacd;
  }
`;
