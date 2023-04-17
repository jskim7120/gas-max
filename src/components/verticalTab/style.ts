import styled from "styled-components";

export const TabHeaderWrapper = styled.ul`
  width: 139px;
  list-style: none;
  margin: 0;
  padding: 0;
  display:flex;
  flex-direction: column;  
  background: #fff;
  position:relative;
}
`;

export const List = styled.li<{ isActive: boolean; tabIndex: number }>`
  cursor: pointer;
  display: inline-block;
  outline: none;
  width: 139px;
  height: 34px;
  padding: 5px;
  // margin-top: -1px;
  text-align: center;

  font-family: "NotoSansKRRegular";
  font-size: 14px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 1px solid #626161;
  background: #fff;
  background: ${(props) => props.isActive && props.tabIndex === 0 && `#F2711C`};
  background: ${(props) => props.isActive && props.tabIndex === 1 && `#B5CC18`};
  background: ${(props) => props.isActive && props.tabIndex === 2 && `#2185D0`};
  color: ${(props) => (props.isActive ? `#fff` : "#OAOAOA")};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0px;
    width: 5px;
    height: 100%;
    background: ${(props) =>
      props.isActive && props.tabIndex === 0 && `#F2711C`};
    background: ${(props) =>
      props.isActive && props.tabIndex === 1 && `#B5CC18`};
    background: ${(props) =>
      props.isActive && props.tabIndex === 2 && `#2185D0`};
  }
`;

export const TabContentWrapper = styled.div`
  width: 80%;

  // border: 1px solid #707070;

  box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);
  -webkit-box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);
  -moz-box-shadow: -1px 1px 3px 0px rgba(104, 103, 103, 0.35);
`;
