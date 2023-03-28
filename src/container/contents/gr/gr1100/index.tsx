import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useDispatch, useSelector } from "app/store";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { GR1100SEARCH } from "app/path";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import Button from "components/button/button";
import { Input, Select, FormGroup, Label } from "components/form/style";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import Form from "./form";
import { columns, fields } from "./data";
import { ISEARCH } from "./model";
import Grid from "components/grid";
import {
  MainWrapper,
  RightSide,
  LeftSide,
  SearchWrapper,
} from "../../commonStyle";
import Loader from "components/loader";
import { AreaCodeWithFullName } from "container/contents/customTopPart";
import FourButtons from "components/button/fourButtons";

const minWidth = "763px";

function GR1100({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1100",
  });

  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
        sBuStae: dataCommonDic?.sBuStae[0].code,
      });
      setAreaCode(dataCommonDic?.areaCode[0].code);

      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataS } = await API.get(GR1100SEARCH, {
        params: params,
      });
      if (dataS) {
        setData(dataS);
        setSelected(dataS[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setSelectedRowIndex(0);
      setLoading(false);
    } catch (err) {
      console.log("DATA fetch error =======>", err);
    }
  };

  const submit = async (data: ISEARCH) => {
    fetchData({ ...data, areaCode: areaCode });
  };

  function deleteRowGrid() {
    try {
      formRef.current.setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <AreaCodeWithFullName
          ownAreaCode={ownAreaCode}
          depthFullName={depthFullName}
          setAreaCode={setAreaCode}
          areaCode={areaCode}
          dataCommonDic={dataCommonDic}
        />
        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form onSubmit={handleSubmit(submit)} style={{ minWidth: minWidth }}>
            <SearchWrapper className="h35">
              <FormGroup>
                <Label
                  style={{
                    minWidth: "auto",
                  }}
                >
                  구분
                </Label>
                <Select {...register("sBuGubun")}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  register={register("sBuName")}
                  inputSize={InputSize.i100}
                />

                <Label>거래상태</Label>
                <Select {...register("sBuStae")}>
                  {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <div className="buttons">
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig />}
                  kind={ButtonType.ROUND}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={19}
                          style={{ marginRight: "10px" }}
                          borderWidth="3px"
                        />
                      </>
                    )
                  }
                  style={{ marginRight: "5px", height: "26px" }}
                />

                <Button
                  text="엑셀"
                  icon={<ExcelIcon />}
                  kind={ButtonType.ROUND}
                  color={ButtonColor.SECONDARY}
                  type="button"
                  style={{ height: "26px" }}
                />
              </div>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
            style={{ height: `calc(100% - 38px)`, minWidth: minWidth }}
          />
        </LeftSide>
        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            tData={data}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            areaCode={areaCode}
            setAreaCode={setAreaCode}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1100;
