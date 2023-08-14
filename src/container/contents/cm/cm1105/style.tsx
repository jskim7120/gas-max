import styled from "styled-components";

export const ModalHeader = styled.div`
  width: 100%;
  height: 40px;
  background: #0b97f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  p {
    color: #fff;
    font-size: 15px;
  }

  label {
    background: transparent;
  }

  div.buttons {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .ml30 {
    margin-left: 30px;
  }
`;
