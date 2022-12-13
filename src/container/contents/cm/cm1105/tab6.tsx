import { Input, Field, Wrapper, FormGroup, Label } from "components/form/style";
import CheckBox from "components/checkbox";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import { Controller } from "react-hook-form";

function Tab6({
  register,
  control,
}: // cuSmsDate,
// setCuSmsDate,
// cuCashpayDate,
// setCuCashpayDate,
{
  register: Function;
  control: any;
  // cuSmsDate: string;
  // setCuSmsDate: Function;
  // cuCashpayDate: string;
  // setCuCashpayDate: Function;
}) {
  return (
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
              fullWidth
            />

            <Field flex style={{ alignItems: "center" }}>
              <Label>신청일자</Label>
              {/* <CustomDatePicker
                value={cuSmsDate}
                setValue={setCuSmsDate}
                name="cuSmsDate"
              /> */}
              <Controller
                control={control}
                {...register("cuSmsDate")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
          </Wrapper>

          <Wrapper>
            <Input label="비고" register={register("cuSmsMemo")} fullWidth />
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
            <Input label="발행 번호" register={register("cuCashpayNo")} />

            <Field flex style={{ alignItems: "center" }}>
              <Label>신청일자</Label>
              {/* <CustomDatePicker
                value={cuCashpayDate}
                setValue={setCuCashpayDate}
                name="cuCashpayDate"
              /> */}
              <Controller
                control={control}
                {...register("cuCashpayDate")}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
          </Wrapper>

          <Wrapper>
            <Input
              label="비고"
              register={register("cuCashpayMemo")}
              fullWidth
            />
          </Wrapper>
        </div>
      </Field>
    </Field>
  );
}

export default Tab6;
