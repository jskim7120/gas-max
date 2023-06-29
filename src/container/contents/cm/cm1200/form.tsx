import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormGroup,
  Input,
  Label,
  Select,
  Divider,
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
import { openModal, addCM1105 } from "app/state/modal/modalSlice";
import useRdanga from "app/hook/calcRdanga";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

const Form = React.forwardRef(
  (
    {
      selected,
      dataCommonDic,
      fetchData,
      areaCode,
      ownAreaCode,
      isAddBtnClicked,
      setIsAddBtnClicked,
      prepareSearchFormValues,
      userInfo,
      selectedSupplyTab,
      cuCustgubunDic,
      setCuCustgubunDic,
      cuJyCodeDic,
      setCuJyCodeDic,
      cuSwCodeDic,
      setCuSwCodeDic,
      parentFetchData65,
      setSelectedUserInfo,
      selectedUserInfo,
      menuId,
      setUserInfo,
    }: {
      selected: any;
      dataCommonDic: any;
      fetchData: any;
      areaCode: string;
      ownAreaCode: string;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
      prepareSearchFormValues: any;
      userInfo: any;
      selectedSupplyTab: any;
      cuCustgubunDic: any;
      setCuCustgubunDic: any;
      cuJyCodeDic: any;
      setCuJyCodeDic: any;
      cuSwCodeDic: any;
      setCuSwCodeDic: any;
      parentFetchData65: Function;
      setSelectedUserInfo: Function;
      selectedUserInfo: any;
      menuId: string;
      setUserInfo: Function;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

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
      if (selectedSupplyTab) {
        resetForm("reset");
      }
    }, [selectedSupplyTab]);

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr2: "",
        }));

        setCuAddr1(addr ? addr?.split("/")[0] : "");
      }
    }, [addr]);

    useEffect(() => {
      if (Object.keys(selectedUserInfo)?.length > 0) {
        setFooterDetail(selected.areaCode, selectedUserInfo.cuCode, dispatch);
      }
    }, [selectedUserInfo]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      crud,
    }));

    const codeChangeHandler = async (aCode: string) => {
      const res = await apiGet(CM1200INSERTSEQ, {
        areaCode: aCode,
      });

      if (res) {
        setCuAddr1("");

        res?.cuCustgubun && setCuCustgubunDic(res.cuCustgubun);
        res?.cuJyCode && setCuJyCodeDic(res.cuJyCode);
        res?.cuSwCode && setCuSwCodeDic(res.cuSwCode);

        reset({
          ...emptyObj,
          cuCustgubun: res?.cuCustgubun[0].code,
          cuJyCode: res?.cuJyCode[0].code,
          cuSwCode: res?.cuSwCode[0].code,
          cuCode: res?.tempCuCode[0]?.tempCuCode,
        });
        setUserInfo([]);

        //setFocus("cuName") ene 2 ajillahgui bn
        //document.getElementsByName("cuName")[0]?.focus(); ene 2 ajillahgui bn
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        areaCode && (await codeChangeHandler(areaCode));
      }

      if (type === "reset") {
        if (selected && Object.keys(selected)?.length > 0) {
          let tempData: any = { ...selected, ...selectedSupplyTab };

          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", selected);

          setCuAddr1(selected.cuAddr1 ? selected.cuAddr1 : "");
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
      if (Object.keys(selected)?.length > 0) {
        openPopup({
          cuCode: selected?.cuCode,
          areaCode: selected?.areaCode,
          cuName: selected?.cuName,
          status: "INSERT",
          source: menuId,
        });
      } else {
        toast.warning("no selected data", {
          autoClose: 500,
        });
      }
    };

    const openPopupCM1105Update = () => {
      if (Object.keys(selectedUserInfo)?.length > 0) {
        openPopup({
          cuCode: selectedUserInfo.cuCode,
          areaCode: selected.areaCode,
          status: "UPDATE",
          source: menuId,
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
        const par = prepareSearchFormValues();
        res && (await fetchData(par));
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
        const par = prepareSearchFormValues();
        if (isAddBtnClicked) {
          await fetchData(par, "last");
        } else {
          await fetchData(par);
        }
      }
    };

    return (
      <div style={{ width: "1257px", padding: "0 10px" }}>
        <FormSectionTitle>
          <BuildingInfoText text="건물 정보" />
        </FormSectionTitle>
        <Divider />

        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <FormGroup>
            <Input
              label="건물코드"
              register={register("cuCode")}
              inputSize={InputSize.i60}
              readOnly={true}
            />
            <Controller
              control={control}
              name="cuName"
              render={({ field }) => (
                <Input
                  {...field}
                  label="건물명"
                  labelStyle={{ minWidth: "78px" }}
                  style={{ width: "198px" }}
                />
              )}
            />

            <CheckBox
              title="건물명 지로 출력 안함."
              register={register("cuAptnameYn")}
              gap="15px"
              rtl
              style={{ marginLeft: "30px" }}
            />
          </FormGroup>

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

            <Input
              inputSize={InputSize.md}
              style={{ marginRight: "0px" }}
              value={cuAddr1}
              onChange={(e: any) => setCuAddr1(e.target.value)}
            />
            <Input
              register={register("cuAddr2")}
              style={{ marginLeft: "5px", width: "225px" }}
            />
          </FormGroup>

          <FormGroup>
            <Label>담당 사원</Label>
            <Select {...register("cuSwCode")} width={InputSize.i120}>
              {cuSwCodeDic?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "96px" }}>지역 분류</Label>
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

            <Label style={{ minWidth: "104px" }}>관리자 분류</Label>
            <Select {...register("cuCustgubun")} width={InputSize.i120}>
              {cuCustgubunDic?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <div style={{ marginTop: "5px" }}>
            <PlainTab
              tabHeader={["건물 기초", "벌크 시설", "용기 시설"]}
              onClick={(id) => setTabId(id)}
              tabId={tabId}
            />
            <TabContentWrapper
              style={{ minHeight: "171px", padding: "10px 5px" }}
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
              disabled={isAddBtnClicked}
            />
            <Button
              text="사용자 수정"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              onClick={openPopupCM1105Update}
              disabled={isAddBtnClicked}
            />
            <Button text="삭제" icon={<Trash />} disabled={isAddBtnClicked} />
          </div>
        </FormSectionTitle>

        <GridBottom
          data={userInfo}
          areaCode={ownAreaCode}
          setSelectedUserInfo={setSelectedUserInfo}
          openPopup={openPopup}
          selected={selected}
          rowIndex={userInfo?.length > 1 ? userInfo.length - 1 : 0}
        />
      </div>
    );
  }
);

export default Form;
