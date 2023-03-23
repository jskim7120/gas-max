import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import API from "app/axios";
import Button from "components/button/button";
import Loader from "components/loader";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { ButtonType, InputSize } from "components/componentsType";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { CM1300SEARCH, CM130065 } from "app/path";
import {
  Divider,
  Field,
  FormGroup,
  Input,
  Select,
} from "components/form/style";
import { useDispatch, useSelector } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import FormCM1300User from "./cm1300User";
import GridLeft from "components/grid";
import { BuildingInfoText } from "components/text";
import { ISEARCH } from "./model";
import FourButtons from "components/button/fourButtons";

function CM1300({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const { register, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const dispatch = useDispatch();

  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState([]);
  const [data65, setData65] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [selected65, setSelected65] = useState<any>({});
  const [selectedRowIndex65, setSelectedRowIndex65] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const [isAddBtnClicked2, setIsAddBtnClicked2] = useState<boolean>(false);
  const [isCancelBtnDisabled2, setIsCancelBtnDisabled2] =
    useState<boolean>(true);
  const [aptGubun, setAptGubun] = useState<any>([]);
  const [aptJyCode, setAptJyCode] = useState<any>([]);
  const [aptSwCode, setAptSwCode] = useState<any>([]);

  const { isDelete } = useSelector((state) => state.modal);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1300",
  });

  useEffect(() => {
    if (dataCommonDic) {
      fetchData({ areaCode: dataCommonDic.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (selected && JSON.stringify(selected) !== "{}") {
      setAreaCode(selected?.areaCode);
      fetchData65();
    }
  }, [selected]);

  const submit = async (data: ISEARCH) => {
    fetchData({ ...data, areaCode: areaCode });
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataSearch } = await API.get(CM1300SEARCH, {
        params: params,
      });

      if (dataSearch) {
        setData(dataSearch);
        setSelected(dataSearch[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setSelectedRowIndex(0);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      setSelected({});
      setSelectedRowIndex(0);
      console.log("CM1300 data search fetch error =======>", err);
    }
  };
  const fetchData65 = async () => {
    try {
      const { data: data65 } = await API.get(CM130065, {
        params: {
          areaCode: selected?.areaCode,
          aptCode: selected?.aptCode,
        },
      });

      if (data65) {
        if (data65?.userCustomer && data65?.userCustomer?.length > 0) {
          setData65(data65.userCustomer);
          setSelected65(data65.userCustomer[0]);
        } else {
          setData65([]);
          setSelected65({});
        }

        setSelectedRowIndex65(0);

        if (data65?.aptGubun) {
          setAptGubun(data65?.aptGubun);
        } else {
          setAptGubun([]);
        }

        if (data65?.aptJyCode) {
          setAptJyCode(data65?.aptJyCode);
        } else {
          setAptJyCode([]);
        }

        if (data65?.aptSwCode) {
          setAptSwCode(data65?.aptSwCode);
        } else {
          setAptSwCode([]);
        }
      }
    } catch (err) {
      setData65([]);
      setSelected65({});
      setAptSwCode([]);
      setAptJyCode([]);
      setAptGubun([]);

      console.log("CM1300 data search fetch error =======>", err);
    }
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
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
    setData65([]);
    setSelected65({});
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
          <p>{depthFullName}</p>
          {ownAreaCode === "00" && (
            <>
              <p className="big">영업소</p>
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
        </FormGroup>

        <FourButtons
          btn1Name="건물등록"
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
      </SearchWrapper>

      <MainWrapper
        style={{
          height: "calc(100% + 18px)",
        }}
      >
        <LeftSide>
          <SearchWrapper>
            <form onSubmit={handleSubmit(submit)}>
              <Field>
                <FormGroup>
                  <BuildingInfoText text="건물" />
                  <Input
                    label="코드"
                    labelStyle={{ minWidth: "70px" }}
                    register={register("aptCode")}
                    inputSize={InputSize.i80}
                  />
                  <Input
                    label="건물명"
                    labelStyle={{ minWidth: "80px" }}
                    register={register("aptName")}
                    inputSize={InputSize.i120}
                  />
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
                            size={21}
                            style={{ marginRight: "10px" }}
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
            setIsCancelBtnDisabled2={setIsCancelBtnDisabled2}
            setIsAddBtnClicked2={setIsAddBtnClicked2}
            fields={fields}
            columns={columns}
            style={{ height: `calc(100% - 73px)` }}
          />
        </LeftSide>
        <RightSide style={{ width: "1000px" }}>
          <Form
            areaCode={areaCode}
            dataCommonDic={dataCommonDic}
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            isAddBtnClicked={isAddBtnClicked}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
            aptGubun={aptGubun}
            aptJyCode={aptJyCode}
            aptSwCode={aptSwCode}
          />

          <Divider style={{ border: "1px solid #707070" }} />
          <FormCM1300User
            data={data65}
            setData={setData65}
            selected={selected65}
            setSelected={setSelected65}
            selectedRowIndex={selectedRowIndex65}
            setSelectedRowIndex={setSelectedRowIndex65}
            ownAreaCode={ownAreaCode}
            fetchData={fetchData65}
            aptCode={selected?.aptCode}
            areaCode={areaCode}
            isAddBtnClicked={isAddBtnClicked2}
            setIsAddBtnClicked={setIsAddBtnClicked2}
            isCancelBtnDisabled={isCancelBtnDisabled2}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled2}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1300;
