import { FC } from "react";
import MenuItems from "./menuItems";
interface IDropdown {
  submenus: any;
  dropdown: any;
  depthLevel: any;
}
const Dropdown: FC<IDropdown> = ({
  submenus,
  dropdown,
  depthLevel,
}): JSX.Element => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu: any, index: number) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
