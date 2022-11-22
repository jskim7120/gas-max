import React, { useState } from "react";
import { DetailHeader, Wrapper } from "./style";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
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
      <Wrapper></Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
