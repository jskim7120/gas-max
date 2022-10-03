import React from "react";
import styled from "styled-components";

const CustomerSearch = styled.div`
  width: 916px;
  height: 534px;
  border: 1px solid #1707f9;

  background: #fff;
  .header {
    width: 100%;
    height: 75px;
    background: #eeeaea;
    border-bottom: 1px solid #707070;
  }
`;

function CustomerModal() {
  return (
    <CustomerSearch style={{ background: "#fff" }}>
      <div className="header">
        <label>거래처코드</label>
        <input type="text" />

        <label>전화번호</label>
        <input type="text" />

        <label>거래처명/성명</label>
        <input type="text" />

        <label>사업자번호</label>
        <input type="text" />

        <label>사용자명</label>
        <input type="text" />

        <label>주소/비고</label>
        <input type="text" />

        <button>조회</button>
        <button>닫기</button>
      </div>
    </CustomerSearch>
  );
}

export default CustomerModal;
