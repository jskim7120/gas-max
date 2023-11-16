import { useState } from "react";
import VerticalTab from "components/verticalTab";
import { TabContentWrapper } from "components/verticalTab/style";
import getTabContent from "./getTabContent";

function CM1100Footer({ data, selected }: { data: any; selected: any }) {
  const [tabId, setTabId] = useState(0);

  return (
    <div style={{ display: "flex", borderTop: "1px solid #707070" }}>
      <VerticalTab
        tabHeader={["사용 품목", "공급 시설", "결재 정보"]}
        onClick={(id) => setTabId(id)}
      />
      <TabContentWrapper>
        {getTabContent(tabId, data, selected)}
      </TabContentWrapper>
    </div>
  );
}

export default CM1100Footer;
