import React, { useEffect, useState, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "app/store";
import {} from "app/state/modal/modalSlice";
import { AR1100INSERT, AR1100UPDATE, AR1100DELETE } from "app/path";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { IAR110065DETAIL, emptyObj } from "./model";
import { apiPost } from "app/axios";
import { DateWithoutDash } from "helpers/dateFormat";
import { currencyMask, removeCommas } from "helpers/currency";
import useModal from "app/hook/useModal";

const Tab1 = React.forwardRef(
  (
    {
      areaCode,
      data,
      dictionary,
      isAddBtnClicked,
      setIsAddBtnClicked,
      fetchData,
      selected,
      menuId,
      addBtnUnClick,
    }: {
      areaCode: string;
      data: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
      fetchData: Function;
      selected: any;
      menuId: string;
      addBtnUnClick: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR110065DETAIL>({
        mode: "onSubmit",
      });

    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const footerState = useSelector((state: any) => state.footer);

    const [pjJago, setPjJago] = useState<number>(0);
    const { showCM1106Modal, openModal } = useModal();

    let calcPjJago = 0;
    let pjKumSup = 0;
    let pjKumVat = 0;
    let pjKumack = 0;
    let pjDanga = 0;
    let pjQty = 0;
    let pjReqty = 0;

    useEffect(() => {
      if (cm1106.source === "AR1100" && cm1106.jpCode && cm1106.jpName) {
        resetForm("jpName");
      }
    }, [cm1106.jpCode, cm1106.jpName, cm1106.tick]);

    useEffect(() => {
      if (data && Object.keys(data)?.length > 0) {
        resetForm("reset");
      }
    }, [data]);

    useImperativeHandle<any, any>(ref, () => ({
      reset,
      crud,
    }));

    const resetForm = (type: string) => {
      if (type === "reset") {
        reset({
          pjCuCode: selected?.cuCode,
          pjCuName: selected?.cuName,
          areaCode: data?.areaCode,
          pjSno: data?.pjSno,
          pjDate: data?.pjDate,
          pjJpCode: data?.pjJpCode,
          pjJpName: data?.pjJpName,
          pjQty: data?.pjQty,
          pjReqty: data?.pjReqty,
          pjDanga: data?.pjDanga,
          pjVatDiv: data?.pjVatDiv,
          pjKumVat: data?.pjKumVat,
          pjKumack: data?.pjKumack,
          saleState: data?.saleState,
          proxyType: data?.proxyType,
          buName: data?.buName,
          pjInkumtype: data?.pjInkumtype,
          pjInkum: data?.pjInkum,
          pjDc: data?.pjDc,
          pjMisukum: data?.pjMisukum,
          pjSwCode: data?.pjSwCode,
          pjBigo: data?.pjBigo,
          qtyKg: data?.qtyKg,
          qtyL: data?.qtyL,
          jpSpecific: data?.jpSpecific,
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
          pjJago: pjJago,
          pjDanga: cm1106.jcJpDanga,
          pjKumSup: pjKumSup,
        }));
      }
    };

    const calcLast2field = () => {
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

    const handlePjQtyChange = () => {
      // console.log("watch 1---------->>>>>>>");
      pjDanga = getValues("pjDanga") ? +removeCommas(getValues("pjDanga")) : 0;
      pjQty = getValues("pjQty") ? +getValues("pjQty") : 0;
      pjKumSup = pjDanga * pjQty;
      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        pjReqty: watch("pjQty"),
        pjKumSup: pjKumSup,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
      }));
    };

    const handlePjReqtyChange = () => {
      // console.log("watch 2--------->>>>>>>");
      pjQty = getValues("pjQty") ? +getValues("pjQty") : 0;
      pjReqty = getValues("pjReqty") ? +getValues("pjReqty") : 0;
      calcPjJago = pjJago + pjQty - pjReqty;
      reset((formValues) => ({
        ...formValues,
        pjJago: calcPjJago,
      }));
    };

    const handlePjDangaChange = () => {
      console.log("watch 3------->>>>>>>", getValues("pjDanga"));
      pjDanga = +removeCommas(getValues("pjDanga"))
        ? +removeCommas(getValues("pjDanga"), "number")
        : 0;

      console.log(">>>>>>>>>>", pjDanga);
      pjQty = getValues("pjQty") ? +getValues("pjQty") : 0;
      pjKumSup = pjDanga * pjQty;

      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        pjKumSup: pjKumSup,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
      }));
    };

    const handlePjVatDivChange = () => {
      // console.log("watch 4------->>>>>>>");
      pjKumSup = getValues("pjKumSup")
        ? +removeCommas(getValues("pjKumSup"), "number")
        : 0;
      calcLast2field();
      reset((formValues) => ({
        ...formValues,
        pjKumVat: pjKumVat,
        pjKumack: pjKumack,
      }));
    };

    useEffect(() => {
      if (watch("pjQty") !== undefined) {
        handlePjQtyChange();
      }
    }, [watch("pjQty")]);

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

    const openPopupCM1106 = async () => {
      openModal();
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        const res = await apiPost(AR1100DELETE, formValues, "삭제했습니다");

        res && (await fetchData());
        return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100INSERT : AR1100UPDATE;

      if (isAddBtnClicked) {
        if (footerState?.source === menuId) {
          params.areaCode = areaCode;
          params.pjCuCode = footerState?.info?.cuCode;
          params.pjCuName = footerState?.info?.cuName;
        }
      }

      params.pjDate = DateWithoutDash(params.pjDate);

      params.pjDanga = removeCommas(params.pjDanga, "number");
      params.pjKumSup = removeCommas(params.pjKumSup, "number");
      params.pjKumVat = removeCommas(params.pjKumVat, "number");
      params.pjKumack = removeCommas(params.pjKumack, "number");
      params.pjInkum = removeCommas(params.pjInkum, "number");
      params.pjDc = removeCommas(params.pjDc, "number");
      params.pjMisukum = removeCommas(params.pjMisukum, "number");

      if (params.pjSwCode) {
        const pjSwName = dictionary?.pjSwCode?.find(
          (item: any) => item.code === params.pjSwCode
        ).codeName;
        params.pjSwName = pjSwName;
      }

      const res = await apiPost(path, params, "저장이 성공하였습니다");
      if (res) {
        await fetchData();
      }
    };

    const data1 = [
      {
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
        3:
          data?.jpKind === "4" ? (
            <Controller
              control={control}
              name="qtyKg"
              render={({ field }) => (
                <Input
                  {...field}
                  inputSize={InputSize.i100}
                  textAlign="right"
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="pjQty"
              render={({ field }) => (
                <Input
                  {...field}
                  inputSize={InputSize.i100}
                  textAlign="right"
                />
              )}
            />
          ),

        4:
          data?.jpKind === "4" ? (
            <Controller
              control={control}
              name="qtyL"
              render={({ field }) => (
                <Input
                  {...field}
                  inputSize={InputSize.i100}
                  textAlign="right"
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="pjReqty"
              render={({ field }) => (
                <Input
                  {...field}
                  inputSize={InputSize.i100}
                  textAlign="right"
                />
              )}
            />
          ),
        5:
          data?.jpKind === "4" ? (
            <Input
              register={register("jpSpecific")}
              inputSize={InputSize.i100}
              textAlign="right"
            />
          ) : (
            <Input
              register={register("pjJago")}
              inputSize={InputSize.i100}
              textAlign="right"
            />
          ),
        6: (
          <Controller
            control={control}
            name="pjDanga"
            render={({ field }) => (
              <Input
                {...field}
                // value={field.value ? field.value : ""}
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
                // value={!isNaN(field.value) ? field.value : ""}
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
                // value={!isNaN(field.value) ? field.value : ""}
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
                // value={!isNaN(field.value) ? field.value : ""}
                inputSize={InputSize.i100}
                readOnly
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
      },
    ];

    const data2 = [
      {
        1: (
          <FormGroup>
            <Select register={register("saleState")} width={InputSize.i100}>
              {dictionary?.saleType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        ),
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
          <Controller
            control={control}
            name="pjInkum"
            render={({ field }) => (
              <Input
                {...field}
                // value={!isNaN(field.value) ? field.value : ""}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),

        6: (
          <Controller
            control={control}
            name="pjDc"
            render={({ field }) => (
              <Input
                {...field}
                // value={!isNaN(field.value) ? field.value : ""}
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
            name="pjMisukum"
            render={({ field }) => (
              <Input
                {...field}
                // value={!isNaN(field.value) ? field.value : ""}
                inputSize={InputSize.i100}
                textAlign="right"
                mask={currencyMask}
              />
            )}
          />
        ),
        8: (
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
        9: <Input register={register("pjBigo")} inputSize={InputSize.i100} />,
        10: (
          <FormGroup>
            <Input register={register("signuser")} inputSize={InputSize.i100} />
            <Input register={register("signkey")} inputSize={InputSize.i100} />
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
                tableHeader={[
                  "판매일자",
                  "품  명",
                  data?.jpKind === "4" ? "매출량(kg)" : "판매수량",
                  data?.jpKind === "4" ? "매출량(ℓ)" : "공병회수",
                  data?.jpKind === "4" ? "비중(kg/ℓ)" : "재고",
                  "단가",
                  "VAT",
                  "공급가액",
                  "세액",
                  " 합계금액",
                ]}
                tableData={data1}
                style={{ marginBottom: "2px" }}
              />
              <Table
                className="no-space"
                tableHeader={[
                  "거래상태",
                  "대납구분",
                  "매입처명",
                  "입금방법",
                  "입금액",
                  "D/C",
                  "미입금액",
                  "사원",
                  "비고",
                  "확인자 서명",
                ]}
                tableData={data2}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Button
                text="저장"
                icon={<Update />}
                color={ButtonColor.SECONDARY}
                onClick={() => {}}
                type="submit"
                disabled={
                  isAddBtnClicked &&
                  (footerState?.source !== menuId ||
                    footerState?.info?.cuCode === "")
                }
              />

              <Button
                text="취소"
                icon={<Reset />}
                type="button"
                onClick={() => {
                  resetForm("reset");
                  addBtnUnClick();
                }}
              />
            </div>
          </div>
        </form>
      </>
    );
  }
);

export default Tab1;

// pjReqtySil
// pjCuSite
// pjCuName
// pjCuCode
// pjAppUser
// opt
// junNo
// junJaego
// gpsLong
// gpsLat
// carNo
// carCd