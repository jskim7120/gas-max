import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { MagnifyingGlass } from "components/allSvgIcon";
import styled from "styled-components";

export const SearchBtn = styled.button`
  width: 26px;
  height: 26px;
  background: #666666;
  padding: 2px 0 0 4px;
  border-radius: 5px;
  border: 1px solid #707070;
`;

interface IPostcode {
  setAddress: (arg: string) => void;
  onClose?: any;
  disabled?: boolean;
  defaultValue?: string;
}

const Postcode = ({
  setAddress,
  onClose,
  disabled = false,
  defaultValue,
}: IPostcode) => {
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
    sido: string;
    sidoEnglish: string;
  }) => {
    // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // e.g '서울시 강남구'

    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

      setAddress(
        `${
          fullAddress +
          "/" +
          data?.zonecode +
          "/" +
          data?.sido +
          "/" +
          data?.sidoEnglish
        }`
      );
    }
  };

  const handleClick = () => {
    if (!disabled) {
      open({
        onComplete: handleComplete,
        onClose: onClose && onClose,
        defaultQuery: defaultValue ? defaultValue : "",
        width: 500,
        height: 600,
        left: window.screen.width > 2000 ? 2200 : 2500,
        top: window.screen.height / 2 - 300,
      });
    }
  };

  return (
    <SearchBtn type="button" onClick={handleClick}>
      <MagnifyingGlass />
    </SearchBtn>
  );
};

export default Postcode;
