import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #dbdbdb;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 6px 0 15px;
  border-bottom: 5px solid #707070;
  p {
    color: #0a0a0a;
    font-family: "SegoeUI";
    font-size: 12px;

    &.big {
      font-family: "NotoSansKRRegular";
      font-size: 14px;
      font-weight: bold;
      margin: 0 10px 0 15px;
    }
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  gap: 0px;
  height: calc(100% - 40px);
`;

export const LeftSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  border-right: 3px solid #707070;
`;

export const RightSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  overflow-y: auto;
`;
