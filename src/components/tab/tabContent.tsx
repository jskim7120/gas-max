import EN1100 from "container/contents/en/en1100";
import EN1200 from "container/contents/en/en1200";
import EN1300 from "container/contents/en/en1300";
import EN1400 from "container/contents/en/en1400";
import EN1500 from "container/contents/en/en1500";
import EN1600 from "container/contents/en/en1600";
import EN1700 from "container/contents/en/en1700";
import EN1800 from "container/contents/en/en1800";
import EN1900 from "container/contents/en/en1900";
import EN2000 from "container/contents/en/en2000";
import CM1100 from "container/contents/cm/cm1100";
import CM1200 from "container/contents/cm/cm1200";
import CM9002 from "container/contents/cm/cm9002";
import CM1300 from "container/contents/cm/cm1300";
import CM9003 from "container/contents/cm/cm9003";
import CM9004 from "container/contents/cm/cm9004";
import CM9005 from "container/contents/cm/cm9005";
import CM9006 from "container/contents/cm/cm9006";
import GR1100 from "container/contents/gr/gr1100";
import GR1500 from "container/contents/gr/gr1500";
import GR1200 from "container/contents/gr/gr1200";
import GR1300 from "container/contents/gr/gr1300";
import GR1600 from "container/contents/gr/gr1600";
import GR9002 from "container/contents/gr/gr9002";
import GR9003 from "container/contents/gr/gr9003";
import GR9004 from "container/contents/gr/gr9004";
import GR9005 from "container/contents/gr/gr9005";
import GR9006 from "container/contents/gr/gr9006";
import GR9007 from "container/contents/gr/gr9007";
import GR9008 from "container/contents/gr/gr9008";
import GR9009 from "container/contents/gr/gr9009";
import RV1100 from "container/contents/rv/rv1100";
import RV9005 from "container/contents/rv/rv9005";
import RV9006 from "container/contents/rv/rv9006";

import CC1100 from "container/contents/cc/cc1100";
import CC1400 from "container/contents/cc/cc1400";
import CC1500 from "container/contents/cc/cc1500";
import CC1600 from "container/contents/cc/cc1600";
import CC1700 from "container/contents/cc/cc1700";
import CC9006 from "container/contents/cc/cc9006";
import CC9007 from "container/contents/cc/cc9007";
import CC9008 from "container/contents/cc/cc9008";
import CC9009 from "container/contents/cc/cc9009";

export const getContent = (
  id: any,
  depthFullName: string,
  areaCode: string
) => {
  switch (id) {
    case "HOME":
      return <div>Home</div>;
    case "EN1100":
      return <EN1100 depthFullName={depthFullName} menuId={id} />;
    case "EN1200":
      return <EN1200 depthFullName={depthFullName} menuId={id} />;
    case "EN1300":
      return <EN1300 depthFullName={depthFullName} menuId={id} />;
    case "EN1400":
      return <EN1400 depthFullName={depthFullName} menuId={id} />;
    case "EN1500":
      return <EN1500 depthFullName={depthFullName} menuId={id} />;
    case "EN1600":
      return <EN1600 depthFullName={depthFullName} menuId={id} />;
    case "EN1700":
      return <EN1700 depthFullName={depthFullName} menuId={id} />;
    case "EN1800":
      return <EN1800 depthFullName={depthFullName} menuId={id} />;
    case "EN1900":
      return <EN1900 depthFullName={depthFullName} menuId={id} />;
    case "EN2000":
      return <EN2000 depthFullName={depthFullName} menuId={id} />;
    case "CM1100":
      return (
        <CM1100 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM1200":
      return (
        <CM1200 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM9002":
      return (
        <CM9002 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM1300":
      return (
        <CM1300 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM9003":
      return (
        <CM9003 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM9004":
      return (
        <CM9004 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM9005":
      return (
        <CM9005 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CM9006":
      return (
        <CM9006 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR1100":
      return (
        <GR1100 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR1500":
      return (
        <GR1500 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR1200":
      return (
        <GR1200 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR1300":
      return (
        <GR1300 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR1600":
      return (
        <GR1600 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9002":
      return (
        <GR9002 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9003":
      return (
        <GR9003 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9004":
      return (
        <GR9004 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9005":
      return (
        <GR9005 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9006":
      return (
        <GR9006 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9007":
      return (
        <GR9007 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9008":
      return (
        <GR9008 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "GR9009":
      return (
        <GR9009 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "RV1100":
      return (
        <RV1100 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "RV9005":
      return (
        <RV9005 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "RV9006":
      return (
        <RV9006 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC1100":
      return (
        <CC1100 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC1400":
      return (
        <CC1400 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC1500":
      return (
        <CC1500 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC1600":
      return (
        <CC1600 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC1700":
      return (
        <CC1700 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC9006":
      return (
        <CC9006 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC9007":
      return (
        <CC9007 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC9008":
      return (
        <CC9008 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
    case "CC9009":
      return (
        <CC9009 depthFullName={depthFullName} menuId={id} areaCode={areaCode} />
      );
  }
};
