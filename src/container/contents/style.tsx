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
    button: hover {
      background: #1ec5df;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
`;

export const TableWrapper = styled.div`
  width: 50%;
  height: 80vh;
  border: 5px solid #626161;
  border-right: 3px solid #626161;
  border-left: none;
`;

export const DetailWrapper = styled.div`
  width: 50%;
  border: 5px solid #626161;
  border-left: none;
`;
