import styled from "styled-components";

export const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li.menu-items {
      position: relative;
      font-family: "NotoSansKRRegular";
      font-size: 18px;

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
        cursor: pointer;
        width: 100%;
      }

      a,
      button {
        text-align: left;
        padding: 0.7rem 1rem;
      }

      a:hover,
      button:hover {
        background-color: #f2f2f2;
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
      left: 0;
      right: auto;
      box-shadow: 0 10px 15px 3px rgba(46, 41, 51, 0.08),
        0 4px 6px 2px rgba(71, 63, 79, 0.16);
      font-size: 0.875rem;
      z-index: 9999;
      min-width: 14rem;
      padding: 0.5rem 0;
      list-style: none;
      background-color: #fff;
      border-radius: 0.5rem;
      display: none;
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
