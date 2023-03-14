import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import GridBottom from "./gridBottom";
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { PersonInfoText, BuildingInfoText } from "components/text";
import Button from "components/button/button";
import { Plus, Trash, Update } from "components/allSvgIcon";
import { FormSectionTitle } from "../../commonStyle";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select as CSelect,
  Divider,
  Wrapper,
} from "components/form/style";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { ICM1200SEARCH, emptyObj } from "./model";
import API from "app/axios";
import {
  CM1200DELETE,
  CM1200INSERT,
  CM1200UPDATE,
  CM1200INSERTSEQ,
} from "app/path";
import { DateWithDash, DateWithoutDash } from "helpers/dateFormat";
import { formatCurrencyRemoveComma } from "helpers/currency";
import getTabContent from "./getTabContent";
import { useDispatch } from "app/store";
import { CM120065 } from "app/path";
import { openModal, addCM1105 } from "app/state/modal/modalSlice";

const Form = React.forwardRef(
  (
    {
      selected,
      dataCommonDic,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      areaCode,
      setAreaCode,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: {
      selected: any;
      dataCommonDic: any;
      fetchData: any;
      setData: any;
      selectedRowIndex: number;
      setSelected: any;
      setSelectedRowIndex: any;
      areaCode: string;
      setAreaCode: Function;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [selectedUserInfo, setSelectedUserInfo] = useState<any[]>([]);
    const [selectedSupplyTab, setSelectedSupplyTab] = useState<any>({});
    const [isBuildingSelected, setBuildingSelected] = useState(false);
    const [tabId, setTabId] = useState<number>(0);
    const [addr, setAddress] = useState<string>("");

    const [chkCuZipCode, setChkCuZipCode] = useState(false);
    const [chkCuRh20, setChkCuRh20] = useState(false);
    const [chkCuRdanga, setChkCuRdanga] = useState(false);
    const [chkCuAnKum, setChkCuAnKum] = useState(false);
    const [chkCuMeterKum, setChkCuMeterKum] = useState(false);
    const [chkCuPer, setChkCuPer] = useState(false);
    const [chkCuCdc, setChkCuCdc] = useState(false);
    const [chkCuSukumtype, setChkCuSukumtype] = useState(false);
    const [chkCuGumTurm, setChkCuGumTurm] = useState(false);
    const [chkCuGumdate, setChkCuGumdate] = useState(false);
    const [chkCuCno, setChkCuCno] = useState(false);

    const [cuCustgubunDic, setCuCustgubunDic] = useState([]);
    const [cuJyCodeDic, setCuJyCodeDic] = useState([]);
    const [cuSwCodeDic, setCuSwCodeDic] = useState([]);

    const { handleSubmit, reset, register, getValues, control, watch } =
      useForm<ICM1200SEARCH>({
        mode: "onChange",
      });

    useEffect(() => {
      if (dataCommonDic) {
        console.log("dataCommonDic:::", dataCommonDic);
        setCuCustgubunDic(dataCommonDic?.cuCustgubun);
        setCuJyCodeDic(dataCommonDic?.cuJyCode);
        setCuSwCodeDic(dataCommonDic?.cuSwCode);

        reset({
          cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
          cuJyCode: dataCommonDic?.cuJyCode[0].code,
          cuSwCode: dataCommonDic?.cuSwCode[0].code,
          cuRh2o: dataCommonDic?.cuRh20[0].code,
          cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
          cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,
          cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
          cuGumTurm: dataCommonDic?.cuGumTurm[0].code,
          tankMakeCo1: dataCommonDic?.tankMakeCo1[0].code,
          tankMakeCo2: dataCommonDic?.tankMakeCo2[0].code,
          tankVol1: dataCommonDic?.tankVol1[0].code,
          tankVol2: dataCommonDic?.tankVol2[0].code,
          gasifyCo1: dataCommonDic?.gasifyCo1[0].code,
          gasifyCo2: dataCommonDic?.gasifyCo2[0].code,
        });
      }
    }, [dataCommonDic]);

    useEffect(() => {
      if (selected && selected.cuCode && selected.areaCode) {
        setAreaCode(selected.areaCode);

        fetchAdditionalData({
          areaCode: selected.areaCode,
          cuCode: selected.cuCode,
        });
        setBuildingSelected(false);
      }
    }, [selected]);

    useEffect(() => {
      if (selectedSupplyTab) {
        resetForm("reset");
      }
    }, [selectedSupplyTab]);

    useEffect(() => {
      if (addr) {
        reset({
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr1: addr ? addr?.split("/")[0].split("(")[0] : "",
          cuAddr2: addr ? `(${addr?.split("/")[0].split("(")[1]}` : "",
        });
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      crud,
    }));

    const fetchAdditionalData = async ({
      areaCode,
      cuCode,
    }: {
      areaCode: string;
      cuCode: string;
    }) => {
      try {
        const { data } = await API.get(CM120065, {
          params: { cuCode: cuCode, areaCode: areaCode },
        });

        console.log("additional data:::", data);

        if (data) {
          if (data?.userInfo) {
            setSelectedUserInfo(data.userInfo);
          } else {
            setSelectedUserInfo([]);
          }

          if (data?.supplyTab) {
            setSelectedSupplyTab(data?.supplyTab[0]);
          } else {
            setSelectedSupplyTab({});
          }

          if (data?.cuCustgubun) {
            setCuCustgubunDic(data.cuCustgubun);
          }

          if (data?.cuJyCode) {
            setCuJyCodeDic(data.cuJyCode);
          }

          if (data?.cuSwCode) {
            setCuSwCodeDic(data.cuSwCode);
          }
        } else {
          setSelectedUserInfo([]);
          setSelectedSupplyTab({});
        }
      } catch (err) {
        console.log("CM120065 data fetch error =======>", err);
      }
    };

    const fetchCodes = async (areaCode: string) => {
      try {
        const response: any = await API.get(CM1200INSERTSEQ, {
          params: { areaCode: areaCode },
        });
        if (
          response.status === 200 &&
          response.data.tempCuCode[0]?.tempCuCode
        ) {
          return response.data;
        } else {
          toast.error("can't get cuCode", {
            autoClose: 500,
          });
        }
      } catch (err) {
        toast.error("Error occured during get CuCode", {
          autoClose: 500,
        });
      }
      return null;
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        const data = await fetchCodes(areaCode);
        if (data && data?.tempCuCode[0]) {
          reset({ ...emptyObj, cuCode: data?.tempCuCode[0]?.tempCuCode });
        }
        return;
      }

      if (
        type === "reset" &&
        selected !== undefined &&
        JSON.stringify(selected) !== "{}"
      ) {
        let tempData: any = { ...selected, ...selectedSupplyTab };

        reset({
          ...tempData,
          cuAptnameYn: tempData?.cuAptnameYn === "Y",
          cuBaGageYn: tempData?.cuBaGageYn === "Y",

          cuFinishDate: DateWithDash(selected.cuFinishDate),
          cuCircuitDate: DateWithDash(selected.cuCircuitDate),
          cuScheduleDate: DateWithDash(selected.cuScheduleDate),
          tankFirstDate1: DateWithDash(selectedSupplyTab.tankFirstDate1),
          tankFirstDate2: DateWithDash(selectedSupplyTab.tankFirstDate2),
          tankOutsideDate1: DateWithDash(selectedSupplyTab.tankOutsideDate1),
          tankOutsideDate2: DateWithDash(selectedSupplyTab.tankOutsideDate2),
          tankInsideDate1: DateWithDash(selectedSupplyTab.tankInsideDate1),
          tankInsideDate2: DateWithDash(selectedSupplyTab.tankInsideDate2),
          gasifyCheckDate1: DateWithDash(selectedSupplyTab.gasifyCheckDate1),
          gasifyCheckDate2: DateWithDash(selectedSupplyTab.gasifyCheckDate2),
        });
        return;
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
        dispatch(openModal({ type: "cm1105Modal" }));
      } else {
        toast.warning("please select building row", {
          autoClose: 500,
        });
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(CM1200DELETE, {
            cuCode: formValues.cuCode,
            areaCode: areaCode,
          });

          if (response.status === 200) {
            toast.success("삭제했습니다", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            toast.error(response?.message, {
              autoClose: 500,
            });
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
        return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1200SEARCH) => {
      const formValues: any = getValues();
      formValues.areaCode = isAddBtnClicked ? areaCode : selected.areaCode;

      if (!chkCuZipCode) {
        delete formValues.cuZipcode;
        delete formValues.cuAddr1;
        delete formValues.cuAddr2;
      }
      if (!chkCuRh20) {
        delete formValues.cuRh2o;
      }
      if (!chkCuRdanga) {
        //talbaruudiig nyagtal
      }

      if (!chkCuAnKum) {
        delete formValues.cuAnkum;
      } else {
        formValues.cuAnkum = formValues.cuAnkum
          ? formatCurrencyRemoveComma(formValues.cuAnkum)
          : "";
      }
      // if (!ckCuSisulKum) {
      //   delete formValues.cuSisulkum;
      // }

      if (!chkCuMeterKum) {
        delete formValues.cuMeterkum;
      } else {
        formValues.cuMeterkum = formValues.cuMeterkum
          ? formatCurrencyRemoveComma(formValues.cuMeterkum)
          : "";
      }
      if (!chkCuPer) {
        delete formValues.cuPer;
      }

      if (!chkCuCdc) {
        delete formValues.cuCdc;
      }

      if (!chkCuSukumtype) {
        delete formValues.cuSukumtype;
      }
      if (!chkCuGumTurm) {
        delete formValues.cuGumTurm;
      }
      if (!chkCuGumdate) {
        delete formValues.cuGumdate;
      }

      if (!chkCuCno) {
        delete formValues.cuCno;
      }

      formValues.cuAptnameYn = formValues.cuAptnameYn ? "Y" : "N";

      formValues.cuFinishDate = DateWithoutDash(formValues.cuFinishDate);
      formValues.cuCircuitDate = DateWithoutDash(formValues.cuCircuitDate);
      formValues.cuScheduleDate = DateWithoutDash(formValues.cuScheduleDate);
      formValues.gasifyCheckDate1 = DateWithoutDash(
        formValues.gasifyCheckDate1
      );
      formValues.gasifyCheckDate2 = DateWithoutDash(
        formValues.gasifyCheckDate2
      );
      formValues.tankFirstDate1 = DateWithoutDash(formValues.tankFirstDate1);
      formValues.tankFirstDate2 = DateWithoutDash(formValues.tankFirstDate2);
      formValues.tankInsideDate1 = DateWithoutDash(formValues.tankInsideDate1);
      formValues.tankInsideDate2 = DateWithoutDash(formValues.tankInsideDate2);
      formValues.tankOutsideDate1 = DateWithoutDash(
        formValues.tankOutsideDate1
      );
      formValues.gasifyMakeDate1 = DateWithoutDash(formValues.gasifyMakeDate1);
      formValues.gasifyMakeDate2 = DateWithoutDash(formValues.gasifyMakeDate2);
      formValues.tankOutsideDate2 = DateWithoutDash(
        formValues.tankOutsideDate2
      );

      formValues.cuRdangaAmt =
        formValues.cuRdangaType !== "1" ? 0 : Number(formValues.cuRdangaAmt);
      formValues.cuRdanga = Number(formValues.cuRdanga);

      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;

      if (!isAddBtnClicked) {
        delete formValues.gasifyCheckDate1;
        delete formValues.gasifyCheckDate2;
        delete formValues.gasifyMakeDate1;
        delete formValues.gasifyMakeDate2;
      }
      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });

          setIsAddBtnClicked(false);
        } else {
          toast.error(response?.response?.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    const renderRdangaCalc = () => {
      var selectedcuRdanga = watch("cuRdanga") ?? 0;
      var selectedRdangaType = watch("cuRdangaType");
      var selectedRdangaSign = watch("cuRdangaSign") ?? null;
      var selectedRdangaAmt = watch("cuRdangaAmt") ?? 0;
      var totalValue = 0;

      if (selectedRdangaSign === null) {
        totalValue = 0;
      } else if (selectedRdangaSign === "+") {
        totalValue = Number(selectedcuRdanga) + Number(selectedRdangaAmt);
      } else if (selectedRdangaSign === "-") {
        totalValue = selectedcuRdanga - selectedRdangaAmt;
      } else if (selectedRdangaSign === "X") {
        if (selectedcuRdanga === 0 || selectedRdangaAmt === 0) {
          totalValue = 0;
        } else {
          totalValue = selectedcuRdanga * selectedRdangaAmt;
        }
      } else {
        totalValue = 0;
      }

      if (selectedRdangaType === "0") {
        return (
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <Input
                name="cuRdanga"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
                value={selected.cuRdanga}
                readOnly
              />
              <p>원</p>
            </FormGroup>
          </Field>
        );
      }
      if (selectedRdangaType === "1") {
        return (
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <Input
                type="number"
                name="cuRdanga"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
              />
              <p>원</p>
              <CSelect {...register("cuRdangaSign")} width={InputSize.i50}>
                {dataCommonDic?.cuRdangaSign.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
              <Input
                type="text"
                inputSize={InputSize.xs}
                textAlign="right"
                register={register("cuRdangaAmt")}
              />
              <p>
                {selectedRdangaSign === "X"
                  ? "%"
                  : selectedRdangaSign === "+"
                  ? "원"
                  : "원"}
              </p>
              <p>=</p>
              <p>{totalValue}원</p>
            </FormGroup>
          </Field>
        );
      }
      if (selectedRdangaType === "2") {
        return (
          <Field>
            <FormGroup>
              <Input
                name="cuRdanga"
                type="number"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
              />
            </FormGroup>
          </Field>
        );
      }
    };

    return (
      <>
        <FormSectionTitle>
          <BuildingInfoText text="건물 정보" />
        </FormSectionTitle>

        <form onSubmit={handleSubmit(submit)}>
          {/* 1-1 Wrapper */}
          <Divider />
          <Wrapper style={{ alignItems: "baseline" }}>
            <Field>
              <Input
                label="건물코드"
                register={register("cuCode")}
                inputSize={InputSize.i60}
                readOnly={true}
              />
            </Field>
            <Field>
              <Input
                label="건물명"
                register={register("cuName")}
                labelStyle={{ minWidth: "78px" }}
                style={{ width: "198px" }}
              />
            </Field>
            <Field style={{ marginLeft: "20px" }}>
              <CheckBox
                title="건물명 지로 출력 안함."
                register={register("cuAptnameYn")}
                gap="15px"
                rtl
              />
            </Field>
          </Wrapper>
          {/* 1-2 Wrapper */}
          <Wrapper col={3}>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="주소"
                  checked={chkCuZipCode}
                  onChange={(e: any) => setChkCuZipCode(e.target.checked)}
                />
              </Label>
              <Input
                register={register("cuZipcode")}
                inputSize={InputSize.i60}
                readOnly={!chkCuZipCode}
                style={{ marginRight: "3px" }}
              />
              <DaumAddress setAddress={setAddress} disabled={!chkCuZipCode} />
            </FormGroup>

            <Input
              register={register("cuAddr1")}
              inputSize={InputSize.md}
              style={{ marginRight: "0px" }}
            />
            <Input
              register={register("cuAddr2")}
              style={{ marginLeft: "5px", width: "225px" }}
            />
          </Wrapper>
          {/* 1-3 Wrapper */}
          <Wrapper grid col={5}>
            <FormGroup>
              <Label>담당사원</Label>
              <CSelect {...register("cuSwCode")} width={InputSize.i120}>
                {cuSwCodeDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "80px" }}>지역분류</Label>
              <CSelect
                {...register("cuJyCode")}
                width={InputSize.i120}
                style={{ marginRight: "3px" }}
              >
                {cuJyCodeDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
              <SearchBtn
                type="button"
                onClick={() => console.log("cuZipCode BTN")}
              >
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "80px" }}>관리자분류</Label>
              <CSelect {...register("cuCustgubun")} width={InputSize.i120}>
                {cuCustgubunDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>
          </Wrapper>

          <div style={{ marginTop: "5px" }}>
            <PlainTab
              tabHeader={["지로 양식", "고객안내문", "입금계좌 안내"]}
              onClick={(id) => setTabId(id)}
              tabId={tabId}
            />
            <TabContentWrapper style={{ minHeight: "200px" }}>
              {getTabContent(
                tabId,
                register,
                dataCommonDic,
                renderRdangaCalc,
                chkCuRh20,
                setChkCuRh20,
                chkCuRdanga,
                setChkCuRdanga,
                chkCuAnKum,
                setChkCuAnKum,
                chkCuMeterKum,
                setChkCuMeterKum,
                control,
                chkCuPer,
                setChkCuPer,
                chkCuCdc,
                setChkCuCdc,
                chkCuSukumtype,
                setChkCuSukumtype,
                chkCuGumTurm,
                setChkCuGumTurm,
                chkCuGumdate,
                setChkCuGumdate,
                chkCuCno,
                setChkCuCno
              )}
            </TabContentWrapper>
          </div>
        </form>
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
      </>
    );
  }
);

export default Form;
