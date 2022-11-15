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

export const TableWrapper = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  border: 5px solid #707070;
  border-right: 3px solid #707070;
`;

export const DetailWrapper = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  border: 5px solid #707070;
  border-left: none;
  border-bottom: 4px solid #707070;
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
  display: flex;
  padding: 10px 0px;
  h4 {
    padding-left: 10px;
    color: #1b8c8e;
  }
`;
