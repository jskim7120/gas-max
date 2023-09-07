import styled from "styled-components";

export const VolReading = styled.div`
  border: 1px solid rgb(188, 185, 185);
  margin-top: 5px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);

  width: 100%;
  padding-bottom: 7px;

  &.ml5 {
    margin-left: 5px;
  }

  .title {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    height: 30px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 15px;
    font-weight: 400;
    line-height: 28px;
    padding-left: 14px;
    margin-bottom: 5px;
  }
`;
