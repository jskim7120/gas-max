import React, { useEffect, useState } from "react";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { GR1600SEARCH } from "app/path";
import { DetailHeader, DetailWrapper, TableWrapper, Wrapper } from "../style";
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

  useEffect(() => {
    fetchData();
  }, []);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1600",
  });

  console.log("dataCommonDic:", dataCommonDic);

  const fetchData = async () => {
    try {
      const { data } = await API.get(GR1600SEARCH);
      console.log("data::::", data);
      setData(data);
    } catch (error) {
      console.log("GR1600 DATA fetch error =======>", error);
    }
  };
  return (
    <>
      <DetailHeader>
        <p>{depthFullName}</p>
      </DetailHeader>
      <Wrapper>
        <TableWrapper>{/* <Grid /> */}</TableWrapper>
        <DetailWrapper></DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default GR1600;
