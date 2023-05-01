import React, { useEffect } from "react";
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
  const { showScreen, handleKeyDown, activeTabId } = CreateEN(
    depthFullName,
    menuId,
    EN1100LIST,
    columns,
    fields,
    Form,
    390,
    "815px"
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

export default EN1100;

//815+390=1205px * 750px
