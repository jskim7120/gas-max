import {
  Input,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import DaumAddress from "components/daum";
import { InputSize } from "components/componentsType";
import { Controller } from "react-hook-form";

function Tab1({
  dataCommonDic,
  register,
  setAddress,
  control,
}: {
  dataCommonDic: any;
  register: Function;
  setAddress: (arg: any) => void;
  control: any;
}) {
  return (
    <Field className="outer-border">
      <Wrapper grid col={4} fields="1fr 2fr 1.5fr 1.5fr">
        <FormGroup>
          <Label>공급 받는자</Label>
          <Select {...register("cuNoType")} width={InputSize.i100}>
            {dataCommonDic?.cuNoType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Input register={register("cuNo")} />

        <Input
          label="종사업장"
          register={register("cuRCode")}
          maxLength="4"
          inputSize={InputSize.i50}
        />

        <FormGroup>
          <Label>과세구분</Label>
          <Select {...register("cuBilltype")} width={InputSize.i100}>
            {dataCommonDic?.cuBilltype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      </Wrapper>

      <Wrapper grid col={4}>
        <Input label="상호" register={register("cuSangho")} />
        <div></div>
        <Input label="대표" register={register("cuSajang")} />
      </Wrapper>

      <Wrapper grid col={2}>
        <Field flex style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("cuSzipcode")}
            inputSize={InputSize.i100}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("cuSaddr1")} fullWidth />
        </Field>
        <Input
          register={register("cuSaddr2")}
          fullWidth
          style={{ marginLeft: "0px" }}
        />
      </Wrapper>

      <Wrapper grid col={2}>
        <Input label="업태" register={register("cuUptae")} />
        <Input label="종목" register={register("cuJongmok")} />
      </Wrapper>

      <Wrapper grid col={4}>
        <Input label="담당자" register={register("cuSeSawon")} />
        <Input label="부서명" register={register("cuDepartment")} />
        <Input label="이메일" register={register("cuSeEmail")} />
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

      <Wrapper grid col={4}>
        <Input label="담당자" register={register("cuSeSawon2")} />
        <Input label="부서명" register={register("cuDepartment2")} />
        <Input label="이메일" register={register("cuSeEmail2")} />
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

      <Wrapper grid col={4}>
        <FormGroup>
          <Label>공급사업자</Label>
          <Select {...register("cuGongsano")} width={InputSize.i100}>
            {dataCommonDic?.cuGongsano?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <div></div>
        <Field flex style={{ alignItems: "center" }}>
          <FormGroup>
            <Label>계산서 발행주기</Label>
            <Select {...register("cuSekumMm")} width={InputSize.i100}>
              {dataCommonDic?.cuSekumNm?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          {/* <Input
            register={register("cuSekumDate")}
            maxLength="2"
            inputSize={InputSize.i60}
            style={{ marginLeft: "0" }}
          /> */}

          <Controller
            control={control}
            {...register("cuSekumDate")}
            render={({ field: { onChange, value, name } }) => (
              <Input
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
      </Wrapper>
    </Field>
  );
}

export default Tab1;
