import React, { useEffect } from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN2000LIST } from "app/path";
import Form from "./form";

function EN2000({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { showScreen, handleKeyDown, activeTabId } = CreateEN(
    depthFullName,
    menuId,
    EN2000LIST,
    columns,
    fields,
    Form,
    510,
    "382px"
  );

  return showScreen();
}

export default EN2000;

//510+382=892px
