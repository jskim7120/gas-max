import styled from "styled-components";

export const GrayButton = styled.button`
  width: 80px;
  height: 30px;
  font-size: 15px;
  background: #666666;
  border-radius: 5px;
  border: 1px solid #707070;
  color: #fff;
  position: relative;

  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

export const BlueDiv = styled.div`
  display: flex;
  width: 157px;
  height: 38px;
  background: #5284ce;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  gap: 6px;
`;
