import { useEffect, useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useSelector, useDispatch } from "app/store";
import { Update, Reset, WhiteClose } from "components/allSvgIcon";
import { FormGroup, Select, Label, Input } from "components/form/style";
import { ModalBlueHeader } from "components/modal/customModals/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "./grid";
import { tableHeader3, tableHeader4 } from "./tableHeader";
import { IAR110065DETAIL, emtObjBpSaleModal } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";
import Table from "components/table";
import EditableSelect from "components/editableSelect";
import useModal from "app/hook/useModal";

//import { addAR1100Tab4MultipleGrid } from "app/state/modal/modalSlice";
import { AR1100SELECT } from "app/path";
import { apiGet } from "app/axios";

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
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [qty, setQty] = useState<number>(0);
  const [danga, setDanga] = useState<number>(0);
  const [dc, setDc] = useState<number>(0);
  const [inkum, setInkum] = useState<number>(0);
  const [vatDiv, setVatDiv] = useState<string>("0");
  const [toggler, setToggler] = useState<boolean>(false);

  const { register, handleSubmit, reset, setFocus, control, watch, getValues } =
    useForm<IAR110065DETAIL>({
      mode: "onSubmit",
    });

  const dispatch = useDispatch();

  const paramState = useSelector((state) => state.modal.ar1100Tab4Params);
  const bupum: any = useSelector((state) => state.modal.bupum);

  const [data, setData] = useState<any>({});
  const [dictionary, setDictionary] = useState<any>({});
  const [gridData, setGridData] = useState<Array<any>>([]);

  useEffect(() => {
    fetchData65({
      ...paramState,
    });
  }, [paramState]);

  useEffect(() => {
    if (bupum.tick !== undefined && bupum?.index) {
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
    if (toggler !== undefined) {
    }
  }, [toggler]);

  const { showAR1100BupumModal, openModal: openModalBupum } = useModal();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOpenModalBupum = () => {
    openModalBupum();
  };

  const handleChangeVatDiv = (val: string) => {
    setVatDiv(val);
  };

  const handleChangeInkumOrDc = (val: number, type: string) => {
    if (type === "inkum") {
      setInkum(val);
    } else if (type === "dc") {
      setDc(val);
    }
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
    }
    setData(res);
  };

  const calculate = (index: number, fieldName: string, value: number) => {
    let price: number = 0;
    let sumPrice: number = 0;

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
          sumPrice += object.bglKumack;
          return object;
        }
      })
    );
    let bgKumSup: number = 0;
    let bgKumVat: number = 0;
    let bgTotal: number = 0;

    const { tempKumSup, tempKumVat, tempTotal } = calculationOfVat(
      sumPrice,
      getValues("bgVatDiv")
    );

    reset((formValues) => ({
      ...formValues,
      bgKumSup: tempKumSup,
      bgKumVat: tempKumVat,
      bgTotal: tempTotal,
    }));
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

  const tableData1 = [
    {
      0: (
        <FormGroup>
          <Select
            name="bgVatDiv"
            value={vatDiv}
            width={InputSize.i70}
            onChange={(e) => handleChangeVatDiv(e.target.value)}
          >
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
            style={{ width: "284px" }}
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
        <Input
          name="bgInkum"
          value={inkum}
          onChange={(e: any) => handleChangeInkumOrDc(e.target.value, "inkum")}
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      3: (
        <Input
          name="bgDc"
          value={dc}
          onChange={(e: any) => handleChangeInkumOrDc(e.target.value, "dc")}
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
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
    <form autoComplete="off">
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
          calculate={calculate}
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
            //disabled={data?.length === 0}
          />
          <Button
            text="취소"
            icon={<Reset />}
            type="button"
            onClick={(e) => setModalOpen(false)}
          />
        </div>
      </div>
    </form>
  );
}

export default Modal;
