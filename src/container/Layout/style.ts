import styled from "styled-components";

export const Container = styled.div``;

export const TopSide = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgba(101, 84, 255, 0.19);
  border: 1px solid #707070;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div``;

export const Icons = styled.div`
  svg {
    margin-right: 10px;
  }
`;

export const Wrapper = styled.div`
  padding: 10px;
`;

export const LeftSide = styled.div`
  width: 105px;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 0;
  position: relative;
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FavTitle = styled.div`
  display: flex;
  background: rgba(112, 112, 112, 0.7);
  align-items: center;
  justify-content: space-between;
  padding: 4px 9px 7px 7px;
  p {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 28px;
  }
`;
