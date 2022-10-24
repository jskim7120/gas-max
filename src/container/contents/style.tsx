import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #dbdbdb;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 15px;

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
  height: calc(100% - 32px);
`;

export const TableWrapper = styled.div`
  width: 50%;
  // height: 80vh;
  border: 5px solid #707070;
  border-right: 3px solid #707070;
  border-left: none;
  border-bottom: 3px solid #707070;
`;

export const DetailWrapper = styled.div`
  width: 50%;
  border: 5px solid #707070;
  border-left: none;
  border-bottom: 4px solid #707070;
`;
