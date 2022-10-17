import React from "react";
import { getNestedChildren } from "helpers/nestedSort";
import MenuItems from "./menuItems";
import { Nav, EndLine } from "./style";

interface INavbar {
  data?: any;
}

const Navbar = (props: INavbar) => {
  let list: any;
  if (props.data) {
    const clone = JSON.parse(JSON.stringify(props.data));
    list = getNestedChildren(clone, "", "menuid", "parentmenuid");
  }

  return (
    <Nav>
      <ul className="menus">
        {list.map((menu: any, index: number) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
      <EndLine />
    </Nav>
  );
};

export default Navbar;
