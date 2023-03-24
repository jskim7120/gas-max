import React, { useState, useRef } from "react";
import API from "app/axios";
import Grid from "components/grid";
import ENButtons from "components/button/enButtons";
import { useDispatch, useSelector } from "app/store";
function useCreateScreen(
  groupId: string,
  functionName: string,
  ownAreaCode: string,
  searchPath: string,
  fields: any,
  columns: any
) {
  const dispatch = useDispatch();
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(searchPath, {
        params: {
          ...params,
          areaCode: areaCode,
        },
      });

      if (data) {
        setData(data);
        setSelected(data[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setSelectedRowIndex(0);
      setLoading(false);
    } catch (err) {
      setData([]);
      setSelected({});
      setLoading(false);
      console.log(`${functionName} data search fetch error =======>`, err);
    }
  };
  const show4Btns = () => {
    <ENButtons
      menuId={functionName}
      formRef={formRef}
      dispatch={dispatch}
      isAddBtnClicked={isAddBtnClicked}
      setIsAddBtnClicked={setIsAddBtnClicked}
      isCancelBtnDisabled={isCancelBtnDisabled}
      setIsCancelBtnDisabled={setIsCancelBtnDisabled}
    />;
  };
  const showGrid = () => {
    return (
      <Grid
        areaCode={ownAreaCode}
        data={data}
        setSelected={setSelected}
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
        setIsCancelBtnDisabled={setIsCancelBtnDisabled}
        setIsAddBtnClicked={setIsAddBtnClicked}
        fields={fields}
        columns={columns}
        style={{ height: "500px" }}
      />
    );
  };

  return {
    data,
    setData,
    selected,
    setSelected,
    selectedRowIndex,
    setSelectedRowIndex,
    isAddBtnClicked,
    setIsAddBtnClicked,
    isCancelBtnDisabled,
    setIsCancelBtnDisabled,
    loading,
    setLoading,
    showGrid,
    fetchData,
  };
}

export default useCreateScreen;
