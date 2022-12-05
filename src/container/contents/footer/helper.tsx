import styled from "styled-components";

const Text1 = styled.div`
  height: 21px;
  width: 34px;
  border: 1px solid #7250ff;
  color: #7250ff;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
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
