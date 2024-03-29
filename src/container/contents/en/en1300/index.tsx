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
    ownAreaCode,
    EN1300LIST,
    columns,
    fields,
    Form,
    1000
  );

  return showScreen();
}

export default EN1300;

//1330px
