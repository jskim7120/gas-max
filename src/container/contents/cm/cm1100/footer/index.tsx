import { useEffect, useState } from "react";
import VerticalTab from "components/verticalTab";
import { TabContentWrapper } from "components/verticalTab/style";
import API from "app/axios";
import { useSelector } from "app/store";
import { CM110065 } from "app/path";
import getTabContent from "./getTabContent";

function CM1100Footer({ data }: { data: any }) {
  // const [data, setData] = useState([]);
  const [tabId, setTabId] = useState(0);
  // const cm1105 = useSelector((state) => state.modal.cm1105);

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
