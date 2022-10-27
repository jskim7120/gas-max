import EN1100 from "container/contents/en1100";
import EN1500 from "container/contents/en1500";
import EN1600 from "container/contents/en1600";
import EN1200 from "container/contents/en1200";

export const getContent = (
  id: any,
  menuName: string,
  depthFullName: string
) => {
  switch (id) {
    case "EN1100":
      return <EN1100 depthFullName={depthFullName} menuId={id} />;
    case "EN1200":
      return <EN1200 depthFullName={depthFullName} menuId={id} />;
    case "EN1500":
      return <EN1500 depthFullName={depthFullName} menuId={id} />;
    case "EN1600":
      return <EN1600 depthFullName={depthFullName} menuId={id} />;
  }
};
