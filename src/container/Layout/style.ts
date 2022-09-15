import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: calc(100%-400px);
  padding: 10px;
`;

export const LeftSide = styled.div`
  width: 400px;
  border: 3px solid #004080;
  padding: 15px;
  position: relative;
`;

export const Navigation = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 0;
    margin-bottom: 2px;
  }
`;
export const Middle = styled.div`
  border: 3px solid #2eb82e;
  width: auto;
  flex: 1;
  margin-top: 15px;
  padding: 15px;
  div:first-child {
    display: flex;
  }
  svg {
    margin-right: 3px;
  }

  .fav_menu_item {
    margin-top: 5px;
    a {
      font-size: 14px;
      text-decoration: none;
      color: black;
      font-weight: 400;
      &:hover {
        background-color: #f2f2f2;
      }
      padding: 5px 0px;
    }
  }
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;

  span {
    svg {
      margin: 1px 10px 0;
    }
  }

  .time {
    background: #e96220;
    border-radius: 10px;
    height: 24px;
    padding: 0 7px;
    color: #fff;
  }
`;
