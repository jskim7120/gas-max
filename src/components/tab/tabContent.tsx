import EN1100 from "container/contents/en1100";
import EN1500 from "container/contents/en1500";
import EN1600 from "container/contents/en1600";

export const getContent = (
  id: any,
  menuName: string,
  depthFullName: string
) => {
  switch (id) {
    case "EN1100":
      return <EN1100 name={menuName} depthFullName={depthFullName} />;
    case "EN1500":
      return <EN1500 name={menuName} depthFullName={depthFullName} />;
    case "EN1600":
      return <EN1600 name={menuName} depthFullName={depthFullName} />;
  }
};
