import React, { useState } from "react";
import { Main } from "./style";
import Tab from "components/Tab";
import { useSelector, useDispatch } from "app/store";
import styled from "styled-components";
import { toggleSidebar } from "features/sidebar/sidebarSlice";
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
  height: 100%;
  width: 82px;
  min-width: 82px;
  background: #f8e5ba;
  border-right: 1px solid #707070;
  position: ${(props) => !props.isOpen && "absolute"};
  left: 0;
  left: ${(props) => !props.isOpen && "-82px"};
`;

const UnOrderedList = styled.ul`
  &:first-child {
    margin-top: 20px;
  }

  a {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    font-family: "SegoeUI";
    font-size: 12px;
  }
`;

function MainContainer() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);

  return (
    <div style={{ display: "flex", width: "100%", height: "auto" }}>
      <Sidebar
        isOpen={isOpen}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            background: `linear-gradient(rgba(230, 164, 9, 0.2),rgba(230, 164, 9, 1))`,
            height: "34px",
            minHeight: "34px",
            color: "#0057AA",
            fontFamily: "",
            fontSize: "12px",
            textAlign: "center",
            padding: "6px 0 0 0",
          }}
        >
          바로가기
        </div>
        <nav>
          <UnOrderedList>
            <li>
              <a>
                <Sidebar1 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar2 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar3 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar4 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar5 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar6 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar7 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar8 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar9 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
            <li>
              <a>
                <Sidebar10 />
                <p style={{ fontSize: "12px" }}>중량판매</p>
              </a>
            </li>
          </UnOrderedList>
        </nav>
      </Sidebar>
      <div
        style={{ height: "31px", width: "31px" }}
        onClick={() => dispatch(toggleSidebar())}
      >
        {isOpen ? <SidebarOpen /> : <SidebarClose />}
      </div>

      <Tab />
    </div>
  );
}

export default MainContainer;
