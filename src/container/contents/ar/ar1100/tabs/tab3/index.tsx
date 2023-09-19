import React, { useEffect, useImperativeHandle } from "react";
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
      selected,
      menuId,
      addBtnUnClick,
    }: {
      tabId: number;
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      selected: any;
      menuId: string;
      addBtnUnClick: Function;
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
      crud,
    }));
    const dispatch = useDispatch();
    const { showCM1106Modal, openModal } = useModal();

    let tsKumSup = 0;
    let tsKumVat = 0;
    let tsKumack = 0;
    let tsDanga = 0;
    let tsQty = 0;
    let tsMisu = 0;
    let tsInkum = 0;
    let tsDc = 0;

    useEffect(() => {
      if (cm1106.source === "AR11002") {
        resetForm("jpName");
      }
    }, [cm1106.tick]);

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

    const calcKumSup = () => {
      tsDanga = +removeCommas(getValues("tsDanga"))
        ? +removeCommas(getValues("tsDanga"), "number")
        : 0;
      tsQty = +removeCommas(getValues("tsQty"))
        ? +removeCommas(getValues("tsQty"), "number")
        : 0;
      tsKumSup = tsDanga * tsQty;
    };

    const calcKumackKumVat = () => {
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

    const calcMisukum = () => {
      tsDc = getValues("tsDc") ? +removeCommas(getValues("tsDc"), "number") : 0;
      tsInkum = getValues("tsInkum")
        ? +removeCommas(getValues("tsInkum"), "number")
        : 0;
      tsMisu = tsKumack - tsDc - tsInkum;
    };

    const handleTsQtyChange = () => {
      calcKumSup();
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        tsKumSup: tsKumSup,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
        tsMisu: tsMisu,
      }));
    };

    const handleTsDangaChange = () => {
      calcKumSup();
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        tsKumSup: tsKumSup,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
        tsMisu: tsMisu,
      }));
    };

    const handleTsVatDivChange = () => {
      tsKumSup = getValues("tsKumSup") ? +getValues("tsKumSup") : 0;
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        tsKumVat: tsKumVat,
        tsKumack: tsKumack,
        tsMisu: tsMisu,
      }));
    };

    const handleTsInkumTsDcChange = () => {
      tsKumack = getValues("tsKumack")
        ? +removeCommas(getValues("tsKumack"), "number")
        : 0;
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        tsMisu: tsMisu,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
      } else if (type === "jpName") {
        reset((formValues) => ({
          ...formValues,
          tsJpName: cm1106?.jpName ? cm1106?.jpName : "",
          tsJpCode: cm1106?.jpCode ? cm1106?.jpCode : "",
          tsJpSpec: cm1106?.jpSpec,
        }));
      }
    };

    const crud = async (type: string | null) => {};

    const handleClickReset = () => {};

    const submit = async (params: any) => {
      const path = isAddBtnClicked
        ? AR1100TONGSALEINSERT
        : AR1100TONGSALEUPDATE;
      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.tsCuCode = info?.cuCode;
        params.tsCuName = info?.cuName;
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
        const pjSwName = dictionary?.tsSwCode?.find(
          (item: any) => item.code === params.tsSwCode
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

    const openPopupCM1106 = async () => {
      dispatch(addCM1106Second({ source: "AR11002" }));
      openModal();
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
        <Controller
          control={control}
          name="tsQty"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} textAlign="right" />
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
          name="tsKumVat"
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

    const t13 = {
      10: (
        <Controller
          control={control}
          name="tsKumack"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i150}
              readOnly
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
          name="signUser"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} />
          )}
        />
      ),
    };

    const t2 = [
      {
        0: (
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
        1: (
          <FormGroup>
            <Select register={register("abcCode")} width={InputSize.i150}>
              {dictionary?.abcCode?.map((obj: any, idx: number) => (
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
                readOnly
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
            name="signUser"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} />
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
        {showCM1106Modal()}
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
