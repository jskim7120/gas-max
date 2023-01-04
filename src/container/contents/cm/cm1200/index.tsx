import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ICM1200SEARCH,
  ICM120065USERINFO,
  ICM120065SUPPLYTYPE,
  ISEARCH,
} from "./model";
import GridLeft from "./gridLeft";
import GridBottom from "./gridBottom";
import Form from "./form";
import {
  TopBar,
  LeftSide,
  RightSide,
  MainWrapper,
  FormSectionTitle,
  FormSeaction,
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
import { SearchWrapper } from "../../commonStyle";
import { toast } from "react-toastify";

function CM1200({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
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
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);
  const [areaCode, setAreaCode] = useState("");
  const [isBuildingSelected, setBuildingSelected] = useState(false);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
      });
      setAreaCode(dataCommonDic?.areaCode[0].code);
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && selected.cuCode && selected.areaCode) {
      fetchAdditionalData({
        areaCode: selected.areaCode,
        cuCode: selected.cuCode,
      });
      setBuildingSelected(false);
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
      formRef.current.setIsAddBtnClicked(false);
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

  return (
    <>
      <TopBar>
        <div className="title-and-areacode">
          <p>{depthFullName}</p>
          <Field flex style={{ margin: "0px 20px" }}>
            <p>영업소 </p>
            <Select
              width={InputSize.i120}
              {...register("areaCode")}
              style={{ marginLeft: "5px" }}
              onChange={(e: any) => setAreaCode(e.target.value)}
            >
              {dataCommonDic?.areaCode?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </Field>
        </div>
        <div className="buttons">
          <Button
            text="건물등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              formRef.current.setIsAddBtnClicked(true);
              formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              dispatch(openModal({ type: "delModal" }));
              dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {
              formRef.current.crud(null);
            }}
          />
          <Button
            text="취소"
            icon={<Reset />}
            onClick={() => {
              formRef.current.setIsAddBtnClicked(false);
              formRef.current.resetForm("reset");
            }}
          />
        </div>
      </TopBar>
      <MainWrapper>
        <LeftSide width="30%">
          <SearchWrapper style={{ borderBottom: "2px solid #707070" }}>
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
            data={data ? data : []}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </LeftSide>
        <RightSide width="70%">
          <FormSeaction topBorder={false}>
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
              areaCode={areaCode}
            />
          </FormSeaction>
          <FormSeaction topBorder={true}>
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
          </FormSeaction>
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1200;
