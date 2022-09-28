import React from "react";
import TabContent1 from "container/contents/tab1/Tab1";
import TabContent2 from "container/contents/tab2/Tab2";
import TabContent3 from "container/contents/tab3/Tab3";
import EN1100 from "container/contents/EN1100";

export const getContent = (id: any, name: string) => {
  switch (id) {
    // case "M00":
    //   return <div></div>
    case "EN1100":
      return <EN1100 name={name} />;
    case "M00SD1400":
      return <TabContent2 name={name} />;
    case "M00SD1600":
      return <TabContent3 name={name} />;
    // case "M11":
    //   return < />;
    case "M11AR21":
      return <div>M11AR21</div>;
    case "M11AR2101":
      return <div>M11AR2101</div>;
    case "M11AR2102":
      return <div>M11AR2102</div>;
    case "M11AR2103":
      return <div>M11AR2103</div>;
    case "M11AR2104":
      return <div>M11AR2104</div>;
    case "M11AR2105":
      return <div>M11AR2105</div>;
    case "M11AR2106":
      return <div>M11AR2106</div>;
    case "M11AR2107":
      return <div>M11AR2107</div>;
    case "M11AR2108":
      return <div>M11AR2108</div>;
    case "M11AR2109":
      return <div>M11AR2109</div>;
    case "M11GR26":
      return <div>M11GR26</div>;
    case "M11GR2601":
      return <div>M11GR2601</div>;
    case "M11GR2602":
      return <div>M11GR2602</div>;
    case "M11GR2603":
      return <div>M11GR2603</div>;
    case "M11GR2604":
      return <div>M11GR2604</div>;
    case "M11GR2605":
      return <div>M11GR2605</div>;
    case "M11GR2606":
      return <div>M11GR2606</div>;
    case "M11GR2607":
      return <div>M11GR2607</div>;
    case "M11GR2608":
      return <div>M11GR2608</div>;
    case "M11GR2609":
      return <div>M11GR2609</div>;
    case "M11RV24":
      return <div>M11RV24</div>;
    case "M11RV2401":
      return <div>M11RV2401</div>;
    case "M11RV2402":
      return <div>M11RV2402</div>;
    case "M11RV2403":
      return <div>M11RV2403</div>;
    case "M11RV2404":
      return <div>M11RV2404</div>;
    case "M11RV2405":
      return <div>M11RV2405</div>;
    case "M11RV2406":
      return <div>M11RV2406</div>;
    case "M11RV2407":
      return <div>M11RV2407</div>;
    case "M11RV2408":
      return <div>M11RV2408</div>;
    case "M11RV2409":
      return <div>M11RV2409</div>;
    case "M11RV2410":
      return <div>M11RV2410</div>;
    case "M12":
      return <div>M12</div>;
    case "M12CM3001":
      return <div>M12CM3001</div>;
    case "M12CM3002":
      return <div>M12CM3002</div>;
    case "M12CM3003":
      return <div>M12CM3003</div>;
    case "M12CM3004":
      return <div>M12CM3004</div>;
    case "M12CM3005":
      return <div>M12CM3005</div>;
    case "M12CM3006":
      return <div>M12CM3006</div>;
    case "M12CM3007":
      return <div>M12CM3007</div>;
    case "M12CM3008":
      return <div>M12CM3008</div>;
    case "M12CM3009":
      return <div>M12CM3009</div>;
    case "M12CM3010":
      return <div>M12CM3010</div>;
    case "M12CM3011":
      return <div>M12CM3011</div>;
    case "M12CM3012":
      return <div>M12CM3012</div>;
    case "M12CM3013":
      return <div>M12CM3013</div>;
    case "M13":
      return <div>M13</div>;
    case "M13MM4001":
      return <div>M13MM4001</div>;
    case "M13MM4002":
      return <div>M13MM4002</div>;
    case "M13MM4003":
      return <div>M13MM4003</div>;
    case "M13MM4004":
      return <div>M13MM4004</div>;
    case "M13MM4005":
      return <div>M13MM4005</div>;
    case "M13MM4006":
      return <div>M13MM4006</div>;
    case "M13MM4007":
      return <div>M13MM4007</div>;
    case "M14":
      return <div>M14</div>;
    case "M14CC5001":
      return <div>M14CC5001</div>;
    case "M14CC5002":
      return <div>M14CC5002</div>;
    case "M14CC5003":
      return <div>M14CC5003</div>;
    case "M14CC5004":
      return <div>M14CC5004</div>;
    case "M14CC5005":
      return <div>M14CC5005</div>;
    case "M14CC5006":
      return <div>M14CC5006</div>;
    case "M14CC5007":
      return <div>M14CC5007</div>;
    case "M14CC5008":
      return <div>M14CC5008</div>;
    case "M14CC5009":
      return <div>M14CC5009</div>;
    case "M15":
      return <div>M15</div>;
    case "M15PT6001":
      return <div>M15PT6001</div>;
    case "M15PT6002":
      return <div>M15PT6002</div>;
    case "M15PT6003":
      return <div>M15PT6003</div>;
    case "M15PT6004":
      return <div>M15PT6004</div>;
    case "M15PT6005":
      return <div>M15PT6005</div>;
    case "M15PT6006":
      return <div>M15PT6006</div>;
    case "M15PT6007":
      return <div>M15PT6007</div>;
    case "M15PT6008":
      return <div>M15PT6008</div>;
    case "M15PT6009":
      return <div>M15PT6009</div>;
    case "M15PT6010":
      return <div>M15PT6010</div>;
    case "M16":
      return <div>M16</div>;
    case "M16AS7001":
      return <div>M16AS7001</div>;
    case "M16AS7002":
      return <div>M16AS7002</div>;
    case "M16AS7003":
      return <div>M16AS7003</div>;
    case "M17":
      return <div>M17</div>;
    case "M17ET8001":
      return <div></div>;
    case "M17ET8002":
      return <div></div>;
    case "M17ET8003":
      return <div></div>;
    case "M17ET8004":
      return <div></div>;
    case "M17ET8005":
      return <div></div>;
    case "M17ET8006":
      return <div></div>;
    case "M17ET8007":
      return <div></div>;
    case "M17ET8008":
      return <div></div>;
    case "M17ET8009":
      return <div></div>;
    case "M17ET8010":
      return <div></div>;
    case "M17ET8011":
      return <div></div>;
    case "M17ET8012":
      return <div></div>;
    case "M17ET8013":
      return <div></div>;
    case "M17ET8014":
      return <div></div>;
    case "M18":
      return <div></div>;
    case "M18CO91":
      return <div></div>;
    case "M18CO9101":
      return <div></div>;
    case "M18CO9102":
      return <div></div>;
    case "M18CO9103":
      return <div></div>;
    case "M18CO9104":
      return <div></div>;
    case "M18CO9105":
      return <div></div>;
    case "M18CO9106":
      return <div></div>;
    case "M18CO93":
      return <div></div>;
    case "M18CO9301":
      return <div></div>;
    case "M18CO9302":
      return <div></div>;
    case "M18CO9303":
      return <div></div>;
    case "M18CO9304":
      return <div></div>;
    case "M18CO95":
      return <div></div>;
    case "M18CO9501":
      return <div></div>;
    case "M18CO9502":
      return <div></div>;
    case "M18CO9503":
      return <TabContent1 name={name} />;
    case "M18CO9504":
      return <div></div>;
    case "M18CO9505":
      return <div></div>;
    case "M18CO9506":
      return <div></div>;
    case "M18CO97":
      return <div></div>;
    case "M18CO9701":
      return <div></div>;
    case "M18CO9702":
      return <div></div>;
    case "M18CO9703":
      return <div></div>;
    case "M18CO9704":
      return <div></div>;
    case "M18CO9705":
      return <div></div>;
    case "M18CO9706":
      return <div></div>;
    case "M19":
      return <div></div>;
    case "M19FM1001":
      return <div></div>;
    case "M19FM1002":
      return <div></div>;
    case "M19FM1003":
      return <div></div>;
    case "M19FM1004":
      return <div></div>;
    case "M19FM1005":
      return <div></div>;
    case "M19FM1006":
      return <div></div>;
    case "M19FM1007":
      return <div></div>;
    case "M19FM1008":
      return <div></div>;
    case "M19FM1009":
      return <div></div>;
    case "M19FM1010":
      return <div></div>;
    case "M19FM1011":
      return <div></div>;
    case "M19FM1012":
      return <div></div>;
    case "M19FM1013":
      return <div></div>;
    case "M19FM1014":
      return <div></div>;
    case "M19FM1015":
      return <div></div>;
    case "M19FM1019":
      return <div></div>;
    case "M19FM1020":
      return <div></div>;
    case "M19FM1021":
      return <div></div>;
    case "M19FM1022":
      return <div></div>;
  }
};
