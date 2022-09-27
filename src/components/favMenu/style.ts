import styled from "styled-components";

export const FavMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 15px;
  padding: 7px 15px 25px;
`;

export const FavMenuItem = styled.div`
  font-size: 14px;
  line-height: 15px;
  font-weight: 400;
  text-align: center;
  svg {
    display: block;
    margin: 0 auto 5px;
  }
`;
export const RecentMenuList = styled.div`
  width: 103px;
  display: flex;
  background: rgba(112, 112, 112, 0.7);
  align-items: center;
  justify-content: center;
  padding: 6px 0 8px;
  margin-top: 7px;
  svg {
    margin-left: -7px;
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 23px;
  }
`;
export const RecentMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;
export const RecentItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  svg {
    display: block;
  }
  span {
    text-align: center;
    margin-top: 1px;
  }
`;
