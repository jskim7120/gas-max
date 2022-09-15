import React from "react";
import { useSelector, useDispatch } from "app/store";
import { addTab } from "features/tab/tabSlice";
import FavMenuList from "./style";

let favMenuData: Array<any>;

function FavMenu() {
  const dispatch = useDispatch();
  favMenuData = useSelector((state) => state.favMenu.favMenu);
  console.log("favMenu data===>", favMenuData);

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
        <div className="fav_menu_item" key={i}>
          <a onClick={() => handleClick(data)}>{data.menuName}</a>
        </div>
      ))}
    </FavMenuList>
  );
}

export default FavMenu;
