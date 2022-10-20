import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  border-left: 5px solid #626161;
`;

export const TabHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  background-color: #626161;
  justify-content: space-between;
  height: 40px;
  .sideBar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px;
    width: 45px;
    background: rgb(170, 223, 11);
    border: 1px solid #707070;
    border-left: 2px solid #707070;
  }

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
        ? `linear-gradient(rgba(140, 184, 8), #8cb808)`
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
      ? `linear-gradient(rgba(255,255,255), rgba(251,0,0));`
      : `linear-gradient(#F1F1F1, #C7C7C7)`};

  color: #0a0a0a;
  border: 1px solid #707070;
  border-left: none;
`;

export const TabContentWrapper = styled.div`
  width: 100%;
  min-height: 89%;
  height: auto;
  margin-top: 3px;
`;

export const TabBorderLine = styled.div<{
  isHome: boolean;
  isOpen: boolean;
}>`
  position: absolute;
  top: 83px;
  left: ${(props) => (props.isOpen ? `82px` : `0`)};
  right: 0px;
  height: 4.5px;
  background: ${(props) => (props.isHome ? `#8CB808;` : `#FC6767;`)};
  border-top: 1.5px solid #707070;
`;
