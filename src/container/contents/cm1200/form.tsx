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
    if (JSON.stringify(selected) !== "{}") {
      resetForm("reset");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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

  const resetForm = (type: string) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};

      if (type === "reset") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = value;
        }
        console.log("reset", newData);
        reset({ ...newData });
      }
    }
  };
  const onSubmit = handleSubmit(() => {});

  return (
    <form onSubmit={onSubmit}>
      {/* 1-1 Wrapper */}
      <Wrapper grid col={3}>
        <Input label="건물코드" register={register("cuCode")} />
        <Input label="건물명" register={register("cuName")} />
        <CheckBox
          title="건물명 지로 출력 안함."
          register={{ ...register("cuAptNameYn") }}
          rtl={true}
        />
      </Wrapper>
      <DividerGray />
      {/* 1-2 Wrapper */}
      <Wrapper col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title=""
                register={register("chkCuZipCode")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuZipCode")} inputSize={InputSize.xs} />
            <SearchBtn
              type="button"
              onClick={() => console.log("cuZipCode BTN")}
            >
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
        <Input register={register("cuAddr1")} inputSize={InputSize.md} />
        <Input register={register("cuAddr2")} inputSize={InputSize.md} />
      </Wrapper>
      <DividerGray />
      {/* 1-3 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>담당사원</Label>
            <Select {...register("cuSwCode")} style={{ width: "100%" }}>
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
            <Select {...register("cuJyCode")} style={{ width: "100%" }}>
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
            <Label>관리자분류</Label>
            <Select {...register("cuCustgubun")} style={{ width: "100%" }}>
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
      <DividerGray />
      {/* 2-1 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="조정기"
                register={register("chkCuRh20")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuRh20")}
              style={{ maxWidth: "175px", width: "100%" }}
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
                register={register("chkCuRdange")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuRdangaType")}
              style={{ maxWidth: "175px", width: "100%" }}
            >
              {dataCommonDic?.cuRdangaType.map((option: any, index: number) => {
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
            {/* cuRdanga  */}
            <p>2,850원</p>
            <Select {...register("cuRdangaSign")} style={{ width: "10%" }}>
              {dataCommonDic?.cuRdangaSign.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
            <Input
              inputSize={InputSize.xs}
              register={register("cuRdangaAMT")}
            />
            <p>%</p>
            <p>=</p>
            <p>2900 원</p>
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 2-2 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="관리비"
                register={register("chkCuAnKum")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuAnKum")} />
            <p>원</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="시설비"
                register={register("ckCuSisulKum")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuSisulKum")} />
            <p>원</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="계량기"
                register={register("chkCuMeterKum")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuMeterKum")} />
            <p>원</p>
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 2-3 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="연체율"
                register={register("chkCuPer")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuPer")} />
            <p>{`%`}</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="할인율"
                register={register("chkCuCdc")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuCdc")} />
            <p>{`%`}</p>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="수금방법"
                register={register("chkCuSukumtype")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuSukumtype")}
              style={{ maxWidth: "175px", width: "100%" }}
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
      <DividerGray />
      {/* 2-4 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>
              <CheckBox
                title="검침주기"
                register={register("chkCuGumTurm")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuGumTurm")}
              style={{ maxWidth: "175px", width: "100%" }}
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
                register={register("chkCuGumDate")}
                rtl={false}
              />
            </Label>
            <Select
              {...register("cuGumDate")}
              style={{ maxWidth: "175px", width: "100%" }}
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
                register={register("chkCuCno")}
                rtl={false}
              />
            </Label>
            <Input register={register("cuCno")} />
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      <DividerGray />
      {/* 3-1-1 Wrapper */}
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
        <Field>
          <FormGroup>
            <CustomDate
              label="완성검사일"
              name="cuFinishDate"
              register={register("cuFinishDate")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              label="정기검사일"
              name="cuCircuitDate"
              register={register("cuCircuitDate")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              label="검사예정일"
              name="cuScheduleDate"
              register={register("cuFinishDate")}
            />
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 3-2-1 Wrapper */}
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
            <Label align="center">제작년월</Label>
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
      {/* 3-2-2 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select {...register("makeCo1")} style={{ width: "100%" }}>
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
            <Select {...register("tankVol1")} style={{ width: "100%" }}>
              {dataCommonDic?.tankVol1?.map((option: any, index: number) => {
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
            <Input register={register("tankMakeSno1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("tankMakeDate1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("tankRcv1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankFinishDate1"
              register={register("tankFinishDate1")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankOutsiderDate1"
              register={register("tankOutsiderDate1")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankInsiderDate1"
              register={register("tankInsiderDate1")}
            />
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 3-2-3 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select {...register("makeCo2")} style={{ width: "100%" }}>
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
            <Select {...register("tankVol2")} style={{ width: "100%" }}>
              {dataCommonDic?.tankVol2?.map((option: any, index: number) => {
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
            <Input register={register("tankRcv1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankFinishDate2"
              register={register("tankFinishDate2")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankOutsiderDate2"
              register={register("tankOutsiderDate2")}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <CustomDate
              name="tankInsiderDate2"
              register={register("tankInsiderDate2")}
            />
          </FormGroup>
        </Field>
      </Wrapper>
      {/* 3-2-4 Wrapper */}
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
            <Input register={register("tankMax1")} inputSize={InputSize.xs} />
            <p>%</p>
            <Input
              register={register("tankTransmCd1")}
              inputSize={InputSize.sm}
            />
            <Input register={register("tankCuCd1")} inputSize={InputSize.sm} />
            <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <p>{`2)`}</p>
            <Input register={register("tankMax2")} inputSize={InputSize.xs} />
            <p>%</p>
            <Input
              register={register("tankTransmCd2")}
              inputSize={InputSize.sm}
            />
            <Input register={register("tankCuCd2")} inputSize={InputSize.sm} />
            <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 3-3-1 Wrapper */}
      <Wrapper grid col={3}>
        <Field>
          <FormGroup>
            <Label>용기시설</Label>
            {["일반", "싸이폰"].map((option, index) => {
              return (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={index}
                    {...register("cuCylinderType", {})}
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
        <Field>
          <FormGroup>
            <Label>용기수량</Label>
            <Select
              {...register("cuCylinderName")}
              style={{ maxWidth: "175px", width: "100%" }}
            >
              {dataCommonDic?.cuCylinderName?.map(
                (option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                }
              )}
            </Select>
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
              register={register("cuTransmCd1")}
              inputSize={InputSize.sm}
            />
            <Input
              register={register("cuTransmCd2")}
              inputSize={InputSize.sm}
            />{" "}
            <SearchBtn type="button" onClick={() => console.log("cuTransmCd2")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      {/* 3-4-1 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>기화기</Label>
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
            <Label align="center">제작년월</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">전원</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Label align="center">장치검사</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
      </Wrapper>
      {/* 3-4-2 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select {...register("gasifyCo1")} style={{ width: "100%" }}>
              {dataCommonDic?.gasifyCo1?.map((option: any, index: number) => {
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
            <Select {...register("gasifyVol1")} style={{ width: "100%" }}>
              {dataCommonDic?.gasifyVol1?.map((option: any, index: number) => {
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
            <Input register={register("gasifySno1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("gasifyMakeDate1")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("gasifyPower1")} />
          </FormGroup>
        </Field>
        <Field>
          <CustomDate
            name="gasifyCheckDate1"
            register={register("gasifyCheckDate1")}
          />
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
      </Wrapper>
      {/* 3-4-3 Wrapper */}
      <Wrapper grid col={9}>
        <Field>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Select {...register("gasifyCo2")} style={{ width: "100%" }}>
              {dataCommonDic?.gasifyCo2?.map((option: any, index: number) => {
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
            <Select {...register("gasifyVol2")} style={{ width: "100%" }}>
              {dataCommonDic?.gasifyVol2?.map((option: any, index: number) => {
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
            <Input register={register("gasifySno2")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("gasifyMakeDate2")} />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input register={register("gasifyPower2")} />
          </FormGroup>
        </Field>
        <Field>
          <CustomDate
            name="gasifyCheckDate2"
            register={register("gasifyCheckDate2")}
          />
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
        <Field>
          <FormGroup>{` `}</FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      <DividerGray />
    </form>
  );
}

export default Form;
