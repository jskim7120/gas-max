import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
`;

export const TabHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 31px;
    width: 100%;
  }
`;

export const List = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  display: inline-block;
  outline: none;
  width: 95px;
  height: 100%;
  padding: 6px 15px 6px 6px;
  margin-right: 1px;

  position: relative;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.home {
    background: ${(props) =>
      props.isActive
        ? `linear-gradient(rgba(140, 184, 8, 0.2), #8cb808)`
        : `linear-gradient(#F1F1F1, #C7C7C7)`};
    text-align: center;
    padding: 5px 0 0 0;
    width: 71px;
  }

  span {
    position: absolute;
    top: 6.5px;
    right: -9px;
    width: 24px;
    display: inline-block;
  }

  background: ${(props) =>
    props.isActive
      ? `linear-gradient(#FFFFFF, #FB0000)`
      : `linear-gradient(#F1F1F1, #C7C7C7)`};

  color: #0057aa;
`;

export const TabContentWrapper = styled.div`
  width: 100%;
  min-height: 89%;
  height: auto;
`;
