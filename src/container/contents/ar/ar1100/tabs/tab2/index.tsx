import React, { useEffect, useState, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { AR1100CJSALEINSERT, AR1100CJSALEUPDATE } from "app/path";
import { apiPost } from "app/axios";
import { useDispatch, useSelector } from "app/store";
import useModal from "app/hook/useModal";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import EditableSelect from "components/editableSelect";
import { currencyMask, removeCommas } from "helpers/currency";
import { DateWithoutDash } from "helpers/dateFormat";
import { IAR1100TAB2 } from "./model";
import { addCM1106Second } from "app/state/modal/modalSlice";

const Tab2 = React.forwardRef(
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
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR1100TAB2>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
      setPcQty,
    }));

    const dispatch = useDispatch();

    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const { info, source } = useSelector((state: any) => state.footer);
    const [pcQty, setPcQty] = useState<number>(0);

    const { showCM1106Modal, openModal } = useModal();
    let pcKumack = 0;

    useEffect(() => {
      if (cm1106.source === "AR11001") {
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    useEffect(() => {
      if (watch("pcReqty") !== undefined) {
        handlePcReqtyChange();
      }
    }, [watch("pcReqty")]);

    useEffect(() => {
      if (watch("pcDanga") !== undefined) {
        handlePcDangaChange();
      }
    }, [watch("pcDanga")]);

    const calcKumack = (value: number = pcQty) => {
      pcKumack =
        value *
        (getValues("pcDanga")
          ? +removeCommas(getValues("pcDanga"), "number")
          : 0);
    };

    const handlePcQtyChange = (value: number) => {
      setPcQty(value);
      const pcJaego =
        (data65?.junJaego !== undefined ? data65?.junJaego : 0) +
        pcQty -
        (getValues("pcReqty")
          ? +removeCommas(getValues("pcReqty"), "number")
          : 0);

      calcKumack(value);
      reset((formValues) => ({
        ...formValues,
        pcReqty: value,
        pcJaego: pcJaego,
        pcKumack: pcKumack,
      }));
    };

    const handlePcReqtyChange = () => {
      const pcJaego =
        (data65?.junJaego !== undefined ? data65?.junJaego : 0) +
        pcQty -
        (getValues("pcReqty")
          ? +removeCommas(getValues("pcReqty"), "number")
          : 0);

      reset((formValues) => ({
        ...formValues,
        pcJaego: pcJaego,
      }));
    };

    const handlePcDangaChange = () => {
      calcKumack();
      reset((formValues) => ({
        ...formValues,
        pcKumack: pcKumack,
      }));
    };

    const handleClickReset = async () => {
      if (isAddBtnClicked) {
        await handleSubmitParent((dat: any) => submitParent(dat, "last"))();
        addBtnUnClick();
      } else {
        resetForm("reset");
      }
    };

    const openPopupCM1106 = async () => {
      dispatch(addCM1106Second({ source: "AR11001" }));
      openModal();
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        setPcQty(data65?.pcQty);
        reset({
          ...data65,
          pcJpCode: data65?.pcJpCode ? data65?.pcJpCode : "",
          pcJpName: data65?.pcJpName ? data65?.pcJpName : "",
        });
      } else if (type === "jpName") {
        reset((formValues) => ({
          ...formValues,
          pcJpName: cm1106?.jpName,
          pcJpCode: cm1106?.jpCode,
          pcJpSpec: cm1106?.jpSpec,
          // pcDanga: cm1106?.jcJpDanga, ar1100 -aas bolood aldaa garaad bsan bolohoor tur comment bolgov
        }));
      }
    };

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100CJSALEINSERT : AR1100CJSALEUPDATE;

      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.pcCuCode = info?.cuCode;
        params.pcCuName = info?.cuName;
        params.pcSno = "";
        // }
      }

      params.pcDate = DateWithoutDash(params.pcDate);

      params.pcDanga = +removeCommas(params.pcDanga, "number");
      params.pcQty = +removeCommas(params.pcQty, "number");
      params.pcReqty = +removeCommas(params.pcReqty, "number");
      params.pcJaego = +removeCommas(params.pcJaego, "number");
      params.pcKumack = +removeCommas(params.pcKumack, "number");
      params.pcGum = +removeCommas(params.pcGum, "number");
      params.pcQty = pcQty;

      if (params?.pcSwCode) {
        params.pcSwName = dictionary?.pcSwCode?.find(
          (item: any) => item.code === params.pcSwCode
        )?.codeName;
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
            <Controller
              control={control}
              name="saleState"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.saleState?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormGroup>
        ),
        1: (
          <Controller
            control={control}
            name="pcDate"
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
              register={register("pcJpCode")}
              inputSize={InputSize.i70}
              readOnly={!isAddBtnClicked}
            />
            <Controller
              control={control}
              name="pcJpName"
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
        3: (
          <Input
            type="number"
            name="pcQty"
            value={pcQty}
            onChange={(e: any) => {
              handlePcQtyChange(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
          />
        ),
        4: (
          <Controller
            control={control}
            name="pcReqty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        5: (
          <Controller
            control={control}
            name="pcJaego"
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
        6: (
          <Controller
            control={control}
            name="pcDanga"
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
            name="pcKumack"
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
        8: (
          <Controller
            control={control}
            name="pcGum"
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
          <FormGroup>
            <Controller
              control={control}
              name="pcSwCode"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.pcSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormGroup>
        ),
        10: (
          <EditableSelect
            list={dictionary?.pcBigo}
            reset={reset}
            register={register("pcBigo")}
            watch={watch("pcBigo")}
            textAlign={"left"}
            style={{ width: "200px" }}
          />
        ),
      },
    ];

    const tableData2 = [
      {
        0: (
          <FormGroup>
            <Controller
              control={control}
              name="proxyType"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.proxyType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormGroup>
        ),
        1: (
          <FormGroup style={{ position: "relative" }}>
            <Input register={register("cBuCode")} inputSize={InputSize.i60} />
            <Controller
              control={control}
              name="cBuName"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.sProxytype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
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
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
        2: (
          <FormGroup>
            <Input register={register("signuser")} inputSize={InputSize.i100} />
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
                  "거래상태",
                  "공급일자",
                  "품  명",
                  "공급량",
                  "공병회수",
                  "재고",
                  "공급단가",
                  "공급액",
                  "배달검침",
                  "사원",
                  "비고",
                ]}
                tableData={tableData1}
                style={{ marginBottom: "2px" }}
              />
              <Table
                className="no-space"
                tableHeader={["공급구분", "매입처", "확인"]}
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

export default Tab2;
