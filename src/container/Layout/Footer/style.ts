import styled from "styled-components";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 80px;
  border-top: 2px solid #707070;
  background: #d9e8f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  .bussiness_partner_cnt {
    width: 82px;
    border-right: 1px solid #092f53;
    height: 57px;
    margin-top: 12px;
    img {
      display: block;
      margin: 0 auto;
    }
    .title {
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #0057aa;
      text-align: center;
      margin-top: 1px;
    }
  }

  .container {
    // padding-left: 11px;
    // padding-top: 23px;
  }

  form {
    color: #c4c4c4;
    display: flex;
    border: 1px solid #c4c4c4;
    border-radius: 15px;
    background: #fff;
    align-items: center;
    padding-right: 6px;
    button {
      width: 22px;
      height: 21px;
      border: none;
      border-radius: 50%;
      background: #ff0000;
      padding: 3px;
    }
  }

  input[type="search"] {
    border: none;
    background: transparent;
    margin: 0;
    padding: 7px 8px;
    font-size: 14px;
    color: inherit;
  }

  input[type="search"]::placeholder {
    color: #bbb;
  }

  button[type="submit"] {
    overflow: hidden;
    width: 22px;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 21px;
    background: #ff0000;
    padding-top: 3px;
    padding-left: 1px;
  }

  button[type="submit"]:hover {
    opacity: 1;
  }

  button[type="submit"]:focus,
  input[type="search"]:focus {
    box-shadow: 0 0 3px 0 #1183d6;
    border-color: #1183d6;
    outline: none;
  }

  form.nosubmit {
    border: none;
    padding: 0;
  }

  input.nosubmit {
    border: 1px solid #555;
    width: 100%;
    padding: 9px 4px 9px 40px;
    background: transparent
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat 13px center;
  }
`;

export const AddrContainer = styled.div`
  display: flex;
  width: 420px;
  justify-content: space-between;
  margin-top: -3px;
`;

export const LogoImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 77px;
  height: 22px;
  align-items: center;
  img {
    display: block;
  }
  img:first-child {
    width: 20px;
    height: 20px;
  }
  img:nth-child(2) {
    width: 22px;
    height: 20px;
  }
  img:nth-child(3) {
    width: 17px;
    height: 16px;
  }
`;

export const AddrDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  font-family: "Noto Sans KR";
  p:first-child {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
    span {
      color: #f90606;
    }
  }
  p:nth-child(2) {
    font-size: 14px;
    font-weight: 400;
    color: #3440e6;
  }
  p:nth-child(3) {
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }
`;

export const SearchResultCont = styled.div`
  width: 765px;
  display: flex;
  justify-content: space-between;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 12px;
  font-weight: 400;
`;
export const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 211px;
  grid-gap: 6px;
`;
export const SearchResultItem = styled.div`
  display: flex;
  grid-gap: 4px;
`;
export const SearchResultTitle = styled.div`
  width: 63px;
  height: 28px;
  border: 1px solid #707070;
  background: #707070;
  text-align: center;
  color: #f6f6f6;
  line-height: 24px;
`;
export const SearchResultData = styled.div`
  width: 144px;
  height: 28px;
  border: 1px solid #707070;
  background: #f6efef;
  text-align: center;
  color: #0057aa;
  line-height: 24px;
`;
