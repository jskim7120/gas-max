import React from "react";
import styled from "styled-components";
import { BadgeColor, BadgeShape } from "components/componentsType";

const BadgeWrapper = styled.span<{ color: BadgeColor }>`
  height: 15px;
`;

function Badge({
  title,
  style,
  color,
  shape,
}: {
  title: string;
  style?: any;
  color?: BadgeColor;
  shape?: BadgeShape;
}) {
  return (
    <BadgeWrapper color={color ? color : BadgeColor.brownDark}>
      {title}
    </BadgeWrapper>
  );
}

export default Badge;
