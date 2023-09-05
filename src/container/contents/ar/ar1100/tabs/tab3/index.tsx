import React, { useEffect, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
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

const Tab3 = React.forwardRef(
  (
    {
      tabId,
      areaCode,
      data,
      setData,
      data65,
      dictionary,
      isAddBtnClicked,
      fetchData,
      selected,
      menuId,
      addBtnUnClick,
    }: {
      tabId: number;
      areaCode: string;
      data: any;
      setData: Function;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      fetchData: Function;
      selected: any;
      menuId: string;
      addBtnUnClick: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR1100TAB3>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
      crud,
    }));

    let tsKumSup = 0;
    let tsKumVat = 0;
    let tsKumack = 0;
    let tsDanga = 0;
    let tsQty = 0;
    let tsMisu = 0;
    let tsInkum = 0;
    let tsDc = 0;

    useEffect(() => {
      if (data65 && Object.keys(data65)?.length > 0) {
        resetForm("reset");
      }
    }, [data65]);
    useEffect(() => {
      if (watch("tsQty") !== undefined) {
        handleTsQtyChange();
      }
    }, [watch("tsQty")]);

    useEffect(() => {
      if (watch("tsDanga") !== undefined) {
        handleTsDangaChange();
      }
    }, [watch("tsDanga")]);

    useEffect(() => {
      if (watch("tsVatDiv") !== undefined) {
        handleTsVatDivChange();
      }
    }, [watch("tsVatDiv")]);

    useEffect(() => {
      if (watch("tsInkum") !== undefined) {
        handleTsInkumTsDcChange();
      }
    }, [watch("tsInkum")]);

    useEffect(() => {
      if (watch("tsDc") !== undefined) {
        handleTsInkumTsDcChange();
      }
    }, [watch("tsDc")]);

    const calcLast2field = () => {
      if (getValues("tsVatDiv") === "0") {
        tsKumVat = 0;
        tsKumack = tsKumSup;
      } else if (
        getValues("tsVatDiv") === "1" ||
        getValues("tsVatDiv") === "2"
      ) {
        tsKumVat = Math.round(tsKumSup * 0.1);
        tsKumack = tsKumVat + tsKumSup;
      }
    };

    const handleTsQtyChange = () => {
      tsDanga = getValues("tsDanga") ? +removeCommas(getValues("tsDanga")) : 0;
      tsQty = getValues("tsQty") ? +getValues("tsQty") : 0;
      tsKumSup = tsDanga * tsQty;
      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        tsKumSup: tsKumSup,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
      }));
    };

    const handleTsDangaChange = () => {
      tsDanga = +removeCommas(getValues("tsDanga"))
        ? +removeCommas(getValues("tsDanga"), "number")
        : 0;

      tsQty = getValues("tsQty") ? +getValues("tsQty") : 0;
      tsKumSup = tsDanga * tsQty;

      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        tsKumSup: tsKumSup,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
      }));
    };

    const handleTsVatDivChange = () => {
      tsKumSup = getValues("tsKumSup")
        ? +removeCommas(getValues("tsKumSup"), "number")
        : 0;
      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
      }));
    };

    const handleTsInkumTsDcChange = () => {
      tsKumack = getValues("tsKumack")
        ? +removeCommas(getValues("tsKumack"), "number")
        : 0;

      tsDc = getValues("tsDc") ? +removeCommas(getValues("tsDc"), "number") : 0;
      tsInkum = getValues("tsInkum")
        ? +removeCommas(getValues("tsInkum"), "number")
        : 0;

      tsMisu = tsKumack - tsDc - tsInkum;
      reset((formValues) => ({
        ...formValues,
        tsMisu: tsMisu,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
      } else if (type === "jpName") {
      }
    };

    const crud = async (type: string | null) => {};

    const handleClickReset = () => {};

    const submit = async (params: any) => {};

    const openPopupCM1106 = async () => {};

    const t11 = {
      0: (
        <FormGroup>
          <Select register={register("tsSaleState")} width={InputSize.i100}>
            {dictionary?.tsSaleState?.map((obj: any, idx: number) => (
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
          <Select register={register("tsTonggubun")} width={InputSize.i100}>
            {dictionary?.tsTonggubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      5: (
        <Controller
          control={control}
          name="tsQty"
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
    };

    const t12 = {
      6: (
        <Controller
          control={control}
          name="tsDanga"
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
          <Select register={register("tsVatDiv")} width={InputSize.i100}>
            {dictionary?.tsVatDiv?.map((obj: any, idx: number) => (
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
          name="tsKumSup"
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
      9: (
        <Controller
          control={control}
          name="tsKumVat"
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
    };

    const t13 = {
      10: (
        <Controller
          control={control}
          name="tsKumack"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i150}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
    };

    const t14 = {
      11: (
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
      12: (
        <EditableSelect
          list={dictionary?.tsBigo}
          reset={reset}
          register={register("tsBigo")}
          watch={watch("tsBigo")}
          textAlign={"left"}
          style={{ width: "200px" }}
        />
      ),
      13: (
        <Controller
          control={control}
          name="signuser"
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
    };

    const t2 = [
      {
        0: (
          <FormGroup>
            <Select register={register("tsInkumtype")} width={InputSize.i100}>
              {dictionary?.tsInkumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        1: (
          <FormGroup>
            <Select register={register("tsAbcCode")} width={InputSize.i150}>
              {dictionary?.tsAbcCode?.map((obj: any, idx: number) => (
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
            name="tsInkum"
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
            name="tsDc"
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
            name="tsMisu"
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
            <Select register={register("tsSwCode")} width={InputSize.i100}>
              {dictionary?.tsSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
        6: (
          <EditableSelect
            list={dictionary?.tsBigo}
            reset={reset}
            register={register("tsBigo")}
            watch={watch("tsBigo")}
            textAlign={"left"}
            style={{ width: "199px" }}
          />
        ),

        7: (
          <Controller
            control={control}
            name="signuser"
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

    const getTableInfo = () => {
      switch (watch("tsGubun")) {
        case "0":
          return {
            tableHeader1: tableHeader1a,
            tableHeader2: tableHeader1b,
            tableData1: [{ ...t11, ...t12, ...t13 }],
            tableData2: t2,
          };
        case "1":
          return {
            tableHeader1: tableHeader2a,
            tableHeader2: tableHeader2b,
            tableData1: [{ ...t11, ...t12, ...t13 }],
            tableData2: t2,
          };
        case "2":
          return {
            tableHeader1: tableHeader3a,
            tableHeader2: tableHeader3b,
            tableData1: [{ ...t11, ...t13 }],
            tableData2: t2,
          };
        case "3":
          return {
            tableHeader1: tableHeader4a,
            tableHeader2: tableHeader4b,
            tableData1: [{ ...t11, ...t13 }],
            tableData2: t2,
          };
        default:
          return {
            tableHeader1: tableHeader5,
            tableHeader2: null,
            tableData1: [{ ...t11, ...t14 }],
            tableData2: t2,
          };
      }
    };

    return (
      <>
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div className="tab2">
              <Table
                className="no-space"
                tableHeader={getTableInfo().tableHeader1}
                tableData={getTableInfo().tableData1}
                style={{ marginBottom: "2px" }}
              />
              {Number(watch("tsGubun")) < 4 && (
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
