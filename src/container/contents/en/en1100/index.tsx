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
    ownAreaCode,
    EN1100LIST,
    columns,
    fields,
    Form,
    390,
    "815px"
  );

  return showScreen();
}

export default EN1100;

//815+390=1205px * 750px
