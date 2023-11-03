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
      gv.sortingOptions.enabled = false;
      gv.displayOptions.columnMovable = false;
      gv.refresh();

      gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
        gv.commit();
      };

      gv.onItemAllChecked = (a: any) => {
        console.log("all checked duudagdav");
      };

      gv.onItemChecked = (grid: any, itemIndex: any, checked: boolean) => {
        const index: any = gv.getCurrent().dataRow;

        // console.log(itemIndex, checked);
        // console.log(data[itemIndex].mjId, data[itemIndex]);
      };

      // const checkNode = (grid: any, dataRow: any, checked: boolean) => {
      //   var provider = grid.getDataSource();

      //   //형제노드체크 후 부모노드 체크
      //   checkSiblingNode(grid, dataRow, checked);

      //   //자식노드체크
      //   var desRows = provider.getDescendants(dataRow);
      //   if (desRows) {
      //     grid.checkRows(desRows, checked, false);
      //   }
      // };

      // const checkSiblingNode = (grid: any, dataRow: any, checked: boolean) => {
      //   console.log("start-rowId2 checkedValue: " + grid.isCheckedRow(2));
      //   var provider = grid.getDataSource();
      //   //부모노드
      //   var parent = provider.getParent(dataRow);
      //   //형제노드
      //   var sibling =
      //     parent == -1 ? provider.getChildren() : provider.getChildren(parent);
      //   console.log(sibling);
      //   var index = sibling.indexOf(dataRow);
      //   //자기자신은 제외
      //   if (index !== -1) sibling.splice(index, 1);

      //   if (checked) {
      //     for (var i in sibling) {
      //       var value = grid.isCheckedRow(sibling[i]);

      //       if (checked != value) {
      //         checked = false;
      //         break;
      //       }
      //     }
      //   } else {
      //     checked = false;
      //   }

      //   if (parent > -1) grid.checkRow(parent, checked, false, false);
      //   //checkBar.head 영역의 V표시 제어
      //   if (parent == -1) grid.setAllCheck(checked, false);
      //   if (parent > -1) checkSiblingNode(grid, parent, checked);
      // };
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
