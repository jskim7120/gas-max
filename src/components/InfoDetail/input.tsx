import styled from "styled-components";

interface ICustomInput {
  id: string;
  type: string;
  defaultValue: any;
  onChange: (arg: any) => void;
}

export const CustomInput = ({
  onChange,
  type,
  defaultValue,
  id,
}: ICustomInput) => {
  return (
    <Input
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
      id={id}
    />
  );
};

const Input = styled.input``;
