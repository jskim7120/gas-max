import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #dbdbdb;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 15px;
  border-bottom: 5px solid #707070;

  p {
    color: #0a0a0a;
    font-family: "SegoeUI";
    font-size: 12px;
  }

  div.buttons {
    display: flex;
    alignitems: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
  height: calc(100% - 40px);
`;

export const WrapperContent = styled.div`
  height: calc(100% - 156px);
`;

export const TableWrapper = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  border-right: 3px solid #707070;
`;

export const DetailWrapper = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  overflow-y: auto;
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

export const SearchTopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  border-left: 5px solid #707070;
  border-bottom: 5px solid #707070;
  padding-bottom: 10px;
`;

export const FormSeaction = styled.div<{ topBorder: boolean }>`
  border-top: ${(props) => (props.topBorder ? "4px solid #707070;" : "none")};
  padding: 0px 10px 20px 10px;
`;

export const FormSectionTitle = styled.div`
  padding: 10px 0px;
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
