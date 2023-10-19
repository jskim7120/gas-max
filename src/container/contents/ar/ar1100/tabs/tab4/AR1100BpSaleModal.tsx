import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Update, Reset, WhiteClose } from "components/allSvgIcon";
import { FormGroup, Select, Label, Input } from "components/form/style";
import { ModalBlueHeader } from "components/modal/customModals/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "./grid";
import { tableHeader3, tableHeader4 } from "./tableHeader";
import { IAR110065DETAIL } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";
import Table from "components/table";
import EditableSelect from "components/editableSelect";
import useModal from "app/hook/useModal";

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

  const { register, handleSubmit, reset, setFocus, control, watch } =
    useForm<IAR110065DETAIL>({
      mode: "onSubmit",
    });

  const { showAR1100BupumModal, openModal: openModalBupum } = useModal();

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOpenModalBupum = () => {
    openModalBupum();
  };

  const tableData1 = [
    {
      0: (
        <FormGroup>
          <Select
            name="pjVatDiv"
            // value={vatDiv}
            width={InputSize.i70}
            // onChange={(e) => handleChangeVatDiv(e.target.value)}
          >
            {/* {dictionary?.pjVatDiv?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))} */}
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
            {/* {dictionary?.bgInkumType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))} */}
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
            {/* {dictionary?.bgAcbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))} */}
          </Select>
        </FormGroup>
      ),
      2: (
        <Input
          name="bgInkum"
          //value={inkum}
          onChange={(e: any) =>
            // handleChangeInkumOrDc(e.target.value, "inkum")
            console.log("")
          }
          inputSize={InputSize.i100}
          textAlign="right"
          mask={currencyMask}
        />
      ),
      3: (
        <Input
          name="bgDc"
          // value={dc}
          onChange={(e: any) =>
            //handleChangeInkumOrDc(e.target.value, "dc")
            console.log("")
          }
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
            {/* {dictionary?.bgSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))} */}
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
        <Grid data={rawData} openModal={handleOpenModalBupum} />
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
