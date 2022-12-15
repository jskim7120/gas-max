import styled from "styled-components";

export const LeftSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  border-right: 3px solid #707070;
`;

export const RightSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  overflow-y: auto;
  .buttonsGr {
    display: flex;
    position: absolute;
    top: 87px;
    right: 11px;
    display: flex;
    align-items: center;
  }
`;
