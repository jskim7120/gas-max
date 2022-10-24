import React from "react";
import { Container } from "./style";

function DataGridFooter({ dataLength }: { dataLength: number }) {
  return (
    <Container>
      <div className="totalCnt">{dataLength}</div>
      <div></div>
    </Container>
  );
}

export default DataGridFooter;
