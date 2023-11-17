import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1600LIST } from "app/path";
import Form from "./form";

function EN1600({
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
    EN1600LIST,
    columns,
    fields,
    Form,
    940
  );

  return showScreen();
}

export default EN1600;

//940+727=1667px
