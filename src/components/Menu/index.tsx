import React from "react";
import { getNestedChildren } from "helpers/nestedSort";
import styled from "styled-components";

const Bla = styled.div`
  > ul {
    color: red;
  }
`;

function Menu({ data }: { data?: any }) {
  let list: any;
  if (data) {
    const clone = JSON.parse(JSON.stringify(data));
    list = getNestedChildren(clone, null, "menuId", "parentMenuId");
  }

  console.log("Menu:", list);
  //   for (let menu in list) {
  // console.log(menu);
  //arrMenu.push(<li></li>);
  //   }

  //   const Elem = parse("<li>Item 1</li><li>Item 2</li>");

  return (
    <Bla>
      {/* <ul>
        <li>
          1-r menu
          <ul>
            <li> 1-r menunii huuhed 1</li>
            <li> 1-r menunii huuhed 2</li>
          </ul>
        </li>
        <li>
          2-r menu
          <ul style={{ display: "none" }}>
            <li>2-r menunii huuhed 1</li>
          </ul>
        </li>
        <li>3-r menu</li>
      </ul> */}
    </Bla>
  );
}

export default Menu;
