import React, { useEffect, useState } from "react";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { LeftSection, RightSection, Wrapper } from "../style";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import LeftHalf from "./left";
import RightHalf from "./right";

let values1: any;
let labels1: any;
let values2: any;
let labels2: any;

function GR1600({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1600",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      values1 = [];
      labels1 = [];
      values2 = [];
      labels2 = [];

      dataCommonDic?.jpDangaType.map((item: any) => {
        values1.push(item.code);
        labels1.push(item.codeName);
      });

      dataCommonDic?.jpVatKind.map((item: any) => {
        values2.push(item.code);
        labels2.push(item.codeName);
      });
    }
  }, [dataCommonDic]);

  return (
    <>
      <Wrapper>
        <LeftSection>
          <LeftHalf
            depthFullName={depthFullName}
            data={data}
            setData={setData}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
          />
        </LeftSection>
        <RightSection>
          <RightHalf
            selected={selected}
            values1={values1}
            values2={values2}
            labels1={labels1}
            labels2={labels2}
          />
        </RightSection>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
