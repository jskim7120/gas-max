import React, { useEffect, useState } from "react";
import { LeftSection, RightSection, Wrapper } from "../style";
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
  const [selected, setSelected] = useState({});

  return (
    <>
      <Wrapper>
        <LeftSection>
          <LeftHalf
            depthFullName={depthFullName}
            data={data}
            setData={setData}
            setSelected={setSelected}
          />
        </LeftSection>
        <RightSection>
          <RightHalf selected={selected} />
        </RightSection>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
