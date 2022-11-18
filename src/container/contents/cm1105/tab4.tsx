import {
  Input,
  Select,
  Field,
  Wrapper,
  DividerGray,
  FormGroup,
  Label,
  ErrorText,
} from "components/form/style";
import CustomDate from "components/customDatePicker";

function Tab4({
  dataCommonDic,
  register,
  errors,
  reset,
}: {
  dataCommonDic: any;
  register: Function;
  errors: any;
  reset: Function;
}) {
  return (
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
}

export default Tab4;
