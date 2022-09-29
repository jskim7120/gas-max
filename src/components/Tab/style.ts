import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
`;

export const TabHeaderWrapper = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;

  background-color: #fff;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 31px;
    width: 100%;
    border-bottom: 1px solid red;
  }
`;

export const List = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  display: inline-block;
  outline: none;
  width: 130px;
  height: 100%;
  font-size: 12px;
  padding: 3px 32px 0 9px;
  margin-right: 1px;
  position: relative;
  font-family: "NotoSansKRRegular";
  font-size: 18px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.home {
    background: linear-gradient(rgba(140, 184, 8, 0.2), #8cb808);
    text-align: center;
    padding: 5px 0 0 0;
    width: 71px;
  }

  span {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    display: inlene-block;
  }

  background: ${(props) =>
    props.isActive
      ? `linear-gradient(#FFFFFF, #FB0000)`
      : `linear-gradient(#F1F1F1, #C7C7C7)`};

  color: ${(props) => (props.isActive ? "#EEF604" : "#FFF")};
`;

export const TabContentWrapper = styled.div`
  width: 100%;

  min-height: 89%;
  height: auto;
`;
