import { useState } from "react";
import VerticalTab from "components/verticalTab";
import { TabContentWrapper } from "components/verticalTab/style";
import getTabContent from "./getTabContent";

function CM1100Footer({ data }: { data: any }) {
  const [tabId, setTabId] = useState(0);

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
