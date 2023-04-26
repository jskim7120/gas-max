import React from "react";
import Draggable from "react-draggable";

function MyDraggable(props: any) {
  return (
    <>
      <Draggable>{props.children}</Draggable>
    </>
  );
}

export default MyDraggable;
