import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useSelector, useDispatch } from "app/store";
import { Update, Reset, WhiteClose } from "components/allSvgIcon";
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
//import { addAR1100Tab4MultipleGrid } from "app/state/modal/modalSlice";
import { AR1100BPSALEINSERT, AR1100BPSALEUPDATE, AR1100SELECT } from "app/path";
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

const rawData = [
  {
    no: 1,
    jpCode: "001",
    jpName: "test1",
    qty: 1,
    danga: 5000,
    bigo: "bigo1",
  },
  {
    no: 2,
    jpCode: "002",
    jpName: "test2",
    qty: 1,
    danga: 6000,
    bigo: "bigo2",
  },
  {
    no: 3,
    jpCode: "003",
    jpName: "test3",
    qty: 1,
    danga: 2000,
    bigo: "bigo3",
  },
];

function Modal({ setModalOpen }: { setModalOpen: Function }) {
  const [toggler, setToggler] = useState<boolean>(false);

  const { register, handleSubmit, reset, setFocus, control, watch, getValues } =
    useForm<IAR110065DETAIL>({
      mode: "onSubmit",
    });

  const { showAR1100BupumModal, openModal: openModalBupum } = useModal();
  const dispatch = useDispatch();

  const paramState = useSelector((state) => state.modal.ar1100Tab4Params);
  const data71State = useSelector((state) => state.modal.ar1100Tab4Data71);
  const bupum: any = useSelector((state) => state.modal.bupum);

  const [data, setData] = useState<any>({});
  const [dictionary, setDictionary] = useState<any>({});
  const [gridData, setGridData] = useState<Array<any>>([]);

  useEffect(() => {
    if (paramState?.isAddBtnClicked !== undefined) {
      if (paramState?.isAddBtnClicked === false) {
        fetchData65({
          ...paramState,
        });
      }
      if (paramState?.isAddBtnClicked === true) {
        reset(data71State.detailData[0]);
        setData(data71State.detailData[0]);
        setGridData([emtObjBpSaleModal]);
        setDictionary({
          bgAcbCode: data71State?.bgAcbCode,
          bgInkumType: data71State?.bgInkumType,
          bgSwCode: data71State?.bgSwCode,
          bgVatDiv: data71State?.bgVatDiv,
          saleState: data71State?.saleState,
        });
      }
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

      setGridData((prev) => [...prev, emtObjBpSaleModal]);
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

      const jsonItemList = gridData.filter((obj: any) => obj.bglBpCode !== "");

      params.jsonItemList = jsonItemList;

      // console.log("modal params>>>>>>>>>>>>", params);
      // console.log(" josn list >>>>>>>>>>>>", jsonItemList);

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
        <Controller
          control={control}
          name="bgDate"
          render={({ field }) => <CustomDatePicker {...field} />}
        />
        <Grid
          data={gridData}
          openModal={handleOpenModalBupum}
          setToggler={setToggler}
          calculate={calculateFromGrid}
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
