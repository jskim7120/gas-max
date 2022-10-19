import styled from "styled-components";

export const DetailHeader = styled.div`
  background-color: #ececec;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px 0 15px;

  p {
    color: #0057aa;
    font-family: "SegoeUI";
    font-size: 12px;
  }

  div.buttons {
    display: flex;
    alignitems: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
`;

export const TableWrapper = styled.div`
  width: 50%;
  height: auto;
`;

export const DetailWrapper = styled.div`
  width: 50%;
`;

export const VolReading = styled.div`
  width: 707px;
  height: 187px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  border-radius: 8px;
  margin-top: 13px;
  .title {
    height: 31px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 12px;
    font-weight: 400;
    line-height: 28px;
    padding-left: 14px;
    margin-bottom: 13px;
  }
  select {
    min-width: 259px;
  }
  p {
    color: #1b8c8e;
    font-size: 12px;
    line-height: 24px;
    position: absolute;
    right: 40px;
    min-width: 244px;
  }
  .volWrapper {
    position: relative;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 707px;
  margin-top: 24px;
  .title {
    height: 31px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 12px;
    font-weight: 400;
    line-height: 28px;
    padding-left: 14px;
    margin-bottom: 13px;
  }
`;
export const RubeUnit = styled.div`
  width: 320px;
  height: 338px;
  border-radius: 8px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  input {
    width: 67px;
  }
  table {
    width: 240px;
    margin: 0 auto;
  }
`;
export const BasicItems = styled.div`
  width: 320px;
  height: 338px;
  border-radius: 8px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  select {
    width: 77px;
  }
  label {
    line-height: 26px;
  }
  input {
    width: 77px;
  }
`;
