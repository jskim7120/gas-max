import styled from "styled-components";

export const TabHeaderWrapper = styled.ul`
  width: 100%;
  height: 34px;
  list-style: none;
  margin: 0;
  padding: 0;
}
`;

export const List = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  display: inline-block;
  outline: none;
  width: 120px;
  height: 100%;
  padding: 5px;
  margin-right: 2px;
  text-align: center;

  font-family: "NotoSansKRRegular";
  font-size: 15px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border: 1px solid rgb(188, 185, 185);
  border-bottom: none;
  border-radius: 8px 8px 0 0;

  background: ${(props) => (props.isActive ? `#B0AAE9` : `#DBDBDB`)};
  color: ${(props) => (props.isActive ? `#FFF` : `#OAOAOA`)};
`;

export const TabContentWrapper = styled.div`
  width: 100%;
  min-height: 240px;
  height: auto;
  padding: 20px 25px;

  border: 1px solid rgb(188, 185, 185);
  border-radius: 0 0 8px 8px;
`;
