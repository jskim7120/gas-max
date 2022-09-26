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
      div: nth-child(3) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 110px;
      }
    }

    header {
      height: 58px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07),
        0 1px 2px 0 rgba(0, 0, 0, 0.05);
      color: #212529;
    }

    .nav-area {
      display: flex;
      align-items: center;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 20px;
      height: 58px;
    }

    .logo {
      text-decoration: none;
      font-size: 25px;
      color: inherit;
      margin-right: 20px;
    }
  }
`;
