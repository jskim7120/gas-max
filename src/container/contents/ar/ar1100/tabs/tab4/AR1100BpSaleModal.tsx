import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useSelector, useDispatch } from "app/store";
import { Update, Reset, WhiteClose, List } from "components/allSvgIcon";
import {
  FormGroup,
  Select,
  Label,
  Input,
  CustomForm,
} from "components/form/style";
import { ModalBlueHeader } from "components/modal/customModals/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "./grid";
import { tableHeader3, tableHeader4 } from "./tableHeader";
import { IAR110065DETAIL, emtObjBpSaleModal, emtObjTab4 } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask, removeCommas } from "helpers/currency";
import Table from "components/table";
import EditableSelect from "components/editableSelect";
import useModal from "app/hook/useModal";

import {
  AR1100BPSALEINSERT,
  AR1100BPSALEUPDATE,
  AR1100BUPUMSEARCH,
  AR1100SELECT,
} from "app/path";
import { apiGet, apiPost } from "app/axios";
import { calculationOfVat, prepVal } from "../../helper";
import { DateWithoutDash } from "helpers/dateFormat";

const LLabel = styled.label`
  background: rgba(104, 103, 103, 0.35);
  width: 80px;
  font-size: 14px;
  text-align: right;
  padding: 2px 10px 0 0;
`;
const IInput = styled.input`
  border: 1px solid #bbbbbb;
  outline: none;
  padding: 0 5px;
`;

const FFormGroup = styled.div`
  height: 25px;
  display: flex;
  margin-right: 3px;
`;

function Modal({ setModalOpen }: { setModalOpen: Function }) {
  const [toggler, setToggler] = useState<boolean>(false);

  const { register, handleSubmit, reset, control, watch, getValues } =
    useForm<IAR110065DETAIL>({
      mode: "onSubmit",
    });

  const { showAR1100BupumModal, openModal: openModalBupum } = useModal();
  const dispatch = useDispatch();

  const paramState: any = useSelector(
    (state) => state.modal.ar1100Tab4Multiple
  );

  const bupum: any = useSelector((state) => state.modal.bupum);

  const [data, setData] = useState<any>({});
  const [dictionary, setDictionary] = useState<any>({});
  const [gridData, setGridData] = useState<Array<any>>([]);

  useEffect(() => {
    if (Object.keys(paramState)?.length > 0) {
      console.log("paramState>>>>>>>>>>>>>>>>>", paramState);
      setDictionary({
        bgAcbCode: paramState?.bgAcbCode,
        bgInkumType: paramState?.bgInkumType,
        bgSwCode: paramState?.bgSwCode,
        bgVatDiv: paramState?.bgVatDiv,
        saleState: paramState?.saleState,
      });
      reset(paramState?.detailData[0]);
      setData(paramState?.detailData[0]);

      if (paramState?.isAddBtnClicked === false) {
        setGridData([...paramState?.gridData, emtObjBpSaleModal]);
      } else if (paramState?.isAddBtnClicked === true) {
        setGridData([emtObjBpSaleModal]);
      }
      setToggler((prev) => !prev);
    }
  }, [paramState]);

  useEffect(() => {
    if (bupum.tick !== undefined && bupum?.index !== undefined) {
      setGridData((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === bupum.index) {
            return {
              bglBpCode: bupum?.bglBpCode,
              bglBpName: bupum?.bglBpName,
              bglBpType: bupum?.bglBpType,
              bglQty: 0,
              bglDanga: bupum?.bglBpDanga,
              bglKumack: 0,
              bglBigo: "",
            };
          } else return object;
        })
      );
      if (gridData?.length - 1 === bupum.index) {
        setGridData((prev) => [...prev, emtObjBpSaleModal]);
      }
    }
  }, [bupum.tick]);

  useEffect(() => {
    if (watch("bgVatDiv") !== undefined && watch("bgVatDiv") !== "") {
      handleChangeVatDiv(watch("bgVatDiv"));
    }
  }, [watch("bgVatDiv")]);

  useEffect(() => {
    if (watch("bgSvKumack") !== undefined) {
      handleChangefields(watch("bgSvKumack"), "kumack");
    }
  }, [watch("bgSvKumack")]);

  useEffect(() => {
    if (watch("bgInkum") !== undefined) {
      handleChangefields(watch("bgInkum"), "inkum");
    }
  }, [watch("bgInkum")]);

  useEffect(() => {
    if (watch("bgDc") !== undefined) {
      handleChangefields(watch("bgDc"), "dc");
    }
  }, [watch("bgDc")]);

  useEffect(() => {
    if (watch("bgInkumType") !== undefined) {
      handleChangeInkumType(watch("bgInkumType"));
    }
  }, [watch("bgInkumType")]);

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOpenModalBupum = () => {
    openModalBupum();
  };

  const handleChangeVatDiv = (val: string) => {
    let sumPrice = calculateSumPrice();

    const { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
      sumPrice,
      watch("bgVatDiv")
    );
    const tempMisu = calculationOfMisu(sumPrice);

    reset((formValues) => ({
      ...formValues,
      bgKumSup: tempKumSup,
      bgKumVat: tempKumVat,
      bgTotal: tempTotal,
      bgMisu: tempMisu,
    }));
  };

  const handleChangeInkumType = (val: string) => {
    if (val === "A") {
      reset((formValues) => ({
        ...formValues,
        bgInkum: 0,
        bgDc: 0,
      }));
    }
    if (val !== "2") {
      reset((formValues) => ({
        ...formValues,
        acbCode: "",
      }));
    }
  };

  const calculateSumPrice = () => {
    let sumPrice: number = 0;

    if (gridData?.length > 0) {
      gridData.map((object: any) => {
        sumPrice += object.bglKumack ? object.bglKumack : 0;
      });
    }
    return sumPrice;
  };

  const calculationOfMisu = (tempTotal: number) => {
    let tempInkum = prepVal(getValues("bgInkum"));
    let tempKumack = prepVal(getValues("bgSvKumack"));
    let tempDc = prepVal(getValues("bgDc"));

    const tempMisu = tempTotal - tempInkum - tempDc - tempKumack;
    return tempMisu;
  };

  const handleChangefields = (val: number, type: string) => {
    let tempInkum: number = 0;
    let tempDc: number = 0;
    let tempKumack: number = 0;

    if (type === "inkum") {
      tempDc = prepVal(getValues("bgDc"));
      tempKumack = prepVal(getValues("bgSvKumack"));
      tempInkum = prepVal(val);
    } else if (type === "dc") {
      tempInkum = prepVal(getValues("bgInkum"));
      tempKumack = prepVal(getValues("bgSvKumack"));
      tempDc = prepVal(val);
    } else if (type === "kumack") {
      tempInkum = prepVal(getValues("bgInkum"));
      tempDc = prepVal(getValues("bgDc"));
      tempKumack = prepVal(val);
    }

    let bgTotal: number = getValues("bgTotal")
      ? +removeCommas(getValues("bgTotal"), "number")
      : 0;

    const tempMisu: number = bgTotal - tempDc - tempInkum - tempKumack;

    reset((formValues) => ({
      ...formValues,
      bgMisu: tempMisu,
    }));
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(AR1100SELECT, params);
    if (res && Object.keys(res)?.length > 0) {
      reset(res?.detailData[0]);

      setData(res?.detailData ? res?.detailData[0] : {});
      setGridData(
        res?.gridData
          ? [...res?.gridData, emtObjBpSaleModal]
          : [emtObjBpSaleModal]
      );

      setDictionary({
        bgAcbCode: res?.bgAcbCode,
        bgInkumType: res?.bgInkumType,
        bgSwCode: res?.bgSwCode,
        bgVatDiv: res?.bgVatDiv,
        saleState: res?.saleState,
      });
    } else {
      reset(emtObjTab4);
      setData([]);
      setGridData([emtObjBpSaleModal]);
      setDictionary({});
    }
  };

  const calculateFromGrid = (
    index: number,
    fieldName: string,
    value: number
  ) => {
    let price: number = 0;
    let sumPrice: number = 0;

    if (fieldName === "bglQty" || fieldName === "bglDanga") {
      if (fieldName === "bglQty") {
        price = +gridData[index].bglDanga * (isNaN(value) ? 0 : +value);
      } else if (fieldName === "bglDanga") {
        price = +gridData[index].bglQty * (isNaN(value) ? 0 : +value);
      }

      setGridData((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === index) {
            sumPrice += price;
            return {
              ...object,
              [fieldName]: value,
              bglKumack: price,
            };
          } else {
            sumPrice += object.bglKumack ? object.bglKumack : 0;
            return object;
          }
        })
      );

      const { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
        sumPrice,
        getValues("bgVatDiv")
      );
      const tempMisu = calculationOfMisu(sumPrice);

      reset((formValues) => ({
        ...formValues,
        bgKumSup: tempKumSup,
        bgKumVat: tempKumVat,
        bgTotal: tempTotal,
        bgMisu: tempMisu,
      }));
    } else {
      setGridData((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === index) {
            return {
              ...object,
              [fieldName]: value,
            };
          } else {
            return object;
          }
        })
      );
    }
  };

  const submit = async (params: any) => {
    if (paramState?.isAddBtnClicked !== undefined) {
      const path =
        paramState?.isAddBtnClicked === true
          ? AR1100BPSALEINSERT
          : AR1100BPSALEUPDATE;

      params.insertType = "0";
      if (paramState?.isAddBtnClicked === true) {
        params.bgSno = "";
      } else {
        params.bgDateB = DateWithoutDash(params.bgDate);
      }

      params.areaCode = "01"; //----------------------tur zuur
      params.saleState = "5";
      params.bgDate = DateWithoutDash(params?.bgDate);
      params.bgQty = +params?.bgQty;
      params.bgKumSup = +removeCommas(params.bgKumSup, "number");
      params.bgKumVat = +removeCommas(params.bgKumVat, "number");
      params.bgTotal = +removeCommas(params.bgTotal, "number");
      params.bgMisu = +removeCommas(params.bgMisu, "number");
      params.bgDanga = +removeCommas(params.bgDanga, "number");
      params.bgInkum = +removeCommas(params.bgInkum, "number");
      params.bgDc = +removeCommas(params.bgDc, "number");
      params.bgSvKumack = +removeCommas(params.bgSvKumack, "number");

      if (params.bgSwCode) {
        const bgSwName = dictionary?.bgSwCode?.find(
          (item: any) => item.code === params.bgSwCode
        )?.codeName;
        params.bgSwName = bgSwName;
      }

      const jsonItemList = gridData.filter(
        (obj: any) => obj.hasOwnProperty("bglQty") && obj.bglBpCode !== ""
      );

      const tempjson = jsonItemList.map((obj: any, idx: number) => {
        if (idx < 9) {
          return { ...obj, bglBpSno: `0${idx + 1}` };
        } else {
          return { ...obj, bglBpSno: `${idx + 1}` };
        }
      });

      params.jsonItemList = tempjson;

      const res = await apiPost(path, params, "저장이 성공하였습니다");
      if (res) {
        if (paramState?.isAddBtnClicked) {
          //await handleSubmitParent((d: any) => submitParent(d, "last"))();
        } else {
          //await handleSubmitParent((d: any) => submitParent(d))();
        }
      }
    }
  };

  const getAllBupum = () => {
    fetchData();
  };

  const fetchData = async () => {
    const response = await apiGet(AR1100BUPUMSEARCH, {
      areaCode: "01",
      bpCode: "",
      bpName: "",
      bpSearch: "",
      pjType: "4",
    });

    console.log("response>>>>>>>>>>", response);

    const tempGridData = response.map((obj: any) => ({
      bglBpCode: obj.bglBpCode,
      bglBpName: obj.bglBpName,
      bglDanga: obj.bglBpDanga,
      bglBpType: obj.bglBpType,
      bglBigo: "",
    }));
    setGridData(tempGridData);
  };

  const tableData1 = [
    {
      0: (
        <FormGroup>
          <Select register={register("bgVatDiv")} width={InputSize.i100}>
            {dictionary?.bgVatDiv?.map((obj: any, idx: number) => (
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
          name="bgKumSup"
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
      2: (
        <Controller
          control={control}
          name="bgKumVat"
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
      3: (
        <Controller
          control={control}
          name="bgTotal"
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
      4: (
        <Controller
          control={control}
          name="bgSvKumack"
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
        <EditableSelect
          list={[]}
          reset={reset}
          register={register("bgBigo")}
          watch={watch("bgBigo")}
          textAlign={"left"}
          style={{ width: "314px" }}
        />
      ),
    },
  ];

  const tableData2 = [
    {
      0: (
        <FormGroup>
          <Select register={register("bgInkumType")} width={InputSize.i100}>
            {dictionary?.bgInkumType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      1: (
        <FormGroup>
          <Select
            register={register("acbCode")}
            style={{ width: "314px" }}
            disabled={watch("bgInkumType") !== "2"}
          >
            {dictionary?.bgAcbCode?.map((obj: any, idx: number) => (
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
          name="bgInkum"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              textAlign="right"
              mask={currencyMask}
              readOnly={watch("bgInkumType") === "A"}
            />
          )}
        />
      ),
      3: (
        <Controller
          control={control}
          name="bgDc"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              textAlign="right"
              mask={currencyMask}
              readOnly={watch("bgInkumType") === "A"}
            />
          )}
        />
      ),
      4: (
        <Controller
          control={control}
          name="bgMisu"
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
      5: (
        <FormGroup>
          <Select register={register("bgSwCode")} width={InputSize.i100}>
            {dictionary?.bgSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
    },
  ];

  return (
    <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
      {showAR1100BupumModal()}
      <ModalBlueHeader
        className="handle "
        style={{ background: "rgba(101, 84, 255, 0.37)" }}
      >
        <FormGroup></FormGroup>
        <FormGroup>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "50px",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        <FFormGroup>
          <LLabel style={{}}>거래구분</LLabel>
          <IInput />
        </FFormGroup>

        <FFormGroup>
          <LLabel style={{}}>거래처 코드</LLabel>
          <IInput />
        </FFormGroup>

        <FFormGroup>
          <LLabel style={{}}>거래처명</LLabel>
          <IInput />
        </FFormGroup>
      </div>

      {/* 일자
          모든품목조회
      */}

      <div
        style={{
          padding: "0px 30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormGroup>
            <label
              style={{
                background: "#ccc",
                height: "30px",
                width: "80px",
                borderRadius: "5px",
                fontSize: "15px",
                paddingTop: "3px",
                textAlign: "center",
              }}
            >
              일자
            </label>
            <Controller
              control={control}
              name="bgDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
          </FormGroup>
          <div
            style={{
              width: "130px",
              height: "30px",
              borderRadius: "15px",
              background: "rgb(104, 103, 103)",
              color: "#fff",
              fontSize: "14px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={getAllBupum}
          >
            <List /> 모든품목조회
          </div>
        </div>

        <Grid
          data={gridData}
          openModal={handleOpenModalBupum}
          setToggler={setToggler}
          calculate={calculateFromGrid}
          toggler={toggler}
        />
        <Table
          className="no-space"
          tableHeader={tableHeader3}
          tableData={tableData1}
          style={{ marginBottom: "2px" }}
        />
        <Table
          className="no-space"
          tableHeader={tableHeader4}
          tableData={tableData2}
        />
        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "end",
            margin: "10px",
          }}
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
            onClick={(e) => setModalOpen(false)}
          />
        </div>
      </div>
    </CustomForm>
  );
}

export default Modal;
