import { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "app/store";
import { addTab } from "features/tab/tabSlice";
import Dropdown from "./Dropdown";
interface IMenuItems {
  items: any;
  depthLevel: any;
}

const MenuItems: FC<IMenuItems> = ({ items, depthLevel }) => {
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

    const handlerTouch = (event: TouchEvent): void => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as HTMLLIElement)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handlerTouch);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handlerTouch);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const clickOnMenu = () => {
    dispatch(
      addTab({
        menuId: items.menuId,
        menuName: items.menuName,
        depthFullName: items.depthFullName,
      })
    );
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.menuName}{" "}
            {depthLevel > 0 ? (
              <span className="arrow-side"></span>
            ) : (
              <span className="arrow" />
            )}{" "}
          </button>{" "}
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.children}
            dropdown={dropdown}
          />{" "}
        </>
      ) : (
        <a onClick={clickOnMenu}> {items.menuName} </a>
      )}{" "}
    </li>
  );
};

export default MenuItems;
