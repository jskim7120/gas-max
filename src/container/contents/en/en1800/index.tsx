import CreateEN from "app/hook/createEN";
import { columns, fields } from "./data";
import { EN1800LIST } from "app/path";
import Form from "./form";

function EN1800({
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
    EN1800LIST,
    columns,
    fields,
    Form,
    380,
    "402px"
  );

  return showScreen();
}

export default EN1800;

//380+402=782px
