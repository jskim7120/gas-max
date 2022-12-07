import styled from "styled-components";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #c6c0ff;
  border-top: 3px solid #707070;
  padding: 10px 20px 8px 12px;

  .bussiness_partner_cnt {
    width: 72.5px;
    height: 60px;
    border-right: 1px solid #092f53;
    p {
      font-size: 12px;
      font-family: "SegoeUI";
      font-weight: 600;
    }
  }
  form {
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
      margin-top: 15px;
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

  .address-part {
    margin-left: 40px;
    display: flex;
    align-items: baseline;

    .cuType {
      width: 35px;
      margin-right: 5px;
    }

    .text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .small {
      height: 19px;
      font-size: 14px;
    }

    .big {
      height: 21px;
      font-size: 16px;
    }

    .w-70 {
      width: 70px;
    }
    .w-85 {
      width: 85px;
    }
    .w-100 {
      width: 100px;
    }
    .w-150 {
      width: 150px;
    }
    .w-200 {
      width: 200px;
    }
    .w-320 {
      width: 320px;
    }
  }

  .badge-part {
    margin-left: 30px;

    display: flex;

    .cuStae {
      width: 50px;
    }

    .circle-badge {
      margin-right: 5px;
      padding-top: 3px;
    }

    .rectangle-badge-wrapper {
      display: flex;
      align-items: center;
      height: 20px;

      span {
        display: inline-block;
        width: 85px;
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }
`;
