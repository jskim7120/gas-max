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

    .menus {
      display: flex;
      list-style: none;
    }

    .menu-items {
      position: relative;
      font-size: 14px;
    }

    .menu-items a {
      display: block;
      font-size: inherit;
      color: inherit;
      text-decoration: none;
    }

    .menu-items button {
      color: inherit;
      font-size: inherit;
      border: none;
      background-color: transparent;
      cursor: pointer;
      width: 100%;
    }

    .menu-items a,
    .menu-items button {
      text-align: left;
      padding: 0.7rem 1rem;
    }

    .menu-items a:hover,
    .menu-items button:hover {
      background-color: #f2f2f2;
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
      right: 0;
      left: auto;
      box-shadow: 0 10px 15px 3px rgba(46, 41, 51, 0.08),
        0 4px 6px 2px rgba(71, 63, 79, 0.16);
      font-size: 0.875rem;
      z-index: 9999;
      min-width: 12rem;
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1615px) {
    flex-direction: column;
  }
`;
