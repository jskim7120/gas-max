import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import { setRowIndex } from "app/state/tab/tabSlice";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";

function CreateReport(
  groupId: string,
  functionName: string,
  menuId: string,
  searchPath: string
) {
  const dispatch = useDispatch();
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const activeTabId = useSelector((state) => state.tab.activeTabId);
  const tabState = useSelector((state) => state.tab.tabs);

  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === 0)?.row;

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

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

  return {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    gridIndexes,
    dispatch,
    dataCommonDic,
  };
}

export default CreateReport;
