import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "app/store";
import { setRowIndex } from "app/state/tab/tabSlice";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";

function CreateScreen(
  groupId: string,
  functionName: string,
  menuId: string,
  searchPath: string,
  leftSideWidth: number
) {
  const dispatch = useDispatch();
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const activeTabId = useSelector((state) => state.tab.activeTabId);
  const tabState = useSelector((state) => state.tab.tabs);
  const isOpen = useSelector((state) => state.sidebar);

  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === 0)?.row;

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [linePos, setLinePos] = useState<number>(leftSideWidth);

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  const fetchData = async (params: any, pos: string = "") => {
    setLoading(true);

    const dataS = await apiGet(searchPath, params);

    if (dataS) {
      setData(dataS);
      const lastIndex = dataS && dataS.length > 0 ? dataS.length - 1 : 0;

      if (pos === "last") {
        setSelected(dataS[lastIndex]);
        dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
      } else {
        if (rowIndex) {
          if (rowIndex > lastIndex) {
            dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
            setSelected(dataS[lastIndex]);
          } else {
            setSelected(dataS[rowIndex]);
          }
        }
      }
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  const showDraggableLine = () => {
    return (
      <Draggable
        axis="x"
        bounds={{
          left: 0,
          right: window.innerWidth,
        }}
        position={{ x: linePos, y: 0 }}
        onDrag={handleDrag}
      >
        <div
          style={{
            position: "absolute",
            top: "117px",
            left: `${isOpen} ? 87px : 5px`,
            width: "4px",
            height: "calc(100% - 197px)",
            backgroundColor: "#707070",
            cursor: "col-resize",
          }}
        ></div>
      </Draggable>
    );
  };

  return {
    data,
    setData,
    selected,
    setSelected,
    loading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    activeTabId,
    fetchData,
    showDraggableLine,
    isOpen,
    rowIndex,
    dispatch,
    dataCommonDic,
    linePos,
  };
}

export default CreateScreen;
