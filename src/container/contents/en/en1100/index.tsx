import React from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1100LIST } from "app/path";
import Form from "./form";

function EN1100({
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
    EN1100LIST,
    columns,
    fields,
    Form
  );

  return showScreen();
}

export default EN1100;
