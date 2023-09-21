import React, { useEffect, useState, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100INSERT, AR1100UPDATE, AR1100DELETE } from "app/path";
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
import { tableHeader11, tableHeader12, tableHeader2 } from "./tableHeader";
import { addCM1106Second } from "app/state/modal/modalSlice";
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
      selected,
      menuId,
      addBtnUnClick,
      jpKind,
      setJpKind,
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
      jpKind: any;
      setJpKind: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR110065DETAIL>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
      setPjQty,
      setPjJago,
    }));

    const dispatch = useDispatch();

    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const { info, source } = useSelector((state: any) => state.footer);

    const [pjQty, setPjQty] = useState<number>(0);
    const [pjJago, setPjJago] = useState<number>(0);

    const { showCM1106Modal, openModal } = useModal();

    let calcPjJago = 0;
    let pjKumSup = 0;
    let pjKumVat = 0;
    let pjKumack = 0;
    let pjDanga = 0;
    let pjReqty = 0;
    let pjMisukum = 0;
    let pjInkum = 0;
    let pjDc = 0;

    useEffect(() => {
      if (cm1106.source === "AR11000") {
        setJpKind(cm1106.jpKind);
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    useEffect(() => {
      if (watch("pjReqty") !== undefined) {
        handlePjReqtyChange();
      }
    }, [watch("pjReqty")]);

    useEffect(() => {
      if (watch("pjDanga") !== undefined) {
        handlePjDangaChange();
      }
    }, [watch("pjDanga")]);

    useEffect(() => {
      if (watch("pjVatDiv") !== undefined) {
        handlePjVatDivChange();
      }
    }, [watch("pjVatDiv")]);

    useEffect(() => {
      if (watch("pjInkum") !== undefined) {
        handlePjInkumPjDcChange();
      }
    }, [watch("pjInkum")]);

    useEffect(() => {
      if (watch("pjDc") !== undefined) {
        handlePjInkumPjDcChange();
      }
    }, [watch("pjDc")]);

    const calcKumSup = (qty: number = pjQty) => {
      pjDanga = +removeCommas(getValues("pjDanga"))
        ? +removeCommas(getValues("pjDanga"), "number")
        : 0;
      pjKumSup = pjDanga * qty;
    };

    const calcKumackKumVat = () => {
      if (getValues("pjVatDiv") === "0") {
        pjKumVat = 0;
        pjKumack = pjKumSup;
      } else if (
        getValues("pjVatDiv") === "1" ||
        getValues("pjVatDiv") === "2"
      ) {
        pjKumVat = Math.round(pjKumSup * 0.1);
        pjKumack = pjKumVat + pjKumSup;
      }
    };

    const calcMisukum = () => {
      pjDc = getValues("pjDc") ? +removeCommas(getValues("pjDc"), "number") : 0;
      pjInkum = getValues("pjInkum")
        ? +removeCommas(getValues("pjInkum"), "number")
        : 0;
      pjMisukum = pjKumack - pjDc - pjInkum;
    };

    const handlePjQtyChange = (value: number) => {
      setPjQty(value);
      calcKumSup(value);
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        pjReqty: value,
        pjKumSup: pjKumSup,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
        pjMisukum: pjMisukum,
      }));
    };

    const handlePjReqtyChange = () => {
      pjReqty = getValues("pjReqty") ? +getValues("pjReqty") : 0;
      calcPjJago = pjJago + pjQty - pjReqty;
      reset((formValues) => ({
        ...formValues,
        pjJago: calcPjJago,
      }));
    };

    const handlePjDangaChange = () => {
      calcKumSup();
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        pjKumSup: pjKumSup,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
        pjMisukum: pjMisukum,
      }));
    };

    const handlePjVatDivChange = () => {
      pjKumSup = getValues("pjKumSup") ? +getValues("pjKumSup") : 0;
      calcKumackKumVat();
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
        pjMisukum: pjMisukum,
      }));
    };

    const handlePjInkumPjDcChange = () => {
      pjKumack = getValues("pjKumack")
        ? +removeCommas(getValues("pjKumack"), "number")
        : 0;
      calcMisukum();
      reset((formValues) => ({
        ...formValues,
        pjMisukum: pjMisukum,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        setPjQty(data65?.pjQty);
        reset({
          ...data65,
          pjJpCode: data65?.pjJpCode ? data65?.pjJpCode : "",
          pjJpName: data65?.pjJpName ? data65?.pjJpName : "",
        });
      } else if (type === "jpName") {
        const pjJago =
          (cm1106?.jcBasicJaego ? +cm1106.jcBasicJaego : 0) +
          (cm1106?.custOut ? +cm1106.custOut : 0) -
          (cm1106?.custIn ? +cm1106.custIn : 0);

        const pjKumSup =
          (cm1106?.jcJpDanga ? +removeCommas(cm1106.jcJpDanga, "number") : 0) *
          (getValues("pjQty") ? +getValues("pjQty") : 0);

        setPjJago(pjJago);

        reset((formValues) => ({
          ...formValues,
          pjJpName: cm1106.jpName,
          pjJpCode: cm1106.jpCode,
          pjJpSpec: cm1106?.jpSpec,
          pjJago: pjJago,
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
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.pjCuCode = info?.cuCode;
        params.pjCuName = info?.cuName;
        params.pjSno = "";
        // }
      }

      params.pjDate = DateWithoutDash(params.pjDate);

      params.pjDanga = removeCommas(params.pjDanga, "number");
      params.pjKumSup = removeCommas(params.pjKumSup, "number");
      params.pjKumVat = removeCommas(params.pjKumVat, "number");
      params.pjKumack = removeCommas(params.pjKumack, "number");
      params.pjInkum = removeCommas(params.pjInkum, "number");
      params.pjDc = removeCommas(params.pjDc, "number");
      params.pjMisukum = removeCommas(params.pjMisukum, "number");
      params.pjQty = pjQty;

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
        <FormGroup style={{ position: "relative" }}>
          <Input
            register={register("pjJpCode")}
            inputSize={InputSize.i70}
            readOnly={!isAddBtnClicked}
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

    const td22 = {
      3: (
        <Input
          type="number"
          name="pjQty"
          value={pjQty}
          onChange={(e: any) => {
            handlePjQtyChange(e.target.value);
          }}
          inputSize={InputSize.i100}
          textAlign="right"
        />
      ),

      4: (
        <Controller
          control={control}
          name="pjReqty"
          render={({ field }) => (
            <Input {...field} inputSize={InputSize.i100} textAlign="right" />
          )}
        />
      ),

      5: (
        <Input
          register={register("pjJago")}
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
          <Controller
            control={control}
            name="pjVatDiv"
            render={({ field }) => (
              <Select {...field} width={InputSize.i100}>
                {dictionary?.pjVatDiv?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            )}
          />
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
            <Select register={register("pacbCode")} width={InputSize.i150}>
              {dictionary?.pabcCode?.map((obj: any, idx: number) => (
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
            style={{ width: "200px" }}
          />
        ),
        11: (
          <FormGroup>
            <Input register={register("signuser")} inputSize={InputSize.i100} />
            <Input register={register("signkey")} inputSize={InputSize.i100} />
          </FormGroup>
        ),
      },
    ];

    const getTableInfo = () => {
      switch (jpKind) {
        case "4":
          return {
            tableHeader: tableHeader11,
            tableData: [{ ...td1, ...td21, ...td3 }],
          };
        default:
          return {
            tableHeader: tableHeader12,
            tableData: [{ ...td1, ...td22, ...td3 }],
          };
      }
    };

    return (
      <>
        {showCM1106Modal()}
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
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
        </form>
      </>
    );
  }
);

export default Tab1;
