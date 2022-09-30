import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "app/store";
import { toggleSidebar } from "features/sidebar/sidebarSlice";
import { Main, Sidebar, UnOrderedList } from "./style";
import Tab from "components/Tab";

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

function MainContainer() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);

  return (
    <Main>
      <Sidebar isOpen={isOpen}>
        <span className="header">바로가기</span>
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
        {isOpen ? <SidebarClose /> : <SidebarOpen />}
      </div>

      <Tab />
    </Main>
  );
}

export default MainContainer;
