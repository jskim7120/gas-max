import styled from "styled-components";
import IconInfo from "assets/image/Icon-info.png";
import PersonIconSvg from "assets/image/person-info.svg";
import BuildingIconSvg from "assets/image/building-info.svg";
import { IconInfo as IconInfoComp } from "components/allSvgIcon";

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    color: #1b8c8e;
    font-size: 15px;
  }
`;

const BuildingDiv = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #1b8c8e;
    font-family: "NotoSansKRRegular";
    font-size: 14px;
    font-weight: bold;
  }

  img {
    margin-right: 5.3px;
  }
`;

const PersonInfoDiv = styled.div`
  display: flex;
  align-items: center;

  p {
    font-family: "NotoSansKRRegular";
    font-size: 14px;
    color: "#0a0a0a";
  }

  img {
    margin-right: 3.8px;
  }
`;

function InfoText({ text, style }: { text: string; style?: any }) {
  return (
    <InfoDiv style={style}>
      <img src={IconInfo} alt="info-icon" />
      <p>{text}</p>
    </InfoDiv>
  );
}

function PersonInfoText({
  text,
  style,
  textStyle,
}: {
  text: string;
  style?: any;
  textStyle?: any;
}) {
  return (
    <PersonInfoDiv style={style}>
      <img src={PersonIconSvg} alt="person-icon" />
      <p style={textStyle && textStyle}>{text}</p>
    </PersonInfoDiv>
  );
}

function BuildingInfoText({ text, style }: { text: string; style?: any }) {
  return (
    <BuildingDiv style={style}>
      <img src={BuildingIconSvg} alt="building-icon" />
      <p>{text}</p>
    </BuildingDiv>
  );
}

export { InfoText, PersonInfoText, BuildingInfoText };
