import styled from "styled-components";

export const Wrapper = styled.div`
  width: auto;
  border: 1px solid black;
  background: #f0f0f0;

  form {
    background: #f0f0f0;
    padding: 20px 30px;
  }

  input,
  select {
    background: #e3e3e3;
    border: 1px solid #6e6e6e;
    padding: 6px;
    outline: none;
  }

  label {
    width: 100px;
  }

  .form-group {
    padding: 5px 0;
    display: flex;
    justify-content: start;
    align-items: center;
    // margin: 0 50px 0 0;
  }
  .divider {
    width: 100%;
    height: 1px;
    background: gray;
    margin: 7px 0;
  }
`;
