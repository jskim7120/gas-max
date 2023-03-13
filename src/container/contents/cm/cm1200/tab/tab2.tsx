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

function tab2({
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
      {/* 3-1-1 Wrapper */}
      <Wrapper grid col={4}>
        <FormGroup>
          <Label>공급시설구분</Label>
          {[
            { name: "벌크공급", value: "Y" },
            { name: "용기공급", value: "N" },
          ].map((option, index) => {
            return (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.value}
                  {...register("cuTankYn")}
                  id={option.value}
                />
                <RadioButtonLabel htmlFor={`${option.value}`}>
                  {option.name}
                </RadioButtonLabel>
              </Item>
            );
          })}
        </FormGroup>
        <Field flex style={{ alignItems: "center" }}>
          <Label>완성검사일</Label>
          <Controller
            control={control}
            {...register("cuFinishDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker value={value} onChange={onChange} name={name} />
            )}
          />
        </Field>
        <Field flex style={{ alignItems: "center" }}>
          <Label>정기검사일</Label>
          <Controller
            control={control}
            {...register("cuCircuitDate")}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
        <Field flex style={{ alignItems: "center" }}>
          <Label>검사예정일</Label>
          <Controller
            control={control}
            {...register("cuScheduleDate")}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
      </Wrapper>
      {/* 3-2-1 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label style={{ minWidth: "70px" }}>벌크 시설</Label>
        </FormGroup>
        <Wrapper>
          <Label align={"center"}>제조사</Label>
          <Label align={"center"}>용량(kg)</Label>
          <Label align={"center"}>제조번호</Label>
          <Label align={"center"}>제작년월</Label>
          <Label align={"center"}>대여처</Label>
          <Label align={"center"}>최초검사</Label>
          <Label align={"center"}>외관검사</Label>
          <Label align={"center"}>개방검사</Label>
          <Label align={"center"}>Max레벨 / 발신기코드 / 탱크고객코드</Label>
        </Wrapper>
      </Field>
      {/* 3-2-2 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label style={{ minWidth: "70px" }}>{`1)`}</Label>
        </FormGroup>
        <Wrapper>
          <Field>
            <FormGroup>
              <EditableSelect
                list={dataCommonDic?.tankMakeCo1}
                register={register("tankMakeCo1")}
                textAlign={"left"}
                style={{ width: "125px", marginRight: "5px" }}
              />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CSelect
                {...register("tankVol1")}
                width={InputSize.i80}
                textAlign="right"
              >
                {dataCommonDic?.tankVol1?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input register={register("tankMakeSno1")} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input maxLength="7" register={register("tankMakeDate1")} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input register={register("tankRcv1")} />
            </FormGroup>
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankFirstDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankOutsideDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankInsideDate1")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <FormGroup>
              <Input
                register={register("tankMax1")}
                maxLength="3"
                textAlign="right"
                inputSize={InputSize.i40}
                placeholder=""
              />
              <p>%</p>
              <Input
                register={register("tankTransmCd1")}
                placeholder=""
                inputSize={InputSize.sm}
              />
              <Input
                register={register("tankCuCd1")}
                placeholder=""
                inputSize={InputSize.sm}
              />
              <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Field>
        </Wrapper>
      </Field>
      {/* 3-2-3 Wrapper */}
      <Field flex>
        <FormGroup>
          <Label style={{ minWidth: "70px" }}>{`2)`}</Label>
        </FormGroup>
        <Wrapper>
          <Field>
            <FormGroup>
              <EditableSelect
                list={dataCommonDic?.tankMakeCo2}
                register={register("tankMakeCo2")}
                textAlign={"left"}
                style={{ width: "125px", marginRight: "5px" }}
              />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CSelect
                {...register("tankVol2")}
                width={InputSize.i80}
                textAlign="right"
              >
                {dataCommonDic?.tankVol2?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input register={register("tankMakeSno2")} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input register={register("tankMakeDate2")} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input register={register("tankRcv2")} />
            </FormGroup>
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankFirstDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankOutsideDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <Controller
              control={control}
              {...register("tankInsideDate2")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field>
            <FormGroup>
              <Input
                register={register("tankMax2")}
                placeholder=""
                inputSize={InputSize.i40}
                textAlign="right"
              />
              <p>%</p>
              <Input
                register={register("tankTransmCd2")}
                placeholder=""
                inputSize={InputSize.sm}
              />
              <Input
                register={register("tankCuCd2")}
                placeholder=""
                inputSize={InputSize.sm}
              />
              <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Field>
        </Wrapper>
      </Field>
    </div>
  );
}

export default tab2;
