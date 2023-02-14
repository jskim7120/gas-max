import { useEffect, useState } from "react";
import VerticalTab from "components/verticalTab";
import { TabContentWrapper } from "components/verticalTab/style";
import API from "app/axios";
import { useSelector } from "app/store";
import { CM110065 } from "app/path";
import getTabContent from "./getTabContent";
import { addInfo } from "app/state/modal/footerSlice";
import { useDispatch } from "app/store";

function CM1100Footer() {
  const [data, setData] = useState([]);
  const [tabId, setTabId] = useState(0);
  const cm1105 = useSelector((state) => state.modal.cm1105);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }
  }, [cm1105.areaCode, cm1105.cuCode]);

  const fetchData = async () => {
    try {
      const { data } = await API.get(CM110065, {
        params: { cuCode: cm1105.cuCode, areaCode: cm1105.areaCode },
      });
      if (data) {
        setData(data);
        dispatch(addInfo({ info: data.footDetail[0] }));
      } else {
        setData([]);
      }
    } catch (err) {
      setData([]);
      console.log("CM1100 data search fetch error =======>", err);
    }
  };

  return (
    <div style={{ display: "flex", borderTop: "1px solid #707070" }}>
      <VerticalTab
        tabHeader={["사용품목", "공급시설", "결재정보"]}
        onClick={(id) => setTabId(id)}
      />
      <TabContentWrapper>{getTabContent(tabId, data)}</TabContentWrapper>
    </div>
  );
}

export default CM1100Footer;
