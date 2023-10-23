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
    const { showAR1100BupumModal, openModal: openBupumModal } = useModal();
    const { showAR1100BpSaleModal, openModal: openAR1100Modal } = useModal();

    const bupumState = useSelector((state: any) => state.modal.bupum);
    const { info, source } = useSelector((state: any) => state.footer);

    useEffect(() => {
      if (bupumState.source === "AR11003") {
        resetForm("bpName");
      }
    }, [bupumState.tick]);

    useEffect(() => {
      if (watch("bgInkumType") !== undefined) {
        if (watch("bgInkumType") === "A") {
          reset((formValues) => ({
            ...formValues,
            bgInkum: 0,
            bgDc: 0,
          }));
        } else {
          reset((formValues) => ({
            ...formValues,
            bgInkum: data65?.bgInkum,
            bgDc: data65?.bgDc,
          }));
        }
        if (watch("bgInkumType") !== "2") {
          reset((formValues) => ({
            ...formValues,
            acbCode: "",
          }));
        }
      }
    }, [watch("bgInkumType")]);

    useEffect(() => {
      if (watch("bgQty") !== undefined) {
        handleChangeQty(watch("bgQty"));
      }
    }, [watch("bgQty")]);

    useEffect(() => {
      if (watch("bgDanga") !== undefined) {
        handleChangeDanga(watch("bgDanga"));
      }
    }, [watch("bgDanga")]);

    useEffect(() => {
      if (watch("bgVatDiv")) {
        handleChangeVatDiv(watch("bgVatDiv"));
      }
    }, [watch("bgVatDiv")]);

    useEffect(() => {
      if (watch("bgSvKumack") !== undefined) {
        handleChangefields(watch("bgSvKumack"), "kumack");
      }
    }, [watch("bgSvKumack")]);

    useEffect(() => {
      if (watch("bgInkum") !== undefined) {
        handleChangefields(watch("bgInkum"), "inkum");
      }
    }, [watch("bgInkum")]);

    useEffect(() => {
      if (watch("bgDc") !== undefined) {
        handleChangefields(watch("bgDc"), "dc");
      }
    }, [watch("bgDc")]);

    const prepVal = (val: number) => {
      let tempVal = val ? +removeCommas(val, "number") : 0;
      return isNaN(tempVal) ? 0 : tempVal;
    };

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

    const calculationOfMisu = (tempTotal: number) => {
      let tempInkum = prepVal(getValues("bgInkum"));
      let tempKumack = prepVal(getValues("bgSvKumack"));
      let tempDc = prepVal(getValues("bgDc"));

      const tempMisu = tempTotal - tempInkum - tempDc - tempKumack;
      return tempMisu;
    };

    const handleChangeQty = (val: number) => {
      let tempQty = isNaN(val) ? 0 : +val;
      const tempVatDiv = getValues("bgVatDiv") ? getValues("bgVatDiv") : "0";
      let tempDanga = prepVal(getValues("bgDanga"));

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
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
      const tempDanga = prepVal(val);
      const tempQty = isNaN(getValues("bgQty")) ? 0 : getValues("bgQty");
      const tempVatDiv = getValues("bgVatDiv") ? getValues("bgVatDiv") : "0";

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
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

    const handleChangeVatDiv = (val: string) => {
      const tempDanga = prepVal(getValues("bgDanga"));
      const tempQty = isNaN(getValues("bgQty")) ? 0 : getValues("bgQty");

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(price, val);
      const tempMisu = calculationOfMisu(tempTotal);

      reset((formValues) => ({
        ...formValues,
        bgKumSup: tempKumSup,
        bgKumVat: tempKumVat,
        bgTotal: tempTotal,
        bgMisu: tempMisu,
      }));
    };

    const handleChangefields = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;
      let tempKumack: number = 0;

      if (type === "inkum") {
        tempDc = prepVal(getValues("bgDc"));
        tempKumack = prepVal(getValues("bgSvKumack"));
        tempInkum = prepVal(val);
      } else if (type === "dc") {
        tempInkum = prepVal(getValues("bgInkum"));
        tempKumack = prepVal(getValues("bgSvKumack"));
        tempDc = prepVal(val);
      } else if (type === "kumack") {
        tempInkum = prepVal(getValues("bgInkum"));
        tempDc = prepVal(getValues("bgDc"));
        tempKumack = prepVal(val);
      }

      let bgTotal: number = getValues("bgTotal")
        ? +removeCommas(getValues("bgTotal"), "number")
        : 0;

      const tempMisu: number = bgTotal - tempDc - tempInkum - tempKumack;

      reset((formValues) => ({
        ...formValues,
        bgMisu: tempMisu,
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
          areaCode: info?.areaCode,
          cuCode: info?.cuCode,
          jpCode: event.target.value,
          pjType: 3,
        });

        if (Object.keys(res)?.length > 0) {
          //setDanga(res[0]?.bgBpDanga);
          handleChangeDanga(res[0]?.bgBpDanga);
          reset((formValues) => ({
            ...formValues,
            ...res[0],
          }));

          document.getElementById("bgQty")?.focus();
        } else {
          openModalBupum();
        }
      }
    }

    const resetForm = (type: string) => {
      if (type === "reset") {
        //setQty(data65?.bgQty);
        //setDanga(data65?.bgDanga);
        reset({
          ...data65,
          bgBpCode: data65?.bgBpCode ? data65?.bgBpCode : "",
          bgBpName: data65?.bgBpName ? data65?.bgBpName : "",
        });
      } else if (type === "bpName") {
        // const bgKumSup =
        //   (cm1106?.jcJpDanga ? +removeCommas(cm1106.jcJpDanga, "number") : 0) *
        //   (getValues("bgQty") ? +getValues("bgQty") : 0);
        // reset((formValues) => ({
        //   ...formValues,
        //   bgBpName: cm1106.jpName,
        //   bgBpCode: cm1106.jpCode,
        //   //pjJpSpec: cm1106?.jpSpec,
        //   bgDanga: cm1106.jcJpDanga,
        //   bgKumSup: bgKumSup,
        // }));
      }
    };

    const openModalBupum = async () => {
      //dispatch(addBupum({ areaCode: "01", pjType: 3, source: "AR11003" }));
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
        //params.bgCuUserName = info?.cuViewName;
        params.bgSno = "";
        // }
      } else {
        params.areaCode = data65?.areaCode;
        params.bgCuCode = data65?.bgCuCode;
        params.bgCuName = data65?.bgCuName;
        params.bgSno = data65?.bgSno;
      }

      params.bgDate = DateWithoutDash(params.bgDate);
      //params.bgDateB = DateWithoutDash(params.bgDate);
      params.bgKumSup = removeCommas(params.bgKumSup, "number");
      params.bgKumVat = removeCommas(params.bgKumVat, "number");
      params.bgTotal = removeCommas(params.bgTotal, "number");
      params.bgMisu = removeCommas(params.bgMisu, "number");
      params.bgDanga = +removeCommas(params.bgDanga, "number");
      params.bgInkum = +removeCommas(params.bgInkum, "number");
      params.bgDc = +removeCommas(params.bgDc, "number");
      params.bgSvKumack = +removeCommas(params.bgSvKumack, "number");

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
              {dictionary?.saleState?.map((obj: any, idx: number) => (
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
              onClick={isAddBtnClicked ? openModalBupum : undefined}
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
        3: (
          <Controller
            control={control}
            name="bgQty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        4: (
          <Controller
            control={control}
            name="bgDanga"
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
        5: (
          <FormGroup>
            <Select register={register("bgVatDiv")} width={InputSize.i100}>
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
          <Controller
            control={control}
            name="bgInkum"
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
        3: (
          <Controller
            control={control}
            name="bgDc"
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
