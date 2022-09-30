import styled from "styled-components";

export const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    border-right: 1px solid #fff;

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
        border: 1px solid #fff;
        border-top: none;
        border-bottom: none;
        border-right: none;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
      }

      a,
      button {
        text-align: left;
        padding: 0px 10px;
      }

      a:hover,
      button:hover {
        // background-color: #f2f2f2;
      }
      li {
        color: #000;
        font-size: 12px;
      }
    }

    .arrow::after {
      content: "";
      display: inline-block;
      margin-left: 0.28em;
      vertical-align: 0.09em;
      border-top: 0.42em solid;
      border-right: 0.32em solid transparent;
      border-left: 0.32em solid transparent;
    }

    .arrow-side::after {
      content: "";
      display: inline-block;
      margin-left: 0.28em;
      vertical-align: 0.09em;
      border-left: 0.42em solid;
      border-top: 0.32em solid transparent;
      border-bottom: 0.32em solid transparent;
    }

    .dropdown {
      position: absolute;
      top: 31px;
      left: 0;
      right: auto;
      z-index: 9999;
      width: 170px;
      padding: 3px 0 40px;
      list-style: none;
      background-color: #fff;
      display: none;
      li {
        padding: 2px 1px 1px 8px;
        .group::after {
          content: "";
        }
      }
      border: 1px solid #0057aa;
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
  border-top: 1px solid #000;
`;
