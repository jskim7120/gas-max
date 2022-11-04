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
} from "components/form/style";
import DaumAddress from "components/daum";
import { InputSize } from "components/componentsType";
import CheckBox from "components/checkbox";
import CustomDate from "components/customDatePicker";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

const radioOptions = [
  {
    label: "전체",
    id: "0",
  },
  {
    label: "21세",
    id: "1",
  },
];

function getTabContent(
  id: number,
  register: any,
  errors: any,
  dataCommonDic: any,
  setAddress: any,
  reset: any
) {
  const data0 = (
    <div>
      <DividerGray />
      <Wrapper grid col={4}>
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

      <Wrapper style={{ alignItems: "center" }}>
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
        <Input
          register={register("cuSaddr2")}
          errors={errors["cuSaddr2"]?.message}
          fullWidth
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
      <DividerGray />
    </div>
  );
  const data1 = (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50px", height: "100%", border: "1px solid red" }}>
          체적 <br />
          단가
        </div>
        <div>
          <DividerGray />
          <Wrapper grid col={4}>
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
                <ErrorText>{errors["cuRh20"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <DividerGray />
          <Wrapper>
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
            />
          </Wrapper>
          <DividerGray />
          <Wrapper>
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
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "50px", height: "100%", border: "1px solid red" }}>
          계량기
          <br /> 정보
        </div>
        <div>
          <DividerGray />
          <Wrapper grid col={5}>
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
                <Select {...register("cuMeterType")}>
                  {dataCommonDic?.cuMeterType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <div>
                <ErrorText>{errors["cuMeterType"]?.message}</ErrorText>
              </div>
            </Field>
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
          </Wrapper>
          <Wrapper grid col={5}>
            <Input
              label="계량기번호"
              register={register("cuMeterNo")}
              errors={errors["cuMeterNo"]?.message}
            />
            <CustomDate
              label="유효기간"
              name="cuMeterTurm"
              register={register("cuMeterTurm")}
              reset={reset}
              errors={errors["cuMeterTurm"]?.message}
            />
            <Field>
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
              <div>
                <ErrorText>{errors["cuMeterPlace"]?.message}</ErrorText>
              </div>
            </Field>
            <Input
              register={register("cuBarcode")}
              errors={errors["cuBarcode"]?.message}
            />
          </Wrapper>
          <Wrapper grid col={5}>
            <CustomDate
              label="교체일자"
              name="cuMeterDt"
              register={register("cuMeterDt")}
              reset={reset}
              errors={errors["cuMeterDt"]?.message}
            />
            <CustomDate
              label="교체예정일"
              name="cuMdate"
              register={register("cuMdate")}
              reset={reset}
              errors={errors["cuMdate"]?.message}
            />
            <Field flex>
              <Input
                label="발신기코드"
                register={register("cuMTransmCd")}
                errors={errors["cuMTransmCd"]?.message}
              />
              <p>원격검침 고객코드</p>
            </Field>
            <input name="search" />
          </Wrapper>
        </div>
      </div>
    </div>
  );
  const data2 = (
    <div>
      <Wrapper grid col={4}>
        <Field flex style={{ alignItems: "center" }}>
          <p>법정검사</p>
          <FormGroup>
            <Label>시설구분</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`caBage`, {
                    required: "required",
                  })}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
        </Field>
        <CustomDate
          label="완성검사일"
          name="cuFinishDate"
          register={register("cuFinishDate")}
          reset={reset}
          errors={errors["cuFinishDate"]?.message}
        />
        <CustomDate
          label="정기검사일"
          name="cuCircuitDate"
          register={register("cuCircuitDate")}
          reset={reset}
          errors={errors["cuCircuitDate"]?.message}
        />
        <CustomDate
          label="검사 예정일"
          name="cuSisuldate"
          register={register("cuSisuldate")}
          reset={reset}
          errors={errors["cuSisuldate"]?.message}
        />
      </Wrapper>
      <Field flex>
        <div>탱크</div>
        <div>
          <Wrapper></Wrapper>
        </div>
      </Field>
    </div>
  );

  const data3 = (
    <Field>
      <Divider />
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
          name="cu"
          register={register("cu")}
          reset={reset}
          errors={errors["cu"]?.message}
        />
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}>
        <CustomDate
          label="공급계약일"
          name="cuGongdate"
          register={register("cuGongdate")}
          reset={reset}
          errors={errors["cuGongdate"]?.message}
        />
        <CustomDate
          label="계약만료일"
          name="cuGongdateT"
          register={register("cuGongdateT")}
          reset={reset}
          errors={errors["cuGongdateT"]?.message}
        />
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
        <CustomDate
          label="계약갱신일"
          name="cuExtendDate"
          register={register("cuExtendDate")}
          reset={reset}
          errors={errors["cuExtendDate"]?.message}
        />
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
            <Select {...register("cuUsertong")}>
              {dataCommonDic?.cuUsersisul?.map((obj: any, idx: number) => (
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
      </Wrapper>
      <DividerGray />
      <Wrapper grid col={4}></Wrapper>
      <DividerGray />
      <Wrapper grid col={4}></Wrapper>
      <Divider />
    </Field>
  );

  const data4 = (
    <Field>
      <Field
        flex
        style={{
          border: "1px solid #e6e5e5",
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          width: "fit-content",
        }}
      >
        <Field
          style={{ width: "55px", background: "#E8ECF1", padding: "15px 10px" }}
        >
          <p>
            자동
            <br />
            이체
          </p>
        </Field>
        <div>
          <Wrapper grid>
            <Field>
              <FormGroup>
                <Label>CMS구분</Label>
              </FormGroup>
            </Field>
          </Wrapper>
        </div>
      </Field>
    </Field>
  );
  const data5 = (
    <Field>
      <Field
        flex
        style={{
          border: "1px solid #e6e5e5",
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          width: "fit-content",
        }}
      >
        <Field
          style={{ width: "55px", background: "#E8ECF1", padding: "15px 10px" }}
        >
          <p>
            모바일
            <br />
            청구서
          </p>
        </Field>
        <div>
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
        </div>
      </Field>

      <Field
        flex
        style={{
          marginTop: "20px",
          border: "1px solid #e6e5e5",
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          width: "fit-content",
        }}
      >
        <Field
          style={{
            width: "55px",
            background: "#E8ECF1",
            padding: "15px 10px",
          }}
        >
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
