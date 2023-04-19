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
        font-size: 14x;
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
        padding: 3px 12px 8px;

        a {
          width: 100%;
          height: 30px;
          color: #0057aa;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;

          &:hover {
            background-color: #3297fd;
            color: #fff;
          }
        }
      }
    }
  }
`;

export const NavOld = styled.nav`
  position: relative;
  ul {
    display: flex;
    list-style: none;
    li.menu-items {
      position: relative;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
      a {
        display: block;
        font-size: inherit;
        color: inherit;
        text-decoration: none;
      }

      button {
        color: inherit;
        font-size: inherit;
        border: none;
        background-color: transparent;
        width: 100%;
      }

      a,
      button {
        text-align: left;
        padding: 0px 12px;
        height: 35px;
      }

      a:hover,
      button:hover {
        background-color: #3297fd;
      }
      li {
        color: #0057aa;
        font-size: 12px;
      }
    }

    .dropdown {
      position: absolute;
      left: 0;
      right: auto;
      z-index: 9999;
      padding: 3px 0 8px;
      list-style: none;
      background-color: #fff;
      display: none;
      li {
        padding: 2px 1px 1px 8px;
        width: max-content;
        min-width: 100%;
        a {
          height: auto;
          cursor: pointer;
          padding-left: 3px;
        }
      }
      border: 3px solid #c8c8c8;
    }

    .dropdown.show {
      display: block;
    }

    .dropdown.dropdown-submenu {
      position: absolute;
      left: 100%;
      top: -7px;
    }
  }
`;

export const Group = styled.div`
  border-top: 3px dotted #c8c8c8;
  width: 87%;
  margin: 6px 0 2px 5px;
`;

export const MenuLine = styled.div`
  border-left: 1px solid #fff;
  height: 10px;
  position: absolute;
  top: 12px;
`;

export const EndLine = styled.div`
  border-right: 1px solid #fff;
  height: 10px;
  position: absolute;
  top: 12px;
  right: 0;
`;
