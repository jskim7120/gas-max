import {
  Input,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
  DividerDark,
} from "components/form/style";
// import CustomDate from "components/customDatePicker";
import CustomDatePicker from "components/customDatePicker/customdate2";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { InputSize } from "components/componentsType";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import { useState } from "react";

const radioOptions = [
  {
    label: "벌크공급",
    id: "0",
  },
  {
    label: "용기공급",
    id: "1",
  },
];

const radioOptions2 = [
  {
    label: "일반용기",
    id: "0",
  },
  {
    label: "싸이폰용기",
    id: "1",
  },
];

function Tab3({
  dataCommonDic,
  register,
  errors,
  reset,
}: {
  dataCommonDic: any;
  register: Function;
  errors: any;
  reset: Function;
}) {
  const [cuFinishDate, setCuFinishDate] = useState("");
  const [cuCircuitDate, setCuCircuitDate] = useState("");
  const [cuScheduleDate, setCuScheduleDate] = useState("");
  const [tankFirstDate1, setTankFirstDate1] = useState("");
  const [tankOutsideDate1, setTankOutsideDate1] = useState("");
  const [tankInsideDate1, setTankInsideDate1] = useState("");
  const [tankFirstDate2, setTankFirstDate2] = useState("");
  const [tankOutsideDate2, setTankOutsideDate2] = useState("");
  const [tankInsideDate2, setTankInsideDate2] = useState("");
  const [gasifyCheckDate1, setGasifyCheckDate1] = useState("");

  return (
    <Field className="outer-border">
      <Field flex>
        <Field className="gray-title">
          <p>법정검사</p>
        </Field>
        <Wrapper grid col={4}>
          <FormGroup>
            <Label style={{ minWidth: "auto" }}>시설구분</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`cuTankYn`)}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
          {/* <Field style={{ width: "100%" }}>
            <CustomDate
              label="완성검사일"
              name="cuFinishDate"
              register={register("cuFinishDate")}
              reset={reset}
              errors={errors["cuFinishDate"]?.message}
            />
          </Field> */}
          <Field flex style={{ alignItems: "center" }}>
            <Label>완성검사일</Label>
            <CustomDatePicker
              value={cuFinishDate}
              setValue={setCuFinishDate}
              name="cuFinishDate"
              style={{ margin: "5px 5px 0 5px" }}
            />
          </Field>
          {/* <Field style={{ width: "100%" }}>
            <CustomDate
              label="정기검사일"
              name="cuCircuitDate"
              register={register("cuCircuitDate")}
              reset={reset}
              errors={errors["cuCircuitDate"]?.message}
            />
          </Field> */}
          <Field flex style={{ alignItems: "center" }}>
            <Label>정기검사일</Label>
            <CustomDatePicker
              value={cuCircuitDate}
              setValue={setCuCircuitDate}
              name="cuCircuitDate"
              style={{ margin: "5px 5px 0 5px" }}
            />
          </Field>
          {/* <Field style={{ width: "100%" }}>
            <CustomDate
              label="검사 예정일"
              name="cuScheduleDate"
              register={register("cuScheduleDate")}
              reset={reset}
              errors={errors["cuScheduleDate"]?.message}
            />
          </Field> */}
          <Field flex style={{ alignItems: "center" }}>
            <Label>검사 예정일</Label>
            <CustomDatePicker
              value={cuScheduleDate}
              setValue={setCuScheduleDate}
              name="cuScheduleDate"
              style={{ margin: "5px 5px 0 5px" }}
            />
          </Field>
        </Wrapper>
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>탱크</p>
        </Field>
        <Field style={{ width: "100%" }}>
          <Wrapper
            grid
            col={11}
            fields="1fr 1fr 1.1fr 1.1fr 1fr 1.5fr 1.5fr 1.5fr 1fr 1.1fr 1.1fr"
          >
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              제조사
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              용량(kg)
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              제조번호
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              제작년월
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              대여처
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              최초검사
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              외관검사
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              개방검사
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              게이지
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              발신기코드
            </Label>
            <Label style={{ textAlign: "center", minWidth: "auto" }}>
              잔량고객코드
            </Label>
          </Wrapper>

          <Wrapper
            grid
            col={11}
            fields="1fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr"
          >
            <Input
              register={register("tankMakeCo1")}
              errors={errors["tankMakeCo1"]?.message}
              inputSize={InputSize.i80}
            />
            <Select
              {...register("tankVol1")}
              textAlign="right"
              width={InputSize.i80}
            >
              {dataCommonDic?.tankVol1?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              register={register("tankMakeSno1")}
              errors={errors["tankMakeSno1"]?.message}
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankMakeDate1")}
              errors={errors["tankMakeDate1"]?.message}
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankRcv1")}
              errors={errors["tankRcv1"]?.message}
              inputSize={InputSize.i80}
            />
            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankFirstDate1"
                register={register("tankFirstDate1")}
                reset={reset}
                errors={errors["tankFirstDate1"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankFirstDate1}
                setValue={setTankFirstDate1}
                name="tankFirstDate1"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>

            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankOutsideDate1"
                register={register("tankOutsideDate1")}
                reset={reset}
                errors={errors["tankOutsideDate1"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankOutsideDate1}
                setValue={setTankOutsideDate1}
                name="tankOutsideDate1"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>
            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankInsideDate1"
                register={register("tankInsideDate1")}
                reset={reset}
                errors={errors["tankInsideDate1"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankInsideDate1}
                setValue={setTankInsideDate1}
                name="tankInsideDate1"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>
            <Field flex>
              <Input
                register={register("tankMax1")}
                errors={errors["tankMax1"]?.message}
                inputSize={InputSize.i60}
                textAlign="right"
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Input
              register={register("tankTransmCd1")}
              errors={errors["tankTransmCd1"]?.message}
              inputSize={InputSize.i60}
            />
            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd1")}
                errors={errors["tankCuCd1"]?.message}
                inputSize={InputSize.i60}
              />
              <SearchBtn type="button" onClick={() => alert("dsdsds")}>
                <MagnifyingGlass />
              </SearchBtn>
            </Field>
          </Wrapper>

          <Wrapper
            grid
            col={11}
            fields="1fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr"
          >
            <Input
              register={register("tankMakeCo2")}
              errors={errors["tankMakeCo2"]?.message}
              inputSize={InputSize.i80}
            />
            <Select
              {...register("tankVol2")}
              textAlign="right"
              width={InputSize.i80}
            >
              {dataCommonDic?.tankVol2?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              register={register("tankMakeSno2")}
              errors={errors["tankMakeSno2"]?.message}
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankMakeDate2")}
              errors={errors["tankMakeDate2"]?.message}
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankRcv2")}
              errors={errors["tankRcv2"]?.message}
              inputSize={InputSize.i80}
            />
            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankFirstDate2"
                register={register("tankFirstDate2")}
                reset={reset}
                errors={errors["tankFirstDate2"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankFirstDate2}
                setValue={setTankFirstDate2}
                name="tankFirstDate2"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>

            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankOutsideDate2"
                register={register("tankOutsideDate2")}
                reset={reset}
                errors={errors["tankOutsideDate2"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankOutsideDate2}
                setValue={setTankOutsideDate2}
                name="tankOutsideDate2"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>
            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankInsideDate2"
                register={register("tankInsideDate2")}
                reset={reset}
                errors={errors["tankInsideDate2"]?.message}
              />
            </Field> */}
            <Field>
              <CustomDatePicker
                value={tankInsideDate2}
                setValue={setTankInsideDate2}
                name="tankInsideDate2"
                style={{ margin: "5px 5px 0 5px" }}
              />
            </Field>
            <Field flex>
              <Input
                register={register("tankMax2")}
                errors={errors["tankMax2"]?.message}
                inputSize={InputSize.i60}
                textAlign="right"
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>

            <Input
              register={register("tankTransmCd2")}
              errors={errors["tankTransmCd2"]?.message}
              inputSize={InputSize.i60}
            />

            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd2")}
                errors={errors["tankCuCd2"]?.message}
                inputSize={InputSize.i60}
              />
              <SearchBtn type="button" onClick={() => alert("dsdsds")}>
                <MagnifyingGlass />
              </SearchBtn>
            </Field>
          </Wrapper>
        </Field>
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>용기</p>
        </Field>

        <Wrapper grid col={3}>
          <FormGroup>
            <Label>용기구분</Label>
            {radioOptions2.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`cuCylinderType`)}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>

          <Field flex style={{ alignItems: "center" }}>
            <Input
              label="용기수량"
              register={register("cuCylinderName")}
              errors={errors["cuCylinderName"]?.message}
              inputSize={InputSize.sm}
            />
            <p>×</p>
            <Input
              register={register("cuCylinderQty")}
              errors={errors["cuCylinderQty"]?.message}
              inputSize={InputSize.xs}
              textAlign="right"
            />
            <p>개</p>
          </Field>

          <Field flex style={{ alignItems: "center", justifyContent: "end" }}>
            <Input
              register={register("cuTransmCd")}
              errors={errors["cuTransmCd"]?.message}
              inputSize={InputSize.i60}
            />

            <Input
              register={register("cuTransmCuCd")}
              errors={errors["cuTransmCuCd"]?.message}
              inputSize={InputSize.i60}
              style={{ marginLeft: "5px" }}
            />
            <SearchBtn type="button" onClick={() => alert("dsdsds")}>
              <MagnifyingGlass />
            </SearchBtn>
          </Field>
        </Wrapper>
        {/* <Wrapper grid col={2}>
      <FormGroup>
        <Label>용기구분</Label>
        {radioOptions2.map((option, index) => (
          <Item key={index}>
            <RadioButton
              type="radio"
              value={option.id}
              {...register(`cuCylinderType`)}
              id={option.id}
              // onChange={() => console.log(option.label)}
            />
            <RadioButtonLabel htmlFor={`${option.label}`}>
              {option.label}
            </RadioButtonLabel>
          </Item>
        ))}
      </FormGroup>
      <Field flex style={{ alignItems: "center" }}>
        <Input
          label="용기수량"
          register={register("cuCylinderName")}
          errors={errors["cuCylinderName"]?.message}
        />
        <p>×</p>
        <Input
          register={register("cuCylinderQty")}
          errors={errors["cuCylinderQty"]?.message}
          inputSize={InputSize.sm}
        />
        <p>개</p>
      </Field>
    </Wrapper> */}
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>기화기</p>
        </Field>
        <Field style={{ width: "100%" }}>
          <Wrapper grid col={8}>
            <Label style={{ textAlign: "center" }}>제조사</Label>
            <Label style={{ textAlign: "center" }}>용량(k)</Label>
            <Label style={{ textAlign: "center" }}>제조번호</Label>
            <Label style={{ textAlign: "center" }}>제작년월</Label>
            <Label style={{ textAlign: "center" }}>전원</Label>
            <Label style={{ textAlign: "center" }}>장치검사</Label>
          </Wrapper>

          <Wrapper grid col={8}>
            <Input
              register={register("gasifyCo1")}
              errors={errors["gasifyCo1"]?.message}
            />
            <Input
              register={register("gasifyVol1")}
              errors={errors["gasifyVol1"]?.message}
            />
            <Input
              register={register("gasifySno1")}
              errors={errors["gasifySno1"]?.message}
            />
            <Input
              register={register("gasifyMakeDate1")}
              errors={errors["gasifyMakeDate1"]?.message}
            />
            <Input
              register={register("gasifyPower1")}
              errors={errors["gasifyPower1"]?.message}
            />

            {/* <Field style={{ width: "100%" }}>
              <CustomDate
                name="gasifyCheckDate1"
                register={register("gasifyCheckDate1")}
                reset={reset}
                errors={errors["gasifyCheckDate1"]?.message}
              />
            </Field> */}
            <CustomDatePicker
              value={gasifyCheckDate1}
              setValue={setGasifyCheckDate1}
              name="gasifyCheckDate1"
              style={{ margin: "5px 5px 0 5px" }}
            />
          </Wrapper>

          <Wrapper grid col={8}>
            <Input
              register={register("gasifyCo2")}
              errors={errors["gasifyCo2"]?.message}
            />
            <Input
              register={register("gasifyVol2")}
              errors={errors["gasifyVol2"]?.message}
            />
            <Input
              register={register("gasifySno2")}
              errors={errors["gasifySno2"]?.message}
            />
            <Input
              register={register("gasifyMakeDate2")}
              errors={errors["gasifyMakeDate2"]?.message}
            />
            <Input
              register={register("gasifyPower2")}
              errors={errors["gasifyPower2"]?.message}
            />
            <Input
              register={register("gasifyCheckDate2")}
              errors={errors["gasifyCheckDate2"]?.message}
            />
          </Wrapper>
        </Field>
      </Field>
    </Field>
  );
}

export default Tab3;
