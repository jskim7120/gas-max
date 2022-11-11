import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass } from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import { FieldKind, InputSize } from "components/componentsType";
import CustomDate from "components/customDatePicker";
import { SearchBtn } from "components/daum";
import {
  DividerGray,
  Field,
  FormGroup,
  Input,
  Label,
  Select,
  Wrapper,
} from "components/form/style";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./validation";

function Form({
  selected,
  selectedRowIndex,
}: {
  selected: any;
  selectedRowIndex: number;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1200",
  });
  const { handleSubmit, reset, register } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
      cuGumTurm: dataCommonDic?.cuGumTurm[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,
      cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
      cuRh20: dataCommonDic?.cuRh20[0].code,
      cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
      cuSwCode: dataCommonDic?.cuSwCode[0].code,
      tankMakeVol1: dataCommonDic?.tankMakeVol1[0].code,
      tankMakeVol2: dataCommonDic?.tankMakeVol2[0].code,
      // do not have dataCommon
      // cuGumDate: dataCommonDic?.cuGumDate[0].code,
      // makeCo1: dataCommonDic?.makeCu[0].code,
      // makeCo2: dataCommonDic?.makeCu[0].code,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCommonDic]);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  const onSubmit = handleSubmit(() => {});

  return (
    <form onSubmit={onSubmit}>
      {/* 1-1 Wrapper */}
      <Wrapper grid col={3}>
        <Input
          label="건물코드"
          register={register("cuCode")}
          placeholder="123"
          kind={FieldKind.BORDER}
        />
        <Input
          label="건물명"
          register={register("cuName")}
          placeholder="자양 현대아파트 205동"
          kind={FieldKind.BORDER}
        />
        <CheckBox
          title="건물명 지로 출력 안함."
          register={register("cuAptNameYn")}
          rtl={true}
        />
      </Wrapper>
      {/* 1-2 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title=""
                register={register("cuZipCodeCheck")}
                rtl={false}
              />
            </Label>
            <Input
              placeholder="80625"
              register={register("cuZipCode")}
              kind={FieldKind.BORDER}
            />
            <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
        <Input
          register={register("cuAddr1")}
          placeholder="충북 청주시 청원구 1순환료211번길 41"
          kind={FieldKind.BORDER}
        />
        <Input
          register={register("cuAddr2")}
          placeholder="(대덕동) 자양현대아파트 205동  1502호"
          kind={FieldKind.BORDER}
        />
      </Wrapper>
      {/* 1-3 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>담당사원</Label>
            <Select
              {...register("cuSwCode")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuSwCode?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>지역분류</Label>
            <Select
              {...register("cuJyCode")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuJyCode?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>관리자</Label>
            <Select
              {...register("cuCustgubun")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuCustgubun?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 2-1 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="조정기"
                register={register("cuRh20Check")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuRh20")}
              kind={FieldKind.BORDER}
              style={{ width: "80%" }}
            >
              {dataCommonDic?.cuRh20?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
            <p>mmH20</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="루베단가"
                register={register("cuRh20")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("unknow")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {[0, 1, 2].map((option, index) => {
                return (
                  <option key={index} value={`value_${index}`}>
                    {`${index} 할인단가`}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 2-2 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="관리비"
                register={register("cuAnKum")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuAnKum")}
              placeholder="0"
              kind={FieldKind.BORDER}
            />
            <p>원</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="시설비"
                register={register("cuSisulKum")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuSisulKum")}
              placeholder="0"
              kind={FieldKind.BORDER}
            />
            <p>원</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="계량기"
                register={register("cuMeterKum")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuSisulKum")}
              placeholder="0"
              kind={FieldKind.BORDER}
            />
            <p>원</p>
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 2-3 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="연체율"
                register={register("cuPer")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuPer")}
              placeholder="2.5"
              kind={FieldKind.BORDER}
            />
            <p>{`%`}</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="할인율"
                register={register("cuCdc")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuAnKum")}
              placeholder="0.0"
              kind={FieldKind.BORDER}
            />
            <p>{`%`}</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="수금방법"
                register={register("unknown")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuSukumtype")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuSukumtype?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 2-4 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="검침주기"
                register={register("cuGumTurm")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuGumTurm")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuGumTurm?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="검침일"
                register={register("unknown")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuGumDate")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.cuGumDate?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
            <p>일</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="순 번"
                register={register("cuCno")}
                rtl={false}
              />
            </Label>
            <Input
              register={register("cuGumDate")}
              placeholder="0"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
      </Wrapper>

      <DividerGray />
      {/* 3-1 Wrapper */}
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <Label>공급시설구분</Label>
            {["벌크공급", "용기공급"].map((option, index) => {
              return (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={index}
                    {...register("cuTankYn", {})}
                    id={option}
                  />
                  <RadioButtonLabel htmlFor={`${option}`}>
                    {option}
                  </RadioButtonLabel>
                </Item>
              );
            })}
          </FormGroup>
        </Field>
        <CustomDate
          label="완성검사일"
          name="cuFinishDate"
          register={register("cuFinishDate")}
        />
        <CustomDate
          label="정기검사일"
          name="cuCircuitDate"
          register={register("cuCircuitDate")}
        />
        <CustomDate
          label="검사예정일"
          name="cuScheduleDate"
          register={register("cuFinishDate")}
        />
      </Wrapper>
      <DividerGray />
      {/* 3-2 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>벌크 시설</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">제조사</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">용량(kg)</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">제조번호</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">제조번호</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">대여처</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">최초검사</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">외관검사</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">개방검사</Label>
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 3-3 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select
              {...register("makeCo1")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.makeCo1?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select
              {...register("tankMakeVol1")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.tankMakeVol1?.map(
                (option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                }
              )}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeSno")}
              placeholder="JDP-99-402"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeDate")}
              placeholder="2006-09"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeRcv")}
              placeholder="자가"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <CustomDate
          name="tankFinishDate"
          register={register("tankFinishDate")}
        />
        <CustomDate
          name="tankOutsiderDate"
          register={register("tankOutsiderDate")}
        />
        <CustomDate
          name="tankInsiderDate"
          register={register("tankInsiderDate")}
        />
      </Wrapper>
      {/* 3-4 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select
              {...register("makeCo2")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.makeCo2?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select
              {...register("tankMakeVol2")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.tankMakeVol2?.map(
                (option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                }
              )}
            </Select>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeSno")}
              placeholder="BLKO.185V)-804"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeDate")}
              placeholder="2006-09"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              register={register("tankMakeRcv")}
              placeholder="자가"
              kind={FieldKind.BORDER}
            />
          </FormGroup>
        </Field>
        <CustomDate
          name="tankFinishDate"
          register={register("tankFinishDate")}
        />
        <CustomDate
          name="tankOutsiderDate"
          register={register("tankOutsiderDate")}
        />
        <CustomDate
          name="tankInsiderDate"
          register={register("tankInsiderDate")}
        />
      </Wrapper>
      {/* 3-5 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>{``}</Label>
            <Label>Max레벨 / 발신기코드 / 탱크고객코드</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <p>{`1)`}</p>
            <Input
              register={register("tankMakeSno")}
              placeholder="85"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <p>%</p>
            <Input
              register={register("tankMakeSno")}
              placeholder="0009-00152"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <Input
              register={register("tankMakeSno")}
              placeholder="00152"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <p>{`2)`}</p>
            <Input
              register={register("tankMakeSno")}
              placeholder="85"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <p>%</p>
            <Input
              register={register("tankMakeSno")}
              placeholder="0009-00152+"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <Input
              register={register("tankMakeSno")}
              placeholder="0009-00152+"
              inputSize={InputSize.sm}
              kind={FieldKind.BORDER}
            />
            <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
      </Wrapper>
    </form>
  );
}

export default Form;
