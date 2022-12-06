import styled from "styled-components";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 80px;
  display: flex;

  background: #c6c0ff;
  border-top: 3px solid #707070;
  padding: 10px 20px 8px 12px;

  .bussiness_partner_cnt {
    border: 1px solid red; ////////
    width: 73px;
    height: 60px;
    border-right: 1px solid #092f53;
    p {
      font-size: 12px;
      font-family: "SegoeUI";
      font-weight: 600;
    }
  }
  form {
    border: 1px solid red; ////////
    margin-left: 13px;
    display: flex;
    flex-direction: column;

    p {
      font-size: 11px;
      color: rgba(12, 11, 11, 0.47);
      margin: 5px 0 0 20px;
    }

    .search_wrapper {
      position: relative;
      height: 30px;
      width: 209px;
      background: #fff;
      border-radius: 15px;
      border: 1px solid #7c77a8;
    }

    button {
      position: absolute;
      right: 5px;
      top: 3px;
      width: 22px;
      height: 21px;
      border: none;
      border-radius: 50%;
      background: #ff0000;
      padding-top: 3px;
      cursor: pointer;
    }

    input[type="text"] {
      position: absolute;
      top: 2px;
      left: 10px;

      height: 24px;
      width: 168px;
      background: transparent;
      border: none;
      outline: none;
      margin: 0;
      font-size: 14px;
      color: inherit;

      &::placeholder {
        color: #bbb;
      }
    }
  }
`;
