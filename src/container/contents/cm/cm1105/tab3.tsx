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

import CustomDatePicker from "components/customDatePicker";
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
}: {
  dataCommonDic: any;
  register: Function;
  control: any;
}) {
  return (
    <Field className="outer-border">
      <Field flex>
        <Field className="gray-title">
          <p>법정검사</p>
        </Field>
        <FormGroup>
          <Label style={{ minWidth: "100px", marginRight: "15px" }}>
            시설구분
          </Label>
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

          <Label style={{ minWidth: "100px" }}>완성검사일</Label>
          <Controller
            control={control}
            {...register("cuFinishDate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />

          <Label style={{ minWidth: "100px" }}>정기검사일</Label>
          <Controller
            control={control}
            {...register("cuCircuitDate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />

          <Label style={{ minWidth: "100px" }}>검사 예정일</Label>
          <Controller
            control={control}
            {...register("cuScheduleDate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </FormGroup>
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>탱크</p>
        </Field>
        <Field>
          <FormGroup>
            <Label
              style={{
                textAlign: "center",
                minWidth: "86px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제조사
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "86px",
                padding: "3px 0px 0px 0px",
              }}
            >
              용량(kg)
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "86px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제조번호
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "115px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제작년월
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "86px",
                padding: "3px 0px 0px 0px",
              }}
            >
              대여처
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "117px",
                padding: "3px 0px 0px 0px",
              }}
            >
              최초검사
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "116px",
                padding: "3px 0px 0px 0px",
              }}
            >
              외관검사
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "115px",
                padding: "3px 0px 0px 0px",
              }}
            >
              개방검사
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "65px",
                padding: "3px 0px 0px 0px",
              }}
            >
              게이지
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "75px",
                padding: "3px 0px 0px 0px",
              }}
            >
              발신기코드
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "90px",
                padding: "3px 0px 0px 0px",
              }}
            >
              잔량고객코드
            </Label>
          </FormGroup>

          <FormGroup>
            <Input
              register={register("tankMakeCo1")}
              inputSize={InputSize.i80}
            />
            <Select
              register={register("tankVol1", { valueAsNumber: true })}
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

            <Controller
              control={control}
              {...register("tankMakeDate1")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                  style={{ width: "110px" }}
                />
              )}
            />
            <Input register={register("tankRcv1")} inputSize={InputSize.i80} />
            <Controller
              control={control}
              {...register("tankFirstDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
            <Controller
              control={control}
              {...register("tankOutsideDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
            <Controller
              control={control}
              {...register("tankInsideDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
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
            <p style={{ marginLeft: "2px" }}>%</p>
            <Input
              register={register("tankTransmCd1")}
              inputSize={InputSize.i60}
            />
            <Input register={register("tankCuCd1")} inputSize={InputSize.i60} />
            <SearchBtn type="button" onClick={() => alert("dsdsds")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>

          <FormGroup>
            <Input
              register={register("tankMakeCo2")}
              inputSize={InputSize.i80}
            />
            <Select
              register={register("tankVol2", { valueAsNumber: true })}
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
            <Controller
              control={control}
              {...register("tankMakeDate2")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ width: "110px" }}
                  showMonthYearPicker
                />
              )}
            />
            <Input register={register("tankRcv2")} inputSize={InputSize.i80} />
            <Controller
              control={control}
              {...register("tankFirstDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
            <Controller
              control={control}
              {...register("tankOutsideDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
            <Controller
              control={control}
              {...register("tankInsideDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "110px" }}
                />
              )}
            />
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
            <p style={{ marginLeft: "2px" }}>%</p>
            <Input
              register={register("tankTransmCd2")}
              inputSize={InputSize.i60}
            />
            <Input register={register("tankCuCd2")} inputSize={InputSize.i60} />
            <SearchBtn type="button" onClick={() => alert("dsdsds")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>용기</p>
        </Field>

        <FormGroup>
          <Label style={{ minWidth: "100px", marginRight: "15px" }}>
            용기구분
          </Label>
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

          <Label style={{ minWidth: "100px" }}>용기수량</Label>
          <Select register={register("cuCylinderName")}>
            {dataCommonDic?.cuCylinderName?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <p>×</p>
          <Input
            register={register("cuCylinderQty", { valueAsNumber: true })}
            inputSize={InputSize.i60}
            textAlign="right"
          />
          <p>개</p>

          <Input register={register("cuTransmCd")} inputSize={InputSize.i60} />

          <Input
            register={register("cuTransmCuCd")}
            inputSize={InputSize.i60}
          />
          <SearchBtn type="button" onClick={() => alert("dsdsds")}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>
      </Field>
      <DividerDark />
      <Field flex>
        <Field className="gray-title">
          <p>기화기</p>
        </Field>
        <Field>
          <FormGroup>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제조사
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              용량(k)
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제조번호
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              제작년월
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              전원
            </Label>
            <Label
              style={{
                textAlign: "center",
                minWidth: "136px",
                padding: "3px 0px 0px 0px",
              }}
            >
              장치검사
            </Label>
          </FormGroup>

          <FormGroup>
            <Input
              register={register("gasifyCo1")}
              inputSize={InputSize.i130}
            />
            <Input
              register={register("gasifyVol1")}
              inputSize={InputSize.i130}
            />
            <Input
              register={register("gasifySno1")}
              inputSize={InputSize.i130}
            />
            <Controller
              control={control}
              {...register("gasifyMakeDate1")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                  style={{ width: "130px" }}
                />
              )}
            />
            <Input
              register={register("gasifyPower1")}
              inputSize={InputSize.i130}
            />
            <Controller
              control={control}
              {...register("gasifyCheckDate1")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "130px" }}
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Input
              register={register("gasifyCo2")}
              inputSize={InputSize.i130}
            />
            <Input
              register={register("gasifyVol2")}
              inputSize={InputSize.i130}
            />
            <Input
              register={register("gasifySno2")}
              inputSize={InputSize.i130}
            />
            <Controller
              control={control}
              {...register("gasifyMakeDate2")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                  style={{ width: "130px" }}
                />
              )}
            />
            <Input
              register={register("gasifyPower2")}
              inputSize={InputSize.i130}
            />

            <Controller
              control={control}
              {...register("gasifyCheckDate2")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "130px" }}
                />
              )}
            />
          </FormGroup>
        </Field>
      </Field>
    </Field>
  );
}

export default Tab3;
