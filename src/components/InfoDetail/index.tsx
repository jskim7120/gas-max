import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";
import Form from "./form";

function InfoDetail({ data }: { data: any }) {
  return (
    <Wrapper>
      <Form data={data} />
    </Wrapper>
  );
}

export default InfoDetail;
