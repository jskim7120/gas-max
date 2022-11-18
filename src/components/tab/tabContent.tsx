import EN1100 from "container/contents/en/en1100";
import EN1300 from "container/contents/en/en1300";
import EN1400 from "container/contents/en/en1400";
import EN1500 from "container/contents/en/en1500";
import EN1600 from "container/contents/en/en1600";
import EN1700 from "container/contents/en/en1700";
import EN1200 from "container/contents/en/en1200";
import EN1800 from "container/contents/en/en1800";
import EN1900 from "container/contents/en/en1900";
import EN2000 from "container/contents/en/en2000";
import CM1100 from "container/contents/cm1100";
import CM1300 from "container/contents/cm1300";
import CM1200 from "container/contents/cm1200";

export const getContent = (id: any, depthFullName: string) => {
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
      return <CM1100 depthFullName={depthFullName} menuId={id} />;
    case "CM1300":
      return <CM1300 depthFullName={depthFullName} menuId={id} />;
    case "CM1200":
      return <CM1200 depthFullName={depthFullName} menuId={id} />;
  }
};
