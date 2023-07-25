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
    <Field>
      <FormGroup>
        <Label>공급 받는자</Label>
        <Select register={register("cuNoType")} width={InputSize.i110}>
          {dataCommonDic?.cuNoType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Input register={register("cuNo")} inputSize={InputSize.i200} />

        <Input
          label="종사업장"
          labelStyle={{ minWidth: "107px" }}
          register={register("cuRCode")}
          maxLength="4"
          inputSize={InputSize.i50}
        />

        <Label>과세구분</Label>
        <Select register={register("cuBilltype")} width={InputSize.i130}>
          {dataCommonDic?.cuBilltype?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          label="상 호"
          register={register("cuSangho")}
          inputSize={InputSize.i110}
        />
        <Input
          label="대 표"
          labelStyle={{ marginLeft: "10px", minWidth: "40px" }}
          register={register("cuSajang")}
          className="cm1105Label"
          inputSize={InputSize.i150}
        />
      </FormGroup>

      <FormGroup>
        <Field flex style={{ alignItems: "center" }}>
          <Input
            label="주 소"
            register={register("cuSzipcode")}
            inputSize={InputSize.i110}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("cuSaddr1")} style={{ width: "284px" }} />
        </Field>
        <Input register={register("cuSaddr2")} style={{ marginLeft: "0px" }} />
      </FormGroup>

      <FormGroup>
        <Input
          label="업 태"
          register={register("cuUptae")}
          inputSize={InputSize.i150}
        />
        <Input
          label="종 목"
          register={register("cuJongmok")}
          inputSize={InputSize.i150}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="담당자"
          register={register("cuSeSawon")}
          inputSize={InputSize.i150}
        />
        <Input
          label="부서명"
          register={register("cuDepartment")}
          inputSize={InputSize.i150}
        />
        <Input
          label="이메일"
          register={register("cuSeEmail")}
          inputSize={InputSize.i150}
        />
        @
        <Select register={register("emailKind")} width={InputSize.i150}>
          {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code1}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          label="담당자"
          register={register("cuSeSawon2")}
          inputSize={InputSize.i150}
        />
        <Input
          label="부서명"
          register={register("cuDepartment2")}
          inputSize={InputSize.i150}
        />
        <Input
          label="이메일"
          register={register("cuSeEmail2")}
          inputSize={InputSize.i150}
        />
        @
        <Select register={register("emailKind2")} width={InputSize.i150}>
          {dataCommonDic?.emailKind2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code1}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Wrapper grid col={4}>
        <FormGroup>
          <Label>SMS전송 유무</Label>
          <CheckBox register={register("cuSeSmsYn")} />
        </FormGroup>
        <FormGroup>
          <Label>거래명세표 첨부발행 유무</Label>
          <CheckBox register={register("cuSeListYn")} />
        </FormGroup>
        <FormGroup>
          <Label>팩스 번호</Label>
          <CheckBox register={register("cuSeFaxYn")} />
        </FormGroup>
      </Wrapper>

      <FormGroup>
        <Label>공급 사업자</Label>
        <Select register={register("cuGongsano")} width={InputSize.i150}>
          {dataCommonDic?.cuGongsano?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>계산서 발행주기</Label>
        <Select
          register={register("cuSekumMm")}
          width={InputSize.i150}
          style={{ marginRight: "0px" }}
        >
          {dataCommonDic?.cuSekumNm?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Controller
          control={control}
          name="cuSekumDate"
          render={({ field }) => (
            <Input {...field} mask={[/\d/, /\d/]} inputSize={InputSize.i40} />
          )}
        />
        <p>일</p>
      </FormGroup>
    </Field>
  );
}

export default Tab1;
