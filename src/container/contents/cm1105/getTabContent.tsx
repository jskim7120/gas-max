import React from "react";
import {
  Input,
  Select,
  Field,
  ErrorText,
  Wrapper,
  DividerGray,
  FormGroup,
  Label,
  Divider,
  DividerDark,
} from "components/form/style";
import DaumAddress from "components/daum";
import { InputSize } from "components/componentsType";
import CheckBox from "components/checkbox";
import CustomDate from "components/customDatePicker";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

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

function getTabContent(
  customerInfo: any,
  id: number,
  register: any,
  errors: any,
  dataCommonDic: any,
  setAddress: any,
  reset: any,
  too: number,
  setToo: Function,
  sign: string,
  setSign: Function
) {
  const data0 = (
    <Field className="outer-border">
      <Wrapper grid col={4} fields="1fr 2fr 1.5fr 1.5fr">
        <Field>
          <FormGroup>
            <Label>공급 받는자</Label>
            <Select {...register("cuNoType")}>
              {dataCommonDic?.cuNoType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuNoType"]?.message}</ErrorText>
          </div>
        </Field>
        <Input register={register("cuNo")} errors={errors["cuNo"]?.message} />

        <Input
          label="종사업장"
          register={register("cuRCode")}
          errors={errors["cuRCode"]?.message}
        />
        <Field>
          <FormGroup>
            <Label>과세구분</Label>
            <Select {...register("cuBilltype")}>
              {dataCommonDic?.cuBilltype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuBilltype"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Input
          label="상호"
          register={register("cuSangho")}
          errors={errors["cuSangho"]?.message}
        />
        <div></div>
        <Input
          label="대표"
          register={register("cuSajang")}
          errors={errors["cuSajang"]?.message}
        />
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={2}>
        <Field flex style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("cuSzipcode")}
            errors={errors["cuSzipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("cuSaddr1")}
            errors={errors["cuSaddr1"]?.message}
            fullWidth
          />
        </Field>
        <Input
          register={register("cuSaddr2")}
          errors={errors["cuSaddr2"]?.message}
          fullWidth
          style={{ marginLeft: "0px" }}
        />
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={2}>
        <Input
          label="업태"
          register={register("cuUptae")}
          errors={errors["cuUptae"]?.message}
        />
        <Input
          label="종목"
          register={register("cuJongmok")}
          errors={errors["cuJongmok"]?.message}
        />
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Input
          label="담당자"
          register={register("cuSeSawon")}
          errors={errors["cuSeSawon"]?.message}
        />
        <Input
          label="부서명"
          register={register("cuDepartment")}
          errors={errors["cuDepartment"]?.message}
        />
        <Input
          label="이메일"
          register={register("cuSeEmail")}
          errors={errors["cuSeEmail"]?.message}
        />
        <Field>
          @
          <Select {...register("emailKind")}>
            {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Input
          label="담당자"
          register={register("cuSeSawon2")}
          errors={errors["cuSeSawon2"]?.message}
        />
        <Input
          label="부서명"
          register={register("cuDepartment2")}
          errors={errors["cuDepartment2"]?.message}
        />
        <Input
          label="이메일"
          register={register("cuSeEmail2")}
          errors={errors["cuSeEmail2"]?.message}
        />
        <Field>
          @
          <Select {...register("emailKind2")}>
            {dataCommonDic?.emailKind2?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <Label>SMS전송 유무</Label>
            <CheckBox register={{ ...register("cuSeSmsYn") }} />
          </FormGroup>
        </Field>
        <CheckBox
          title="거래명세표 첨부발행 유무"
          register={{ ...register("cuSeListYn") }}
        />
        <Field>
          <FormGroup>
            <Label>팩스 번호</Label>
            <CheckBox register={{ ...register("cuSeFaxYn") }} />
          </FormGroup>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <Label>공급사업자</Label>
            <Select {...register("cuGongsano")}>
              {dataCommonDic?.cuGongsano?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuGongsano"]?.message}</ErrorText>
          </div>
        </Field>
        <div></div>
        <Field>
          <FormGroup>
            <Label>계산서 발행주기</Label>
            <Select {...register("cuSekumMm")}>
              {dataCommonDic?.cuSekumNm?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuSekumMm"]?.message}</ErrorText>
          </div>
        </Field>
        <Input
          register={register("cuSekumDate")}
          errors={errors["cuSekumDate"]?.message}
        />
      </Wrapper>
    </Field>
  );
  const data1 = (
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
                <Select {...register("cuRdangaType")}>
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
            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("cuRdanga")}
                errors={errors["cuRdanga"]?.message}
                inputSize={InputSize.sm}
                textAlign="right"
              />
              {/* <Input
                register={register("cuRdangaSign")}
                errors={errors["cuRdangaSign"]?.message}
                inputSize={InputSize.xxs}
                style={{ textAlign: "center" }}
              /> */}

              <Select
                {...register("cuRdangaSign")}
                onChange={(e: any) => setSign(e.target.value)}
                style={{ minWidth: "50px" }}
              >
                <option value="+">+</option>
                <option value="*">*</option>
                <option value="-">-</option>
              </Select>

              <Input
                register={register("percentage")}
                errors={errors["percentage"]?.message}
                inputSize={InputSize.xs}
                style={{ textAlign: "center" }}
                onChange={(e: any) => setToo(Number(e.target.value))}
              />

              <p>
                {sign === "*" && "%"}
                {sign === "+" && "원"}
              </p>
              <p style={{ margin: "0 5px" }}>=</p>
              <p>{eval(`${customerInfo?.cuRdanga} ${sign} ${too}`)}</p>
            </Field>
          </Wrapper>
          <DividerGray />
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Input
              label="연체율"
              register={register("cuPer")}
              errors={errors["cuPer"]?.message}
            />
            <Input
              label="할인율"
              register={register("cuCdc")}
              errors={errors["cuCdc"]?.message}
            />
            <Input
              label="순번"
              register={register("cuCno")}
              errors={errors["cuCno"]?.message}
              inputSize={InputSize.md}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field flex>
              <Input
                label="관리비"
                register={register("cuAnkum")}
                errors={errors["cuAnkum"]?.message}
              />
              <p>원</p>
            </Field>
            <Field flex>
              <Input
                label="시설비"
                register={register("cuSisulkum")}
                errors={errors["cuSisulkum"]?.message}
              />
              <p>원</p>
            </Field>
            <Field flex>
              <Input
                label="계량기교체비"
                register={register("cuMeterkum")}
                errors={errors["cuMeterkum"]?.message}
              />
              <p>원</p>
            </Field>
          </Wrapper>
          <DividerGray />
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
          {/* <Field style={{ width: "100%" }}> */}
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Field>
              <FormGroup>
                <Label>계량기 제조사</Label>
                <Select {...register("cuMeterCo")}>
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
                  <Select {...register("cuMeterLr")}>
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
              <Input
                register={register("cuMeterM3")}
                errors={errors["cuMeterM3"]?.message}
              />
            </Field>
          </Wrapper>
          <Wrapper grid fields={"1fr 1fr 2fr"}>
            <Input
              label="계량기번호"
              register={register("cuMeterNo")}
              errors={errors["cuMeterNo"]?.message}
            />
            <Field style={{ width: "100%" }}>
              <CustomDate
                label="유효기간"
                name="cuMeterTurm"
                register={register("cuMeterTurm")}
                reset={reset}
                errors={errors["cuMeterTurm"]?.message}
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
            <Field style={{ width: "100%" }}>
              <CustomDate
                label="교체일자"
                name="cuMeterDt"
                register={register("cuMeterDt")}
                reset={reset}
                errors={errors["cuMeterDt"]?.message}
              />
            </Field>
            <Field style={{ width: "100%" }}>
              <CustomDate
                label="교체예정일"
                name="cuMdate"
                register={register("cuMdate")}
                reset={reset}
                errors={errors["cuMdate"]?.message}
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
  const data2 = (
    <Field className="outer-border">
      <Field flex>
        <Field className="gray-title">
          <p>법정검사</p>
        </Field>
        <Wrapper grid col={4}>
          <FormGroup>
            <Label>시설구분</Label>
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
          <Field style={{ width: "100%" }}>
            <CustomDate
              label="완성검사일"
              name="cuFinishDate"
              register={register("cuFinishDate")}
              reset={reset}
              errors={errors["cuFinishDate"]?.message}
            />
          </Field>
          <Field style={{ width: "100%" }}>
            <CustomDate
              label="정기검사일"
              name="cuCircuitDate"
              register={register("cuCircuitDate")}
              reset={reset}
              errors={errors["cuCircuitDate"]?.message}
            />
          </Field>
          <Field style={{ width: "100%" }}>
            <CustomDate
              label="검사 예정일"
              name="cuScheduleDate"
              register={register("cuScheduleDate")}
              reset={reset}
              errors={errors["cuScheduleDate"]?.message}
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
          <Wrapper grid col={11}>
            <Label style={{ textAlign: "center" }}>제조사</Label>
            <Label style={{ textAlign: "center" }}>용량(kg)</Label>
            <Label style={{ textAlign: "center" }}>제조번호</Label>
            <Label style={{ textAlign: "center" }}>제작년월</Label>
            <Label style={{ textAlign: "center" }}>대여처</Label>
            <Label style={{ textAlign: "center" }}>최초검사</Label>
            <Label style={{ textAlign: "center" }}>외관검사</Label>
            <Label style={{ textAlign: "center" }}>개방검사</Label>
            <Label style={{ textAlign: "center" }}>게이지</Label>
            <Label style={{ textAlign: "center" }}>발신기코드</Label>
            <Label style={{ textAlign: "center" }}>잔량고객코드</Label>
          </Wrapper>
          <DividerGray />
          <Wrapper grid col={11}>
            <Input
              register={register("tankMakeCo1")}
              errors={errors["tankMakeCo1"]?.message}
            />
            <Select {...register("tankVol1")}>
              {dataCommonDic?.tankVol1?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              register={register("tankMakeSno1")}
              errors={errors["tankMakeSno1"]?.message}
            />
            <Input
              register={register("tankMakeDate1")}
              errors={errors["tankMakeDate1"]?.message}
            />
            <Input
              register={register("tankRcv1")}
              errors={errors["tankRcv1"]?.message}
            />
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankFirstDate1"
                register={register("tankFirstDate1")}
                reset={reset}
                errors={errors["tankFirstDate1"]?.message}
              />
            </Field>
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankOutsideDate1"
                register={register("tankOutsideDate1")}
                reset={reset}
                errors={errors["tankOutsideDate1"]?.message}
              />
            </Field>
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankInsideDate1"
                register={register("tankInsideDate1")}
                reset={reset}
                errors={errors["tankInsideDate1"]?.message}
              />
            </Field>
            <Input
              register={register("tankMax1")}
              errors={errors["tankMax1"]?.message}
            />
            <Input
              register={register("tankTransmCd1")}
              errors={errors["tankTransmCd1"]?.message}
            />
            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd1")}
                errors={errors["tankCuCd1"]?.message}
              />
              <SearchBtn type="button" onClick={() => alert("dsdsds")}>
                <MagnifyingGlass />
              </SearchBtn>
            </Field>
          </Wrapper>
          <DividerGray />
          <Wrapper grid col={11}>
            <Input
              register={register("tankMakeCo2")}
              errors={errors["tankMakeCo2"]?.message}
            />
            <Select {...register("tankVol2")}>
              {dataCommonDic?.tankVol2?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              register={register("tankMakeSno2")}
              errors={errors["tankMakeSno2"]?.message}
            />
            <Input
              register={register("tankMakeDate2")}
              errors={errors["tankMakeDate2"]?.message}
            />
            <Input
              register={register("tankRcv2")}
              errors={errors["tankRcv2"]?.message}
            />
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankFirstDate2"
                register={register("tankFirstDate2")}
                reset={reset}
                errors={errors["tankFirstDate2"]?.message}
              />
            </Field>
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankOutsideDate2"
                register={register("tankOutsideDate2")}
                reset={reset}
                errors={errors["tankOutsideDate2"]?.message}
              />
            </Field>
            <Field style={{ width: "100%" }}>
              <CustomDate
                name="tankInsideDate2"
                register={register("tankInsideDate2")}
                reset={reset}
                errors={errors["tankInsideDate2"]?.message}
              />
            </Field>
            <Input
              register={register("tankMax2")}
              errors={errors["tankMax2"]?.message}
            />
            <Input
              register={register("tankTransmCd2")}
              errors={errors["tankTransmCd2"]?.message}
            />
            <Field flex style={{ alignItems: "center" }}>
              <Input
                register={register("tankCuCd2")}
                errors={errors["tankCuCd2"]?.message}
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
        <Wrapper grid col={2}>
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
          <DividerGray />
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
            <Input
              register={register("gasifyCheckDate1")}
              errors={errors["gasifyCheckDate1"]?.message}
            />
          </Wrapper>
          <DividerGray />
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

  const data3 = (
    <Field className="outer-border">
      <Wrapper grid col={4}>
        <Input
          label="계약번호"
          register={register("cuGongno")}
          errors={errors["cuGongno"]?.message}
        />
        <Input
          label="계약자명"
          register={register("cuGongname")}
          errors={errors["cuGongname"]?.message}
        />
        <Input
          label="생년월일"
          register={register("cuJuminno")}
          errors={errors["cuJuminno"]?.message}
        />
        <CustomDate
          label="최종점검일"
          name="cuHdate"
          register={register("cuHdate")}
          reset={reset}
          errors={errors["cuHdate"]?.message}
        />
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field style={{ width: "100%" }}>
          <CustomDate
            label="공급계약일"
            name="cuGongdate"
            register={register("cuGongdate")}
            reset={reset}
            errors={errors["cuGongdate"]?.message}
          />
        </Field>
        <Field style={{ width: "100%" }}>
          <CustomDate
            label="계약만료일"
            name="cuGongdateT"
            register={register("cuGongdateT")}
            reset={reset}
            errors={errors["cuGongdateT"]?.message}
          />
        </Field>
        <Field>
          <FormGroup>
            <Label>계약갱신</Label>
            <Select {...register("cuExtendType")}>
              {dataCommonDic?.cuExtendType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuExtendType"]?.message}</ErrorText>
          </div>
        </Field>
        <Field style={{ width: "100%" }}>
          <CustomDate
            label="계약갱신일"
            name="cuExtendDate"
            register={register("cuExtendDate")}
            reset={reset}
            errors={errors["cuExtendDate"]?.message}
          />
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <Label>용기소유자</Label>
            <Select {...register("cuUsertong")}>
              {dataCommonDic?.cuUsertong?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuUsertong"]?.message}</ErrorText>
          </div>
        </Field>

        <Field>
          <FormGroup>
            <Label>시설소유자</Label>
            <Select {...register("cuUsersisul")}>
              {dataCommonDic?.cuUsersisul?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuUsersisul"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>보일러 사용</Label>
            <Select {...register("cuBoilerYn")}>
              {dataCommonDic?.cuBoilerYn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuBoilerYn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>온수기 사용</Label>
            <Select {...register("cuWaterYn")}>
              {dataCommonDic?.cuWaterYn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuWaterYn"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <Label>배관시설</Label>
            <Select {...register("cuPipelineYn")}>
              {dataCommonDic?.cuPipelineYn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuPipelineYn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>차단 장치</Label>
            <Select {...register("cuBlockYn")}>
              {dataCommonDic?.cuBlockYn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuBlockYn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>시설적합유무</Label>
            <Select {...register("cuSisulyn")}>
              {dataCommonDic?.cuSisulyn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuSisulyn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>검사 대상</Label>
            <Select {...register("cuGumsa")}>
              {dataCommonDic?.cuGumsa?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["cuGumsa"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <Field style={{ width: "100%" }}>
          <CustomDate
            label="체적시설 개선일"
            name="cuSisuldate"
            register={register("cuSisuldate")}
            reset={reset}
            errors={errors["cuSisuldate"]?.message}
          />
        </Field>
        <Field style={{ width: "100%" }}>
          <CustomDate
            label="퓨즈콕 개선일"
            name="cuPdate"
            register={register("cuPdate")}
            reset={reset}
            errors={errors["cuPdate"]?.message}
          />
        </Field>
        <Label style={{ width: "105px" }}></Label>
        <Label style={{ width: "105px" }}></Label>
      </Wrapper>
    </Field>
  );

  const data4 = (
    <Field>
      <Field
        flex
        className="outer-border"
        style={{
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            자동
            <br />
            이체
          </p>
        </Field>
        <Field>
          <Wrapper grid>
            <Input
              label="CMS구분"
              register={register("cmsGubun")}
              errors={errors["cmsGubun"]?.message}
            />
            <Input
              label="예금주"
              register={register("CMSdepositor")}
              errors={errors["CMSdepositor"]?.message}
            />
            <Input
              label="관리코드"
              register={register("managerNo")}
              errors={errors["managerNo"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="은행/카드"
              register={register("CMSbankName")}
              errors={errors["CMSbankName"]?.message}
            />
            <Input
              label="계좌/카드번호"
              register={register("CMSacctno")}
              errors={errors["CMSacctno"]?.message}
            />
            <Input
              label="전화번호"
              register={register("tel")}
              errors={errors["tel"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="승인일자"
              register={register("appdt")}
              errors={errors["appdt"]?.message}
            />
            <Input
              label="약정일"
              register={register("monthday")}
              errors={errors["monthday"]?.message}
            />
            <Input
              label="납부자상태"
              register={register("stateName")}
              errors={errors["stateName"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid col={2} fields="2fr 1fr">
            <Input
              label="비고"
              register={register("bigo")}
              errors={errors["bigo"]?.message}
            />

            <Input
              label="등록일시"
              register={register("CMSregDate")}
              errors={errors["CMSregDate"]?.message}
            />
          </Wrapper>
        </Field>
      </Field>
      <Field
        flex
        className="outer-border"
        style={{
          marginTop: "20px",
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            가상
            <br />
            계좌
          </p>
        </Field>
        <Field>
          <Wrapper grid>
            <Input
              label="은행명"
              register={register("VIRbankName")}
              errors={errors["VIRbankName"]?.message}
              fullWidth
            />
            <Input
              label="예금주"
              register={register("VIRdepositor")}
              errors={errors["VIRdepositor"]?.message}
              fullWidth
            />
            <Input
              label="관리코드"
              register={register("managerCode")}
              errors={errors["managerCode"]?.message}
              fullWidth
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="계좌번호"
              register={register("VIRacctno")}
              errors={errors["VIRacctno"]?.message}
              fullWidth
            />
            <Label style={{ width: "105px" }}></Label>

            <Input
              label="등록일시"
              register={register("VIRregDate")}
              errors={errors["VIRregDate"]?.message}
              fullWidth
            />
          </Wrapper>
        </Field>
      </Field>
    </Field>
  );
  const data5 = (
    <Field>
      <Field
        flex
        className="outer-border"
        style={{
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            모바일
            <br />
            청구서
          </p>
        </Field>
        <Field>
          <Wrapper grid>
            <Field>
              <FormGroup>
                <Label>SMS발행유무</Label>
                &nbsp;
                <CheckBox register={{ ...register("cuSmsYn") }} />
              </FormGroup>
            </Field>
            <Input
              label="수신자 번호"
              register={register("cuSmsHp")}
              errors={errors["cuSmsHp"]?.message}
              fullWidth
            />
            <CustomDate
              label="신청일자"
              name="cuSmsDate"
              register={register("cuSmsDate")}
              reset={reset}
              errors={errors["cuSmsDate"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper>
            <Input
              label="비고"
              register={register("cuSmsMemo")}
              errors={errors["cuSmsMemo"]?.message}
              fullWidth
            />
          </Wrapper>
        </Field>
      </Field>

      <Field
        flex
        className="outer-border"
        style={{
          marginTop: "20px",
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            현금
            <br />
            영수증
          </p>
        </Field>
        <div>
          <Wrapper grid>
            <Field>
              <FormGroup>
                <Label>발행유무</Label>
                &nbsp;
                <CheckBox register={{ ...register("cuCashpayYn") }} />
              </FormGroup>
            </Field>
            <Input
              label="발행 번호"
              register={register("cuCashpayNo")}
              errors={errors["cuCashpayNo"]?.message}
            />
            <CustomDate
              label="신청일자"
              name="cuCashpayDate"
              register={register("cuCashpayDate")}
              reset={reset}
              errors={errors["cuCashpayDate"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper>
            <Input
              label="비고"
              register={register("cuCashpayMemo")}
              errors={errors["cuSmscuCashpayMemoMemo"]?.message}
              fullWidth
            />
          </Wrapper>
        </div>
      </Field>
    </Field>
  );

  switch (id) {
    case 0:
      return data0;
    case 1:
      return data1;
    case 2:
      return data2;
    case 3:
      return data3;
    case 4:
      return data4;
    case 5:
      return data5;
  }
  return null;
}

export default getTabContent;
