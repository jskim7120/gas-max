import React from "react";
import { FooterContainer } from "./style";
import PartnerImg from "assets/image/company_partners.png";
import { SearchIcon } from "components/AllSvgIcon";
import Hamburger from "assets/image/footer-humburger.png";

function Footer() {
  return (
    <FooterContainer>
      <div className="bussiness_partner_cnt">
        <img src={PartnerImg} />
        <div className="title">최근거래처</div>
      </div>
      <div className="container">
        <form>
          <input type="search" placeholder="" />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
      </div>
      <div>
        <img src={Hamburger} />
      </div>
    </FooterContainer>
  );
}

export default Footer;
