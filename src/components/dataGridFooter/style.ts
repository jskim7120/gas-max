import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: 80px;
  right: 5px;
  left: 87px;

  background: #dbdbdb;
  height: 27px;
  display: flex;
  flex-direction: row;
  border-top: 5px solid #707070;

  .totalCnt {
    width: 77px;
    border-right: 3px solid #707070;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
`;
