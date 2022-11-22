import React from "react";
import Form from "./form";

function RightHalf({ selected }: { selected: any }) {
  return (
    <div>
      <div className="top-header"></div>
      <div className="with-border">
        <Form selected={selected} />
      </div>
    </div>
  );
}

export default RightHalf;
