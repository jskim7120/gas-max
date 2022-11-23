import { useState } from "react";
import {
  Input,
  Input2,
  Select,
  Field,
  ErrorText,
  Wrapper,
  FormGroup,
  Label,
} from "components/form/style";
import CustomDate from "components/customDatePicker";
import CustomDatePicker from "components/customDatePicker/customdate2";
import { InputSize } from "components/componentsType";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";

function Tab2({
  customerInfo,
  dataCommonDic,
  register,
  errors,
  too,
  setToo,
  sign,
  setSign,
  reset,
}: {
  customerInfo: any;
  dataCommonDic: any;
  register: Function;
  errors: any;
  too: number;
  setToo: Function;
  sign: string;
  setSign: Function;
  reset: Function;
}) {
  const [cuRdangaType, setCuRdangaType] = useState("");
  const [cuMeterTurm, setCuMeterTurm] = useState("");
  const [cuMeterDt, setCuMeterDt] = useState("");
  const [cuMdate, setCuMdate] = useState("");
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
            <Field>
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
              <div>
                <ErrorText>{errors["cuRh2o"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
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
              <div>
                <ErrorText>{errors["cuRdangaType"]?.message}</ErrorText>
              </div>
            </Field>
            {cuRdangaType === "2" ? (
              <Field flex style={{ alignItems: "center" }}>
                <Input
                  register={register("cuRdanga")}
                  errors={errors["cuRdanga"]?.message}
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
                errors={errors["cuRdanga"]?.message}
                inputSize={InputSize.sm}
                textAlign="right"
                style={{ border: "1px solid #e6e5e5" }}
              />
            )}
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex>
              <Input
                label="연체율"
                register={register("cuPer")}
                errors={errors["cuPer"]?.message}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Field flex>
              <Input
                label="할인율"
                register={register("cuCdc")}
                errors={errors["cuCdc"]?.message}
                textAlign="right"
                inputSize={InputSize.i120}
              />
              <p style={{ marginLeft: "-3px" }}>%</p>
            </Field>
            <Input
              label="순번"
              register={register("cuCno")}
              errors={errors["cuCno"]?.message}
              inputSize={InputSize.sm}
            />
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex>
              <Input
                label="관리비"
                register={register("cuAnkum")}
                errors={errors["cuAnkum"]?.message}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              />
              <p style={{ marginLeft: "-3px" }}>원</p>
            </Field>
            <Field flex>
              <Input
                label="시설비"
                register={register("cuSisulkum")}
                errors={errors["cuSisulkum"]?.message}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              />
              <p style={{ marginLeft: "-3px" }}>원</p>
            </Field>
            <Field flex>
              <Input
                label="계량기교체비"
                register={register("cuMeterkum")}
                errors={errors["cuMeterkum"]?.message}
                textAlign="right"
                formatNumber="comNumber"
                inputSize={InputSize.i120}
              />
              <p>원</p>
            </Field>
          </Wrapper>

          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Input
              label="검침주기"
              register={register("cuGumTurm")}
              errors={errors["cuGumTurm"]?.message}
            />
            <Input
              label="검침일"
              register={register("cuGumdate")}
              errors={errors["cuGumdate"]?.message}
            />
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
            <Field>
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
              <div>
                <ErrorText>{errors["cuMeterCo"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <Label>계량기유형</Label>
                <Select {...register("cuMeterFeture")}>
                  {dataCommonDic?.cuMeterFeture?.map(
                    (obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    )
                  )}
                </Select>
              </FormGroup>
              <div>
                <ErrorText>{errors["cuMeterFeture"]?.message}</ErrorText>
              </div>
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <Field>
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
                <div>
                  <ErrorText>{errors["cuMeterLr"]?.message}</ErrorText>
                </div>
              </Field>
              <Field>
                <Select {...register("cuMeterType")}>
                  {dataCommonDic?.cuMeterType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <div>
                  <ErrorText>{errors["cuMeterType"]?.message}</ErrorText>
                </div>
              </Field>
              <Field flex>
                <Input
                  register={register("cuMeterM3")}
                  errors={errors["cuMeterM3"]?.message}
                  inputSize={InputSize.xs}
                />
                <p>㎥/h</p>
              </Field>
            </Field>
          </Wrapper>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Input
              label="계량기번호"
              register={register("cuMeterNo")}
              errors={errors["cuMeterNo"]?.message}
            />
            <Field flex style={{ alignItems: "center" }}>
              {/* <CustomDate
                label="유효기간"
                name="cuMeterTurm"
                register={register("cuMeterTurm")}
                reset={reset}
                errors={errors["cuMeterTurm"]?.message}
              /> */}
              <Label>유효기간</Label>
              <CustomDatePicker
                value={cuMeterTurm}
                setValue={setCuMeterTurm}
                name="cuMeterTurm"
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <Field>
                <FormGroup style={{ alignItems: "center" }}>
                  <Label>설치장소</Label>
                  <Select {...register("cuMeterPlace")}>
                    {dataCommonDic?.cuMeterPlace?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                  <p>바코드번호</p>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuMeterPlace"]?.message}</ErrorText>
                </div>
              </Field>
              <Input
                register={register("cuBarcode")}
                errors={errors["cuBarcode"]?.message}
              />
            </Field>
          </Wrapper>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex style={{ alignItems: "center" }}>
              {/* <CustomDate
                label="교체일자"
                name="cuMeterDt"
                register={register("cuMeterDt")}
                reset={reset}
                errors={errors["cuMeterDt"]?.message}
              /> */}

              <Label>교체일자</Label>
              <CustomDatePicker
                value={cuMeterDt}
                setValue={setCuMeterDt}
                name="cuMeterDt"
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              {/* <CustomDate
                label="교체예정일"
                name="cuMdate"
                register={register("cuMdate")}
                reset={reset}
                errors={errors["cuMdate"]?.message}
              /> */}
              <Label>교체예정일</Label>
              <CustomDatePicker
                value={cuMdate}
                setValue={setCuMdate}
                name="cuMdate"
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <Input
                label="발신기코드"
                register={register("cuMTransmCd")}
                errors={errors["cuMTransmCd"]?.message}
              />
              <p>원격검침 고객코드</p>
              <Input
                register={register("blabla")}
                errors={errors["blabla"]?.message}
                inputSize={InputSize.sm}
              />
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
