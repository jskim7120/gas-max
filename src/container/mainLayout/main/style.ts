import styled from "styled-components";

export const Sidebar = styled.div<{ isOpen?: boolean }>`
  width: 82px;
  min-width: 82px;
  background: #e6f3ff;
  position: ${(props) => !props.isOpen && "absolute"};
  left: 0;
  left: ${(props) => !props.isOpen && "-82px"};
  .header_cnt {
    background: #626161;
    padding-top: 2px;
  }

  .header {
    width: 100%;
    height: 32px;
    min-height: 32px;
    color: #ffffff;
    font-family: "SegoeUI";
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    padding: 7px 0 0 0;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    gap: 2px;
  }
`;

export const UnOrderedList = styled.ul`
  list-style: none;

  &:first-child {
    margin-top: 11px;
  }

  a {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    font-family: "SegoeUI";
    font-size: 12px;
    p {
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 12px;
      margin-top: 2px;
      font-weight: 400;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 113px);
`;
