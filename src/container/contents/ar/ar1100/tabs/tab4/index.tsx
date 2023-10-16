import React, {
  useEffect,
  useImperativeHandle,
  BaseSyntheticEvent,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100INSERT, AR1100UPDATE } from "app/path";
import { useDispatch, useSelector } from "app/store";
import { apiPost } from "app/axios";
import useModal from "app/hook/useModal";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import EditableSelect from "components/editableSelect";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { currencyMask, removeCommas } from "helpers/currency";
import { IAR110065DETAIL } from "./model";
import { tableHeader1, tableHeader2 } from "./tableHeader";
import { addCM1106Second } from "app/state/modal/modalSlice";
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
      jpKind,
      setJpKind,
      junJaego,
      setJunJaego,
      qty,
      setQty,
      reqty,
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
      jpKind: any;
      setJpKind: Function;
      junJaego: number;
      setJunJaego: Function;
      qty: number;
      setQty: Function;
      reqty: number;
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

    const { showCM1106Modal, openModal } = useModal();

    useEffect(() => {
      if (cm1106.source === "AR11000") {
        setJpKind(cm1106.jpKind);
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    useEffect(() => {
      if (watch("bgInkumtype") !== undefined) {
        if (watch("bgInkumtype") === "A") {
          setInkum(0);
          setDc(0);
        } else {
          setInkum(data65?.pjInkum);
          setDc(data65?.pjDc);
        }
        if (watch("bgInkumtype") !== "2") {
          reset((formValues) => ({
            ...formValues,
            pacbCode: "",
          }));
        }
      }
    }, [watch("bgInkumtype")]);

    const calculationOfVat = (price: number, vatDivVal: string) => {
      let tempKumSup: number = 0;
      let tempKumVat: number = 0;
      let tempKumack: number = 0;

      if (vatDivVal === "0") {
        tempKumSup = Math.round(price / 1.1);
        tempKumVat = price - tempKumSup;
        tempKumack = price;
      } else if (vatDivVal === "1") {
        tempKumSup = price;
        tempKumVat = Math.round(price * 0.1);
        tempKumack = tempKumSup + tempKumVat;
      } else if (vatDivVal === "2") {
        tempKumSup = price;
        tempKumVat = 0;
        tempKumack = price;
      }
      return {
        tempKumSup,
        tempKumVat,
        tempKumack,
      };
    };

    const calculationOfMisukum = (tempKumack: number) => {
      let tempMisukum: number = 0;
      let tempInkum: number = inkum ? +removeCommas(inkum, "number") : 0;
      tempInkum = isNaN(tempInkum) ? 0 : tempInkum;
      let tempDc: number = dc ? +removeCommas(dc, "number") : 0;
      tempDc = isNaN(tempDc) ? 0 : tempDc;

      tempMisukum = tempKumack - tempInkum - tempDc;
      return tempMisukum;
    };

    const handleQtyChange = (val: number) => {
      setQty(val);
      setReqty(val);
      let tempDanga = danga ? +removeCommas(danga, "number") : 0;
      tempDanga = isNaN(tempDanga) ? 0 : tempDanga;
      const price = tempDanga * +val;
      let { tempKumSup, tempKumVat, tempKumack } = calculationOfVat(
        price,
        vatDiv
      );
      const tempMisukum = calculationOfMisukum(tempKumack);
      reset((formValues) => ({
        ...formValues,
        pjJago: junJaego,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        bgTotal: tempKumack,
        pjMisukum: tempMisukum,
      }));
    };

    const handleReqtyChange = (val: number) => {
      setReqty(val);
      let tempPcJaego = +junJaego + +qty - +val;
      reset((formValues) => ({
        ...formValues,
        pjJago: tempPcJaego,
      }));
    };

    const handleDangaChange = (val: any) => {
      setDanga(val);
      const tempVal = val ? +removeCommas(val, "number") : 0;
      const price = (isNaN(tempVal) ? 0 : tempVal) * qty;
      let { tempKumSup, tempKumVat, tempKumack } = calculationOfVat(
        price,
        vatDiv
      );
      const tempMisukum = calculationOfMisukum(tempKumack);
      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        bgTotal: tempKumack,
        pjMisukum: tempMisukum,
      }));
    };

    const handleChangeVatDiv = (val: string) => {
      setVatDiv(val);
      let tempDanga = danga ? +removeCommas(danga, "number") : 0;
      const price = (isNaN(tempDanga) ? 0 : tempDanga) * qty;
      let { tempKumSup, tempKumVat, tempKumack } = calculationOfVat(price, val);
      const tempMisukum = calculationOfMisukum(tempKumack);

      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        bgTotal: tempKumack,
        pjMisukum: tempMisukum,
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
      let pjMisukum: number = 0;
      pjMisukum = bgTotal - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        pjMisukum: pjMisukum,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        setJunJaego(data65?.junJaego);
        setQty(data65?.bgQty);
        setReqty(data65?.pjReqty);
        setDanga(data65?.pjDanga);
        reset({
          ...data65,
          pjJpCode: data65?.pjJpCode ? data65?.pjJpCode : "",
          pjJpName: data65?.pjJpName ? data65?.pjJpName : "",
        });
      } else if (type === "jpName") {
        const tempJunJaego =
          (cm1106?.jcBasicJaego ? +cm1106?.jcBasicJaego : 0) +
          (cm1106?.custOut ? +cm1106?.custOut : 0) -
          (cm1106?.custIn ? +cm1106?.custIn : 0);

        const pjKumSup =
          (cm1106?.jcJpDanga ? +removeCommas(cm1106.jcJpDanga, "number") : 0) *
          (getValues("bgQty") ? +getValues("bgQty") : 0);

        setJunJaego(tempJunJaego);

        reset((formValues) => ({
          ...formValues,
          pjJpName: cm1106.jpName,
          pjJpCode: cm1106.jpCode,
          pjJpSpec: cm1106?.jpSpec,
          //pjJago: pjJago,
          pjDanga: cm1106.jcJpDanga,
          pjKumSup: pjKumSup,
        }));
      }
    };

    const openPopupCM1106 = async () => {
      dispatch(addCM1106Second({ source: "AR11000" }));
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
      const path = isAddBtnClicked ? AR1100INSERT : AR1100UPDATE;
      params.insertType = "0";

      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.pjCuCode = info?.cuCode;
        params.pjCuName = info?.cuName;
        params.pjSno = "";
        // }
      }

      params.pjDate = DateWithoutDash(params.pjDate);
      params.pjKumSup = removeCommas(params.pjKumSup, "number");
      params.pjKumVat = removeCommas(params.pjKumVat, "number");
      params.bgTotal = removeCommas(params.bgTotal, "number");
      params.pjMisukum = removeCommas(params.pjMisukum, "number");
      params.bgQty = qty;
      params.pjReqty = reqty;
      params.pjVatDiv = vatDiv;
      params.pjDanga = +removeCommas(danga, "number");
      params.pjInkum = +removeCommas(inkum, "number");
      params.pjDc = +removeCommas(dc, "number");
      params.pjJago = +removeCommas(params.pjJago, "number");

      if (params.pjSwCode) {
        const pjSwName = dictionary?.pjSwCode?.find(
          (item: any) => item.code === params.pjSwCode
        )?.codeName;
        params.pjSwName = pjSwName;
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

    const tableData1 = [
      {
        0: (
          <FormGroup>
            <Select register={register("bgSaleState")} width={InputSize.i100}>
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
              register={register("bgCuCode")}
              inputSize={InputSize.i70}
              readOnly={!isAddBtnClicked}
            />
            <Controller
              control={control}
              name="bgCuName"
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
              onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
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
              handleQtyChange(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
          />
        ),
        4: (
          <Controller
            control={control}
            name="bgDanga"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
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
            name="bgSum"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
              />
            )}
          />
        ),
        7: (
          <Controller
            control={control}
            name="bgVat"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
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
            <Select register={register("bgInkumtype")} width={InputSize.i100}>
              {dictionary?.bgInkumtype?.map((obj: any, idx: number) => (
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
              register={register("bgAcbCode")}
              width={InputSize.i150}
              disabled={watch("bgInkumtype") !== "2"}
            >
              {dictionary?.pacbCode?.map((obj: any, idx: number) => (
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
            <Select register={register("bgSwName")} width={InputSize.i100}>
              {dictionary?.pjSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        6: (
          <EditableSelect
            list={dictionary?.pjBigo}
            reset={reset}
            register={register("bgBigo")}
            watch={watch("bgBigo")}
            textAlign={"left"}
            style={{ width: "200px" }}
          />
        ),
        7: (
          <FormGroup>
            <Input
              register={register("bgSignuser")}
              inputSize={InputSize.i100}
            />
          </FormGroup>
        ),
      },
    ];

    return (
      <>
        {showCM1106Modal()}
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
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

export default Tab4;
