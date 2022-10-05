import styled, { css } from "styled-components";
import { InputSize } from "components/componentsType";

export const getInputSize = (size?: InputSize) => {
  switch (size) {
    case InputSize.sm:
      return `60px`;
    case InputSize.md:
      return `250px`;
    case InputSize.lg:
      return `572px`;
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

export const InputForm = styled.input<{
  inputSize?: InputSize;
}>`
  height: 25px;
  border-radius: 4px;
  border: 1px solid #bbb;
  // border: none;
  outline: none;
  display: inline-block;
  padding: 0 6px;
  width: ${(props) =>
    props.inputSize ? getInputSize(props.inputSize) : "150px"};
  &:hover,
  &:focus {
    border: 1px solid #bbb;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  text-align: end;
`;

export const Select = styled.select`
  height: 25px;
  border-radius: 4px;
  border: 1px solid #bbb;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  //justify-content: center;
`;

export const Field = styled.div`
  margin-bottom: 8px;

  label.login {
    color: #707070;
    font-size: 12px;
  }
`;

export const Label = styled.label`
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  min-width: 100px;
  text-align: right;
  padding-right: 10px;
`;

export const FormInline = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
export const FormBlock = styled.div`
  display: block;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(104, 103, 103, 0.21);
  margin: 0px 0 5px 0;
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
`;
