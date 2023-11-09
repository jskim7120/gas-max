let toggle = false;

export function setContextMenu(grid, fileName) {
    
    grid.onContextMenuItemClicked = function (grid, item, clickData) { 
        if (item.tag === 'FILTER' && clickData.column) {
            if(! grid.columnByName(clickData.column).autoFilter){
                createColumnFilter(grid, clickData.column);
            }else{
                removeColumnFilter(grid, clickData.column);
            }
            
        } else if (item.tag === 'visibleTrue') {
            let columns = grid.getColumns();
 
            for (let i in columns) {
                grid.setColumnProperty(columns[i].name, "visible", true);
            }
            toggle = false;
            setHeaderCellContextMenu(grid, toggle);
        } else if (item.tag === 'visibleFalse') {
            grid.setColumnProperty(clickData.column, "visible", false);
 
            toggle = true;
            setHeaderCellContextMenu(grid, toggle);
        } else if (item.tag === 'FIXED_COL') {
            let count = grid.getColumnProperty(clickData.column, "displayIndex") + 1;
            grid.setFixedOptions({ colCount: count });
        } else if (item.tag === 'FIXED_ROW') {
            let count = clickData.itemIndex + 1;
            grid.setFixedOptions({ rowCount: count });
        } else if (item.tag === 'FIXED_CANCEL') {
            grid.setFixedOptions({ colCount: 0, rowCount: 0 });
        }else if (item.tag === "SHOW_GROUPBOX") {
            grid.setGroupPanel({visible: true});
        }else if (item.tag === "HIDE_GROUPBOX") {
            grid.setGroupPanel({visible: false});
        }else if (item.tag === "EXPAND") {
            grid.expandAll();
        }else if (item.tag === "COLLAPSE") {
            grid.collapseAll();
        }else if (item.tag === "SHOW_FILTERBOX") {
            grid.filterPanel.visible = true;
        }else if (item.tag === "HIDE_FILTERBOX") {
            grid.filterPanel.visible = false;
        }else if (item.tag === "EXPORT_EXCEL") {
              grid.exportGrid({
                type: "excel",
                target: "local",
                fileName: fileName ? fileName : "gridExcel.xlsx"
              });
        }
    }
 
    grid.onContextMenuPopup = function (grid, x, y, elementName) {
        
        console.log(`gv`, grid);

        if (elementName.cellType === 'header') {
            setHeaderCellContextMenu(grid, toggle);
        } else if (elementName.cellType === 'data') {
            setDataCellContextMenu(grid);
        } else {
            return false;
        }
    
    };
 
    setDataCellContextMenu(grid);
 }
 
 
 function setHeaderCellContextMenu(grid, val) {
    let contextMenu = [
    {
        label: '필터(제거)',
        tag: 'FILTER'
    }, 
    {
        label: "-"
    }, 
    /* {
        label: '컬럼 숨기기',
        tag: 'visibleFalse'
    }, {
        label: '컬럼 모두 보이기',
        tag: 'visibleTrue',
        enabled: val
    }, */
    {
        label: "그룹박스 보이기",
        tag: "SHOW_GROUPBOX",
        enabled:!grid.groupPanel.visible
    
    },
    {
        label: "그룹박스 숨기기",
        tag: "HIDE_GROUPBOX",
        enabled:grid.groupPanel.visible
    },
    {
        label: "모두펼치기",
        tag: "EXPAND",
        enabled:grid.isGrouped()
    },
    {
        label: "모두닫기",
        tag: "COLLAPSE",
        enabled:grid.isGrouped()
    },
    {
        label: "필터박스 보이기",
        tag: "SHOW_FILTERBOX",
        enabled:!grid.filterPanel.visible
    },
    {
        label: "필터박스 숨기기",
        tag: "HIDE_FILTERBOX",
        enabled:grid.filterPanel.visible
    },
    {
        label: "-" // menu separator를 삽입합니다.
    },
    {
        label: "엑셀 저장",
        tag: "EXPORT_EXCEL"
    }
];
 
    grid.setContextMenu(contextMenu);
 }
 
 
 function setDataCellContextMenu(grid) {
    let contextMenu = [
    {
        label: '열 고정',
        tag: 'FIXED_COL'
    }, {
        label: '행 고정',
        tag: 'FIXED_ROW'
    }, {
        label: '열(행)고정 취소',
        tag: 'FIXED_CANCEL'
    },
    {
        label: "-" // menu separator를 삽입합니다.
    },
    {
        label: "그룹박스 보이기",
        tag: "SHOW_GROUPBOX",
        enabled:!grid.groupPanel.visible
    
    },
    {
        label: "그룹박스 숨기기",
        tag: "HIDE_GROUPBOX",
        enabled:grid.groupPanel.visible
    },
    {
        label: "필터박스 보이기",
        tag: "SHOW_FILTERBOX",
        enabled:!grid.filterPanel.visible
    },
    {
        label: "필터박스 숨기기",
        tag: "HIDE_FILTERBOX",
        enabled:grid.filterPanel.visible
    },
    {
        label: "-" // menu separator를 삽입합니다.
    },
    {
        label: "엑셀 저장",
        tag: "EXPORT_EXCEL"
    }];
 
    grid.setContextMenu(contextMenu);
 }
 
 function createColumnFilter(grid, colName) {
    grid.columnByName(colName).autoFilter = true;
 }
 function removeColumnFilter(grid, colName) {
    grid.columnByName(colName).autoFilter = false;
 }