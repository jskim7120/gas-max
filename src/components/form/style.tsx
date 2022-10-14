import styled, { css } from "styled-components";
import { InputSize } from "components/componentsType";
import { Path, UseFormRegister, FieldError } from "react-hook-form";
import { IFormProps } from "container/contents/en1100/type";

export const getInputSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.sm:
      return `60px`;
    case InputSize.md:
      return `250px`;
    case InputSize.lg:
      return `425px`;
    case InputSize.xl:
      return `500px`;
  }
};

export const Input = styled.input<{
  inputSize?: InputSize;
}>`
  height: 25px;
  border-radius: 4px;
  border: 1px solid #bbb;
  outline: none;
  display: inline-block;
  padding: 0 6px;
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "150px"};
`;

interface IInputProps {
  type?: string;
  label?: string;
  labelLong?: boolean;
  // name: Path<IFormProps>;
  // register: UseFormRegister<IFormProps>;
  // errors?: FieldError | any;
  name: any;
  register: any;
  errors?: any;
  inputSize?: InputSize;
  fullWidth?: boolean;
  grow?: boolean;
}

export const InputTest = ({
  type,
  label,
  labelLong,
  name,
  register,
  errors,
  inputSize,
  fullWidth,
}: IInputProps) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      <FormGroup>
        {label !== undefined && <Label labelLong={labelLong}>{label}</Label>}
        <InputForm
          type={type ? type : "text"}
          inputSize={inputSize && inputSize}
          fullWidth={fullWidth && fullWidth}
          {...register(name)}
        />
      </FormGroup>
      <p
        style={{
          color: "red",
          fontSize: "12px",
          textAlign: "end",
          marginRight: "7px",
        }}
      >
        {errors && errors[name]?.message}
      </p>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  flex: ${(props) => props.fullWidth && "1"};
`;

export const InputForm = styled.input<{
  inputSize?: InputSize;
  fullWidth?: boolean;
}>`
  height: 25px;
  border-radius: 4px;
  border: none;
  outline: none;
  display: inline-block;

  flex: ${(props) => props.fullWidth && "1"};
  padding: 0 6px;
  &:hover,
  &:focus {
    border: 1px solid #e6e5e5;
    background: #fdf0e8;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  text-align: end;
  margin-right: 5px;
`;

export const Select = styled.select`
  height: 25px;
  border-radius: 4px;
  border: none;
  outline: none;
  &:hover,
  &:focus {
    border: 1px solid #e6e5e5;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: stretch;
  gap: 4px;

  input,
  select {
    margin: 5px 4px 5px 5px;
  }

  label.login {
    color: #707070;
    font-size: 12px;
    line-height: 21px;
  }
`;

export const Label = styled.label<{ labelLong?: boolean }>`
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  font-weight: 600;
  min-width: ${(props) => (props.labelLong ? "200px" : "100px")};
  text-align: right;
  padding: 7px 10px;
  background: #f9f9f9;
`;

export const Field = styled.div``;

export const FormInline = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
export const FormBlock = styled.div`
  display: block;
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
}>`
  width: 100%;
  display: ${(props) => (props.grid ? "grid" : "flex")};
  flex-wrap: ${(props) => props.grid && "wrap"};
  flex-basis: ${(props) => props.grid && "auto"};

  flex-direction: ${(props) =>
    !props.grid && props.column ? "column" : "row"};
  grid-template-columns: ${(props) =>
    props.grid && `repeat(${props.col ? props.col : "3"}, 1fr)`};
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  background: ${(props) => (props.bg ? props.bg : "transparent")};
  align-items: ${(props) => props.grid && "center"};
`;
