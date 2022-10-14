import React from "react";
import styled from "styled-components";

const SpinnerWrap = styled.div<{
  size?: number;
  color?: string;
  style?: any;
}>`
  display: inline-block;
  position: relative;
  width: ${(props) => (props.size ? `${props.size}px` : "40px")};
  height: ${(props) => (props.size ? `${props.size}px` : "40px")};

  & > div {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 4px;
    border-style: solid;
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) =>
      props.color
        ? `${props.color} transparent transparent transparent`
        : "gray transparent transparent transparent"};
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

function Loader({
  size,
  color,
  style,
}: {
  size?: number;
  color?: string;
  style?: any;
}) {
  return (
    <SpinnerWrap
      size={size && size}
      color={color && color}
      style={style && style}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerWrap>
  );
}

export default Loader;
