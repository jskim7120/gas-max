import React from "react";
import { useSelector, useDispatch } from "app/store";
import { addTab } from "app/state/tab/tabSlice";
import {
  FavMenuList,
  FavMenuItem,
  RecentMenuList,
  RecentMenuItem,
  RecentItemContainer,
} from "./style";
import {
  Settings,
  User,
  Favorite,
  IconFile,
  Attach,
  DeliveryTruck,
} from "components/allSvgIcon";

let favMenuData: Array<any>;

function FavMenu() {
  const dispatch = useDispatch();
  //favMenuData = useSelector((state) => state.favMenu.favMenu);

  const handleClick = (data: any) => {
    dispatch(
      addTab({
        menuId: data.menuId,
        menuName: data.menuName,
        depthFullName: data.depthFullName,
      })
    );
  };

  return (
    <FavMenuList>
      {favMenuData?.map((data: any, i: number) => (
        <FavMenuItem key={i}>
          <a onClick={() => handleClick(data)}>
            <IconFile />
            {data.menuName}
          </a>
        </FavMenuItem>
      ))}
      <RecentMenuList>
        <Attach />
        <span>최근메뉴</span>
      </RecentMenuList>
      <RecentMenuItem>
        <RecentItemContainer>
          <IconFile />
          <span>안전관리실시대장</span>
        </RecentItemContainer>
        <RecentItemContainer>
          <DeliveryTruck />
          <span>판매등록</span>
        </RecentItemContainer>
        <RecentItemContainer>
          <IconFile />
          <span>현금출납</span>
        </RecentItemContainer>
      </RecentMenuItem>
    </FavMenuList>
  );
}

export default FavMenu;
