import React, {
  BaseSyntheticEvent,
  useEffect,
  useImperativeHandle,
} from "react";
import { useForm, Controller } from "react-hook-form";
import {
  AR1100TONGSALEINSERT,
  AR1100TONGSALEUPDATE,
  AR1100SANGPUM,
} from "app/path";
import { useSelector, useDispatch } from "app/store";
import useModal from "app/hook/useModal";
import { addCM1106Second } from "app/state/modal/modalSlice";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Reset, Update } from "components/allSvgIcon";
import Table from "components/table";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import EditableSelect from "components/editableSelect";
import { MagnifyingGlass } from "components/allSvgIcon";
import { currencyMask, removeCommas } from "helpers/currency";
import {
  tableHeader1a,
  tableHeader1b,
  tableHeader2a,
  tableHeader2b,
  tableHeader3a,
  tableHeader3b,
  tableHeader4a,
  tableHeader4b,
  tableHeader5,
} from "./tableHeader";
import { IAR1100TAB3 } from "./model";
import { DateWithoutDash } from "helpers/dateFormat";
import { apiGet, apiPost } from "app/axios";
import { calculationOfVat, prepVal } from "../../helper";

const Tab3 = React.forwardRef(
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
      qty,
      setQty,
      danga,
      setDanga,
      vatDiv,
      setVatDiv,
      kumSup,
      setKumSup,
      kumVat,
      setKumVat,
      kumack,
      setKumack,
      inkum,
      setInkum,
      dc,
      setDc,
      misu,
      setMisu,
      gubun,
      setGubun,
    }: {
      tabId: number;
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      addBtnUnClick: Function;
      qty: number;
      setQty: Function;
      danga: number;
      setDanga: Function;
      vatDiv: string;
      setVatDiv: Function;
      kumSup: number;
      setKumSup: Function;
      kumVat: number;
      setKumVat: Function;
      kumack: number;
      setKumack: Function;
      inkum: number;
      setInkum: Function;
      dc: number;
      setDc: Function;
      misu: number;
      setMisu: Function;
      gubun: string;
      setGubun: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { info, source } = useSelector((state: any) => state.footer);
    const cm1106 = useSelector((state: any) => state.modal.cm1106);

    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR1100TAB3>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));
    const dispatch = useDispatch();
    const { showCM1106Modal, openModal } = useModal();

    useEffect(() => {
      if (cm1106.source === "AR11002") {
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    useEffect(() => {
      if (watch("tsInkumType") !== undefined) {
        handleChangeInkumType(watch("tsInkumType"));
      }
    }, [watch("tsInkumType")]);

    const handleChangeInkumType = (val: string) => {
      if (val === "A") {
        setInkum(0);
        setDc(0);
      }
      if (val !== "2") {
        reset((formValues) => ({
          ...formValues,
          acbCode: "",
        }));
      }
    };

    const handleQtyChange = (val: number) => {
      setQty(val);
      let tempQty = isNaN(val) ? 0 : +val;
      const tempVatDiv = vatDiv ? vatDiv : "0";
      let tempDanga = prepVal(danga);

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
      );
      const tempMisu = calculationOfMisu(tempTotal);
      setKumSup(tempKumSup);
      setKumVat(tempKumVat);
      setKumack(tempTotal);
      setMisu(tempMisu);
      reset((formValues) => ({
        ...formValues,
        tsMisu: tempMisu,
      }));
    };

    const handleDangaChange = (val: number) => {
      setDanga(val);

      const tempDanga = prepVal(val);
      const tempQty = isNaN(qty) ? 0 : qty;
      const tempVatDiv = vatDiv ? vatDiv : "0";

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
      );
      const tempMisu = calculationOfMisu(tempTotal);

      setKumSup(tempKumSup);
      setKumVat(tempKumVat);
      setKumack(tempTotal);
      setMisu(tempMisu);
      reset((formValues) => ({
        ...formValues,
        tsMisu: tempMisu,
      }));
    };

    const calculationOfMisu = (tempTotal: number) => {
      let tempInkum = prepVal(inkum);
      let tempKumack = prepVal(kumack);
      let tempDc = prepVal(dc);

      const tempMisu = tempTotal - tempInkum - tempDc - tempKumack;
      return tempMisu;
    };

    const handleVatDivChange = (val: string) => {
      setVatDiv(val);
      const tempDanga = prepVal(danga);
      const tempQty = isNaN(qty) ? 0 : qty;

      const price = tempDanga * tempQty;

      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(price, val);
      const tempMisu = calculationOfMisu(tempTotal);

      setKumSup(tempKumSup);
      setKumVat(tempKumVat);
      setKumack(tempTotal);

      reset((formValues) => ({
        ...formValues,

        tsMisu: tempMisu,
      }));
    };

    const handleInkumOrDcChange = (val: string, type: string) => {
      let tempMisu: number = 0;
      if (type === "inkum") {
        setInkum(+removeCommas(val, "number"));
        tempMisu = kumack - dc - +removeCommas(val, "number");
        setMisu(tempMisu);
      } else if (type === "dc") {
        setDc(+removeCommas(val, "number"));
        tempMisu = kumack - inkum - +removeCommas(val, "number");
        setMisu(tempMisu);
      }
    };

    const handleChangeKumack = (val: string) => {
      setKumack(+removeCommas(val, "number"));
      let tempMisu = +removeCommas(val, "number") - inkum - dc;
      setMisu(tempMisu);
    };

    const handleGubunChange = (val: string) => {
      setGubun(val);
      setQty(0);
      setDanga(0);
      setVatDiv("0");
      setKumSup(0);
      setKumVat(0);
      setKumack(0);
      setInkum(0);
      setDc(0);
      setMisu(0);

      reset((formValues) => ({
        ...formValues,
        tsSwCode: "",
        tsInkumType: "0",
        tsPaytype: "0",
        acbCode: "",
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        reset({
          ...data65,
          tsJpCode: data65?.tsJpCode ? data65?.tsJpCode : "",
          tsJpName: data65?.tsJpName ? data65?.tsJpName : "",
        });
      } else if (type === "jpName") {
        reset((formValues) => ({
          ...formValues,
          tsJpName: cm1106?.jpName ? cm1106?.jpName : "",
          tsJpCode: cm1106?.jpCode ? cm1106?.jpCode : "",
          tsJpSpec: cm1106?.jpSpec,
        }));
      }
    };

    const openPopupCM1106 = async () => {
      dispatch(addCM1106Second({ source: "AR11002" }));
      openModal();
    };

    const handleClickReset = async () => {
      if (isAddBtnClicked) {
        await handleSubmitParent((dat: any) => submitParent(dat, "last"))();
        addBtnUnClick();
      } else {
        resetForm("reset");
      }
    };
    async function handleKeyDown(event: any) {
      if (event.key === "Enter") {
        event.preventDefault();

        const res = await fetchDataSangpum({
          areaCode: cm1106?.areaCode,
          cuCode: cm1106?.cuCode,
          jpCode: event.target.value,
          pjType: 1,
        });

        if (Object.keys(res)?.length > 0) {
          setDanga(res[0]?.jcJpDanga);
          handleDangaChange(res[0]?.jcJpDanga);
          reset((formValues) => ({
            ...formValues,
            tsJpName: res[0]?.jcJpName,
          }));

          document.getElementById("tsJpCode")?.focus();
        } else {
          openPopupCM1106();
        }
      }
    }

    const fetchDataSangpum = async (params: any) => {
      const res = await apiGet(AR1100SANGPUM, params);
      return res;
    };

    const submit = async (params: any) => {
      const path = isAddBtnClicked
        ? AR1100TONGSALEINSERT
        : AR1100TONGSALEUPDATE;

      params.insertType = "0";

      if (isAddBtnClicked) {
        params.areaCode = info?.areaCode;
        params.tsCuCode = info?.cuCode;
        params.tsCuName = info?.cuName;
        params.tsSno = "";
        params.tsDateB = DateWithoutDash(params.tsDate);
      } else {
        params.tsDateB = DateWithoutDash(data65?.tsDateB);
      }

      params.tsDate = DateWithoutDash(params.tsDate);
      params.tsDateB = DateWithoutDash(params.tsDate);
      params.tsGubun = gubun;
      params.tsQty = qty;
      if (gubun === ("0" || "9")) {
        params.tsVatDiv = +vatDiv;
        params.tsDanga = +danga;
        params.tsKumSup = +kumSup;
        params.tsKumVat = +kumVat;
        params.tsKumack = +kumack;
        params.tsInkum = +inkum;
        params.tsDc = +dc;
        params.tsMisu = +misu;
      } else if (gubun === "1") {
        params.tsVatDiv = +vatDiv;
        params.tsDanga = +danga;
        params.tsKumSup = +kumSup;
        params.tsKumVat = +kumVat;
        params.tsPayAmt = +inkum;
        params.tsPayDc = +dc;
        params.tsPayMisu = +misu;
        params.tsGukum = +kumack;
      } else if (gubun === "2") {
        params.tsBkum = +kumack;
        params.tsInkum = +inkum;
        params.tsDc = +dc;
        params.tsMisu = +misu;
      } else if (gubun === "3") {
        params.tsBoutKum = +kumack;
        params.tsPayAmt = +inkum;
        params.tsPayDc = +dc;
        params.tsPayMisu = +misu;
      }

      if (params.tsSwCode) {
        const tsSwName = dictionary?.tsSwCode?.find(
          (item: any) => item.code === params.tsSwCode
        )?.codeName;
        params.tsSwName = tsSwName;
      }

      const res = await apiPost(path, params, "저장이 성공하였습니다");
      if (res) {
        if (isAddBtnClicked) {
          await handleSubmitParent((d: any) => submitParent(d, "last"))();
        } else {
          await handleSubmitParent((d: any) => submitParent(d))();
        }
      }
    };

    const t11 = {
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
          name="tsDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ margin: "1px 0 0 0" }} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select
            disabled={!isAddBtnClicked}
            name="tsGubun"
            value={gubun}
            width={InputSize.i100}
            onChange={(e) => {
              handleGubunChange(e.target.value);
            }}
          >
            {dictionary?.tsGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      3: (
        <FormGroup style={{ position: "relative" }}>
          <Input
            register={register("tsJpCode")}
            inputSize={InputSize.i70}
            onKeyDown={handleKeyDown}
          />
          <Controller
            control={control}
            name="tsJpName"
            render={({ field }) => (
              <Input
                {...field}
                // readOnly={!isAddBtnClicked}
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
            onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
          >
            <MagnifyingGlass />
          </span>
        </FormGroup>
      ),
      4: (
        <FormGroup>
          <Select
            register={register("tsTongGubun")}
            width={InputSize.i100}
            disabled={
              gubun === "0" ||
              gubun === "2" ||
              gubun === "3" ||
              gubun === "6" ||
              gubun === "7" ||
              gubun === "8" ||
              gubun === "9"
            }
          >
            {dictionary?.tsTongGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      5: (
        <Input
          name="tsQty"
          value={qty}
          onChange={(e: BaseSyntheticEvent) => handleQtyChange(e.target.value)}
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t12 = {
      6: (
        <Input
          name="tsDanga"
          value={danga}
          onChange={(e: BaseSyntheticEvent) =>
            handleDangaChange(e.target.value)
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      7: (
        <FormGroup>
          <Select
            name="tsVatDiv"
            value={vatDiv}
            width={InputSize.i100}
            onChange={(e: BaseSyntheticEvent) =>
              handleVatDivChange(e.target.value)
            }
          >
            {dictionary?.tsVatDiv?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),

      8: (
        <Input
          name="tsKumSup"
          value={kumSup}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      9: (
        <Input
          name="tsKumVat"
          value={kumVat}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t13 = {
      10: (
        <Input
          name="tsKumack"
          value={kumack}
          readOnly={gubun === "0" || gubun === "1" || gubun === "9"}
          onChange={(e: BaseSyntheticEvent) =>
            handleChangeKumack(e.target.value)
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t15 = {
      130: (
        <FormGroup>
          <Select register={register("tsSwCode")} width={InputSize.i100}>
            {dictionary?.tsSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      140: (
        <EditableSelect
          list={dictionary?.tsBigo}
          reset={reset}
          register={register("tsBigo")}
          watch={watch("tsBigo")}
          textAlign={"left"}
          style={{ width: "200px" }}
        />
      ),
      150: (
        <Controller
          control={control}
          name="signuser"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} />
          )}
        />
      ),
    };

    const t21 = {
      20: (
        <FormGroup>
          <Select register={register("tsInkumType")} width={InputSize.i100}>
            {dictionary?.tsInkumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
    };
    const t22 = {
      21: (
        <FormGroup>
          <Select register={register("tsPaytype")} width={InputSize.i100}>
            {dictionary?.tsPaytype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
    };

    const t23 = {
      22: (
        <FormGroup>
          <Select
            register={register("acbCode")}
            width={InputSize.i150}
            disabled={watch("tsInkumType") !== "2"}
          >
            {dictionary?.acbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      23: (
        <Input
          name="tsInkum"
          value={inkum}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "inkum")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
          className="blue"
          readOnly={watch("tsInkumType") === "A"}
        />
      ),
      24: (
        <Input
          name="tsDc"
          value={dc}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "dc")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
          readOnly={watch("tsInkumType") === "A" || gubun !== "0"}
        />
      ),
      25: (
        <Input
          name="tsMisu"
          value={misu}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
          className="red"
        />
      ),
    };

    const getTableInfo = () => {
      switch (gubun) {
        case "0":
          return {
            tableHeader1: tableHeader1a,
            tableHeader2: tableHeader1b,
            tableData1: [{ ...t11, ...t12, ...t13 }],
            tableData2: [{ ...t21, ...t23, ...t15 }],
          };
        case "1":
          return {
            tableHeader1: tableHeader2a,
            tableHeader2: tableHeader2b,
            tableData1: [{ ...t11, ...t12, ...t13 }],
            tableData2: [{ ...t22, ...t23, ...t15 }],
          };
        case "2":
          return {
            tableHeader1: tableHeader3a,
            tableHeader2: tableHeader3b,
            tableData1: [{ ...t11, ...t13 }],
            tableData2: [{ ...t21, ...t23, ...t15 }],
          };
        case "3":
          return {
            tableHeader1: tableHeader4a,
            tableHeader2: tableHeader4b,
            tableData1: [{ ...t11, ...t13 }],
            tableData2: [{ ...t22, ...t23, ...t15 }],
          };
        case "9":
          return {
            tableHeader1: tableHeader1a,
            tableHeader2: tableHeader1b,
            tableData1: [{ ...t11, ...t12, ...t13 }],
            tableData2: [{ ...t21, ...t23, ...t15 }],
          };
        default:
          return {
            tableHeader1: tableHeader5,
            tableHeader2: null,
            tableData1: [{ ...t11, ...t15 }],
            tableData2: [],
          };
      }
    };

    return (
      <>
        {showCM1106Modal()}

        <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div>
              <Table
                className="no-space"
                tableHeader={getTableInfo().tableHeader1}
                tableData={getTableInfo().tableData1}
                style={{ marginBottom: "2px" }}
              />
              {(Number(gubun) < 4 || Number(gubun) === 9) && (
                <Table
                  className="no-space"
                  tableHeader={getTableInfo().tableHeader2}
                  tableData={getTableInfo().tableData2}
                />
              )}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
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

export default Tab3;
