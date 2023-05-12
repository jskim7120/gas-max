import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ISEARCH } from "./model";
import GridLeft from "components/grid";
import Form from "./form";
import {
  SearchWrapper,
  LeftSide,
  RightSide,
  MainWrapper,
} from "../../commonStyle";
import Button from "components/button/button";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { ButtonType, FieldKind } from "components/componentsType";
import { Field, FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import Loader from "components/loader";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
} from "app/state/modal/modalSlice";
import { useDispatch, useSelector } from "app/store";
import { CM1200SEARCH } from "app/path";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { fields, columns } from "./data";
import FourButtons from "components/button/fourButtons";

function CM1200({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const { isDelete } = useSelector((state) => state.modal);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1200",
  });

  const { register, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const [dataChk, setDataChk] = useState(true);

  useEffect(() => {
    if (dataCommonDic) {
      setAreaCode(dataCommonDic?.areaCode[0].code);
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const submit = async (data: any) => {
    fetchData(data);
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

  const fetchData = async (params: any) => {
    if (!dataChk) {
      delete params.dataChk;
      delete params.sCuName;
    }

    try {
      setLoading(true);
      const { data } = await API.get(CM1200SEARCH, {
        params: {
          ...params,
          areaCode: params?.areaCode ? params.areaCode : areaCode,
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
      console.log("CM1200 data search fetch error =======>", err);
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
    formRef.current.setUserInfo([]);
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
    setIsCancelBtnDisabled(true);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "72px" }}>영업소</Label>
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
            isCancelBtnDisabled={isCancelBtnDisabled}
          />
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <SearchWrapper>
            <form
              onSubmit={handleSubmit(submit)}
              style={{ padding: "5px 0px" }}
              autoComplete="off"
            >
              <Field>
                <FormGroup>
                  <Label className="lable-check" style={{ minWidth: "auto" }}>
                    <CheckBox
                      register={{ ...register("dataChk") }}
                      title="건물명"
                      onChange={(e: any) => setDataChk(e.target.checked)}
                      checked={dataChk}
                    />
                  </Label>
                  <Input
                    register={register("sCuName", {
                      required: false,
                    })}
                    readOnly={!dataChk}
                  />

                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlassBig />}
                    kind={ButtonType.ROUND}
                    type="submit"
                    style={{ minWidth: "80px" }}
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
                  />
                </FormGroup>
              </Field>
            </form>
          </SearchWrapper>

          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            style={{ height: `calc(100% - 48px)`, minWidth: "409px" }}
          />
        </LeftSide>
        <RightSide style={{ padding: "0 10px" }}>
          <Form
            ref={formRef}
            dataCommonDic={dataCommonDic}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            selected={selected}
            setSelected={setSelected}
            areaCode={areaCode}
            ownAreaCode={ownAreaCode}
            setAreaCode={setAreaCode}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1200;
