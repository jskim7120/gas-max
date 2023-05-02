import React, { useEffect } from "react";
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
  const { showScreen, handleKeyDown, activeTabId } = CreateEN(
    depthFullName,
    menuId,
    EN1900LIST,
    columns,
    fields,
    Form,
    365,
    "397px"
  );

  useEffect(() => {
    if (activeTabId) {
      if (activeTabId === menuId) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeTabId]);

  return showScreen();
}

export default EN1900;
//365+397=762px
