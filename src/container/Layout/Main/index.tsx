import React, { useState } from "react";
import { Main } from "./style";
import Tab from "components/Tab";
import styled from "styled-components";
import {
  SidebarOpen,
  SidebarClose,
  Sidebar1,
  Sidebar2,
  Sidebar3,
  Sidebar4,
  Sidebar5,
  Sidebar6,
  Sidebar7,
  Sidebar8,
  Sidebar9,
  Sidebar10,
} from "components/AllSvgIcon";

const Sidebar = styled.div<{ isOpen?: boolean }>`
  height: 100vh;
  width: 82px;
  min-width: 82px;
  background: #f8e5ba;
  border-right: 1px solid #707070;
  position: ${(props) => props.isOpen && "absolute"};
  left: 0;
  left: ${(props) => props.isOpen && "-82px"};
  //transition: left 0.4s ease-in-out;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  p,
  svg {
    display: block;
  }
  &:first-child {
    margin-top: 20px;
  }
`;

function MainContainer() {
  const [isOpen, setIsOpen] = useState(false);

  console.log("isOpen:", isOpen);

  return (
    // <Main>
    <div style={{ display: "flex" }}>
      <Sidebar
        isOpen={isOpen}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            background: "orange",
            height: "34px",
            minHeight: "34px",
            color: "#0057AA",
            fontFamily: "",
            fontSize: "12px",
            textAlign: "center",
            padding: "5px 0 0 0",
          }}
        >
          바로가기
        </div>
        <nav>
          <ul>
            <List>
              <Sidebar1 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar2 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar3 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar4 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar5 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar6 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar7 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar8 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar9 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
            <List>
              <Sidebar10 />
              <p style={{ fontSize: "12px" }}>중량판매</p>
            </List>
          </ul>
        </nav>
      </Sidebar>
      <div
        style={{ height: "32px", width: "32px" }}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {isOpen ? <SidebarOpen /> : <SidebarClose />}
      </div>

      <Tab />
    </div>
    // </Main>
  );
}

export default MainContainer;
