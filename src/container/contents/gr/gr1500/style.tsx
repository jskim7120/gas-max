import styled from "styled-components";
export const Grid1Container = styled.div`
  width: 76%;
  display: flex;
  flex-direction: column;
  border-right: 4px solid #707070;
`;
export const Grid2Container = styled.div`
  width: 24%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #707070;
  padding-top: 6px;
`;
export const Table1Wrapper = styled.div`
  height: 45%;
`;
export const Detail1Wrapper = styled.div`
  .addr2 {
    font-size: 12px;
    font-weight: 400;
  }
`;
export const Detail2Wrapper = styled.div`
  margin-top: 9px;
  .buttons {
    position: absolute;
    right: 12px;
    top: 88px;
    display: flex;
    gap: 8px;
  }
`;
export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
`;
export const FormTitle = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 3px;
  margin-left: 16px;
  cursor: pointer;
  p {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
  }
  img {
    width: 14px;
    height: 17px;
  }
`;
export const UpdateButtonsContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 12px;
  display: flex;
  align-items: center;
`;
export const BorderRight = styled.div`
  width: 5px;
  height: 35px;
  background: #707070;
`;
export const Container = styled.div`
  display: flex;
  margin-top: -3px;
`;
export const SubContainer = styled.div`
  width: 77%;
`;
export const FormContainer = styled.div`
  height: 39px;
  width: 100%;
  background: #dbdbdb;
  border-bottom: 3px solid #707070;
`;
export const FormHeadCnt = styled.div`
  height: 37px;
  border-bottom: 2px solid #707070;
`;
export const DividerGrayGR = styled.div`
  height: 1px;
  background: rgba(130, 128, 128, 0.64);
  width: 275px;
  margin: 4px 0px 4px 39px;
`;
export const DividerGR = styled.div`
  height: 2px;
  background: #707070;
  width: 276px;
  margin: 4px 0px 4px 39px;
`;
