import { Input, Field, Wrapper, FormGroup, Label } from "components/form/style";
import CheckBox from "components/checkbox";
import CustomDatePicker from "components/customDatePicker";
import { Controller } from "react-hook-form";
import { InputSize } from "components/componentsType";

function Tab6({ register, control }: { register: Function; control: any }) {
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
              labelStyle={{ minWidth: "80px" }}
              register={register("cuSmsHp")}
              inputSize={InputSize.i130}
            />

            <Field flex style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "80px" }}>신청일자</Label>

              <Controller
                control={control}
                {...register("cuSmsDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ width: "130px" }}
                  />
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
        <Field>
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
              labelStyle={{ minWidth: "80px" }}
              register={register("cuCashpayNo")}
              inputSize={InputSize.i130}
            />

            <Field flex style={{ alignItems: "center" }}>
              <Label style={{ minWidth: "80px" }}>신청일자</Label>

              <Controller
                control={control}
                {...register("cuCashpayDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ width: "130px" }}
                  />
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
        </Field>
      </Field>
    </Field>
  );
}

export default Tab6;
