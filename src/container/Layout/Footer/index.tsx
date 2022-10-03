import React from "react";
import {
  FooterContainer,
  AddrContainer,
  AddrDetail,
  LogoImgContainer,
  SearchResultCont,
  SearchResult,
  SearchResultItem,
  SearchResultTitle,
  SearchResultData,
} from "./style";
import PartnerImg from "assets/image/company_partners.png";
import { SearchIcon } from "components/AllSvgIcon";
import Dropdown from "components/dropdown";
import Hamburger from "assets/image/footer-humburger.png";
import { useDispatch } from "app/store";
import { openModal, closeModal } from "features/modal/modalSlice";
import TLogo from "assets/image/TLogo.png";
import GLogo from "assets/image/GLogo.png";
import BarCodeLogo from "assets/image/BarCodeLogo.png";

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
      <AddrContainer>
        <AddrDetail>
          <p>
            000-00000 가나라다라바사아자차카...<span>[중지]</span>
          </p>
          <p>010-2701-1234 010-2079-5390</p>
          <p>서울시 광진구 자양동 584-3</p>
        </AddrDetail>
        <LogoImgContainer>
          <img src={TLogo} />
          <img src={GLogo} />
          <img src={BarCodeLogo} />
        </LogoImgContainer>
      </AddrContainer>
      <SearchResultCont>
        <SearchResult>
          <SearchResultItem>
            <SearchResultTitle>수금방법</SearchResultTitle>
            <SearchResultData>카드결제</SearchResultData>
          </SearchResultItem>
          <SearchResultItem>
            <SearchResultTitle>가상계좌</SearchResultTitle>
            <SearchResultData>1234-2345-1234-9876</SearchResultData>
          </SearchResultItem>
        </SearchResult>
        <SearchResult>
          <SearchResultItem>
            <SearchResultTitle>계약일</SearchResultTitle>
            <SearchResultData>2022-09-20</SearchResultData>
          </SearchResultItem>
          <SearchResultItem>
            <SearchResultTitle>점검일</SearchResultTitle>
            <SearchResultData>2023-01-20</SearchResultData>
          </SearchResultItem>
        </SearchResult>
        <SearchResult>
          <SearchResultItem>
            <SearchResultTitle>보증금</SearchResultTitle>
            <SearchResultData>10,000,000</SearchResultData>
          </SearchResultItem>
          <SearchResultItem>
            <SearchResultTitle style={{ backgroundColor: "#CC15A2" }}>
              미수금
            </SearchResultTitle>
            <SearchResultData>139,000</SearchResultData>
          </SearchResultItem>
        </SearchResult>
      </SearchResultCont>
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
