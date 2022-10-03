import React from "react";
import styled from "styled-components";
import ModalSearchIcon from "assets/image/ModalSearchIcon.png";
import ModalCloseBtn from "assets/image/ModalCloseBtn.png";

const CustomerSearch = styled.div`
  width: 916px;
  height: 534px;
  border: 1px solid #1707f9;

  background: #fff;
  .header {
    display: flex;
    width: 100%;
    height: 75px;
    background: #eeeaea;
    border-bottom: 1px solid #707070;
    align-items: center;
    div:nth-child(3) {
      margin-right: 12px;
    }
    .section {
      display: flex;
      align-items: end;
      flex-direction: column;
      grid-gap: 4px;
      margin-left: 22px;
      .section_item {
        display: flex;
        grid-gap: 4px;
      }
    }
    label {
      color: #0057aa;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      line-height: 27px;
    }
    input {
      border: 1px solid #707070;
      height: 27px;
    }
    button {
      width: 65px;
      height: 56px;
      background-image: linear-gradient(to right, #ffffff, #cfcfcf);
      border-radius: 4px;
      border: 1px solid #707070;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      grid-gap: 5px;
      span {
        font-size: 16px;
        font-weight: 400;
        font-family: "Segoe UI", Arial, sans-serif;
        color: #0057aa;
      }
      .line {
        border-left: 1px solid #707070;
        height: 13px;
      }
    }
    button:nth-child(2) {
      width: 5px;
    }
  }
`;

function CustomerModal() {
  return (
    <CustomerSearch style={{ background: "#fff" }}>
      <div className="header">
        <div className="section">
          <div className="section_item">
            <label>거래처코드</label>
            <input type="text" />
          </div>
          <div className="section_item">
            <label>전화번호</label>
            <input type="text" />
          </div>
        </div>
        <div className="section">
          <div className="section_item">
            <label>거래처명/성명</label>
            <input type="text" />
          </div>
          <div className="section_item">
            <label>사업자번호</label>
            <input type="text" />
          </div>
        </div>
        <div className="section">
          <div className="section_item">
            <label>사용자명</label>
            <input type="text" />
          </div>
          <div className="section_item">
            <label>주소/비고</label>
            <input type="text" />
          </div>
        </div>

        <button>
          <img src={ModalSearchIcon} />
          <div className="line"></div>
          <span>조회</span>
        </button>
        <button style={{ marginLeft: "3px" }}>
          <img src={ModalCloseBtn} style={{ marginTop: "-3px" }} />
          <div className="line"></div>
          <span>닫기</span>
        </button>
      </div>
    </CustomerSearch>
  );
}

export default CustomerModal;
