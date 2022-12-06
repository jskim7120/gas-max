import React from "react";
import Form from "./form";

function RightHalf({
  selected,
  fetchLeftData,
  dataCommonDic,
}: {
  selected: any;
  fetchLeftData: any;
  dataCommonDic: any;
}) {
  return (
    <Form
      selected={selected}
      fetchLeftData={fetchLeftData}
      dataCommonDic={dataCommonDic}
    />
  );
}

export default RightHalf;
