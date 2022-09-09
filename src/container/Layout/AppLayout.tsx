import React from "react";
import { Outlet } from "react-router-dom";
import MainSide from "./Main";
import { useDispatch, useSelector } from "app/store";
import { Container, LeftSide, Top, Middle, Bottom, Navigation } from "./style";
import { Power, Settings, Calendar } from "components/AllSvgIcon";
import Logo from "image/GasMax.png";
import UserImg from "image/user.png";

let favMenuData: any;

export default function AppLayout() {
  favMenuData = useSelector((state) => state.favMenu.favMenu);
  return (
    <Container>
      <LeftSide>
        <Navigation>
          <Top>
            <img src={Logo} width="200px" />
            <img src={UserImg} width="auto" />
            <p>사용자1[영업소]</p>
            <p>최근접속시간 2022-09-01 14:01:25</p>
          </Top>
          <Middle>
            <div>
              <Calendar />
              <p>즐겨찾기</p>
            </div>
            <div>
              {favMenuData?.map((data: any, i: number) => (
                <div className="fav_menu_item" key={i}>
                  <div>-</div>
                  <div>{data.menuName}</div>
                </div>
              ))}
            </div>
          </Middle>

          <Bottom>
            <span>
              <Power />
              <Settings color="gray" />
            </span>
            <div className="time">15:50</div>
          </Bottom>
        </Navigation>
      </LeftSide>
      <Outlet />
      {/* <MainSide /> */}
    </Container>
  );
}
