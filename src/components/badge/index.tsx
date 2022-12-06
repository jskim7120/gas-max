import React from "react";
import styled from "styled-components";
import { BadgeColor, BadgeShape, BadgeSize } from "components/componentsType";

const getColor = (color: BadgeColor) => {
  switch (color) {
    case BadgeColor.orange:
      return `#FF4E00`;
    case BadgeColor.goldenBrown:
      return `#885507`;
    case BadgeColor.brownLight:
      return `#5E2105`;
    case BadgeColor.brownDark:
      return `#580B0B`;
    case BadgeColor.purpleLight:
      return `#67069E`;
    case BadgeColor.purpleDark:
      return `#480681`;
    case BadgeColor.greenLight:
      return `#147B1A`;
    case BadgeColor.greenMedium:
      return `#0A827E`;
    case BadgeColor.greenDark:
      return `#04658A`;
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
    case BadgeSize.size4:
      return {
        height: "18px",
        width: "18px",
      };
  }
};

const BadgeWrapper = styled.div<{
  color: BadgeColor;
  size: BadgeSize;
  shape: BadgeShape;
}>`
  width: ${(props) => getSize(props.size).width};
  height: ${(props) => getSize(props.size).height};
  background: ${(props) => getColor(props.color)};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${(props) => {
    switch (props.shape) {
      case BadgeShape.circle:
        return `
          border-radius: 100%;          
          font-weight:600;
          font-size: 12px;
        `;
      case BadgeShape.rectangle:
        return `
          border-radius: 2px;          
          font-size: 10px;
                
        `;
    }
  }};
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
      shape={shape ? shape : BadgeShape.rectangle}
    >
      {title}
    </BadgeWrapper>
  );
}

export default Badge;
