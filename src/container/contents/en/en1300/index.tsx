import React, { useEffect } from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1300LIST } from "app/path";
import Form from "./form";

function EN1300({
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
    EN1300LIST,
    columns,
    fields,
    Form,
    1000,
    "330px"
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

export default EN1300;

//1330px
