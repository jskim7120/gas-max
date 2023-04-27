import React from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1400LIST } from "app/path";
import Form from "./form";

function EN1400({
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
    EN1400LIST,
    columns,
    fields,
    Form,
    870,
    "302px"
  );

  return showScreen();
}

export default EN1400;
