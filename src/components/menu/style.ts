import styled from "styled-components";
export const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li.menu-items {
      position: relative;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #fff;

      button {
        padding: 0px 12px;
        height: 35px;
        background: transparent;
        color: white;
        border: none;
        outline: none;
        font-size: 14px;
        font-family: inherit;
        cursor: pointer;
        &:hover {
          color: #73e6ff;
          font-weight: 600;
        }
      }

      .menu-dropdown {
        position: absolute;
        top: 35px;
        left: 0px;
        z-index: 999;

        width: max-content;
        height: auto;
        background-color: #fff;
        border: 3px solid #c8c8c8;
        padding: 3px 0px;

        a {
          display: block;
          width: 100%;

          color: #0057aa;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          padding: 0 10px;

          &:hover {
            background-color: #3297fd;
            color: #fff;
          }
        }
      }
    }
  }
`;

export const Group = styled.div`
  border-top: 2px dotted #c8c8c8;
  width: calc(100% - 14px);
  height: 2px;
  margin: 3px 0px 3px 7px;
`;

export const MenuLine = styled.div`
  border-left: 1px solid #fff;
  height: 10px;
  position: absolute;
  top: 12px;
`;
