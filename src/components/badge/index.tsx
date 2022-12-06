import React from "react";
import styled from "styled-components";
import { BadgeColor, BadgeShape, BadgeSize } from "components/componentsType";

const getColor = (color: BadgeColor) => {
  switch (color) {
    case BadgeColor.brownDark:
      return `#885507`;
    case BadgeColor.orange:
      return `#FF4E00`;
  }
};

const getSize = (size: BadgeSize) => {
  switch (size) {
    case BadgeSize.size1:
      return {
        height: "15px",
        width: "48px",
      };
    case BadgeSize.size2:
      return {
        height: "18px",
        width: "35px",
      };
    case BadgeSize.size3:
      return {
        height: "21px",
        width: "62px",
      };
  }
};

const BadgeWrapper = styled.span<{ color: BadgeColor; size: BadgeSize }>`
  width: ${(props) => getSize(props.size).width};
  height: ${(props) => getSize(props.size).height};
  display: inline-block;

  background: ${(props) => getColor(props.color)};
  border-radius: 2px;
  padding-top: 2px;
  text-align: center;
  color: #fff;
  font-size: 10px;
`;

function Badge({
  title,
  style,
  color,
  shape,
  size,
}: {
  title: string;
  style?: any;
  color?: BadgeColor;
  shape?: BadgeShape;
  size?: BadgeSize;
}) {
  return (
    <BadgeWrapper
      color={color ? color : BadgeColor.brownDark}
      size={size ? size : BadgeSize.size1}
    >
      {title}
    </BadgeWrapper>
  );
}

export default Badge;
