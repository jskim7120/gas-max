import React, { useEffect, useState } from "react";
import { DetailHeader, LeftSection, RightSection, Wrapper } from "../style";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import LeftHalf from "./leftHalf";
import RightHalf from "./rightHalf";

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
      {/* <DetailHeader>
        <p>{depthFullName}</p>
      </DetailHeader> */}
      <Wrapper>
        <LeftSection>
          <LeftHalf depthFullName={depthFullName} setData={setData} />
        </LeftSection>
        <RightSection>
          <RightHalf />
        </RightSection>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
