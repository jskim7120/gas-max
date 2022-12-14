import {
  Input,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
  DividerDark,
} from "components/form/style";

import { Controller } from "react-hook-form";

import CustomDatePicker from "components/customDatePicker/test-datepicker";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { InputSize } from "components/componentsType";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";

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
  control,
}: // setCuFinishDate,
// setCuCircuitDate,
// setCuScheduleDate,
// setTankFirstDate1,
// setTankOutsideDate1,
// setTankInsideDate1,
// setTankFirstDate2,
// setTankOutsideDate2,
// setTankInsideDate2,
// setGasifyCheckDate1,
// cuFinishDate,
// cuCircuitDate,
// cuScheduleDate,
// tankFirstDate1,
// tankOutsideDate1,
// tankInsideDate1,
// tankFirstDate2,
// tankOutsideDate2,
// tankInsideDate2,
// gasifyCheckDate1,
// gasifyCheckDate2,
// setGasifyCheckDate2,
{
  dataCommonDic: any;
  register: Function;
  control: any;
  // setCuFinishDate: any;
  // setCuCircuitDate: any;
  // setCuScheduleDate: any;
  // setTankFirstDate1: any;
  // setTankOutsideDate1: any;
  // setTankInsideDate1: any;
  // setTankFirstDate2: any;
  // setTankOutsideDate2: any;
  // setTankInsideDate2: any;
  // setGasifyCheckDate1: any;
  // cuFinishDate: string;
  // cuCircuitDate: string;
  // cuScheduleDate: string;
  // tankFirstDate1: string;
  // tankOutsideDate1: string;
  // tankInsideDate1: string;
  // tankFirstDate2: string;
  // tankOutsideDate2: string;
  // tankInsideDate2: string;
  // gasifyCheckDate1: string;
  // gasifyCheckDate2: string;
  // setGasifyCheckDate2: any;
}) {
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
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>

          <Field flex style={{ alignItems: "center" }}>
            <Label>완성검사일</Label>
            {/* <CustomDatePicker
              value={cuFinishDate}
              setValue={setCuFinishDate}
              name="cuFinishDate"
              style={{ margin: "5px 5px 0 5px" }}
            /> */}
            <Controller
              control={control}
              {...register("cuFinishDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>

          <Field flex style={{ alignItems: "center" }}>
            <Label>정기검사일</Label>
            {/* <CustomDatePicker
              value={cuCircuitDate}
              setValue={setCuCircuitDate}
              name="cuCircuitDate"
              style={{ margin: "5px 5px 0 5px" }}
            /> */}
            <Controller
              control={control}
              {...register("cuCircuitDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>

          <Field flex style={{ alignItems: "center" }}>
            <Label>검사 예정일</Label>
            {/* <CustomDatePicker
              value={cuScheduleDate}
              setValue={setCuScheduleDate}
              name="cuScheduleDate"
              style={{ margin: "5px 5px 0 5px" }}
            /> */}
            <Controller
              control={control}
              {...register("cuScheduleDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
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
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankMakeDate1")}
              inputSize={InputSize.i80}
              maxLength="6"
            />
            <Input register={register("tankRcv1")} inputSize={InputSize.i80} />

            <Field>
              {/* <CustomDatePicker
                value={tankFirstDate1}
                setValue={setTankFirstDate1}
                name="tankFirstDate1"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankFirstDate1")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>

            <Field>
              {/* <CustomDatePicker
                value={tankOutsideDate1}
                setValue={setTankOutsideDate1}
                name="tankOutsideDate1"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankOutsideDate1")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>

            <Field>
              {/* <CustomDatePicker
                value={tankInsideDate1}
                setValue={setTankInsideDate1}
                name="tankInsideDate1"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankInsideDate1")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field flex>
              {/* <Input
                register={register("tankMax1")}
                inputSize={InputSize.i60}
                textAlign="right"
                maxLength="3"
              /> */}
              <Controller
                control={control}
                {...register("tankMax1")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={[/\d/, /\d/, /\d/]}
                    inputSize={InputSize.i50}
                  />
                )}
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Input
              register={register("tankTransmCd1")}
              inputSize={InputSize.i60}
            />
            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd1")}
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
              inputSize={InputSize.i80}
            />
            <Input
              register={register("tankMakeDate2")}
              inputSize={InputSize.i80}
              maxLength="6"
            />
            <Input register={register("tankRcv2")} inputSize={InputSize.i80} />

            <Field>
              {/* <CustomDatePicker
                value={tankFirstDate2}
                setValue={setTankFirstDate2}
                name="tankFirstDate2"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankFirstDate2")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>

            <Field>
              {/* <CustomDatePicker
                value={tankOutsideDate2}
                setValue={setTankOutsideDate2}
                name="tankOutsideDate2"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankOutsideDate2")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>

            <Field>
              {/* <CustomDatePicker
                value={tankInsideDate2}
                setValue={setTankInsideDate2}
                name="tankInsideDate2"
                style={{ margin: "5px 5px 0 5px" }}
              /> */}
              <Controller
                control={control}
                {...register("tankInsideDate2")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field flex>
              {/* <Input
                register={register("tankMax2")}
                inputSize={InputSize.i60}
                textAlign="right"
                maxLength="3"
              /> */}
              <Controller
                control={control}
                {...register("tankMax2")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={[/\d/, /\d/, /\d/]}
                    inputSize={InputSize.i50}
                  />
                )}
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>

            <Input
              register={register("tankTransmCd2")}
              inputSize={InputSize.i60}
            />

            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd2")}
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
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>

          <Field flex style={{ alignItems: "center" }}>
            <FormGroup>
              <Label>용기수량</Label>
              <Select {...register("cuCylinderName")}>
                {dataCommonDic?.cuCylinderName?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <p>×</p>
            <Input
              register={register("cuCylinderQty")}
              inputSize={InputSize.xs}
              textAlign="right"
            />
            <p>개</p>
          </Field>

          <Field flex style={{ alignItems: "center", justifyContent: "end" }}>
            <Input
              register={register("cuTransmCd")}
              inputSize={InputSize.i60}
            />

            <Input
              register={register("cuTransmCuCd")}
              inputSize={InputSize.i60}
              style={{ marginLeft: "20px" }}
            />
            <SearchBtn type="button" onClick={() => alert("dsdsds")}>
              <MagnifyingGlass />
            </SearchBtn>
          </Field>
        </Wrapper>
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
            <Input register={register("gasifyCo1")} />
            <Input register={register("gasifyVol1")} />
            <Input register={register("gasifySno1")} />
            <Input register={register("gasifyMakeDate1")} maxLength="6" />
            <Input register={register("gasifyPower1")} />

            {/* <CustomDatePicker
              value={gasifyCheckDate1}
              setValue={setGasifyCheckDate1}
              name="gasifyCheckDate1"
              style={{ margin: "5px 5px 0 5px" }}
            /> */}
            <Controller
              control={control}
              {...register("gasifyCheckDate1")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Wrapper>

          <Wrapper grid col={8}>
            <Input register={register("gasifyCo2")} />
            <Input register={register("gasifyVol2")} />
            <Input register={register("gasifySno2")} />
            <Input register={register("gasifyMakeDate2")} maxLength="6" />
            <Input register={register("gasifyPower2")} />

            {/* <CustomDatePicker
              value={gasifyCheckDate2}
              setValue={setGasifyCheckDate2}
              name="gasifyCheckDate2"
              style={{ margin: "5px 5px 0 5px" }}
            /> */}
            <Controller
              control={control}
              {...register("gasifyCheckDate2")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Wrapper>
        </Field>
      </Field>
    </Field>
  );
}

export default Tab3;
