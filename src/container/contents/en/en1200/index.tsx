import React, { useEffect } from "react";
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
  const { showScreen, handleKeyDown, activeTabId } = CreateEN(
    depthFullName,
    menuId,
    EN1200LIST,
    columns,
    fields,
    Form,
    620,
    "805px"
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

export default EN1200;

//620+805=1425px
