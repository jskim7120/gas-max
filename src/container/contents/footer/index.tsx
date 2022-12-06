import React, { useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import { openModal } from "app/state/modal/modalSlice";
import { FooterContainer } from "./style";
import PartnerImg from "assets/image/company_partners.png";
import { SearchIcon } from "components/allSvgIcon";
import { getCuType } from "./helper";

function Footer() {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.footer);

  useEffect(() => {
    if (info && JSON.stringify(info) !== "{}") {
      console.log("info:", info);
    }
  }, [info]);

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

      <div style={{ marginLeft: "40px" }}>
        {getCuType(info.cuType)}
        <div style={{ display: "flex" }}>
          {info.cuCode}
          {info.cuViewName}
        </div>
        <div style={{ display: "flex" }}></div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
