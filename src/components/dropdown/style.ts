import styled from "styled-components";

export const DropDownWrapper = styled.div`
  position: relative;
`;

export const DropDownContent = styled.div<{
  isOpen: boolean;
  position: string;
  top?: string;
  right?: string;
}>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  border: 1px solid #707070;
  padding: 10px;

  ${(props) =>
    props.position === "top" &&
    `
    top: 77px;
    right: 0px;
    `}

  ${(props) =>
    props.position === "bottom" &&
    `
    
    `}
`;
