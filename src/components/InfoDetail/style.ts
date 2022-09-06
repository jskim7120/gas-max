import styled from "styled-components";

export const Wrapper = styled.div`
  width: 49%;
  border: 1px solid black;

  form {
    background: #f0f0f0;
    padding: 20px 15px;
  }

  input,
  select {
    background: #e3e3e3;
    border: 1px solid #6e6e6e;
    padding: 6px;
    outline: none;
  }

  label {
  }

  .form-group {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .divider {
    width: 100%;
    height: 1px;
    background: gray;
    margin: 7px 0;
  }
`;
