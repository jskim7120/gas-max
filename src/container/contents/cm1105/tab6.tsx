import {
  Input,
  Field,
  Wrapper,
  DividerGray,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import CustomDate from "components/customDatePicker";

function Tab6({
  register,
  errors,
  reset,
}: {
  register: Function;
  errors: any;
  reset: Function;
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
}

export default Tab6;
