import { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "app/store";
import { addTab } from "app/state/tab/tabSlice";
import { Group, MenuLine } from "./style";
interface IMenuItems {
  items: any;
}

const MenuItems: FC<IMenuItems> = ({ items }) => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef() as React.MutableRefObject<HTMLLIElement>;

  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as HTMLLIElement)
      ) {
        setDropdown(false);
      }
    };
    // const handlerTouch = (event: TouchEvent): void => {
    //   if (
    //     dropdown &&
    //     ref.current &&
    //     !ref.current.contains(event.target as HTMLLIElement)
    //   ) {
    //     setDropdown(false);
    //   }
    // };
    document.addEventListener("mousedown", handler);
    // document.addEventListener("touchstart", handlerTouch);
    return () => {
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener("touchstart", handlerTouch);
    };
  }, [dropdown]);

  const clickOnMenu = (e: any, menu: any) => {
    e.preventDefault();
    dispatch(
      addTab({
        menuId: menu.menuid,
        menuName: menu.menuname,
        depthFullName: menu.depthFullname,
      })
    );
    setDropdown(false);
  };

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MenuLine />
      <button type="button" onClick={() => setDropdown((prev) => !prev)}>
        {items.menuname}
      </button>

      {items.children.length > 0 && (
        <div
          className="menu-dropdown"
          style={{ display: dropdown ? "block" : "none" }}
        >
          {items.children.map((item: any, idx: number) => {
            if (item.menuname !== "-")
              return (
                <a key={idx} onClick={(e) => clickOnMenu(e, item)}>
                  {item.menuname}
                </a>
              );
            else return <Group key={idx} />;
          })}
        </div>
      )}
    </li>
  );
};

export default MenuItems;
