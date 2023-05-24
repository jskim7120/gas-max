import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
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

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    getCommonDictionary({ groupId: "GR", functionName: "GR1100" });
  }, []);

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
    setLoading(true);
    const dataS = await apiGet(GR1100SEARCH, params);
    if (dataS) {
      setData(dataS);
      setSelected(dataS[0]);
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  const submit = async (data: ISEARCH) => {
    fetchData({ ...data, areaCode: areaCode });
  };

  function deleteRowGrid() {
    try {
      setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
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
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "32px" }}>영업소</Label>
              <Select
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}

          <FourButtons
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            onClickReset={onClickReset}
            isAddBtnClicked={isAddBtnClicked}
          />
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            style={{ minWidth: minWidth }}
          >
            <SearchWrapper className="h35">
              <FormGroup>
                <Label
                  style={{
                    minWidth: "auto",
                  }}
                >
                  구분
                </Label>
                <Select register={register("sBuGubun")} width={InputSize.i100}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  labelStyle={{ minWidth: "100px" }}
                  register={register("sBuName")}
                  inputSize={InputSize.i130}
                />

                <Label
                  style={{
                    minWidth: "95px",
                  }}
                >
                  거래 상태
                </Label>
                <Select register={register("sBuStae")} width={InputSize.i100}>
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
            setIsAddBtnClicked={setIsAddBtnClicked}
            style={{ height: `calc(100% - 38px)`, minWidth: minWidth }}
          />
        </LeftSide>
        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            areaCode={areaCode}
            setAreaCode={setAreaCode}
            setIsAddBtnClicked={setIsAddBtnClicked}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1100;
