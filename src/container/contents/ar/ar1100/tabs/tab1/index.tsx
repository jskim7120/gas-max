import React, { useEffect, useImperativeHandle, useState } from "react";
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
      reqty,
      setReqty,
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
      reqty: number;
      setReqty: Function;
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
      if (watch("pjQty") !== undefined) {
        console.log("A duudagdav::", watch("pjQty"), typeof watch("pjQty"));
        handleChangeQty(watch("pjQty"));
      }
    }, [watch("pjQty")]);

    // useEffect(() => {
    //   if (watch("pjReqty") !== undefined) {
    //     console.log("B duudagdav::", watch("pjQty"), typeof watch("pjQty"));
    //     handleChangeReqty(watch("pjReqty"));
    //   }
    // }, [watch("pjReqty")]);

    useEffect(() => {
      if (watch("pjDanga") !== undefined) {
        handleChangeDanga(watch("pjDanga"));
      }
    }, [watch("pjDanga")]);

    useEffect(() => {
      if (watch("pjVatDiv") !== undefined && watch("pjVatDiv") !== "") {
        handleChangeVatDiv(watch("pjVatDiv"));
      }
    }, [watch("pjVatDiv")]);

    useEffect(() => {
      if (watch("pjInkum") !== undefined) {
        handleChangefields(watch("pjInkum"), "inkum");
      }
    }, [watch("pjInkum")]);

    useEffect(() => {
      if (watch("pjDc") !== undefined) {
        handleChangefields(watch("pjDc"), "dc");
      }
    }, [watch("pjDc")]);

    useEffect(() => {
      if (watch("pjInkumtype") !== undefined) {
        handleChangeInkumType(watch("pjInkumtype"));
      }
    }, [watch("pjInkumtype")]);

    const calculationOfMisu = (tempTotal: number) => {
      let tempInkum = prepVal(getValues("pjInkum"));
      let tempDc = prepVal(getValues("pjDc"));

      const tempMisu = tempTotal - tempInkum - tempDc;
      return tempMisu;
    };

    const handleChangeQty = (val: number) => {
      let tempReqty: number;
      if (getValues("jpKind") === "0") {
        tempReqty = val;
      } else {
        tempReqty = (isNaN(val) ? 0 : val) * +getValues("jpSpecific");
      }
      let tempQty = isNaN(val) ? 0 : +val;
      const tempVatDiv = getValues("pjVatDiv") ? getValues("pjVatDiv") : "0";
      let tempDanga = prepVal(getValues("pjDanga"));

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
      );
      const tempMisu = calculationOfMisu(tempTotal);
      setReqty(tempReqty);
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
        const tempJago = +junJaego + prepVal(getValues("pjQty")) - +val;

        reset((formValues) => ({
          ...formValues,
          pjJago: +tempJago,
        }));
      } else {
        const temp = (isNaN(val) ? 0 : +val) / +getValues("jpSpecific");
        reset((formValues) => ({
          ...formValues,
          pjQty: temp,
        }));
      }
    };

    const handleChangeDanga = (val: any) => {
      const tempDanga = prepVal(val);
      const tempQty = isNaN(getValues("pjQty")) ? 0 : getValues("pjQty");
      const tempVatDiv = getValues("pjVatDiv") ? getValues("pjVatDiv") : "0";

      const price = tempDanga * tempQty;
      let { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        price,
        tempVatDiv
      );
      const tempMisukum = calculationOfMisu(tempTotal);
      reset((formValues) => ({
        ...formValues,
        pjKumSup: tempKumSup,
        pjKumVat: tempKumVat,
        pjKumack: tempTotal,
        pjMisukum: tempMisukum,
      }));
    };

    const handleChangeVatDiv = (val: string) => {
      const tempDanga = prepVal(getValues("pjDanga"));
      const tempQty = isNaN(getValues("pjQty")) ? 0 : getValues("pjQty");

      const price = tempDanga * tempQty;
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

    const handleChangefields = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;

      if (type === "inkum") {
        tempDc = prepVal(getValues("pjDc"));
        tempInkum = prepVal(val);
      } else if (type === "dc") {
        tempInkum = prepVal(getValues("pjInkum"));
        tempDc = prepVal(val);
      }

      let total: number = prepVal(getValues("pjKumack"));
      const tempMisu: number = total - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        pjMisukum: tempMisu,
      }));
    };

    const handleChangeInkumType = (val: string) => {
      if (val === "A" || val === "4") {
        reset((formValues) => ({
          ...formValues,
          pjInkum: 0,
          pjDc: 0,
          pjMisukum: prepVal(getValues("pjKumack")),
        }));
      } else {
        reset((formValues) => ({
          ...formValues,
          pjInkum: prepVal(getValues("pjKumack")) - prepVal(getValues("pjDc")),
        }));
      }
      if (val !== "2") {
        reset((formValues) => ({
          ...formValues,
          pacbCode: "",
        }));
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
          //setSpecific(res[0]?.jpSpecific);
          //setJpKind(res[0]?.jpKind);
          handleChangeDanga(res[0]?.jcJpDanga);
          setReqty(0);
          reset((formValues) => ({
            ...formValues,
            pjJpName: res[0]?.jcJpName ? res[0]?.jcJpName : "",
            pjDanga: res[0]?.jcJpDanga ? res[0]?.jcJpDanga : 0,
            jpKind: res[0]?.jpKind,
            jpSpecific: res[0]?.jpSpecific,
            pjQty: 0,
            pjJago: res[0]?.jpKind === "1" ? res[0]?.jpSpecific : 0,
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
        setJunJaego(data65?.junJaego);

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

        setJunJaego(tempJunJaego);

        reset((formValues) => ({
          ...formValues,
          pjJpName: cm1106.jpName ? cm1106.jpName : "",
          pjJpCode: cm1106.jpCode ? cm1106.jpCode : "",
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

      if (isAddBtnClicked) {
        params.areaCode = info?.areaCode;
        params.pjCuCode = info?.cuCode;
        params.pjCuName = info?.cuName;
        params.pjSno = "";
        params.pjDateB = DateWithoutDash(params.pjDate);        
      } else {
        params.pjDateB = DateWithoutDash(data65?.pjDateB);
      }

      params.insertType = "0";
      params.pjDate = DateWithoutDash(params.pjDate);
      params.pjKumSup = +removeCommas(params.pjKumSup, "number");
      params.pjKumVat = +removeCommas(params.pjKumVat, "number");
      params.pjKumack = +removeCommas(params.pjKumack, "number");
      params.pjMisukum = +removeCommas(params.pjMisukum, "number");
      params.pjDanga = +removeCommas(params.pjDanga, "number");
      params.pjInkum = +removeCommas(params.pjInkum, "number");
      params.pjDc = +removeCommas(params.pjDc, "number");
      params.pjJago = +removeCommas(params.pjJago, "number");

      if (params.jpKind === "1") {
        params.qtyKg = params.pjQty;
        params.qtyL = reqty;
        delete params.pjQty;
        delete params.pjJago;
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
        <Controller
          control={control}
          name="pjQty"
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              inputSize={InputSize.i100}
              textAlign="right"
            />
          )}
        />
      ),

      4: (
        // <Controller
        //   control={control}
        //   name="pjReqty"
        //   render={({ field }) => (
        //     <Input
        //       {...field}
        //       type="number"
        //       inputSize={InputSize.i100}
        //       textAlign="right"
        //     />
        //   )}
        // />
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
              readOnly
              textAlign="right"
            />
          )}
        />
      ),
    };

    const td22 = {
      3: (
        <Controller
          control={control}
          name="qtyKg"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} textAlign="right" />
          )}
        />
      ),
      4: (
        <Controller
          control={control}
          name="qtyL"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} textAlign="right" />
          )}
        />
      ),
      5: (
        <Input
          register={register("jpSpecific")}
          inputSize={InputSize.i100}
          textAlign="right"
        />
      ),
    };

    const td3 = {
      6: (
        <Controller
          control={control}
          name="pjDanga"
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
      7: (
        <FormGroup>
          <Select register={register("pjVatDiv")} width={InputSize.i100}>
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
          <Controller
            control={control}
            name="pjInkum"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
                //readOnly={watch("pjInkumtype") === "A"}
                className="blue"
              />
            )}
          />
        ),
        7: (
          <Controller
            control={control}
            name="pjDc"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
                //readOnly={watch("pjInkumtype") === "A"}
              />
            )}
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
