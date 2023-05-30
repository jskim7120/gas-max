import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import GridBottom from "./gridBottom";
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import { PersonInfoText, BuildingInfoText } from "components/text";
import Button from "components/button/button";
import { Plus, Trash, Update } from "components/allSvgIcon";
import { FormSectionTitle } from "../../commonStyle";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select,
  Divider,
  Wrapper,
} from "components/form/style";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { ICM1200SEARCH, emptyObj } from "./model";
import { apiGet, apiPost } from "app/axios";
import {
  CM1200DELETE,
  CM1200INSERT,
  CM1200UPDATE,
  CM1200INSERTSEQ,
} from "app/path";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { formatCurrencyRemoveComma } from "helpers/currency";
import getTabContent from "./getTabContent";
import { useDispatch } from "app/store";
import { CM120065 } from "app/path";
import { openModal, addCM1105 } from "app/state/modal/modalSlice";
import useRdanga from "app/hook/calcRdanga";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

const Form = React.forwardRef(
  (
    {
      selected,
      dataCommonDic,
      fetchData,
      setData,
      setSelected,
      areaCode,
      ownAreaCode,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: {
      selected: any;
      dataCommonDic: any;
      fetchData: any;
      setData: any;
      setSelected: any;
      areaCode: string;
      ownAreaCode: string;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<any[]>([]);
    const [selectedSupplyTab, setSelectedSupplyTab] = useState<any>({});
    const [selectedUserInfo, setSelectedUserInfo] = useState<any>({});

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
    const [cuAddr1, setCuAddr1] = useState("");

    const {
      handleSubmit,
      reset,
      register,
      getValues,
      control,
      watch,
      setFocus,
    } = useForm<ICM1200SEARCH>({
      mode: "onChange",
    });

    const {
      rdangaType,
      setRdangaType,
      rdanga,
      setRdanga,
      rdangaSign,
      setRdangaSign,
      rdangaAmt,
      setRdangaAmt,
      totalValue,
      setTotalValue,
      calcRdanga,
    } = useRdanga();

    useEffect(() => {
      if (dataCommonDic) {
        setCuCustgubunDic(dataCommonDic?.cuCustgubun);
        setCuJyCodeDic(dataCommonDic?.cuJyCode);
        setCuSwCodeDic(dataCommonDic?.cuSwCode);

        reset({
          cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
          cuJyCode: dataCommonDic?.cuJyCode[0].code,
          cuSwCode: dataCommonDic?.cuSwCode[0].code,
          cuRh2O: dataCommonDic?.cuRh20[0].code,
          // cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
          // cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,
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
        fetchAdditionalData({
          areaCode: selected.areaCode,
          cuCode: selected.cuCode,
        });
      }
    }, [selected]);

    useEffect(() => {
      if (selectedSupplyTab) {
        resetForm("reset");
      }
    }, [selectedSupplyTab]);

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          cuZipcode: addr ? addr?.split("/")[1] : "",
          //cuAddr1: addr ? addr?.split("/")[0].split("(")[0] : "",
          cuAddr2: "",
        }));

        setCuAddr1(addr ? addr?.split("/")[0] : "");
      }
    }, [addr]);

    useEffect(() => {
      if (Object.keys(selectedUserInfo).length > 0) {
        setFooterDetail(selected.areaCode, selectedUserInfo.cuCode, dispatch);
      }
    }, [selectedUserInfo]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      crud,
      setUserInfo,
    }));

    const fetchAdditionalData = async ({
      areaCode,
      cuCode,
    }: {
      areaCode: string;
      cuCode: string;
    }) => {
      const res = await apiGet(CM120065, {
        cuCode: cuCode,
        areaCode: areaCode,
      });

      if (res) {
        if (res?.userInfo) {
          setUserInfo(res.userInfo);
        } else {
          setUserInfo([]);
        }

        if (res?.supplyTab) {
          setSelectedSupplyTab(res?.supplyTab[0]);
        } else {
          setSelectedSupplyTab({});
        }

        if (res?.cuCustgubun) {
          setCuCustgubunDic(res.cuCustgubun);
        }

        if (res?.cuJyCode) {
          setCuJyCodeDic(res.cuJyCode);
        }

        if (res?.cuSwCode) {
          setCuSwCodeDic(res.cuSwCode);
        }
      } else {
        setUserInfo([]);
        setSelectedSupplyTab({});
        setCuCustgubunDic([]);
        setCuJyCodeDic([]);
        setCuSwCodeDic([]);
      }
    };

    const codeChangeHandler = async (aCode: string) => {
      const res = await apiGet(CM1200INSERTSEQ, {
        areaCode: aCode,
      });

      if (res) {
        setFocus("cuName");
        reset({
          ...emptyObj,
          cuCode: res?.tempCuCode[0]?.tempCuCode,
        });
        setCuAddr1("");
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        areaCode && (await codeChangeHandler(areaCode));
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected).length > 0) {
          let tempData: any = { ...selected, ...selectedSupplyTab };
          setCuAddr1(selected.cuAddr1);
          reset({
            ...tempData,
            cuAptnameYn: tempData?.cuAptnameYn === "Y",
            cuBaGageYn: tempData?.cuBaGageYn === "Y",
          });
          setRdangaType(selected?.cuRdangaType);
          setRdanga(selected?.cuRdanga);
          setRdangaSign(selected?.cuRdangaSign);
          setRdangaAmt(selected?.cuRdangaAmt);
          setTotalValue("");
        }
      }

      setChkCuZipCode(false);
      setChkCuRh20(false);
      setChkCuRdanga(false);
      setChkCuAnKum(false);
      setChkCuMeterKum(false);
      setChkCuPer(false);
      setChkCuCdc(false);
      setChkCuSukumtype(false);
      setChkCuGumTurm(false);
      setChkCuGumdate(false);
      setChkCuCno(false);
    };

    const openPopupCM1105Insert = () => {
      if (Object.keys(selected).length > 0) {
        openPopup({
          cuCode: selected?.cuCode,
          areaCode: selected?.areaCode,
          status: "INSERT",
        });
      } else {
        toast.warning("no selected data", {
          autoClose: 500,
        });
      }
    };
    const openPopupCM1105Update = () => {
      if (Object.keys(selectedUserInfo).length > 0) {
        openPopup({
          cuCode: selectedUserInfo.cuCode,
          areaCode: selected.areaCode,
          status: "UPDATE",
        });
      }
    };

    const openPopup = (params: any) => {
      dispatch(addCM1105(params));
      dispatch(openModal({ type: "cm1105Modal" }));
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        const res = await apiPost(
          CM1200DELETE,
          {
            cuCode: formValues.cuCode,
            areaCode: selected.areaCode,
          },
          "삭제했습니다"
        );

        res && (await fetchData(null));
        return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1200SEARCH) => {
      const formValues: any = getValues();

      formValues.areaCode = isAddBtnClicked ? areaCode : selected.areaCode;

      if (chkCuRdanga) {
        formValues.cuRdangaType = rdangaType;
        formValues.cuRdanga = +rdanga;
        formValues.cuRdangaSign = rdangaSign;
        formValues.cuRdangaAmt = +rdangaAmt;
        // formValues.totalValue = totalValue; ene talbar tsaanaasaa irehgui bgaa irvel nemeh yum
      } else {
        //end yu boloh n logic todorhoigui
      }

      if (!chkCuAnKum) {
        // delete formValues.cuAnkum;
      } else {
        formValues.cuAnkum = formValues.cuAnkum
          ? formatCurrencyRemoveComma(formValues.cuAnkum)
          : "";
      }

      if (!chkCuMeterKum) {
        // delete formValues.cuMeterkum;
      } else {
        formValues.cuMeterkum = formValues.cuMeterkum
          ? formatCurrencyRemoveComma(formValues.cuMeterkum)
          : "";
      }
      if (formValues.cuBaGageKum) {
        formValues.cuBaGageKum = formatCurrencyRemoveComma(
          formValues.cuBaGageKum
        );
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

      formValues.tankOutsideDate2 = DateWithoutDash(
        formValues.tankOutsideDate2
      );

      formValues.tankMakeDate1 = DateWithoutDashOnlyYearMonth(
        formValues.tankMakeDate1
      );
      formValues.tankMakeDate2 = DateWithoutDashOnlyYearMonth(
        formValues.tankMakeDate2
      );

      formValues.gasifyMakeDate1 = DateWithoutDashOnlyYearMonth(
        formValues.gasifyMakeDate1
      );
      formValues.gasifyMakeDate2 = DateWithoutDashOnlyYearMonth(
        formValues.gasifyMakeDate2
      );

      formValues.cuRdangaAmt =
        formValues.cuRdangaType !== "1" ? 0 : Number(formValues.cuRdangaAmt);
      formValues.cuRdanga = Number(formValues.cuRdanga);
      formValues.cuAddr1 = cuAddr1;

      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");
      if (res) {
        if (isAddBtnClicked) {
          setIsAddBtnClicked(false);
          await fetchData(null, "last");
        } else {
          await fetchData(null);
        }
      }
    };

    return (
      <>
        <FormSectionTitle>
          <BuildingInfoText text="건물 정보" />
        </FormSectionTitle>

        <form onSubmit={handleSubmit(submit)} autoComplete="off">
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
                  title="주 소"
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
              <DaumAddress
                setAddress={setAddress}
                disabled={!chkCuZipCode}
                defaultValue={cuAddr1}
                onClose={() => setFocus("cuAddr2")}
              />
            </FormGroup>

            <Input
              //register={register("cuAddr1")}
              inputSize={InputSize.md}
              style={{ marginRight: "0px" }}
              value={cuAddr1}
              onChange={(e: any) => setCuAddr1(e.target.value)}
            />
            <Input
              register={register("cuAddr2")}
              style={{ marginLeft: "5px", width: "225px" }}
            />
          </Wrapper>
          {/* 1-3 Wrapper */}
          <Wrapper grid col={5}>
            <FormGroup>
              <Label>담당 사원</Label>
              <Select {...register("cuSwCode")} width={InputSize.i120}>
                {cuSwCodeDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "94px" }}>지역 분류</Label>
              <Select
                {...register("cuJyCode")}
                width={InputSize.i120}
                style={{ marginRight: "3px" }}
              >
                {cuJyCodeDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "70px" }}>관리자 분류</Label>
              <Select {...register("cuCustgubun")} width={InputSize.i120}>
                {cuCustgubunDic?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>

          <div style={{ marginTop: "5px" }}>
            <PlainTab
              tabHeader={["건물 기초", "벌크 시설", "용기 시설"]}
              onClick={(id) => setTabId(id)}
              tabId={tabId}
            />
            <TabContentWrapper
              style={{ minHeight: "171px", width: "1240px", padding: "10px" }}
            >
              {getTabContent(
                tabId,
                register,
                dataCommonDic,
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
                setChkCuCno,
                rdangaType,
                setRdangaType,
                rdanga,
                setRdanga,
                rdangaSign,
                setRdangaSign,
                rdangaAmt,
                setRdangaAmt,
                totalValue,
                setTotalValue,
                calcRdanga
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
          data={userInfo}
          areaCode={ownAreaCode}
          setSelectedUserInfo={setSelectedUserInfo}
          openPopup={openPopup}
          selected={selected}
        />
      </>
    );
  }
);

export default Form;