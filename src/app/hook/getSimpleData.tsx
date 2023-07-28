import { useState, useEffect } from "react";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";

function GetSimpleData(
  groupId: string,
  functionName: string,
  searchPath: string
) {
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const [data, setData] = useState<Array<any>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(searchPath, params);

    if (dataS && dataS?.length > 0) {
      setData(dataS);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  return {
    dataCommonDic,
    data,
    setData,
    loading,
    fetchData,
    setLoading,
  };
}

export default GetSimpleData;
