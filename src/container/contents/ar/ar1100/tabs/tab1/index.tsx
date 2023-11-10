import React, {
  BaseSyntheticEvent,
  useEffect,
  useImperativeHandle,
  useState,
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
import { IAR110065DETAIL } from "./model";
import { tableHeader11, tableHeader12, tableHeader2 } from "./tableHeader";
import { addCM1106Second } from "app/state/modal/modalSlice";
import { calculationOfVat, prepVal } from "../../helper";
const Tab1 = React.forwardRef(
  (
    {
      data,
      data65,
      dictionary,
      isAddBtnClicked,
      handleSubmitParent,
      submitParent,
      addBtnUnClick,
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
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      addBtnUnClick: Function;
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
    const { showCM1106Modal, openModal } = useModal();

    useEffect(() => {
      if (cm1106.source === "AR11000") {
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    // useEffect(() => {
    //   if (watch("pjInkumtype") !== undefined) {
    //     handleChangeInkumType(watch("pjInkumtype"));
    //   }
    // }, [watch("pjInkumtype")]);

    const calculationOfMisu = (tempTotal: number) => {
      const tempMisu = tempTotal - prepVal(inkum) - prepVal(dc);
      return tempMisu;
    };

    const handleChangeQty = (val: number) => {
      if (getValues("jpKind") === "0") {
        setQty(val);
        setReqty(val);
      } else if (getValues("jpKind") === "1") {
        setQty(val);
        const tempQtyL = (isNaN(val) ? 0 : val) * +getValues("pjJago");
        setReqty(tempQtyL);
      } else {
        alert("wrong jpKind >>> from tab1 qty change ");
      }

      let tempQty = isNaN(val) ? 0 : val;

      const price = danga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        vatDiv
      );
      const tempMisu = calculationOfMisu(tempTotal);
      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        pjKumack: tempTotal,
        pjMisukum: tempMisu,
      }));
    };

    const handleChangeReqty = (val: number) => {
      setReqty(val);

      if (getValues("jpKind") === "0") {
        const tempJago =
          (getValues("junJaego") ? +getValues("junJaego") : 0) +
          prepVal(qty) -
          (isNaN(val) ? 0 : +val);

        reset((formValues) => ({
          ...formValues,
          pjJago: tempJago,
        }));

        // const price = danga * prepVal(qty);
        // let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        //   price,
        //   vatDiv
        // );
        // const tempMisu = calculationOfMisu(tempTotal);

        // reset((formValues) => ({
        //   ...formValues,
        //   pjJago: tempJago,
        //   pjKumSup: tempKumSup,
        //   pjKumVat: tempKumVat,
        //   pjKumack: tempTotal,
        //   pjMisukum: tempMisu,
        // }));
      } else if (getValues("jpKind") === "1") {
        const tempQtyKg = (isNaN(val) ? 0 : +val) / +getValues("jpSpecific");
        setQty(tempQtyKg);

        const price = danga * tempQtyKg;
        let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
          price,
          vatDiv
        );
        const tempMisu = calculationOfMisu(tempTotal);
        reset((formValues) => ({
          ...formValues,
          pjKumSup: tempKumSup,
          pjKumVat: tempKumVat,
          pjKumack: tempTotal,
          pjMisukum: tempMisu,
        }));
      } else {
        alert("wrong jpKind >>> from tab1 qty change ");
      }
    };

    const handleChangeDanga = (val: number) => {
      setDanga(val);
      const price = prepVal(val) * (isNaN(qty) ? 0 : +qty);

      console.log("price >>>>>>>>>>>>", price);

      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        vatDiv
      );
      const tempMisukum = calculationOfMisu(tempTotal);

      console.log("tempKumSup ?????", tempKumSup);
      console.log("tempKumVat ???", tempKumVat);
      console.log("tempTotal ????", tempTotal);
      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        pjKumack: tempTotal,
        pjMisukum: tempMisukum,
      }));
    };

    const handleChangeVatDiv = (val: string) => {
      setVatDiv(val);
      const price = prepVal(danga) * (isNaN(qty) ? 0 : +qty);
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(price, val);
      const tempMisukum = calculationOfMisu(tempTotal);

      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        pjKumack: tempTotal,
        pjMisukum: tempMisukum,
      }));
    };

    const handleChangeFields = (val: number, type: string) => {
      let total: number = prepVal(getValues("pjKumack"));

      if (type === "inkum") {
        if (prepVal(val) > total) {
          setInkum(total);
          setDc(0);
          reset((formValues) => ({
            ...formValues,
            pjMisukum: 0,
          }));
        } else {
          setInkum(val);
          if (total - prepVal(val) < prepVal(dc)) {
            const tempDc = total - prepVal(val);
            setDc(tempDc);
            reset((formValues) => ({
              ...formValues,
              pjMisukum: 0,
            }));
          } else {
            const tempMisu = total - prepVal(val) - prepVal(dc);
            reset((formValues) => ({
              ...formValues,
              pjMisukum: tempMisu,
            }));
          }
        }
      } else if (type === "dc") {
        if (prepVal(val) > total) {
          setDc(total);
          setInkum(0);
          reset((formValues) => ({
            ...formValues,
            pjMisukum: 0,
          }));
        } else {
          setDc(val);
          if (total - prepVal(val) < prepVal(inkum)) {
            const tempInkum = total - prepVal(val);
            setInkum(tempInkum);
            reset((formValues) => ({
              ...formValues,
              pjMisukum: 0,
            }));
          } else {
            const tempMisu = total - prepVal(val) - prepVal(inkum);
            reset((formValues) => ({
              ...formValues,
              pjMisukum: tempMisu,
            }));
          }
        }
      }
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
          setQty(0);
          setReqty(0);
          setDanga(res[0]?.jcJpDanga ? res[0]?.jcJpDanga : 0);

          if (res[0]?.jpKind === "0") {
            reset((formValues) => ({
              ...formValues,
              pjJpName: res[0]?.jcJpName ? res[0]?.jcJpName : "",
              jpKind: res[0]?.jpKind,
              pjJago: getValues("junJaego") ? getValues("junJaego") : 0,
            }));
          } else {
            reset((formValues) => ({
              ...formValues,
              pjJpName: res[0]?.jcJpName ? res[0]?.jcJpName : "",
              jpKind: res[0]?.jpKind,
              jpSpecific: res[0]?.jpSpecific,
              pjJago: res[0]?.jpSpecific,
            }));
          }

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
        // setJunJaego(data65?.junJaego);
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
          (getValues("pjQty") ? +getValues("pjQty") : 0);

        // setJunJaego(tempJunJaego);
        // setSpecific(cm1106?.jpSpecific);

        reset((formValues) => ({
          ...formValues,
          // jpSpecific:cm1106?.jpSpecific, -----------  eniig dahin harah
          pjJpName: cm1106.jpName ? cm1106.jpName : "",
          pjJpCode: cm1106.jpCode ? cm1106.jpCode : "",
          pjJpSpec: cm1106?.jpSpec,
          jpKind: cm1106?.jpKind,
          //pjJago: pjJago,
          pjDanga: cm1106.jcJpDanga,
          pjKumSup: pjKumSup,
        }));

        if (cm1106?.jpKind === "0") {
          document.getElementById("qtyKg")?.focus();
        } else {
          document.getElementById("pjQty")?.focus();
        }
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
      let path: string = "";

      if (isAddBtnClicked) {
        path = AR1100INSERT;
        params.pjSno = "";
        params.pjDateB = DateWithoutDash(params.pjDate);
      } else {
        path = AR1100UPDATE;
        params.pjDateB = DateWithoutDash(data65?.pjDateB);
      }

      params.insertType = "0";
      params.pjDate = DateWithoutDash(params.pjDate);
      params.pjKumSup = +removeCommas(params.pjKumSup, "number");
      params.pjKumVat = +removeCommas(params.pjKumVat, "number");
      params.pjKumack = +removeCommas(params.pjKumack, "number");
      params.pjMisukum = +removeCommas(params.pjMisukum, "number");
      params.pjDanga = +removeCommas(danga, "number");
      params.pjInkum = +removeCommas(inkum, "number");
      params.pjDc = +removeCommas(dc, "number");

      if (params.jpKind === "1") {
        params.qtyKg = qty;
        params.qtyL = reqty;
        params.jpSpecific = +removeCommas(params.pjJago, "number");
        delete params.pjQty;
        delete params.pjReqty;
        delete params.pjJago;
      } else if (params.jpKind === "0") {
        params.pjQty = qty;
        params.pjReqty = reqty;
        params.pjJago = +removeCommas(params.pjJago, "number");
        delete params.qtyKg;
        delete params.qtyL;
        delete params.jpSpecific;
      }

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

    const td1 = {
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
          name="pjDate"
          render={({ field }) => <CustomDatePicker {...field} />}
        />
      ),
      2: (
        <FormGroup style={{ position: "relative" }}>
          <Input
            register={register("pjJpCode")}
            inputSize={InputSize.i70}
            readOnly={!isAddBtnClicked}
            onKeyDown={handleKeyDown}
          />
          <Controller
            control={control}
            name="pjJpName"
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
    };

    const td21 = {
      3: (
        <Input
          name="pjQty"
          value={qty}
          onChange={(e: any) => handleChangeQty(e.target.value)}
          type="number"
          inputSize={InputSize.i100}
          textAlign="right"
        />
      ),

      4: (
        <Input
          name="pjReqty"
          value={reqty}
          onChange={(e: any) => handleChangeReqty(e.target.value)}
          type="number"
          inputSize={InputSize.i100}
          textAlign="right"
        />
      ),

      5: (
        <Controller
          control={control}
          name="pjJago"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              type="number"
              readOnly
              textAlign="right"
            />
          )}
        />
      ),
    };

    const td3 = {
      6: (
        <Input
          value={danga}
          onChange={(e: BaseSyntheticEvent) =>
            handleChangeDanga(e.target.value)
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      7: (
        <FormGroup>
          <Select
            value={vatDiv}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeVatDiv(e.target.value)
            }
            width={InputSize.i100}
          >
            {dictionary?.pjVatDiv?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      8: (
        <Controller
          control={control}
          name="pjKumSup"
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
          name="pjKumVat"
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
      10: (
        <Controller
          control={control}
          name="pjKumack"
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
    };

    const tableData2 = [
      {
        2: (
          <FormGroup>
            <Select register={register("proxyType")} width={InputSize.i100}>
              {dictionary?.proxyType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        3: <Input register={register("buName")} />,
        4: (
          <FormGroup>
            <Select register={register("pjInkumtype")} width={InputSize.i100}>
              {dictionary?.pjInkumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        5: (
          <FormGroup>
            <Select
              register={register("pacbCode")}
              width={InputSize.i200}
              disabled={watch("pjInkumtype") !== "2"}
            >
              {dictionary?.pacbCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        6: (
          <Input
            value={inkum}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeFields(e.target.value, "inkum")
            }
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
            className="blue"
          />
        ),
        7: (
          <Input
            value={dc}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeFields(e.target.value, "dc")
            }
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
          />
        ),
        8: (
          <Controller
            control={control}
            name="pjMisukum"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
                readOnly
                className="red"
              />
            )}
          />
        ),
        9: (
          <FormGroup>
            <Select register={register("pjSwCode")} width={InputSize.i100}>
              {dictionary?.pjSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        10: (
          <EditableSelect
            list={dictionary?.pjBigo}
            reset={reset}
            register={register("pjBigo")}
            watch={watch("pjBigo")}
            textAlign={"left"}
            style={{ width: "300px" }}
          />
        ),
        11: (
          <Controller
            control={control}
            name="signuser"
            render={({ field }) => (
              <div style={{ position: "relative" }}>
                <Input {...field} inputSize={InputSize.i110} />
                <span
                  style={{
                    background: "yellow",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    position: "absolute",
                    top: "7px",
                    right: "7px",
                  }}
                >
                  서명
                </span>
              </div>
            )}
          />
        ),
      },
    ];

    const getTableInfo = () => {
      switch (getValues("jpKind")) {
        case "0":
          return {
            tableHeader: tableHeader11,
            tableData: [{ ...td1, ...td21, ...td3 }],
          };
        case "1":
          return {
            tableHeader: tableHeader12,
            tableData: [{ ...td1, ...td21, ...td3 }],
          };
        default:
          return {
            tableHeader: tableHeader11,
            tableData: [{ ...td1, ...td21, ...td3 }],
          };
      }
    };

    return (
      <>
        {showCM1106Modal()}
        <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div className="tab1">
              <Table
                className="no-space"
                tableHeader={getTableInfo().tableHeader}
                tableData={getTableInfo().tableData}
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

export default Tab1;
