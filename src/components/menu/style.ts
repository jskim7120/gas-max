import styled from "styled-components";

export const Nav = styled.nav`
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
        height: 43px;
      }

      a:hover,
      button:hover {
        // background-color: #f2f2f2;
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
      padding: 3px 0 40px;
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
  top: 17px;
`;

export const EndLine = styled.div`
  border-right: 1px solid #fff;
  height: 10px;
  position: absolute;
  top: 17px;
  right: 0;
`;
