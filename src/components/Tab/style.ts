import styled from "styled-components";

export const TabHeaderWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  border-bottom: 1px solid #5c5c5c;
  height: 35px;
  margin-top: 4px;
`;

export const List = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  display: inline-block;
  outline: none;
  width: 130px;
  text-align: center;
  font-size: 12px;
  padding: 7px 15px 7px 10px;
  position: relative;
  height: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    position: absolute;
    top: 4px;
    right: 5px;
    font-size: 16px;
  }

  background: ${(props) => (props.isActive ? "#f0f0f0" : "transparent")};
  color: ${(props) => (props.isActive ? "#333" : "#797d84")};
  border: ${(props) =>
    props.isActive ? "1px solid #5c5c5c" : "1px solid #ddd"};
  border-bottom: none;
`;

export const TabContentWrapper = styled.div`
  width: calc(100%-420px);
  border: 2px solid blue;
  min-height: 89%;
  height: auto;
  margin-top: 3px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1615px) {
    flex-direction: column;
  }
`;
