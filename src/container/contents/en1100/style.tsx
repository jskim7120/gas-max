import styled from "styled-components";

export const DetailHeader = styled.div`
  margin-top: 4px;
  background-color: #0098ff;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  p {
    color: #eef604;
    font-family: "NotoSansKRRegular";
    font-size: 18px;
  }

  div.buttons {
    display: flex;
    alignitems: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
  margin-top: 2px;
`;

export const TableWrapper = styled.div`
  width: 15%;
  height: 500px;
`;

export const DetailWrapper = styled.div`
  width: 85%;
`;
