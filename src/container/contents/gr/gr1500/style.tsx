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
