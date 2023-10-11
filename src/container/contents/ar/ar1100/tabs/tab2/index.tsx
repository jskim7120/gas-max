import React, { useEffect, useImperativeHandle } from "react";
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
      addBtnUnClick,
      junJaego,
      setJunJaego,
      qty,
      setQty,
      reqty,
      setReqty,
      danga,
      setDanga,
    }: {
      tabId: number;
      data: any;
      data65: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      handleSubmitParent: Function;
      submitParent: Function;
      addBtnUnClick: Function;
      junJaego: number;
      setJunJaego: Function;
      qty: number;
      setQty: Function;
      reqty: number;
      setReqty: Function;
      danga: number;
      setDanga: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, watch } =
      useForm<IAR1100TAB2>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));

    const dispatch = useDispatch();
    const { showCM1106Modal, openModal } = useModal();
    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const { info, source } = useSelector((state: any) => state.footer);

    useEffect(() => {
      if (cm1106.source === "AR11001") {
        resetForm("jpName");
      }
    }, [cm1106.tick]);

    const handleQtyChange = (val: number) => {
      setQty(val);
      setReqty(val);
      const tempDanga = danga ? +removeCommas(danga, "number") : 0;
      const tempKumack = (isNaN(tempDanga) ? 0 : tempDanga) * +val;

      reset((formValues) => ({
        ...formValues,
        pcJaego: junJaego,
        pcKumack: tempKumack,
      }));
    };

    const handleReqtyChange = (val: number) => {
      setReqty(val);
      let tempPcJaego = +junJaego + +qty - +val;

      reset((formValues) => ({
        ...formValues,
        pcJaego: tempPcJaego,
      }));
    };

    const handleDangaChange = (val: number) => {
      setDanga(val);
      const tempVal = val ? +removeCommas(val, "number") : 0;
      const tempKumack = (isNaN(tempVal) ? 0 : tempVal) * qty;

      reset((formValues) => ({
        ...formValues,
        pcKumack: tempKumack,
      }));
    };

    const resetForm = (type: string) => {
      if (type === "reset") {
        setJunJaego(data65?.junJaego);
        setQty(data65?.pcQty);
        setReqty(data65?.pcReqty);
        setDanga(data65?.pcDanga);
        reset({
          ...data65,
          pcJpCode: data65?.pcJpCode ? data65?.pcJpCode : "",
          pcJpName: data65?.pcJpName ? data65?.pcJpName : "",
        });
      } else if (type === "jpName") {
        const tempJunJaego =
          (cm1106?.jcBasicJaego ? +cm1106?.jcBasicJaego : 0) +
          (cm1106?.custOut ? +cm1106?.custOut : 0) -
          (cm1106?.custIn ? +cm1106?.custIn : 0);

        setJunJaego(tempJunJaego);

        reset((formValues) => ({
          ...formValues,
          pcJpName: cm1106?.jpName,
          pcJpCode: cm1106?.jpCode,
          pcJpSpec: cm1106?.jpSpec,
          // pcDanga: cm1106?.jcJpDanga, ar1100 -aas bolood aldaa garaad bsan bolohoor tur comment bolgov
        }));
      }
    };

    const openPopupCM1106 = async () => {
      dispatch(addCM1106Second({ source: "AR11001" }));
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
      const path = isAddBtnClicked ? AR1100CJSALEINSERT : AR1100CJSALEUPDATE;
      params.insertType = "0";
      if (isAddBtnClicked) {
        // if (source === menuId + tabId.toString()) {
        params.areaCode = info?.areaCode;
        params.pcCuCode = info?.cuCode;
        params.pcCuName = info?.cuName;
        params.pcSno = "";
        // }
      }

      params.pcDate = DateWithoutDash(params.pcDate);
      params.pcKumack = +removeCommas(params.pcKumack, "number");
      params.pcGum = +removeCommas(params.pcGum, "number");
      params.pcQty = qty;
      params.pcReqty = reqty;
      params.pcDanga = +removeCommas(danga, "number");
      params.pcJaego = +removeCommas(params.pcJaego, "number");

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
              <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
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
            value={qty}
            onChange={(e: any) => {
              handleQtyChange(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
          />
        ),
        4: (
          <Input
            type="number"
            name="pcReqty"
            value={reqty}
            onChange={(e: any) => {
              handleReqtyChange(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
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
                readOnly
                textAlign="right"
              />
            )}
          />
        ),
        6: (
          <Input
            name="pcDanga"
            value={danga}
            onChange={(e: any) => {
              handleDangaChange(e.target.value);
            }}
            inputSize={InputSize.i100}
            textAlign="right"
            mask={currencyMask}
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
