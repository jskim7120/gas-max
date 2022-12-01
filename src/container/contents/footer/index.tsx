import React from "react";
import { useDispatch } from "app/store";
import { openModal } from "app/state/modal/modalSlice";
import { FooterContainer } from "./style";
import PartnerImg from "assets/image/company_partners.png";
import { SearchIcon } from "components/allSvgIcon";

function Footer() {
  const dispatch = useDispatch();
  return (
    <FooterContainer>
      <div className="bussiness_partner_cnt">
        <img src={PartnerImg} />
        <p>최근거래처</p>
      </div>
      <form>
        <div className="search_wrapper">
          <input type="text" placeholder="" />
          <button
            type="button"
            onClick={() => dispatch(openModal({ type: "customerModal" }))}
          >
            <SearchIcon />
          </button>
        </div>
        <p>거래처명, -전화, +주소, *코드</p>
      </form>
    </FooterContainer>
  );
}

export default Footer;
