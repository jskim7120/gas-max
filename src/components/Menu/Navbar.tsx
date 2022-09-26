import React from "react";
import { getNestedChildren } from "helpers/nestedSort";
import MenuItems from "./MenuItems";
import { Nav } from "./style";

interface INabar {
  data?: any;
}

const Navbar = (props: INabar) => {
  let list: any;
  if (props.data) {
    const clone = JSON.parse(JSON.stringify(props.data));
    list = getNestedChildren(clone, "", "menuId", "parentMenuId");
  }

  return (
    <Nav>
      <ul className="menus">
        {list.map((menu: any, index: number) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </Nav>
  );
};

export default Navbar;
