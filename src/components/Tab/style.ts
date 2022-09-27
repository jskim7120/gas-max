import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
`;

export const TabHeaderWrapper = styled.div`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  border: 1px solid #707070;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);
  -webkit-box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);
  -moz-box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 35px;
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
  margin-right: 3px;
  position: relative;
  font-family: "NotoSansKRRegular";
  font-size: 18px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    display: inlene-block;
  }

  background: ${(props) => (props.isActive ? "#0098FF" : "#707070")};
  color: ${(props) => (props.isActive ? "#EEF604" : "#FFF")};
`;

export const TabContentWrapper = styled.div`
  width: 100%;

  min-height: 89%;
  height: auto;
`;
