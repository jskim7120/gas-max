import React, { useState, useEffect } from "react";
import { useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";

function CreateReportAR9005(
  groupId: string,
  functionName: string,
  menuId: string,
  searchPath: string
) {
  const dispatch = useDispatch();
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Array<any>>([]);
  const [data2, setData2] = useState<Array<any>>([]);

  const [selected, setSelected] = useState<any>({});
  const [selected2, setSelected2] = useState<any>({});

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(searchPath, params);

    if (dataS) {
      if (dataS?.usedItems) {
        const lastIndex =
          dataS.usedItems.length > 0 ? dataS.usedItems.length - 1 : 0;
        setData(dataS.usedItems);
        setSelected(dataS[lastIndex]);
      } else {
        setData([]);
        setSelected({});
      }

      if (dataS?.inoutHistory) {
        const lastIndex =
          dataS.inoutHistory.length > 0 ? dataS.inoutHistory.length - 1 : 0;
        setData2(dataS.inoutHistory);
        setSelected2(dataS[lastIndex]);
      } else {
        setData2([]);
        setSelected2({});
      }
    } else {
      setData([]);
      setData2([]);
      setSelected({});
      setSelected2({});
    }
    setLoading(false);
  };

  return {
    data,
    data2,
    selected,
    selected2,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  };
}

export default CreateReportAR9005;
