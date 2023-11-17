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
    ownAreaCode,
    EN1700LIST,
    columns,
    fields,
    Form,
    1080
  );

  return showScreen();
}

export default EN1700;

//1080+652=1732px
