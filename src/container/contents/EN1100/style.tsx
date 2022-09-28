import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
`;

export const TableWrapper = styled.div`
  width: 15%;
  height: 500px;
`;

export const DetailWrapper = styled.div`
  width: 85%;
`;

export const DetailHeader = styled.div`
  background-color: #0098ff;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  p {
    color: #eef604;
    fontfamily: "NotoSansKRRegular";
    fontsize: 18px;
  }
`;
