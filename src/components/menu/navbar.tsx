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
        {list.map((menu: any, idx: number) => (
          <MenuItems key={idx} items={menu} />
        ))}
      </ul>
      <EndLine />
    </Nav>
  );
};

export default Navbar;
