import styled from "styled-components";

export const FooterContainer = styled.div`
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
    padding-left: 11px;
    padding-top: 23px;
  }

  form {
    color: #c4c4c4;
    display: flex;
    border: 1px solid #c4c4c4;
    border-radius: 15px;
    background: #fff;
    align-items: center;
    padding-right: 6px;
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
