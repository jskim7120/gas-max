import React from "react";
import { getNestedChildren } from "helpers/nestedSort";
import MenuItems from "./MenuItems";

interface INabar {
  data?: any;
}

const Navbar = (props: INabar) => {
  let list: any;
  if (props.data) {
    const clone = JSON.parse(JSON.stringify(props.data));
    list = getNestedChildren(clone, null, "menuId", "parentMenuId");
  }

  return (
    <nav>
      <ul className="menus">
        {" "}
        {list.map((menu: any, index: number) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
