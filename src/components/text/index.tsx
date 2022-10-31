import styled from "styled-components";
import IconInfo from "assets/image/Icon-info.png";

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  color: #1b8c8e;
  font-size: 12px;
`;

function InfoText({ text, style }: { text: string; style?: any }) {
  return (
    <InfoDiv style={style}>
      <img src={IconInfo} alt="info-icon" />
      <p>{text}</p>
    </InfoDiv>
  );
}

export { InfoText };
