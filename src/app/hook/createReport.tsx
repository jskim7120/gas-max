import React, { useState, useEffect } from "react";
import { useDispatch } from "app/store";
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

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(searchPath, params);

    if (dataS) {
      setData(dataS);
      const lastIndex = dataS && dataS?.length > 0 ? dataS.length - 1 : 0;
      setSelected(dataS[lastIndex]);
      dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
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
    dispatch,
    dataCommonDic,
  };
}

export default CreateReport;
