import React from "react";
import styled from "styled-components";

const SpinnerWrap = styled.div`
  text-align: center;
`;

const SpinnerContent = styled.div<{ size?: number }>`
  display: inline-block;
  position: relative;
  width: 35px;
  height: 35px;
  margin: 20px 0;

  & > div {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 5px;
    border-style: solid;
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: gray transparent transparent transparent;
  }

  & > div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & > div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerText = styled.p`
  text-align: center;
`;

interface ISpinnerProps {
  text?: string | React.ReactElement;
  size?: number;
}

function Spinner(props: ISpinnerProps) {
  return (
    <SpinnerWrap>
      <SpinnerContent size={props.size}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerContent>
      {props.text && <SpinnerText>{props.text}</SpinnerText>}
    </SpinnerWrap>
  );
}

export default Spinner;
