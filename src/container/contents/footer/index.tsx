import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "app/store";
import { openModal } from "app/state/modal/modalSlice";
import { addSearchText, removeSearchText } from "app/state/modal/footerSlice";
import API from "app/axios";
import { FOOTHISTORY } from "app/path";
import { FooterContainer } from "./style";
import { SearchIcon } from "components/allSvgIcon";
import { getCuType, getCuStae, getCircleBadge } from "./helper";
import Badge from "components/badge";
import { BadgeColor, BadgeSize } from "components/componentsType";
import PartnerImg from "assets/image/company_partners.png";
import CARIMG from "assets/image/carIMG.png";
import YIMG from "assets/image/yellowBtn.png";

function Footer() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState<any>({});
  const [searchText, setSearchText] = useState("");

  const infoState = useSelector((state) => state.footer.info);

  useEffect(() => {
    fetchLatestFooterData();
  }, []);

  useEffect(() => {
    if (infoState) {
      setInfo(infoState);
    }
  }, [infoState]);

  const fetchLatestFooterData = async () => {
    try {
      const { data } = await API.get(FOOTHISTORY);
      if (data) {
        setInfo(data[0]);
      } else {
        setInfo({});
      }
    } catch (err) {
      setInfo({});
      console.log("fetch foothistory error:::", err);
    }
  };

  return (
    <FooterContainer>
      <div style={{ display: "flex" }}>
        <div className="bussiness_partner_cnt">
          <img src={PartnerImg} />
          <p>최근거래처</p>
        </div>
        <form>
          <div className="search_wrapper">
            <input
              type="text"
              placeholder=""
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (searchText.length > 0) {
                  let fieldName = "";
                  let text = "";

                  if (searchText.charAt(0) === "+") {
                    fieldName = "sCuAddr";
                    text = searchText.slice(1);
                  } else if (searchText.charAt(0) === "-") {
                    fieldName = "sCuTel";
                    text = searchText.slice(1);
                  } else if (searchText.charAt(0) === "*") {
                    fieldName = "sCuCode";
                    text = searchText.slice(1);
                  } else {
                    fieldName = "sCuName";
                    text = searchText;
                  }
                  dispatch(
                    addSearchText({
                      search: {
                        fieldName: fieldName,
                        text: text,
                      },
                    })
                  );
                } else {
                  dispatch(removeSearchText({}));
                }

                dispatch(openModal({ type: "customerModal" }));
              }}
            >
              <SearchIcon />
            </button>
          </div>
          <p>거래처명, -전화, +주소, *코드</p>
        </form>
        <div className="address-part">
          <div className="cuType">{getCuType(info?.cuType)}</div>
          <div>
            <div style={{ display: "flex" }}>
              <div className="text big w-85">{info?.cuCode}</div>
              <div className="text big w-200">
                <b>{info?.cuViewName}</b>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="text small w-70">{info?.cuTel}</div>
              <div className="text small w-90">{info?.cuHp}</div>
              <div className="text small  w-120">{info?.cuTel2}</div>
            </div>
            <div className="text small w-320">{info?.cuAddr1n2}</div>
          </div>
        </div>
        <div className="badge-part">
          <div>
            <div className="badge-container">
              <div className="cuStae">
                <b>{getCuStae(info?.cuStae)}</b>
              </div>
              <div className="circle-badge">
                {getCircleBadge("tTransYn", info?.tTransYn)}
              </div>
              <div className="circle-badge">
                {getCircleBadge("jTransYn", info?.jTransYn)}
              </div>
              <div className="circle-badge">
                {getCircleBadge("mTransYn", info?.mTransYn)}
              </div>
              <div className="circle-badge">
                {getCircleBadge("barcodeYn", info?.barcodeYn)}
              </div>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size1}
                color={BadgeColor.brownDark}
                title="담당사원"
              />
              <span>{info?.cuSwName}</span>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size1}
                color={BadgeColor.purpleDark}
                title="수금방법"
              />
              <span>{info?.cuSukumtypeName}</span>
            </div>
          </div>
          <div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.brownLight}
                title="계약일"
              />
              <span>{info?.cuGongdate}</span>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.goldenBrown}
                title="점검일"
              />
              <span>{info?.cuHdate}</span>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.greenLight}
                title="예정일"
              />
              <span>{info?.cuHdateT}</span>
            </div>
          </div>
          <div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.greenMedium}
                title="보증금"
              />
              <span style={{ textAlign: "right" }}>{info?.cuTongkum}</span>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.greenDark}
                title="중량"
              />
              <span style={{ textAlign: "right" }}>{info?.cuJmisu}</span>
            </div>
            <div className="rectangle-badge-wrapper">
              <Badge
                size={BadgeSize.size2}
                color={BadgeColor.purpleLight}
                title="체적"
              />
              <span style={{ textAlign: "right" }}>{info?.cuCmisu}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="carBtn">
        <span>
          <img src={CARIMG} alt="car" style={{ marginRight: "5px" }} />
        </span>
        <span>
          <img src={YIMG} alt="ybtn" />
        </span>
      </div>
    </FooterContainer>
  );
}

export default Footer;
