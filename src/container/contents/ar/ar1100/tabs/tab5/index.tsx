import React, {
  useEffect,
  useImperativeHandle,
  BaseSyntheticEvent,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100INSERT, AR1100UPDATE, AR1100SANGPUM } from "app/path";
import { useDispatch, useSelector } from "app/store";
import { apiGet, apiPost } from "app/axios";
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
import { AR1100MODELDETAIL } from "./model";
import { tableHeader1, tableHeader2 } from "./tableHeader";
import { addCM1106Second } from "app/state/modal/modalSlice";
const Tab5 = React.forwardRef(
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
      useForm<AR1100MODELDETAIL>({
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
        asSumkum: tempKumack,
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
        asSumkum: tempKumack,
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
        asSumkum: tempKumack,
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

      let asSumkum: number = getValues("asSumkum")
        ? +removeCommas(getValues("asSumkum"), "number")
        : 0;
      let pjMisukum: number = 0;
      pjMisukum = asSumkum - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        pjMisukum: pjMisukum,
      }));
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
          handleDangaChange(res[0]?.jcJpDanga);
          reset((formValues) => ({
            ...formValues,
            pjJpName: res[0]?.jcJpName,
          }));

          document.getElementById("pjQty")?.focus();
        } else {
          openPopupCM1106();
        }
      }
    }

    const fetchDataSangpum = async (params: any) => {
      const res = await apiGet(AR1100SANGPUM, params);
      return res;
    };

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
      params.asSumkum = removeCommas(params.asSumkum, "number");
      params.pjMisukum = removeCommas(params.pjMisukum, "number");
      params.pjQty = qty;
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

    const tableData1 = {
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
          name="asDate"
          render={({ field }) => (
            <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("asInSwCode")} width={InputSize.i100}>
            {dictionary?.asInSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      3: (
        <FormGroup>
          <Select register={register("asInTel")} width={InputSize.i100}>
            {dictionary?.asInTel?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      4: (
        <FormGroup>
          <Select register={register("asTagName")} width={InputSize.i100}>
            {dictionary?.asInTel?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      5: (
        <EditableSelect
          list={dictionary?.asIn}
          reset={reset}
          register={register("asIn")}
          watch={watch("asIn")}
          textAlign={"left"}
          style={{ width: "200px" }}
        />
      ),
    };

    const tableData2 = {
      6: (
        <Controller
          control={control}
          name="asPdate"
          render={({ field }) => (
            <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
          )}
        />
      ),
      7: (
        <Input
          register={register("asPtime")}
          inputSize={InputSize.i100}
          textAlign="right"
        />
      ),
      8: (
        <Controller
          control={control}
          name="asYdate"
          render={({ field }) => (
            <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
          )}
        />
      ),
      9: (
        <FormGroup>
          <Select register={register("asSwCode")} width={InputSize.i100}>
            {dictionary?.asSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      10: (
        <FormGroup>
          <Select
            name="asVatDiv"
            value={vatDiv}
            width={InputSize.i100}
            onChange={(e) => handleChangeVatDiv(e.target.value)}
          >
            {dictionary?.asVatDiv?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      11: (
        <Controller
          control={control}
          name="asSumkum"
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
      12: (
        <FormGroup>
          <Select register={register("asInkumtype")} width={InputSize.i100}>
            {dictionary?.asInkumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      13: (
        <FormGroup>
          <Select
            register={register("acbCode")}
            width={InputSize.i150}
            disabled={watch("asInkumtype") !== "2"}
          >
            {dictionary?.acbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      14: (
        <Input
          name="asInkum"
          value={inkum}
          onChange={(e: BaseSyntheticEvent) =>
            handleChangeInkumOrDc(e.target.value, "inkum")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      15: (
        <Input
          name="asDc"
          value={dc}
          onChange={(e: BaseSyntheticEvent) =>
            handleChangeInkumOrDc(e.target.value, "dc")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      16: (
        <Controller
          control={control}
          name="asMisukum"
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
      17: (
        <FormGroup>
          <Input register={register("signuser")} inputSize={InputSize.i100} />
        </FormGroup>
      ),
    };

    return (
      <>
        {showCM1106Modal()}
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

export default Tab5;
