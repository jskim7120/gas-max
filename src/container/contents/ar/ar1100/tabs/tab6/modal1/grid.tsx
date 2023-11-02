import { useEffect, useRef } from "react";
import { TreeView, LocalTreeDataProvider } from "realgrid";
import { fields, columns } from "./data";

function Grid({ data, style }: { data: any; style?: any }) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (realgridElement?.current) {
      container = realgridElement?.current as HTMLDivElement;

      dp = new LocalTreeDataProvider(true);
      gv = new TreeView(container);
      gv.setDataSource(dp);

      dp.setFields(fields);
      gv.setColumns(columns);

      gv.treeOptions.iconImagesRoot = "./grid/";
      gv.treeOptions.iconImages = [
        "folder-minus.svg",
        "folder-plus.svg",
        "file.svg",
      ];
      // gv.setTreeOptions({
      //   showCheckBox: true,
      // });

      console.log("gv::", gv);

      gv.treeOptions.expandedIcon = 0;
      gv.treeOptions.collapsedIcon = 1;
      gv.treeOptions.defaultIcon = 2;

      dp.setRows(data, "mjId", false, "", "mjDate");
      gv.setHeader({ height: 35 });
      gv.setFooter({ visible: false });
      gv.setOptions({
        indicator: { visible: true },
        checkBar: { visible: true },
        stateBar: { visible: false },
      });
      gv.displayOptions.rowHeight = 35;
      gv.refresh();

      gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
        // console.log("oldValue:", oldValue);
        // console.log("newValue:", newValue);
        // console.log("index:::", index);

        gv.commit();
      };

      gv.onItemAllChecked = (a: any) => {
        console.log("all checked duudagdav");
      };

      gv.onItemChecked = (a: any) => {
        console.log("item checked");
      };

      gv.onItemsChecked = () => {
        console.log("items checked");
      };
    }

    return () => {
      gv.cancel();
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} className="AR1100-6" ref={realgridElement}></div>;
}

export default Grid;
