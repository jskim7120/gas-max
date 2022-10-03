import React from "react";
import { FooterContainer } from "./style";
import PartnerImg from "assets/image/company_partners.png";
import { SearchIcon } from "components/AllSvgIcon";
import Dropdown from "components/dropdown";
import Hamburger from "assets/image/footer-humburger.png";
import { useDispatch } from "app/store";
import { openModal, closeModal } from "features/modal/modalSlice";

function Footer() {
  const dispatch = useDispatch();
  return (
    <FooterContainer>
      <div className="bussiness_partner_cnt">
        <img src={PartnerImg} />
        <div className="title">최근거래처</div>
      </div>
      <div className="container">
        <form>
          <input type="search" placeholder="" />
          <button
            type="button"
            onClick={() => dispatch(openModal({ type: "customerSearch" }))}
          >
            <SearchIcon />
          </button>
        </form>
      </div>
      <div>
        <Dropdown
          icon={<img src={Hamburger} />}
          content={
            <div
              style={{
                width: "320px",
                height: "389px",
              }}
            ></div>
          }
          position="bottom"
        />
      </div>
    </FooterContainer>
  );
}

export default Footer;
