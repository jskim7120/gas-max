import React, { useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100ASCUSTINSERT, AR1100ASCUSTUPDATE } from "app/path";
import { useDispatch, useSelector } from "app/store";
import { apiPost } from "app/axios";
import { setAR1100Tab5AsCust } from "app/state/modal/modalSlice";
import Table from "components/table";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
// import EditableSelect from "components/editableSelect";
import { Reset, Update } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { currencyMask, removeCommas } from "helpers/currency";
import { AR1100MODELDETAIL } from "./model";
import { tableHeader1, tableHeader2 } from "./tableHeader";
import useModalWithParams from "app/hook/useModalWithParams";
import { prepVal, timeData } from "../../helper";
import EditableSelect from "components/editableSelect";

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

    const { showAR1100AsModal, openModal: openAR1100AsModal } =
      useModalWithParams({
        params: {
          ...dictionary,
          detailData: watch(),
          isAddBtnClicked: isAddBtnClicked,
          areaCode: areaCode,
        },
      });

    const asCustState = useSelector(
      (state: any) => state.modal.ar1100Tab5AsCust
    );

    useEffect(() => {
      if (asCustState?.source === "AR1100" && asCustState.loadStatus === true) {
        loadParentSubmit();
      }
    }, [asCustState.loadStatus]);

    useEffect(() => {
      if (watch("asInkumtype") !== undefined) {
        handleChangeInkumType(watch("asInkumtype"));
      }
    }, [watch("asInkumtype")]);

    useEffect(() => {
      if (watch("asSurikum") !== undefined) {
        handleChangeSurikum(watch("asSurikum"));
      }
    }, [watch("asSurikum")]);

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

    const loadParentSubmit = async () => {
      await handleSubmitParent((d: any) => submitParent(d, "last"))();
      dispatch(setAR1100Tab5AsCust({ loadStatus: false, source: "" }));
    };

    const handleChangeInkumType = (val: string) => {
      if (val === "A") {
        reset((formValues) => ({
          ...formValues,
          asInkum: 0,
          asDc: 0,
        }));
      }
      if (val !== "2") {
        reset((formValues) => ({
          ...formValues,
          acbCode: "",
        }));
      }
    };

    const handleChangeSurikum = (val: number) => {
      let tempDc = prepVal(getValues("asDc"));
      let tempInkum = prepVal(getValues("asInkum"));
      const tempMisuKum = prepVal(val) - tempDc - tempInkum;
      reset((formValues) => ({
        ...formValues,
        asMisukum: tempMisuKum,
      }));
    };

    const handleChangefields = (val: number, type: string) => {
      let tempInkum: number = 0;
      let tempDc: number = 0;

      if (type === "inkum") {
        tempInkum = prepVal(val);
        tempDc = prepVal(getValues("asDc"));
      } else if (type === "dc") {
        tempInkum = prepVal(getValues("asInkum"));
        tempDc = prepVal(val);
      }

      const tempSurikum = prepVal(getValues("asSurikum"));
      const tempMisu: number = tempSurikum - tempDc - tempInkum;

      reset((formValues) => ({
        ...formValues,
        asMisukum: tempMisu,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        reset({
          ...data65,
        });
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
      let path: string = "";

      if (isAddBtnClicked) {
        path = AR1100ASCUSTINSERT;
        params.asSno = "";
        params.asDateB = DateWithoutDash(params.asDate);
      } else {
        path = AR1100ASCUSTUPDATE;
        params.asDateB = DateWithoutDash(data65?.asDateB);
      }
      params.insertType = "0";
      params.areaCode = areaCode;
      params.asDate = DateWithoutDash(params.asDate);
      params.asPdate = DateWithoutDash(params.asPdate);
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

    const openModalAR1100As = () => {
      openAR1100AsModal();
    };

    const tableData1 = [
      {
        0: (
          <FormGroup>
            <Select register={register("saleState")} width={InputSize.i110}>
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
              <CustomDatePicker {...field} style={{ width: "110px" }} />
            )}
          />
        ),
        2: (
          <FormGroup>
            <Select register={register("asInSwCode")} width={InputSize.i110}>
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
            <Select register={register("asInTel")} style={{ width: "227px" }}>
              {dictionary?.asInTel?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        4: (
          <EditableSelect
            list={dictionary?.asTagName}
            reset={reset}
            register={register("asTagName")}
            watch={watch("asTagName")}
            textAlign={"left"}
            style={{ width: "355px" }}
          />
        ),
        5: (
          <Controller
            control={control}
            name="asIn"
            render={({ field }) => (
              <Input {...field} textAlign="left" style={{ width: "480px" }} />
            )}
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
              <CustomDatePicker {...field} style={{ width: "110px" }} />
            )}
          />
        ),
        7: (
          <FormGroup>
            <Select
              register={register("asPtime")}
              width={InputSize.i110}
              textAlign="center"
            >
              {timeData?.map((obj: any, idx: number) => (
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
            name="asYdate"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "110px" }} />
            )}
          />
        ),
        9: (
          <FormGroup>
            <Select register={register("asSwCode")} width={InputSize.i110}>
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
            <Select register={register("asVatDiv")} width={InputSize.i110}>
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
                inputSize={InputSize.i110}
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
              width={InputSize.i150}
              disabled={watch("asInkumtype") !== "2"}
            >
              {dictionary?.asAcbCode?.map((obj: any, idx: number) => (
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
                inputSize={InputSize.i110}
                textAlign="right"
                mask={currencyMask}
                readOnly={watch("asInkumtype") === "A"}
                className="blue"
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
                inputSize={InputSize.i110}
                textAlign="right"
                mask={currencyMask}
                readOnly={watch("asInkumtype") === "A"}
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
                inputSize={InputSize.i110}
                textAlign="right"
                mask={currencyMask}
                readOnly
                className="red"
              />
            )}
          />
        ),
        17: (
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
                style={{ marginBottom: "2px", overflowX: "visible" }}
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
                  cursor: "pointer",
                  paddingTop: "2px",
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
