import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const LoadingArea = styled.div``;

function Loader({ text }: { text?: string }) {
  return (
    <LoadingArea>
      <Spinner text={text && text} />
    </LoadingArea>
  );
}

export default Loader;
