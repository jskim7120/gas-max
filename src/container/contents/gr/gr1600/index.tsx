import React, { useState } from "react";
import { DetailHeader, DetailWrapper, Wrapper } from "../style";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import Grid from "./grid1";
function GR1600({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [data, setData] = useState([]);
  return (
    <>
      <DetailHeader>
        <p>{depthFullName}</p>
      </DetailHeader>
      <Wrapper>
        {/* <Grid /> */}
        <DetailWrapper></DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
