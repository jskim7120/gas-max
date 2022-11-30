import styled from "styled-components";

export const VolReading = styled.div`
  width: 707px;
  height: 194px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  border-radius: 8px;
  margin-top: 13px;
  .volReadCnt {
    padding: 0 17px;
  }
  .title {
    height: 31px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 12px;
    font-weight: 400;
    line-height: 28px;
    padding-left: 14px;
    margin-bottom: 6px;
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
    display: flex;
    align-items: center;
    span {
      margin-left: 6px;
    }
  }
  .volWrapper {
    position: relative;
    width: 99%;
    align-items: center;
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
    margin-bottom: 11px;
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
    tr {
      td {
        div {
          div {
            justify-content: center;
          }
        }
      }
    }
    input {
      height: 20px;
    }
  }
  .rubeDesc {
    color: #1b8c8e;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-top: 9px;
    justify-content: center;
    span {
      margin-left: 6px;
    }
  }
`;
export const BasicItems = styled.div`
  width: 320px;
  height: 338px;
  border-radius: 8px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  .basicItemsCnt {
    padding: 0 20px;
  }
  .volWrapper {
    // margin-left: 20px;
  }
  select {
    width: 77px;
  }
  label {
    line-height: 26px;
  }
  input {
    width: 85px;
  }
  .basicDesc {
    color: #1b8c8e;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-top: 77px;
    justify-content: center;
    span {
      margin-left: 6px;
    }
  }
`;
