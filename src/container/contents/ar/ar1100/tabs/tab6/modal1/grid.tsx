import { useEffect, useRef } from "react";
import {
  GridView,
  LocalDataProvider,
  TreeView,
  LocalTreeDataProvider,
} from "realgrid";
//import { fields, columns } from "./data";

function Grid({ data, style }: { data: any; style?: any }) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;

    dp = new LocalTreeDataProvider(true);
    gv = new TreeView(container);
    gv.setDataSource(dp);

    gv.treeOptions.iconImagesRoot = "/image/grid/";
    gv.treeOptions.iconImages = ["folder.png", "folder-open.png", "file.png"];
    gv.treeOptions.defaultIcon = 2;

    dp.setFields([
      { fieldName: "area1code", dataType: "text" },
      { fieldName: "area1name", dataType: "text" },
      { fieldName: "area2code", dataType: "text" },
      { fieldName: "area2name", dataType: "text" },
      { fieldName: "area3code", dataType: "text" },
      { fieldName: "area3name", dataType: "text" },
      { fieldName: "treeId", dataType: "text" },
      { fieldName: "treeName", dataType: "text" },
      { fieldName: "iconField", dataType: "text" },
    ]);

    gv.setColumns([
      { fieldName: "treeName", name: "treeName", width: 150 },
      { fieldName: "treeId", name: "treeId" },
      { fieldName: "area1code", name: "area1code" },
      { fieldName: "area1name", name: "area1name" },
      { fieldName: "area2code", name: "area2code" },
      { fieldName: "area2name", name: "area2name" },
      { fieldName: "area3code", name: "area3code" },
      { fieldName: "area3name", name: "area3name" },
      { fieldName: "iconField", name: "iconField" },
    ]);

    dp.setRows(data, "treeId", false, "", "iconField");
    gv.refresh();

    return () => {
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} className="AR1100" ref={realgridElement}></div>;
}

export default Grid;
