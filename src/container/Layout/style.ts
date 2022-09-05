import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 10px;
`;

export const LeftSide = styled.div`
  width: 400px;
  border: 2px solid green;
  padding: 10px;
  position: relative;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Middle = styled.div`
  border: 2px solid #63ce94;
  width: auto;
  height: 600px;
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;

  span {
    svg {
      margin: 1px 10px 0;
    }
  }

  .time {
    background: #e96220;
    border-radius: 5px;
    height: 24px;
    padding: 0 7px;
    color: #fff;
  }
`;
