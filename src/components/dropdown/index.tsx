import React, { useState } from "react";
import { DropDownWrapper, DropDownContent } from "./style";

interface IDropDown {
  icon?: JSX.Element;
  label?: string;
  content?: JSX.Element;
  position?: "top" | "bottom";
}
function Dropdown({ icon, position = "top", label, content }: IDropDown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownWrapper>
      {icon && <a onClick={() => setIsOpen((isOpen) => !isOpen)}>{icon}</a>}
      {label && <a onClick={() => setIsOpen((isOpen) => !isOpen)}>{label}</a>}
      <DropDownContent isOpen={isOpen} position={position}>
        {content}
      </DropDownContent>
    </DropDownWrapper>
  );
}

export default Dropdown;
