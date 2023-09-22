import React, {
  BaseSyntheticEvent,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { AR1100TONGSALEINSERT, AR1100TONGSALEUPDATE } from "app/path";
import { useSelector, useDispatch } from "app/store";
import useModal from "app/hook/useModal";
import { addCM1106Second } from "app/state/modal/modalSlice";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Reset, Update } from "components/allSvgIcon";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
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
import { apiPost } from "app/axios";

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
    }: {
      tabId: number;
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      addBtnUnClick: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { info, source } = useSelector((state: any) => state.footer);
    const cm1106 = useSelector((state: any) => state.modal.cm1106);

    const [qty, setQty] = useState<number>(0);
    const [danga, setDanga] = useState<number>(0);
    const [vatDiv, setVatDiv] = useState<string>("0");
    const [kumSup, setKumSup] = useState<number>(0);
    const [kumVat, setKumVat] = useState<number>(0);
    const [kumack, setKumack] = useState<number>(0);
    const [inkum, setInkum] = useState<number>(0);
    const [dc, setDc] = useState<number>(0);
    const [misu, setMisu] = useState<number>(0);
    const [payAmt, setPayAmt] = useState<number>(0);
    const [payDc, setPayDc] = useState<number>(0);
    const [payMisu, setPayMisu] = useState<number>(0);
    const [bkum, setBkum] = useState<number>(0);
    const [boutKum, setBoutKum] = useState<number>(0);

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

    const handleQtyChange = (val: string) => {
      setQty(+val);

      let tempKumSup = +val * +removeCommas(danga, "number");
      let tempKumVat = 0;
      let tempKumack = tempKumSup;
      let tempMisu = 0;

      if (vatDiv !== "0") {
        tempKumVat = Math.round(tempKumSup * 0.1);
        tempKumack = tempKumSup + tempKumVat;
      }

      tempMisu = tempKumack - dc - inkum;

      setKumSup(tempKumSup);
      setKumVat(tempKumVat);
      setKumack(tempKumack);
      setMisu(tempMisu);
    };

    const handleDangaChange = (val: string) => {
      setDanga(+removeCommas(val, "number"));
      let tempKumSup = +qty * +removeCommas(val, "number");
      let tempKumVat = 0;
      let tempKumack = tempKumSup;
      let tempMisu = 0;

      if (vatDiv !== "0") {
        tempKumVat = Math.round(tempKumSup * 0.1);
        tempKumack = tempKumSup + tempKumVat;
      }

      tempMisu = tempKumack - dc - inkum;

      setKumSup(tempKumSup);
      setKumVat(tempKumVat);
      setKumack(tempKumack);
      setMisu(tempMisu);
    };

    const handleVatDivChange = (val: string) => {
      setVatDiv(val);
      let tempKumVat = 0;
      let tempKumack = kumSup;
      let tempMisu = 0;
      if (val !== "0") {
        tempKumVat = Math.round(kumSup * 0.1);
        tempKumack = tempKumVat + kumSup;
      }
      tempMisu = tempKumack - dc - inkum;

      setKumVat(tempKumVat);
      setKumack(tempKumack);
      setMisu(tempMisu);
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
      } else if (type === "payAmt") {
        setPayAmt(+removeCommas(val, "number"));
        tempMisu = kumack - payDc - +removeCommas(val, "number");
        setPayMisu(tempMisu);
      } else if (type === "payDc") {
        setPayDc(+removeCommas(val, "number"));
        tempMisu = kumack - payAmt - +removeCommas(val, "number");
        setPayMisu(tempMisu);
      }
    };

    const handleBkumOrBoutKumChange = (val: string, type: string) => {
      if (type === "bkum") {
        setBkum(+removeCommas(val, "number"));
        let tempMisu = +removeCommas(val, "number") - inkum - dc;
        setMisu(tempMisu);
      } else if (type === "boutKum") {
        setBoutKum(+removeCommas(val, "number"));
        let tempPayMisu = +removeCommas(val, "number") - payAmt - payDc;
        setPayMisu(tempPayMisu);
      }
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

    const submit = async (params: any) => {
      const path = isAddBtnClicked
        ? AR1100TONGSALEINSERT
        : AR1100TONGSALEUPDATE;

      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.tsCuCode = info?.cuCode;
        params.tsCuName = info?.cuName;
        params.tsSno = "";
        // }
      }

      params.tsDate = DateWithoutDash(params.tsDate);
      params.tsDanga = removeCommas(params.tsDanga, "number");
      params.tsKumack = removeCommas(params.tsKumack, "number");
      params.tsKumVat = removeCommas(params.tsKumVat, "number");
      params.tsKumSup = removeCommas(params.tsKumSup, "number");
      params.tsInkum = removeCommas(params.tsInkum, "number");
      params.tsDc = removeCommas(params.tsDc, "number");
      params.tsMisu = removeCommas(params.tsMisu, "number");

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
            <CustomDatePicker
              {...field}
              readOnly={!isAddBtnClicked}
              style={{ margin: "1px 0 0 0" }}
            />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("tsGubun")} width={InputSize.i100}>
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
            readOnly={!isAddBtnClicked}
          />
          <Controller
            control={control}
            name="tsJpName"
            render={({ field }) => (
              <Input {...field} readOnly={!isAddBtnClicked} />
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
          <Select register={register("tsTongGubun")} width={InputSize.i100}>
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
        <Select
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
      10: (
        <Input
          name="tsKumack"
          value={kumack}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t15 = {
      11: (
        <Input
          name="tsBkum"
          value={bkum}
          onChange={(e: BaseSyntheticEvent) =>
            handleBkumOrBoutKumChange(e.target.value, "bkum")
          }
          inputSize={InputSize.i150}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };
    const t16 = {
      12: (
        <Input
          name="tsBoutkum"
          value={boutKum}
          onChange={(e: BaseSyntheticEvent) =>
            handleBkumOrBoutKumChange(e.target.value, "boutKum")
          }
          inputSize={InputSize.i150}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t17 = {
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
          name="signUser"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} />
          )}
        />
      ),
    };

    const t21 = {
      16: (
        <FormGroup>
          <Select register={register("tsInkumType")} width={InputSize.i100}>
            {dictionary?.tsInkumType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      17: (
        <FormGroup>
          <Select register={register("acbCode")} width={InputSize.i150}>
            {dictionary?.acbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      18: (
        <Input
          name="tsInkum"
          value={inkum}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "inkum")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      19: (
        <Input
          name="tsDc"
          value={dc}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "dc")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      20: (
        <Input
          name="tsMisu"
          value={misu}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const t22 = {
      21: (
        <FormGroup>
          <Select register={register("tsPayType")} width={InputSize.i100}>
            {dictionary?.tsPayType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      22: (
        <FormGroup>
          <Select register={register("acbCode")} width={InputSize.i150}>
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
          name="tsPayAmt"
          value={payAmt}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "payAmt")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      24: (
        <Input
          name="tsPayDc"
          value={payDc}
          onChange={(e: BaseSyntheticEvent) =>
            handleInkumOrDcChange(e.target.value, "payDc")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      25: (
        <Input
          name="tsPayMisu"
          value={payMisu}
          readOnly
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
    };

    const getTableInfo = () => {
      switch (watch("tsGubun")) {
        case "0":
          return {
            tableHeader1: tableHeader1a,
            tableHeader2: tableHeader1b,
            tableData1: [{ ...t11, ...t12 }],
            tableData2: [{ ...t21, ...t17 }],
          };
        case "1":
          return {
            tableHeader1: tableHeader2a,
            tableHeader2: tableHeader2b,
            tableData1: [{ ...t11, ...t12 }],
            tableData2: [{ ...t22, ...t17 }],
          };
        case "2":
          return {
            tableHeader1: tableHeader3a,
            tableHeader2: tableHeader3b,
            tableData1: [{ ...t11, ...t15 }],
            tableData2: [{ ...t21, ...t17 }],
          };
        case "3":
          return {
            tableHeader1: tableHeader4a,
            tableHeader2: tableHeader4b,
            tableData1: [{ ...t11, ...t16 }],
            tableData2: [{ ...t22, ...t17 }],
          };
        case "9":
          return {
            tableHeader1: tableHeader1a,
            tableHeader2: tableHeader1b,
            tableData1: [{ ...t11, ...t12 }],
            tableData2: [{ ...t21, ...t17 }],
          };
        default:
          return {
            tableHeader1: tableHeader5,
            tableHeader2: null,
            tableData1: [{ ...t11, ...t17 }],
            tableData2: [{ ...t21, ...t17 }],
          };
      }
    };

    return (
      <>
        {showCM1106Modal()}

        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div>
              <Table
                className="no-space"
                tableHeader={getTableInfo().tableHeader1}
                tableData={getTableInfo().tableData1}
                style={{ marginBottom: "2px" }}
              />
              {(Number(watch("tsGubun")) < 4 ||
                Number(watch("tsGubun")) === 9) && (
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
        </form>
      </>
    );
  }
);

export default Tab3;
