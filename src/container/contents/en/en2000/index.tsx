import React from "react";
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
  const { showScreen } = CreateEN(
    depthFullName,
    menuId,
    EN2000LIST,
    columns,
    fields,
    Form
  );

  return showScreen();
}

export default EN2000;
