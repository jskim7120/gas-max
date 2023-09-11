import styled from "styled-components";

export const VolReading = styled.div`
  width: 100%;
  border: 1px solid rgb(188, 185, 185);
  border-radius: 8px;
  padding-bottom: 5px;

  &.ml5 {
    margin-left: 7px;
  }

  &.mt3 {
    margin-top: 3px;
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
