import EN1100 from "container/contents/en1100";
import EN1400 from "container/contents/en1400";
import EN1500 from "container/contents/en1500";
import EN1600 from "container/contents/en1600";
import EN1700 from "container/contents/en1700";
import EN1200 from "container/contents/en1200";
import EN1800 from "container/contents/en1800";
import EN1900 from "container/contents/en1900";
import EN2000 from "container/contents/en2000";

export const getContent = (id: any, depthFullName: string) => {
  switch (id) {
    case "HOME":
      return <div>Home</div>;
    case "EN1100":
      return <EN1100 depthFullName={depthFullName} menuId={id} />;
    case "EN1200":
      return <EN1200 depthFullName={depthFullName} menuId={id} />;
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
  }
};
