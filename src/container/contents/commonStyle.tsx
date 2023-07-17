import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #dbdbdb;
  border-bottom: 2px solid #707070;

  div.button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 37px;
  }

  div.buttons {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .m_left {
    margin-right: 23.85%;
    align-items: center;
    gap: 8px;
  }

  .b_right {
    width: 5px;
    height: 35px;
    background: #707070;
  }

  &.h35 {
    height: 47px;
  }

  .ml30 {
    margin-left: 30px;
  }

  p {
    color: #0a0a0a;
    font-family: "SegoeUI";
    font-size: 14px;

    &.big {
      font-family: "NotoSansKRRegular";
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  gap: 0;
  height: calc(100% - 47px);
  width: 100%;
`;

export const WrapperContent = styled.div`
  gap: 0px;
  height: calc(100% - 47px);
  width: 100%;
`;

export const LeftSide = styled.div<{ width?: string }>`
  flex-grow: 1;
  overflow-x: auto;
`;

export const LeftSideEN = styled.div<{ width?: string }>`
  overflow-x: auto;
`;

export const RightSide = styled.div<{ width?: string }>`
  overflow-x: auto;
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #707070;
  padding: 11px 5px;
  margin-top: 3px;
  margin-left: 5px;

  &:hover {
    border-color: blue;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const FormSeaction = styled.div<{ topBorder: boolean }>`
  border-top: ${(props) => (props.topBorder ? "3px solid #707070;" : "none")};
  padding: 0px 10px 20px 10px;
`;

export const FormSectionTitle = styled.div`
  padding: 10px 0 10px 10px;
  display: flex;
  justify-content: space-between;

  h4 {
    img {
      padding-right: 10px;
    }
    display: flex;
    color: #1b8c8e;
  }
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
  width: fit-content;
  .title {
    border: 1px solid #d6d2ce;
    border-right: none;
    writing-mode: vertical-rl;
    text-align: center;
    font-size: 14px;
    width: 28px;
    letter-spacing: 11px;
    background: #f5f5f5;
    padding: 5px 3px 0 0;
  }
  table tbody tr td {
    height: 45px;
  }
`;
export const PaymentLineCnt1 = styled.div``;
export const PaymentLineCnt2 = styled.div``;
export const PaymentLineCnt3 = styled.div``;
