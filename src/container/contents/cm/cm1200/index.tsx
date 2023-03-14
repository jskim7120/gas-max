import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ICM1200SEARCH,
  ICM120065USERINFO,
  ICM120065SUPPLYTYPE,
  ISEARCH,
} from "./model";
import GridLeft from "components/grid";
import GridBottom from "./gridBottom";
import Form from "./form";
import {
  SearchWrapper,
  LeftSide,
  RightSide,
  MainWrapper,
  FormSectionTitle,
} from "../../commonStyle";
import Button from "components/button/button";
import {
  MagnifyingGlassBig,
  Plus,
  Reset,
  Trash,
  Update,
} from "components/allSvgIcon";
import {
  ButtonColor,
  ButtonType,
  FieldKind,
  InputSize,
} from "components/componentsType";
import { Field, FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import { PersonInfoText, BuildingInfoText } from "components/text";
import Loader from "components/loader";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
  addCM1105,
} from "app/state/modal/modalSlice";
import { useDispatch, useSelector } from "app/store";
import { CM120065, CM1200SEARCH } from "app/path";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { fields, columns } from "./data";
// import { CustomAreaCodePart } from "../../customTopPart";
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

  const { register, reset, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<ICM1200SEARCH>();
  const [selectedUserInfo, setSelectedUserInfo] = useState<any[]>([]);
  const [selectedSupplyTab, setSelectedSupplyTab] = useState(
    {} as ICM120065SUPPLYTYPE
  );
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const [areaCode, setAreaCode] = useState("");

  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);

  const [isBuildingSelected, setBuildingSelected] = useState(false);

  useEffect(() => {
    if (dataCommonDic) {
      setAreaCode(dataCommonDic?.areaCode[0].code);
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && selected.cuCode && selected.areaCode) {
      fetchAdditionalData({
        areaCode: selected.areaCode,
        cuCode: selected.cuCode,
      });
      setBuildingSelected(false);
      setAreaCode(selected.areaCode);
    }
  }, [selected]);

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
    let paramTemp: any = {};

    if (dataChk) {
      paramTemp = params;
    } else {
      paramTemp = { areaCode: params.areaCode };
    }

    try {
      setLoading(true);
      const { data } = await API.get(CM1200SEARCH, { params: paramTemp });
      if (data && data[0]) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("CM1200 data search fetch error =======>", err);
    }
  };

  const fetchAdditionalData = async ({
    areaCode,
    cuCode,
  }: {
    areaCode: string;
    cuCode: string;
  }) => {
    try {
      const { data } = await API.get(CM120065, {
        params: { cuCode, areaCode },
      });

      if (data && data?.userInfo) {
        setSelectedUserInfo(data.userInfo);
      } else {
        setSelectedUserInfo([]);
      }

      if (data && data?.supplyTab) {
        setSelectedSupplyTab(data?.supplyTab[0]);
      } else {
        setSelectedSupplyTab({} as ICM120065SUPPLYTYPE);
      }
    } catch (err) {
      console.log("CM120065 data fetch error =======>", err);
    }
  };

  const openPopupCM1105Insert = () => {
    if (selected) {
      dispatch(
        addCM1105({
          cuCode: selected?.cuCode ? selected?.cuCode : "",
          areaCode: selected?.areaCode,
          status: "INSERT",
        })
      );

      dispatch(openModal({ type: "cm1105Modal" }));
    } else {
      toast.warning("no data", {
        autoClose: 500,
      });
    }
  };
  const openPopupCM1105Update = () => {
    if (isBuildingSelected === true) {
      //  dispatch(
      //    addCM1105({
      //      cuCode: selected?.cuCode ? selected?.cuCode : "",
      //      areaCode: selected?.areaCode,
      //      status: "",
      //    })
      //  );

      dispatch(openModal({ type: "cm1105Modal" }));
    } else {
      toast.warning("please select building row", {
        autoClose: 500,
      });
    }
  };

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
        <FormGroup>
          <p>{depthFullName}</p>
          {ownAreaCode === "00" && (
            <>
              <p className="big">영업소</p>
              <Select
                {...register("areaCode")}
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
          <SearchWrapper>
            <form
              onSubmit={handleSubmit(submit)}
              style={{ padding: "5px 0px" }}
            >
              <Field>
                <FormGroup>
                  <Label className="lable-check">
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
                    kind={FieldKind.BORDER}
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
            style={{ height: `calc(100% - 48px)` }}
          />
        </LeftSide>
        <RightSide style={{ padding: "0 10px" }}>
          <FormSectionTitle>
            <BuildingInfoText text="건물 정보" />
          </FormSectionTitle>

          <Form
            ref={formRef}
            dataCommonDic={dataCommonDic}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            selected={selected}
            setSelected={setSelected}
            selectedSupplyTab={selectedSupplyTab}
            areaCode={ownAreaCode === "00" ? areaCode : ownAreaCode}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
          />

          <FormSectionTitle>
            <PersonInfoText
              text="사용자 정보"
              textStyle={{
                color: "#1b8c8e",
                fontWeight: "bold",
                marginLeft: "1.2px",
              }}
            />
            <div className="buttons">
              <Button
                text="사용자 추가"
                icon={<Plus />}
                style={{ marginRight: "5px" }}
                onClick={openPopupCM1105Insert}
              />
              <Button
                text="사용자 수정"
                icon={<Update />}
                style={{ marginRight: "5px" }}
                onClick={openPopupCM1105Update}
              />
              <Button
                text="삭제"
                icon={<Trash />}
                style={{ marginRight: "5px" }}
              />
            </div>
          </FormSectionTitle>
          <GridBottom
            selectedUserInfo={selectedUserInfo}
            areaCode={selected?.areaCode}
            setBuildingSelected={setBuildingSelected}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1200;
