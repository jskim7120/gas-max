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
import { SearchWrapper } from "../../commonStyle";
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
import { addCM1105 } from "app/state/modal/modalSlice";
import useRdanga from "app/hook/useCalcRdanga";
import Modal from "components/modal/modal";

const Form = React.forwardRef(
  (
    {
      ownAreaCode,
      menuId,
      dataCommonDic,
      userInfo,
      selectedUserInfo,
      setSelectedUserInfo,
      dataDictionary,
      setDataDictionary,
      supplyTab,
      fetchData,
      areaCode,
      selected,
      isAddBtnClicked,
      prepareSearchFormValues,
      clonedSelected,
    }: {
      ownAreaCode: string;
      menuId: string;
      dataCommonDic: any;
      userInfo: any;
      selectedUserInfo: any;
      setSelectedUserInfo: Function;
      dataDictionary: any;
      setDataDictionary: Function;
      supplyTab: any;
      fetchData: Function;
      areaCode: string;
      selected: any;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
      prepareSearchFormValues: Function;
      clonedSelected: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [tabId, setTabId] = useState<number>(0);
    const [addr, setAddress] = useState<string>("");
    const [cuAddr1, setCuAddr1] = useState("");
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (
        supplyTab !== undefined &&
        selected !== undefined &&
        Object.keys(selected)?.length > 0
      ) {
        resetForm("reset2");
        setRdangaType(selected?.cuRdangaType);
        setRdanga(selected?.cuRdanga);
        setRdangaSign(selected?.cuRdangaSign);
        setRdangaAmt(selected?.cuRdangaAmt);
      }
    }, [supplyTab]);

    useEffect(() => {
      if (userInfo !== undefined) {
        setUserData(userInfo);
      }
    }, [userInfo]);

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

        setDataDictionary({
          cuCustgubun: res?.cuCustgubun ? res.cuCustgubun : [],
          cuJyCode: res?.cuJyCode ? res.cuJyCode : [],
          cuSwCode: res?.cuSwCode ? res.cuSwCode : [],
        });

        reset({
          ...emptyObj,
          cuCustgubun: res?.cuCustgubun[0].code,
          cuJyCode: res?.cuJyCode[0].code,
          cuSwCode: res?.cuSwCode[0].code,
          cuCode: res?.tempCuCode[0]?.tempCuCode,
        });
        setUserData([]);
        // setFocus("cuName")
        document.getElementsByName("cuName")[0]?.focus();
      }
    };

    const resetBasic = () => {
      let tempData: any = { ...selected, ...supplyTab };

      setCuAddr1(selected.cuAddr1 ? selected.cuAddr1 : "");

      reset({
        ...tempData,
        cuAptnameYn: tempData?.cuAptnameYn === "Y",
        cuBaGageYn: tempData?.cuBaGageYn === "Y",
        chkCuZipCode: false,
        chkCuRh20: false,
        chkCuRdanga: false,
        chkCuAnKum: false,
        chkCuMeterKum: false,
        chkCuPer: false,
        chkCuCdc: false,
        chkCuSukumtype: false,
        chkCuGumTurm: false,
        chkCuGumdate: false,
        chkCuCno: false,
      });
      setRdangaType(selected?.cuRdangaType);
      setRdanga(selected?.cuRdanga);
      setRdangaSign(selected?.cuRdangaSign);
      setRdangaAmt(selected?.cuRdangaAmt);
      setTotalValue("");
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        areaCode && (await codeChangeHandler(areaCode));
      } else if (type === "reset") {
        resetBasic();
        setUserData(userInfo);
      } else if (type === "reset2") {
        resetBasic();
      }
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
      setIsModalOpen(true);
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

    const submit = async (data: any) => {
      const formValues: any = getValues();

      formValues.areaCode = isAddBtnClicked ? areaCode : selected.areaCode;
      if (isAddBtnClicked) {
        if (!formValues.chkCuRh20) {
          formValues.cuRh2O = "";
        }
        if (!formValues.chkCuAnKum) {
          formValues.cuAnkum = "";
        }
        if (!formValues.chkCuMeterKum) {
          formValues.cuMeterkum = "";
        }
        if (!formValues.chkCuPer) {
          formValues.cuPer = "";
        }
        if (!formValues.chkCuCdc) {
          formValues.cuCdc = "";
        }
        if (!formValues.chkCuSukumtype) {
          formValues.cuSukumtype = "";
        }
        if (!formValues.chkCuGumTurm) {
          formValues.cuGumTurm = "";
        }
        if (!formValues.chkCuGumdate) {
          formValues.cuGumdate = "";
        }
        if (!formValues.chkCuCno) {
          formValues.cuCno = "";
        }

        if (!formValues.chkCuRdanga) {
          formValues.cuRdanga = "";
          formValues.cuRdangaAmt = "";
          formValues.cuRdangaSign = "";
          formValues.cuRdangaType = "";
        }
      } else {
        if (!formValues.chkCuRh20) {
          formValues.cuRh2O = clonedSelected.cuRh2O;
        }
        if (!formValues.chkCuAnKum) {
          formValues.cuAnkum = clonedSelected.cuAnkum;
        }
        if (!formValues.chkCuMeterKum) {
          formValues.cuMeterkum = clonedSelected.cuMeterkum;
        }
        if (!formValues.chkCuPer) {
          formValues.cuPer = clonedSelected.cuPer;
        }
        if (!formValues.chkCuCdc) {
          formValues.cuCdc = clonedSelected.cuCdc;
        }
        if (!formValues.chkCuSukumtype) {
          formValues.cuSukumtype = clonedSelected.cuSukumtype;
        }
        if (!formValues.chkCuGumTurm) {
          formValues.cuGumTurm = clonedSelected.cuGumTurm;
        }
        if (!formValues.chkCuGumdate) {
          formValues.cuGumdate = clonedSelected.cuGumdate;
        }
        if (!formValues.chkCuCno) {
          formValues.cuCno = clonedSelected.cuCno;
        }

        if (!formValues.chkCuRdanga) {
          formValues.cuRdanga = clonedSelected.cuRdanga;
          formValues.cuRdangaAmt = clonedSelected.cuRdangaAmt;
          formValues.cuRdangaSign = clonedSelected.cuRdangaSign;
          formValues.cuRdangaType = clonedSelected.cuRdangaType;
        }
      }

      if (formValues.cuBaGageKum) {
        formValues.cuBaGageKum = formatCurrencyRemoveComma(
          formValues.cuBaGageKum
        );
      }

      formValues.cuAptnameYn = formValues.cuAptnameYn ? "Y" : "N";
      formValues.cuBaGageYn = formValues.cuBaGageYn ? "Y" : "N";

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
      formValues.cuRdanga = 100;
      formValues.cuRdangaAmt = 40;
      formValues.cuRdangaSign = "+";
      formValues.cuRdangaType = "0";
      // formValues.cuRdangaType =
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
      <div
        style={{
          width: "1237px",
          padding: "0 10px 0 0",
        }}
      >
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          type="cm1105Modal"
        />
        <BuildingInfoText text="건물 정보" style={{ padding: "11px 15px" }} />
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
            <Controller
              control={control}
              name="chkCuZipCode"
              render={({ field }) => (
                <CheckBox
                  title="주 소"
                  {...field}
                  gap="7px"
                  style={{
                    width: "120px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                />
              )}
            />
            <Input
              register={register("cuZipcode")}
              inputSize={InputSize.i60}
              readOnly={!watch("chkCuZipCode")}
            />
            <DaumAddress
              setAddress={setAddress}
              disabled={!watch("chkCuZipCode")}
              defaultValue={cuAddr1}
              onClose={() => setFocus("cuAddr2")}
            />
            <Input
              inputSize={InputSize.md}
              value={cuAddr1}
              onChange={(e: any) => setCuAddr1(e.target.value)}
              readOnly={!watch("chkCuZipCode")}
            />
            <Input
              register={register("cuAddr2")}
              style={{ width: "225px" }}
              readOnly={!watch("chkCuZipCode")}
            />
          </FormGroup>

          <FormGroup>
            <Label>담당 사원</Label>
            <Select register={register("cuSwCode")} width={InputSize.i120}>
              {dataDictionary?.cuSwCode?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "96px" }}>지역 분류</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataDictionary?.cuJyCode?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "104px" }}>관리자 분류</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataDictionary?.cuCustgubun?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <div style={{ margin: "5px 0 0 10px" }}>
            <PlainTab
              tabHeader={["건물 기초", "벌크 시설", "용기 시설"]}
              onClick={(id) => setTabId(id)}
              tabId={tabId}
            />
            <TabContentWrapper style={{ minHeight: "160px", padding: "5px" }}>
              {getTabContent(
                tabId,
                register,
                reset,
                watch,
                dataCommonDic,
                control,
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

        <SearchWrapper
          className="h35 bgtr"
          style={{ border: "none", paddingRight: 0 }}
        >
          <PersonInfoText text="사용자 정보" />
          <div className="buttons">
            <Button
              text="사용자 추가"
              icon={<Plus />}
              onClick={openPopupCM1105Insert}
              disabled={isAddBtnClicked}
            />
            <Button
              text="사용자 수정"
              icon={<Update />}
              onClick={openPopupCM1105Update}
              disabled={isAddBtnClicked}
            />
            <Button text="삭제" icon={<Trash />} disabled={isAddBtnClicked} />
          </div>
        </SearchWrapper>

        <GridBottom
          menuId={menuId}
          data={userData}
          areaCode={ownAreaCode}
          setSelected={setSelectedUserInfo}
          openPopup={openPopup}
          selected={selected}
          rowIndex={userInfo?.length > 1 ? userInfo.length - 1 : 0}
          gridNumber={1}
        />
      </div>
    );
  }
);

export default Form;
