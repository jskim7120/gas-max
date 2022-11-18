import {
  Input,
  Select,
  Field,
  ErrorText,
  Wrapper,
  DividerGray,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import DaumAddress from "components/daum";

function Tab1({
  dataCommonDic,
  register,
  errors,
  setAddress,
}: {
  dataCommonDic: any;
  register: Function;
  errors: any;
  setAddress: (arg: any) => void;
}) {
  return (
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
      <Wrapper grid col={2}>
        <Field
          flex
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: "50px",
          }}
        >
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
        </Field>
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
}

export default Tab1;
