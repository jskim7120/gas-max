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
import { CM1300SEARCH } from "app/path";
import { Detail1Wrapper } from "./style";
import { Divider, Field, FormGroup, Input } from "components/form/style";
import { useDispatch, useSelector } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import FormCM1300User from "./cm1300User";
import GridLeft from "components/grid";
import { BuildingInfoText } from "components/text";
import { CustomAreaCodePart } from "container/contents/customTopPart";
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
  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const { isDelete } = useSelector((state) => state.modal);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1300",
  });

  useEffect(() => {
    if (dataCommonDic) {
      reset({ areaCode: dataCommonDic.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataSearch } = await API.get(CM1300SEARCH, {
        params: params,
      });

      if (dataSearch) {
        console.log("dataSearch:::", dataSearch);
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
        <CustomAreaCodePart
          areaCode={ownAreaCode}
          dataCommonDic={dataCommonDic}
          depthFullName={depthFullName}
          register={register}
        />

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
            fields={fields}
            columns={columns}
            style={{ height: `calc(100% - 73px)` }}
          />
        </LeftSide>
        <RightSide style={{ width: "1000px" }}>
          <Detail1Wrapper>
            <Form
              selected={selected}
              ref={formRef}
              fetchData={fetchData}
              menuId={menuId}
              setData={setData}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
              setSelected={setSelected}
              setAreaCode={setAreaCode}
            />
          </Detail1Wrapper>
          <Divider style={{ border: "1px solid #707070" }} />
          <FormCM1300User
            menuId={menuId}
            depthFullName={depthFullName}
            selectedUser={selected}
            areaCode={ownAreaCode}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1300;
