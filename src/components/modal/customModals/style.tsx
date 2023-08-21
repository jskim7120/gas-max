import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: auto;
  height: auto;
  background: #fff;
  border: 2px solid #ccc;

  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);

  .modal_header {
    width: 100%;
    background: #0b97f6;
  }

  .close_btn {
    cursor: pointer;
  }

  .h40 {
    height: 40px;
  }

  .h25 {
    height: 25px;
  }
`;

export const ModalBlueHeader = styled.div`
  width: 100%;
  background: #0b97f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  div.buttons {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .ml30 {
    margin-left: 30px;
  }
`;
