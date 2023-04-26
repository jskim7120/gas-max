import styled from "styled-components";

export const VolReading = styled.div`
  width: 870px;
  height: 186px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  border-radius: 8px;
  margin-top: 7px;
  .volReadCnt {
    padding: 0 17px;
    .vapInput {
      input {
        min-width: 259px;
      }
    }
    .lpgDesc {
      position: unset;
      margin-left: 34px;
      margin-top: 7px;
    }
  }
  .title {
    height: 31px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 15px;
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
    font-size: 15px;
    line-height: 24px;
    position: absolute;
    right: 34px;
    min-width: 310px;
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
  .field {
    display: flex;
    gap: 40px;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 7px;
  .title {
    height: 31px;
    background: rgba(101, 84, 255, 0.37);
    font-size: 15px;
    font-weight: 400;
    line-height: 28px;
    padding-left: 14px;
    margin-bottom: 11px;
  }
`;
export const RubeUnit = styled.div`
  width: 490px;
  //height: 4px;
  border-radius: 8px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  input {
    width: 70px;
  }
  table {
    width: 463px;
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
      height: 30px;
    }
  }
  .rubeDesc {
    color: #1b8c8e;
    font-size: 15px;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 5px;
    justify-content: center;
    span {
      margin-left: 6px;
    }
  }
`;
export const BasicItems = styled.div`
  width: 370px;
  //height: 415px;
  border-radius: 8px;
  border: 1px solid #707070;
  box-shadow: 0px 3px 6px rgba(104, 103, 103, 0.35);
  .basicItemsCnt {
    // padding: 0 20px;
    margin-top: 30px;
  }
  .volWrapper {
    // margin-left: 20px;
  }
  select {
    width: 77px;
  }
  label {
    line-height: 18px;
  }
  input {
    width: 85px;
  }
  .basicDesc {
    color: #1b8c8e;
    font-size: 15px;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: center;
    span {
      margin-left: 6px;
    }
  }
`;
