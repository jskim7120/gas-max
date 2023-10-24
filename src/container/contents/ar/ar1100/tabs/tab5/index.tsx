import React, { useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AR1100ASCUSTINSERT,
  AR1100ASCUSTUPDATE,
  AR1100SANGPUM,
} from "app/path";
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
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<AR1100MODELDETAIL>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));

    const dispatch = useDispatch();
    const { info, source } = useSelector((state: any) => state.footer);
    const { showAR1100AsModal, openModal: openAR1100AsModal } = useModal();
    const openModalAR1100As = () => {
      openAR1100AsModal();
    };

    useEffect(() => {
      if (watch("asInkum") !== undefined) {
        handleChangefields(watch("asInkum"), "inkum");
      }
    }, [watch("asInkum")]);

    useEffect(() => {
      if (watch("asDc") !== undefined) {
        handleChangefields(watch("asDc"), "dc");
      }
    }, [watch("asDc")]);

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

    const handleChangefields = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;

      if (type === "inkum") {
        tempDc = prepVal(getValues("asDc"));
        tempInkum = prepVal(val);
      } else if (type === "dc") {
        tempInkum = prepVal(getValues("asInkum"));
        tempDc = prepVal(val);
      }

      let asTotal: number = getValues("asSurikum")
        ? +removeCommas(getValues("asSurikum"), "number")
        : 0;

      const tempMisu: number = asTotal - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        asMisukum: tempMisu,
      }));
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

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100ASCUSTINSERT : AR1100ASCUSTUPDATE;
      params.insertType = "0";

      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.asCuCode = info?.cuCode;
        params.asCuName = info?.cuName;
        params.asCuUserName = info?.cuUsername;
        params.asSno = "";
        // }
      }

      params.asDate = DateWithoutDash(params.asDate);
      params.asPdate = DateWithoutDash(params.asPdate);
      params.asPtime = DateWithoutDash(params.asPtime);
      params.asYdate = DateWithoutDash(params.asYdate);

      params.asSurikum = +removeCommas(params.asSurikum, "number");
      params.asMisukum = +removeCommas(params.asMisukum, "number");
      params.asInkum = +removeCommas(params.asInkum, "number");
      params.asDc = +removeCommas(params.asDc, "number");

      if (params.asInSwCode) {
        const asSwName = dictionary?.asInSwCode?.find(
          (item: any) => item.code === params.asInSwCode
        )?.codeName;
        params.asSwName = asSwName;
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
            <Select register={register("saleState")} width={InputSize.i120}>
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
            <Select register={register("asInSwCode")} width={InputSize.i120}>
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
            <Select register={register("asInTel")} width={InputSize.i200}>
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
            <Select register={register("asTagName")} width={InputSize.i120}>
              {dictionary?.asTagName?.map((obj: any, idx: number) => (
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
            style={{ width: "300px" }}
          />
        ),
      },
    ];

    const tableData2 = [
      {
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
            <Select register={register("asSwCode")} width={InputSize.i120}>
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
            <Select register={register("asVatDiv")} width={InputSize.i120}>
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
            name="asSurikum"
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
        12: (
          <FormGroup>
            <Select register={register("asInkumtype")} width={InputSize.i100}>
              {dictionary?.asInkumType?.map((obj: any, idx: number) => (
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
              width={InputSize.i170}
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
          <Controller
            control={control}
            name="asInkum"
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
        15: (
          <Controller
            control={control}
            name="asDc"
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
        16: (
          <Controller
            control={control}
            name="asMisukum"
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
        17: (
          <FormGroup>
            <Input register={register("signuser")} inputSize={InputSize.i120} />
          </FormGroup>
        ),
      },
    ];

    return (
      <>
        {showAR1100AsModal()}
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
                onClick={openModalAR1100As}
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

export default Tab5;
