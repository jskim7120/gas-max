import React from "react";
import { IconButton } from "./buttonStyle";

interface IButton {
  onClick: () => any;
  icon: JSX.Element;
  title?: string;
  style?: any;
}

function index({ onClick, icon, title, style }: IButton) {
  return (
    <IconButton onClick={onClick} style={style}>
      {icon && <span className="btn-icon">{icon}</span>}
      {title && title}
    </IconButton>
  );
}

export default index;
