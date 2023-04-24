import React from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1200LIST } from "app/path";
import Form from "./form";

function EN1200({
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
    EN1200LIST,
    columns,
    fields,
    Form
  );

  return showScreen();
}

export default EN1200;
