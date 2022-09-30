import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const TopSide = styled.div`
  width: 100%;
  height: 43px;
  background-color: rgba(101, 84, 255, 0.19);
  border: 1px solid #707070;
  padding: 0 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #0057aa 35%, #8cb808);
`;

export const TopLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 17px;
  img {
    height: 19px;
  }
`;

export const Icons = styled.div`
  svg {
    margin-right: 10px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
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
