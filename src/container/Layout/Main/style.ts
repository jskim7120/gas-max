import styled from "styled-components";

export const Sidebar = styled.div<{ isOpen?: boolean }>`
  width: 82px;
  min-width: 82px;
  background: #f8e5ba;
  border-right: 2px solid #707070;
  position: ${(props) => !props.isOpen && "absolute"};
  left: 0;
  left: ${(props) => !props.isOpen && "-82px"};

  .header {
    display: inline-block;
    background: linear-gradient(rgba(230, 164, 9, 0.2), rgba(230, 164, 9, 1));
    width: 100%;
    height: 34px;
    min-height: 34px;
    color: #0057aa;
    font-family: "SegoeUI";
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    padding: 7px 0 0 0;
  }
`;

export const UnOrderedList = styled.ul`
  list-style: none;

  &:first-child {
    margin-top: 20px;
  }

  a {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    font-family: "SegoeUI";
    font-size: 12px;
    p {
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 12px;
      margin-top: 5px;
      font-weight: 400;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 123px);
`;
