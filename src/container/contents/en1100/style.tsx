import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #ececec;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  p {
    color: #0057aa;
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
  //margin-top: 2px;
`;

export const TableWrapper = styled.div`
  width: 15%;
  height: 500px;
`;

export const DetailWrapper = styled.div`
  width: 85%;
`;
