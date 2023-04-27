import styled from "styled-components";
import T_IMG from "assets/image/T.png";
import C_IMG from "assets/image/C.png";
import M_IMG from "assets/image/M.png";
import B_IMG from "assets/image/Barcode.png";

const Text1 = styled.div`
  height: 25px;
  width: 35px;
  border: 1px solid #7250ff;
  color: #7250ff;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const Text2 = styled.div`
  color: #f90606;
  font-family: "NotoSansKRRegular";
  font-size: 15px;
`;

export function getCuType(cuType: string) {
  switch (cuType) {
    case "0": {
      return <Text1>중량</Text1>;
    }
    case "1":
      return <Text1>체적</Text1>;
    case "2":
      return <Text1>둘다</Text1>;
    case "3":
      return <Text1>기타</Text1>;
    case "4":
      return <Text1>모두</Text1>;
  }
  return null;
}

export function getCuStae(cuStae: string) {
  switch (cuStae) {
    case "0": {
      return null;
    }
    case "1":
      return <Text2>[대기]</Text2>;
    case "2":
      return <Text2>[중지]</Text2>;
    case "3":
      return <Text2>[폐업]</Text2>;
  }
  return null;
}

export function getCircleBadge(fieldName: string, value: string) {
  if (fieldName === "tTransYn" && value === "Y") {
    return <img src={T_IMG} alt="t" />;
  }
  if (fieldName === "jTransYn" && value === "Y") {
    return <img src={C_IMG} alt="c" />;
  }
  if (fieldName === "mTransYn" && value === "Y") {
    return <img src={M_IMG} alt="m" />;
  }
  if (fieldName === "barcodeYn" && value === "Y") {
    return <img src={B_IMG} alt="b" />;
  }
}
