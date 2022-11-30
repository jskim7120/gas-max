import React from "react";
import Form from "./form";

function RightHalf({
  selected,
  values1,
  values2,
  labels1,
  labels2,
  fetchLeftData,
}: {
  selected: any;
  values1: any;
  values2: any;
  labels1: any;
  labels2: any;
  fetchLeftData: any;
}) {
  return (
    <Form
      selected={selected}
      values1={values1}
      values2={values2}
      labels1={labels1}
      labels2={labels2}
      fetchLeftData={fetchLeftData}
    />
  );
}

export default RightHalf;
