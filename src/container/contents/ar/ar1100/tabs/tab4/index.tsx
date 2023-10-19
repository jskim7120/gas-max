import React, {
  useEffect,
  useImperativeHandle,
  BaseSyntheticEvent,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AR1100BPSALEINSERT,
  AR1100BPSALEUPDATE,
  AR1100SANGPUM,
} from "app/path";
import { useDispatch, useSelector } from "app/store";
import { apiPost, apiGet } from "app/axios";
import useModal from "app/hook/useModal";
import Table from "components/table";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import EditableSelect from "components/editableSelect";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { currencyMask, removeCommas } from "helpers/currency";
import { IAR110065DETAIL } from "./model";
import { tableHeader1, tableHeader2 } from "./tableHeader";
import { addBupum } from "app/state/modal/modalSlice";

const Tab4 = React.forwardRef(
  (
    {
      tabId,
      data,
      data65,
      dictionary,
      isAddBtnClicked,
      handleSubmitParent,
      submitParent,
      addBtnUnClick,
      setJpKind,
      qty,
      setQty,
      setReqty,
      danga,
      setDanga,
      vatDiv,
      setVatDiv,
      inkum,
      setInkum,
      dc,
      setDc,
    }: {
      tabId: number;
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      addBtnUnClick: Function;
      setJpKind: Function;
      qty: number;
      setQty: Function;
      setReqty: Function;
      danga: number;
      setDanga: Function;
      vatDiv: string;
      setVatDiv: Function;
      inkum: number;
      setInkum: Function;
      dc: number;
      setDc: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR110065DETAIL>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));

    const dispatch = useDispatch();

    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const { info, source } = useSelector((state: any) => state.footer);

    // const { showCM1106Modal, openModal } = useModal();
    const { showAR1100BupumModal, openModal: openBupumModal } = useModal();
    const { showAR1100BpSaleModal, openModal: openAR1100Modal } = useModal();

    useEffect(() => {
      if (cm1106.source === "AR11000") {
        setJpKind(cm1106.jpKind);
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    useEffect(() => {
      if (watch("bgInkumType") !== undefined) {
        if (watch("bgInkumType") === "A") {
          setInkum(0);
          setDc(0);
        } else {
          setInkum(data65?.bgInkum);
          setDc(data65?.bgDc);
        }
        if (watch("bgInkumType") !== "2") {
          reset((formValues) => ({
            ...formValues,
            acbCode: "",
          }));
        }
      }
    }, [watch("bgInkumType")]);

    const calculationOfVat = (price: number, vatDivVal: string) => {
      let tempKumSup: number = 0;
      let tempKumVat: number = 0;
      let tempTotal: number = 0;

      if (vatDivVal === "0") {
        tempKumSup = Math.round(price / 1.1);
        tempKumVat = price - tempKumSup;
        tempTotal = price;
      } else if (vatDivVal === "1") {
        tempKumSup = price;
        tempKumVat = Math.round(price * 0.1);
        tempTotal = tempKumSup + tempKumVat;
      } else if (vatDivVal === "2") {
        tempKumSup = price;
        tempKumVat = 0;
        tempTotal = price;
      }
      return {
        tempKumSup,
        tempKumVat,
        tempTotal,
      };
    };

    const calculationOfMisu = (tempKumack: number) => {
      let tempMisukum: number = 0;
      let tempInkum: number = inkum ? +removeCommas(inkum, "number") : 0;
      tempInkum = isNaN(tempInkum) ? 0 : tempInkum;
      let tempDc: number = dc ? +removeCommas(dc, "number") : 0;
      tempDc = isNaN(tempDc) ? 0 : tempDc;

      tempMisukum = tempKumack - tempInkum - tempDc;
      return tempMisukum;
    };

    const handleChangeQty = (val: number) => {
      setQty(val);
      let tempDanga = danga ? +removeCommas(danga, "number") : 0;
      tempDanga = isNaN(tempDanga) ? 0 : tempDanga;
      const price = tempDanga * +val;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        vatDiv
      );

      const tempMisu = calculationOfMisu(tempTotal);
      reset((formValues) => ({
        ...formValues,
        bgKumSup: tempKumSup,
        bgKumVat: tempKumVat,
        bgTotal: tempTotal,
        bgMisu: tempMisu,
      }));
    };

    const handleChangeDanga = (val: any) => {
      setDanga(val);
      const tempVal = val ? +removeCommas(val, "number") : 0;
      const price = (isNaN(tempVal) ? 0 : tempVal) * qty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        vatDiv
      );
      const tempMisukum = calculationOfMisu(tempTotal);
      reset((formValues) => ({
        ...formValues,
        bgKumSup: tempKumSup,
        bgKumVat: tempKumVat,
        bgTotal: tempTotal,
        bgMisu: tempMisukum,
      }));
    };

    const handleChangeVatDiv = (val: string) => {
      setVatDiv(val);
      let tempDanga = danga ? +removeCommas(danga, "number") : 0;
      const price = (isNaN(tempDanga) ? 0 : tempDanga) * qty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(price, val);
      const tempMisukum = calculationOfMisu(tempTotal);

      reset((formValues) => ({
        ...formValues,
        bgKumSup: tempKumSup,
        bgKumVat: tempKumVat,
        bgTotal: tempTotal,
        bgMisu: tempMisukum,
      }));
    };

    const handleChangeInkumOrDc = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;

      if (type === "inkum") {
        setInkum(val);
        tempDc = dc ? +removeCommas(dc, "number") : 0;
        tempDc = isNaN(tempDc) ? 0 : tempDc;
        tempInkum = val ? +removeCommas(val, "number") : 0;
        tempInkum = isNaN(tempInkum) ? 0 : tempInkum;
      } else if (type === "dc") {
        setDc(val);
        tempInkum = inkum ? +removeCommas(inkum, "number") : 0;
        tempInkum = isNaN(tempInkum) ? 0 : tempInkum;
        tempDc = val ? +removeCommas(val, "number") : 0;
        tempDc = isNaN(tempDc) ? 0 : tempDc;
      }

      let bgTotal: number = getValues("bgTotal")
        ? +removeCommas(getValues("bgTotal"), "number")
        : 0;
      let tempBgMisu: number = 0;
      tempBgMisu = bgTotal - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        bgMisu: tempBgMisu,
      }));
    };

    const fetchDataSangpum = async (params: any) => {
      const res = await apiGet(AR1100SANGPUM, params);
      return res;
    };

    async function handleKeyDown(event: any) {
      if (event.key === "Enter") {
        event.preventDefault();

        const res = await fetchDataSangpum({
          areaCode: cm1106?.areaCode,
          cuCode: cm1106?.cuCode,
          jpCode: event.target.value,
          pjType: 0,
        });

        if (Object.keys(res)?.length > 0) {
          setDanga(res[0]?.jcJpDanga);
          handleChangeDanga(res[0]?.jcJpDanga);
          reset((formValues) => ({
            ...formValues,
            bgBpName: res[0]?.jcJpName,
          }));

          document.getElementById("bgQty")?.focus();
        } else {
          openModalCM1106();
        }
      }
    }

    const resetForm = (type: string) => {
      if (type === "reset") {
        setQty(data65?.bgQty);
        setDanga(data65?.bgDanga);
        reset({
          ...data65,
          bgBpCode: data65?.bgBpCode ? data65?.bgBpCode : "",
          bgBpName: data65?.bgBpName ? data65?.bgBpName : "",
        });
      } else if (type === "jpName") {
        const bgKumSup =
          (cm1106?.jcJpDanga ? +removeCommas(cm1106.jcJpDanga, "number") : 0) *
          (getValues("bgQty") ? +getValues("bgQty") : 0);

        reset((formValues) => ({
          ...formValues,
          bgBpName: cm1106.jpName,
          bgBpCode: cm1106.jpCode,
          //pjJpSpec: cm1106?.jpSpec,
          bgDanga: cm1106.jcJpDanga,
          bgKumSup: bgKumSup,
        }));
      }
    };

    const openModalCM1106 = async () => {
      console.log("data65>>>>>>>>>>", data65);
      dispatch(addBupum({ areaCode: data65?.areaCode }));
      openBupumModal();
    };

    const openModalAR1100BpSale = () => {
      openAR1100Modal();
    };

    const handleClickReset = async () => {
      if (isAddBtnClicked) {
        await handleSubmitParent((dat: any) => submitParent(dat, "last"))();
        addBtnUnClick();
      } else {
        resetForm("reset");
      }
    };

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100BPSALEINSERT : AR1100BPSALEUPDATE;
      params.insertType = "0";

      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.bgCuCode = info?.cuCode;
        params.bgCuName = info?.cuName;
        params.bgSno = "";
        // }
      }

      params.bgDate = DateWithoutDash(params.bgDate);
      params.bgKumSup = removeCommas(params.bgKumSup, "number");
      params.bgKumVat = removeCommas(params.bgKumVat, "number");
      params.bgTotal = removeCommas(params.bgTotal, "number");
      params.bgMisu = removeCommas(params.bgMisu, "number");
      params.bgQty = +qty;
      params.bgVatDiv = vatDiv;
      params.bgDanga = +removeCommas(danga, "number");
      params.bgInkum = +removeCommas(inkum, "number");
      params.bgDc = +removeCommas(dc, "number");

      if (params.bgSwCode) {
        const bgSwName = dictionary?.bgSwCode?.find(
          (item: any) => item.code === params.bgSwCode
        )?.codeName;
        params.bgSwName = bgSwName;
      }

      params.jsonItemList = [];

      const res = await apiPost(path, params, "저장이 성공하였습니다");
      if (res) {
        if (isAddBtnClicked) {
          await handleSubmitParent((d: any) => submitParent(d, "last"))();
        } else {
          await handleSubmitParent((d: any) => submitParent(d))();
        }
      }
    };

    const tableData1 = [
      {
        0: (
          <FormGroup>
            <Select register={register("saleState")} width={InputSize.i100}>
              {dictionary?.bgSaleState?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        1: (
          <Controller
            control={control}
            name="bgDate"
            render={({ field }) => (
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
            )}
          />
        ),
        2: (
          <FormGroup style={{ position: "relative" }}>
            <Input
              register={register("bgBpCode")}
              inputSize={InputSize.i70}
              readOnly={!isAddBtnClicked}
              onKeyDown={handleKeyDown}
            />
            <Controller
              control={control}
              name="bgBpName"
              render={({ field }) => (
                <Input
                  {...field}
                  readOnly={!isAddBtnClicked}
                  style={{ width: "230px" }}
                />
              )}
            />

            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#686767",
                position: "absolute",
                right: "6px",
                bottom: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "3px",
              }}
              onClick={isAddBtnClicked ? openModalCM1106 : undefined}
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
        3: (
          <Input
            type="number"
            name="bgQty"
            value={qty}
            onChange={(e: any) => {
              handleChangeQty(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
          />
        ),
        4: (
          <Input
            name="bgDanga"
            value={danga}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeDanga(e.target.value)
            }
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
          />
        ),
        5: (
          <FormGroup>
            <Select
              name="bgVatDiv"
              value={vatDiv}
              width={InputSize.i100}
              onChange={(e: BaseSyntheticEvent) =>
                handleChangeVatDiv(e.target.value)
              }
            >
              {dictionary?.bgVatDiv?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        6: (
          <Controller
            control={control}
            name="bgKumSup"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        7: (
          <Controller
            control={control}
            name="bgKumVat"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        8: (
          <Controller
            control={control}
            name="bgTotal"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        9: (
          <Controller
            control={control}
            name="bgSvKumack"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
      },
    ];

    const tableData2 = [
      {
        0: (
          <FormGroup>
            <Select register={register("bgInkumType")} width={InputSize.i100}>
              {dictionary?.bgInkumType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        1: (
          <FormGroup>
            <Select
              register={register("acbCode")}
              width={InputSize.i150}
              disabled={watch("bgInkumType") !== "2"}
            >
              {dictionary?.bgAcbCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        2: (
          <Input
            name="bgInkum"
            value={inkum}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeInkumOrDc(e.target.value, "inkum")
            }
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
          />
        ),
        3: (
          <Input
            name="bgDc"
            value={dc}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeInkumOrDc(e.target.value, "dc")
            }
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
          />
        ),
        4: (
          <Controller
            control={control}
            name="bgMisu"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
                readOnly
              />
            )}
          />
        ),
        5: (
          <FormGroup>
            <Select register={register("bgSwCode")} width={InputSize.i100}>
              {dictionary?.bgSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        6: (
          <EditableSelect
            list={dictionary?.bgBigo}
            reset={reset}
            register={register("bgBigo")}
            watch={watch("bgBigo")}
            textAlign={"left"}
            style={{ width: "200px" }}
          />
        ),
        7: (
          <FormGroup>
            <Input register={register("signUser")} inputSize={InputSize.i100} />
          </FormGroup>
        ),
      },
    ];

    return (
      <>
        {showAR1100BupumModal()}
        {showAR1100BpSaleModal()}

        <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div className="tab1">
              <Table
                className="no-space"
                tableHeader={tableHeader1}
                tableData={tableData1}
                style={{ marginBottom: "2px" }}
              />
              <Table
                className="no-space"
                tableHeader={tableHeader2}
                tableData={tableData2}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "30px",
                  borderRadius: "15px",
                  background: "rgb(104, 103, 103)",
                  color: "#fff",
                  textAlign: "center",
                }}
                onClick={openModalAR1100BpSale}
              >
                + 상세
              </div>

              <Button
                text="저장"
                icon={<Update />}
                color={ButtonColor.SECONDARY}
                type="submit"
                disabled={data?.length === 0}
              />
              <Button
                text="취소"
                icon={<Reset />}
                type="button"
                onClick={handleClickReset}
              />
            </div>
          </div>
        </CustomForm>
      </>
    );
  }
);

export default Tab4;
