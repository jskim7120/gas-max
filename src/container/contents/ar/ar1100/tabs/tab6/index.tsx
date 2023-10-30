import React, { useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100SUKUMINSERT, AR1100SUKUMUPDATE } from "app/path";
import { useDispatch, useSelector } from "app/store";
import { apiPost } from "app/axios";
import useModal from "app/hook/useModal";
import Table from "components/table";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import EditableSelect from "components/editableSelect";
import { Reset, Update } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { currencyMask, removeCommas } from "helpers/currency";
import { AR1100MODELDETAIL } from "./model";
import { tableHeader1, tableHeader2 } from "./tableHeader";

const Tab5 = React.forwardRef(
  (
    {
      tabId,
      areaCode,
      data,
      data65,
      dictionary,
      isAddBtnClicked,
      handleSubmitParent,
      submitParent,
      addBtnUnClick,
    }: {
      tabId: number;
      areaCode: string;
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
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<AR1100MODELDETAIL>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));

    const dispatch = useDispatch();
    const { info, source } = useSelector((state: any) => state.footer);

    const { showAR1100Gubun01Modal, openModal: openAR1100Gubun01Modal } =
      useModal();
    const { showAR1100Gubun02Modal, openModal: openAR1100Gubun02Modal } =
      useModal();
    const openModalAR1100Gubun01 = () => {
      openAR1100Gubun01Modal();
    };
    const openModalAR1100Gubun02 = () => {
      openAR1100Gubun02Modal();
    };

    useEffect(() => {
      if (watch("gsJmisuAmt") !== undefined) {
        handleChangeMisu(watch("gsJmisuAmt"));
      }
    }, [watch("gsJmisuAmt")]);

    useEffect(() => {
      if (watch("gsInkum") !== undefined) {
        handleChangefields(watch("gsInkum"), "inkum");
      }
    }, [watch("gsInkum")]);

    useEffect(() => {
      if (watch("gsDc") !== undefined) {
        handleChangefields(watch("gsDc"), "dc");
      }
    }, [watch("gsDc")]);

    const prepVal = (val: number) => {
      let tempVal = val ? +removeCommas(val, "number") : 0;
      return isNaN(tempVal) ? 0 : tempVal;
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
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

    const handleClickReset = async () => {
      if (isAddBtnClicked) {
        await handleSubmitParent((dat: any) => submitParent(dat, "last"))();
        addBtnUnClick();
      } else {
        resetForm("reset");
      }
    };

    const handleChangeMisu = (val: number) => {
      let tempInkum = prepVal(getValues("gsInkum"));
      let tempDc = prepVal(getValues("gsDc"));

      const tempMisu = prepVal(val) - tempDc - tempInkum;
      reset((formValues) => ({
        ...formValues,
        misu: tempMisu,
      }));
    };

    const handleChangefields = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;

      if (type === "inkum") {
        tempDc = prepVal(getValues("gsDc"));
        tempInkum = prepVal(val);
      } else if (type === "dc") {
        tempInkum = prepVal(getValues("gsInkum"));
        tempDc = prepVal(val);
      }

      let asTotal: number = prepVal(getValues("gsJmisuAmt"));

      const tempMisu: number = asTotal - (tempDc + tempInkum);

      reset((formValues) => ({
        ...formValues,
        misu: tempMisu,
      }));
    };

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100SUKUMINSERT : AR1100SUKUMUPDATE;
      params.insertType = "0";

      if (isAddBtnClicked) {
        //params.asCuUserName = info?.cuUsername;
        params.msSno = "";
      } else {
        // params.asDateB = DateWithoutDash(params.asDate);
      }

      params.areaCode = areaCode;
      params.gsDateUse = DateWithoutDash(params.gsDateUse);

      params.gsInkum = +removeCommas(params.gsInkum, "number");
      params.gsDc = +removeCommas(params.gsDc, "number");
      params.misu = +removeCommas(params.misu, "number");
      params.cuCmisu = +removeCommas(params.cuCmisu, "number");
      params.cuJmisu = +removeCommas(params.cuJmisu, "number");

      if (params.suSwCode) {
        const suSwName = dictionary?.suSwCode?.find(
          (item: any) => item.code === params.suSwCode
        )?.codeName;
        params.suSwName = suSwName;
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
            <Select register={register("misuType")} width={InputSize.i80}>
              {dictionary?.misuType?.map((obj: any, idx: number) => (
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
            name="gsDate"
            render={({ field }) => (
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
            )}
          />
        ),
        2: (
          <Controller
            control={control}
            name="gsDateUse"
            render={({ field }) => (
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
            )}
          />
        ),
        3: (
          <Controller
            control={control}
            name="gsJmisuAmt"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i120}
                textAlign="right"
                mask={currencyMask}
                readOnly
              />
            )}
          />
        ),
        4: (
          <Controller
            control={control}
            name="gsInkum"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i120}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        5: (
          <Controller
            control={control}
            name="gsDc"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i90}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        6: (
          <Controller
            control={control}
            name="misu"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i120}
                textAlign="right"
                mask={currencyMask}
                readOnly
              />
            )}
          />
        ),
        7: (
          <FormGroup>
            <Select register={register("gsInkumtype")} width={InputSize.i100}>
              {dictionary?.gsInkumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        8: (
          <FormGroup>
            <Select
              register={register("acbCode")}
              width={InputSize.i150}
              disabled={watch("gsInkumtype") !== "2"}
            >
              {dictionary?.acbCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        9: (
          <FormGroup>
            <Select register={register("gsSwCode")} width={InputSize.i120}>
              {dictionary?.gsSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        10: (
          <EditableSelect
            list={dictionary?.asIn}
            reset={reset}
            register={register("gsBigo")}
            watch={watch("gsBigo")}
            textAlign={"left"}
            style={{ width: "200px" }}
          />
        ),
        11: (
          <Button
            text={watch("misuType") === "J" ? "중량" : "체적"}
            color={ButtonColor.LIGHT}
            type="button"
            onClick={() => {
              if (watch("misuType") === "J") {
                openModalAR1100Gubun01();
              } else {
                openModalAR1100Gubun02();
              }
            }}
            style={{ margin: "0 17px" }}
          />
        ),
      },
    ];

    const tableData2 = [
      {
        12: (
          <Controller
            control={control}
            name="msCdBank"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i120}
                textAlign="left"
                mask={currencyMask}
              />
            )}
          />
        ),
        13: (
          <Controller
            control={control}
            name="msCdDate"
            render={({ field }) => (
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
            )}
          />
        ),
        14: (
          <Controller
            control={control}
            name="msCdLastDate"
            render={({ field }) => (
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
            )}
          />
        ),
        15: (
          <Controller
            control={control}
            name="msCdNo"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i140}
                textAlign="center"
                mask={currencyMask}
              />
            )}
          />
        ),
        16: (
          <Controller
            control={control}
            name="msCdBigo"
            render={({ field }) => (
              <Input
                {...field}
                inputSize={InputSize.i150}
                textAlign="left"
                mask={currencyMask}
              />
            )}
          />
        ),
      },
    ];

    return (
      <>
        {showAR1100Gubun01Modal()}
        {showAR1100Gubun02Modal()}
        <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div
              className="tab1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Table
                className="no-space"
                tableHeader={tableHeader1}
                tableData={tableData1}
                style={{ marginBottom: "2px" }}
              />
              {watch("gsInkumtype") === "4" ? (
                <Table
                  className="no-space"
                  tableHeader={tableHeader2}
                  tableData={tableData2}
                  style={{ width: "auto" }}
                />
              ) : (
                ""
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

export default Tab5;
