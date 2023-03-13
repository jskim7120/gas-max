import React from "react";
import { Controller } from "react-hook-form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select as CSelect,
  Wrapper,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import EditableSelect from "components/editableSelect";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";

function Tab3({
  register,
  dataCommonDic,
  control,
}: {
  register: Function;
  dataCommonDic: any;
  control: any;
}) {
  return (
    <div>
      {/* 3-3-1 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label>용기시설</Label>
        </FormGroup>
        <Wrapper grid col={3}>
          <Field style={{ padding: "0px 5px" }}>
            <FormGroup>
              {[
                { name: "일반", value: "Y" },
                { name: "싸이폰", value: "N" },
              ].map((option, index) => {
                return (
                  <Item key={index}>
                    <RadioButton
                      type="radio"
                      value={index}
                      {...register("cuCylinderType")}
                      id={option.value}
                    />
                    <RadioButtonLabel htmlFor={``}>
                      {option.name}
                    </RadioButtonLabel>
                  </Item>
                );
              })}
            </FormGroup>
          </Field>
          <Field style={{ padding: "0px 5px" }}>
            <FormGroup>
              <Label align="center">용기수량</Label>
              <CSelect {...register("cuCylinderName")} width={InputSize.i120}>
                {dataCommonDic?.cuCylinderName?.map(
                  (obj: any, index: number) => (
                    <option key={index} value={obj.code}>
                      {obj.codeName}
                    </option>
                  )
                )}
              </CSelect>
              <p>x</p>
              <Input
                register={register("cuCylinderQty")}
                inputSize={InputSize.xs}
              />
              <p>개</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>발신기코드 / 절체고객코드</Label>
              <Input
                register={register("cuTransmCd")}
                inputSize={InputSize.sm}
              />
              <Input
                register={register("cuTransmCuCd")}
                inputSize={InputSize.sm}
              />
              <SearchBtn
                type="button"
                onClick={() => console.log("cuTransmCuCd")}
              >
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Field>
        </Wrapper>
      </Field>
      {/* 3-4-1 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label>기화기</Label>
        </FormGroup>
        <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
          <Label align={"center"}>제조사</Label>
          <Label align={"center"}>용량(kg)</Label>
          <Label align={"center"}>제조번호</Label>
          <Label align={"center"}>제작년월</Label>
          <Label align={"center"}>전원</Label>
          <Label align={"center"}>장치검사</Label>
          <FormGroup>{` `}</FormGroup>
          <FormGroup>{` `}</FormGroup>
        </Wrapper>
      </Field>

      {/* 3-4-2 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label>{`1)`}</Label>
        </FormGroup>

        <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
          <FormGroup>
            <EditableSelect
              list={dataCommonDic?.gasifyCo1}
              register={register("gasifyCo1")}
              textAlign={"left"}
            />
          </FormGroup>
          <FormGroup>
            <CSelect {...register("gasifyVol1")} fullWidth>
              {dataCommonDic?.gasifyVol1?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>
          <Field>
            <Input register={register("gasifySno1")} />
          </Field>
          <Field>
            <Input maxLength="7" register={register("gasifyMakeDate1")} />
          </Field>
          <Field>
            <Input register={register("gasifyPower1")} />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("gasifyCheckDate1")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </Field>
        </Wrapper>
      </Field>
      {/* 3-4-3 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label>{`2)`}</Label>
        </FormGroup>
        <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
          <FormGroup>
            <EditableSelect
              list={dataCommonDic?.gasifyCo2}
              register={register("gasifyCo2")}
              textAlign={"left"}
            />
          </FormGroup>

          <FormGroup>
            <CSelect {...register("gasifyVol2")} fullWidth>
              {dataCommonDic?.gasifyVol2?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>
          <Field>
            <Input register={register("gasifySno2")} />
          </Field>
          <Field>
            <Input maxLength="7" register={register("gasifyMakeDate2")} />
          </Field>
          <Field>
            <Input register={register("gasifyPower2")} />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("gasifyCheckDate2")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </Field>
        </Wrapper>
      </Field>
    </div>
  );
}

export default Tab3;
