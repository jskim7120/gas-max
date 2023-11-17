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
  const { showScreen, handleKeyDown, activeTabId } = CreateEN(
    depthFullName,
    menuId,
    ownAreaCode,
    EN1400LIST,
    columns,
    fields,
    Form,
    870
  );

  return showScreen();
}

export default EN1400;
