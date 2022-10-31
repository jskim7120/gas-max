import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #dbdbdb;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 15px;
  border-left: 5px solid #707070;

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
  height: calc(100% - 37px);
`;

export const TableWrapper = styled.div`
  width: 50%;
  border: 5px solid #707070;
  border-right: 3px solid #707070;
  border-bottom: 3px solid #707070;
`;

export const DetailWrapper = styled.div`
  width: 50%;
  border: 5px solid #707070;
  border-left: none;
  border-bottom: 4px solid #707070;
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
