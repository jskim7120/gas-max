import { useEffect } from "react";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";

function useDictionary(groupId: string, functionName: string) {
  const [getCommonDictionary, { data }] = useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  return { dataCommonDic: data };
}

export default useDictionary;
