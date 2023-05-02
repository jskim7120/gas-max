import React, { useEffect } from "react";
import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1700LIST } from "app/path";
import Form from "./form";

function EN1700({
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
    EN1700LIST,
    columns,
    fields,
    Form,
    1080,
    "652px"
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

export default EN1700;

//1080+652=1732px
