import { useState } from "react";
import {
  Input,
  Input2,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
} from "components/form/style";
import { currencyMask } from "helpers/currency";

import { Controller } from "react-hook-form";

import CustomDatePicker from "components/customDatePicker/test-datepicker";
import { InputSize } from "components/componentsType";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";

function Tab2({
  customerInfo,
  dataCommonDic,
  register,
  too,
  setToo,
  sign,
  setSign,
  control,
}: // setCuMeterTurm,
// setCuMeterDt,
// setCuMdate,
// cuMeterTurm,
// cuMeterDt,
// cuMdate,
{
  customerInfo: any;
  dataCommonDic: any;
  register: Function;
  too: number;
  setToo: Function;
  sign: string;
  setSign: Function;
  control: any;
  // setCuMeterTurm: any;
  // setCuMeterDt: any;
  // setCuMdate: any;
  // cuMeterTurm: any;
  // cuMeterDt: any;
  // cuMdate: any;
}) {
  const [cuRdangaType, setCuRdangaType] = useState("");

  return (
    <div>
      <Field flex className="outer-border ">
        <Field className="gray-title">
          <p>
            체적 <br />
            단가
          </p>
        </Field>
        <Field>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <FormGroup>
              <Label>조정기압력</Label>
              <Select {...register("cuRh2o")}>
                {dataCommonDic?.cuRh20?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <p>mmH20</p>
            </FormGroup>

            <FormGroup>
              <Label>루베단가</Label>
              <Select
                {...register("cuRdangaType")}
                width={InputSize.i100}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setCuRdangaType(e.target.value);
                }}
              >
                {dataCommonDic?.cuRdangaType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {cuRdangaType === "1" ? (
              <Field flex style={{ alignItems: "center" }}>
                <Input
                  register={register("cuRdanga")}
                  inputSize={InputSize.sm}
                  textAlign="right"
                  style={{ border: "1px solid #e6e5e5" }}
                />
                <Select
                  {...register("cuRdangaSign")}
                  onChange={(e: any) => setSign(e.target.value)}
                  style={{ minWidth: "50px", border: "1px solid #e6e5e5" }}
                >
                  <option value="+">+</option>
                  <option value="*">*</option>
                  <option value="-">-</option>
                </Select>

                <Input2
                  name="percentage"
                  id="percentage"
                  type="text"
                  onChange={(e: any) => setToo(Number(e.target.value))}
                />

                <p>
                  {sign === "*" && "%"}
                  {sign === "+" && "원"}
                </p>
                <p style={{ margin: "0 5px" }}>=</p>
                <p>
                  {sign !== "*"
                    ? eval(`${customerInfo?.cuRdanga} ${sign} ${too}`)
                    : eval(`${customerInfo?.cuRdanga} ${sign} ${too}/100`)}
                </p>
              </Field>
            ) : (
              <Input
                register={register("cuRdanga")}
                inputSize={InputSize.sm}
                textAlign="right"
                style={{ border: "1px solid #e6e5e5" }}
              />
            )}
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex>
              {/* <Input
                label="연체율"
                register={register("cuPer")}
                inputSize={InputSize.i50}
                textAlign="right"
                maxLength="3"
              /> */}

              <Controller
                control={control}
                {...register("cuPer")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="연체율"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={[/\d/, /\d/, /\d/]}
                    inputSize={InputSize.i50}
                    textAlign="right"
                  />
                )}
              />

              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Field flex>
              {/* <Input
                label="할인율"
                register={register("cuCdc")}
                textAlign="right"
                inputSize={InputSize.i120}
                maxLength="3"
              /> */}
              <Controller
                control={control}
                {...register("cuCdc")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="할인율"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={[/\d/, /\d/, /\d/]}
                    inputSize={InputSize.i50}
                    textAlign="right"
                  />
                )}
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Input
              label="순번"
              register={register("cuCno")}
              inputSize={InputSize.sm}
            />
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex>
              {/* <Input
                label="관리비"
                register={register("cuAnkum")}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              /> */}
              <Controller
                control={control}
                {...register("cuAnkum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="관리비"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    inputSize={InputSize.i130}
                  />
                )}
              />
              <p style={{ marginLeft: "-3px" }}>원</p>
            </Field>
            <Field flex>
              {/* <Input
                label="시설비"
                register={register("cuSisulkum")}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              /> */}
              <Controller
                control={control}
                {...register("cuSisulkum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="시설비"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    inputSize={InputSize.i130}
                  />
                )}
              />
              <p style={{ marginLeft: "-3px" }}>원</p>
            </Field>
            <Field flex>
              {/* <Input
                label="계량기교체비"
                register={register("cuMeterkum")}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              /> */}
              <Controller
                control={control}
                {...register("cuMeterkum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="계량기교체비"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    inputSize={InputSize.i130}
                  />
                )}
              />
              <p>원</p>
            </Field>
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <FormGroup>
              <Label>검침주기</Label>
              <Select {...register("cuGumTurm")} width={InputSize.i120}>
                {dataCommonDic?.cuGumTurm?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Field flex style={{ alignItems: "center" }}>
              {/* <Input
                label="검침일"
                register={register("cuGumdate")}
                inputSize={InputSize.i60}
                maxLength="2"
              /> */}
              <Controller
                control={control}
                {...register("cuGumdate")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="검침일"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={[/\d/, /\d/]}
                    inputSize={InputSize.i40}
                  />
                )}
              />
              <p>일</p>
            </Field>
            <Label style={{ width: "105px" }}></Label>
          </Wrapper>
        </Field>
      </Field>

      <Field
        flex
        className="outer-border"
        style={{
          marginTop: "20px",
        }}
      >
        <Field className="gray-title">
          <p>
            계량기
            <br />
            정보
          </p>
        </Field>
        <Field>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <FormGroup>
              <Label>계량기 제조사</Label>
              <Select {...register("cuMeterCo")} width={InputSize.i100}>
                {dataCommonDic?.cuMeterCo?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>계량기유형</Label>
              <Select {...register("cuMeterFeture")}>
                {dataCommonDic?.cuMeterFeture?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <Field flex style={{ alignItems: "center" }}>
              <FormGroup>
                <Label>계량기정보</Label>
                <Select {...register("cuMeterLr")} width={InputSize.i100}>
                  {dataCommonDic?.cuMeterLr?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <Select {...register("cuMeterType")}>
                {dataCommonDic?.cuMeterType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Field flex>
                <Input
                  register={register("cuMeterM3")}
                  inputSize={InputSize.xs}
                  textAlign="right"
                />
                <p>㎥/h</p>
              </Field>
            </Field>
          </Wrapper>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Input label="계량기번호" register={register("cuMeterNo")} />
            <Field flex style={{ alignItems: "center" }}>
              <Label>유효기간</Label>
              {/* <CustomDatePicker
                value={cuMeterTurm}
                setValue={setCuMeterTurm}
                name="cuMeterTurm"
              /> */}
              <Controller
                control={control}
                {...register("cuMeterTurm")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <FormGroup style={{ alignItems: "center" }}>
                <Label>설치장소</Label>
                <Select {...register("cuMeterPlace")}>
                  {dataCommonDic?.cuMeterPlace?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <p>바코드번호</p>
              </FormGroup>

              <Input register={register("cuBarcode")} />
            </Field>
          </Wrapper>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex style={{ alignItems: "center" }}>
              <Label>교체일자</Label>
              {/* <CustomDatePicker
                value={cuMeterDt}
                setValue={setCuMeterDt}
                name="cuMeterDt"
              /> */}
              <Controller
                control={control}
                {...register("cuMeterDt")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <Label>교체예정일</Label>
              {/* <CustomDatePicker
                value={cuMdate}
                setValue={setCuMdate}
                name="cuMdate"
              /> */}
              <Controller
                control={control}
                {...register("cuMdate")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <Input label="발신기코드" register={register("cuMTransmCd")} />
              <p>원격검침 고객코드</p>
              <Input register={register("blabla")} inputSize={InputSize.sm} />
              <SearchBtn type="button" onClick={() => alert("dsdsds")}>
                <MagnifyingGlass />
              </SearchBtn>
            </Field>
          </Wrapper>
        </Field>
      </Field>
    </div>
  );
}

export default Tab2;
