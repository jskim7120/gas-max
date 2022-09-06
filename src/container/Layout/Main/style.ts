import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  margin-left: 5px;
  & > div:first-child {
    border: 3px solid #cccccc;
    padding: 0px 9px 0px 15px;
    div: first-child {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div: nth-child(1) {
        width: 38px;
        height: 20px;
        border-radius: 15px;
        border: 3px solid black;
        div {
          border: 3px solid #40bf40;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          margin-left: 2px;
        }
      }
      ul {
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 645px;
        list-style: none;
        font-size: 22px;
        left: 103px;
      }
      div: nth-child(3) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 110px;
      }
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
