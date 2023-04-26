import React from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1900LIST } from "app/path";
import Form from "./form";

function EN1900({
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
    EN1900LIST,
    columns,
    fields,
    Form
  );

  return showScreen();
}

export default EN1900;
