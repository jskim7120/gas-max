import {
  Input,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
} from "components/form/style";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import { Controller } from "react-hook-form";

function Tab4({
  dataCommonDic,
  register,
  control,
}: // cuHdate,
// setCuHdate,
// cuGongdate,
// setCuGongdate,
// cuGongdateT,
// setCuGongdateT,
// cuExtendDate,
// setCuExtendDate,
// cuSisuldate,
// setCuSisuldate,
// cuPdate,
// setCuPdate,
{
  dataCommonDic: any;
  register: Function;
  control: any;
  // cuHdate: string;
  // setCuHdate: Function;
  // cuGongdate: string;
  // setCuGongdate: Function;
  // cuGongdateT: string;
  // setCuGongdateT: Function;
  // cuExtendDate: string;
  // setCuExtendDate: Function;
  // cuSisuldate: string;
  // setCuSisuldate: Function;
  // cuPdate: string;
  // setCuPdate: Function;
}) {
  return (
    <Field className="outer-border">
      <Wrapper grid col={4}>
        <Input label="계약번호" register={register("cuGongno")} />
        <Input label="계약자명" register={register("cuGongname")} />
        <Input label="생년월일" register={register("cuJuminno")} />

        <Field flex style={{ alignItems: "center" }}>
          <Label>최종점검일</Label>
          {/* <CustomDatePicker
            value={cuHdate}
            setValue={setCuHdate}
            name="cuHdate"
          /> */}
          <Controller
            control={control}
            {...register("cuHdate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
      </Wrapper>

      <Wrapper grid col={4}>
        <Field flex style={{ alignItems: "center" }}>
          <Label>공급계약일</Label>
          {/* <CustomDatePicker
            value={cuGongdate}
            setValue={setCuGongdate}
            name="cuGongdate"
          /> */}
          <Controller
            control={control}
            {...register("cuGongdate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>

        <Field flex style={{ alignItems: "center" }}>
          <Label>계약만료일</Label>
          {/* <CustomDatePicker
            value={cuGongdateT}
            setValue={setCuGongdateT}
            name="cuGongdateT"
          /> */}
          <Controller
            control={control}
            {...register("cuGongdateT")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>

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

        <Field flex style={{ alignItems: "center" }}>
          <Label>계약갱신일</Label>
          {/* <CustomDatePicker
            value={cuExtendDate}
            setValue={setCuExtendDate}
            name="cuExtendDate"
          /> */}
          <Controller
            control={control}
            {...register("cuExtendDate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
      </Wrapper>

      <Wrapper grid col={4}>
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
      </Wrapper>

      <Wrapper grid col={4}>
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
      </Wrapper>

      <Wrapper grid col={4}>
        <Field flex style={{ alignItems: "center" }}>
          <Label>체적시설 개선일</Label>
          {/* <CustomDatePicker
            value={cuSisuldate}
            setValue={setCuSisuldate}
            name="cuSisuldate"
          /> */}
          <Controller
            control={control}
            {...register("cuSisuldate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
        <Field flex style={{ alignItems: "center" }}>
          <Label>퓨즈콕 개선일</Label>
          {/* <CustomDatePicker
            value={cuPdate}
            setValue={setCuPdate}
            name="cuPdate"
          /> */}
          <Controller
            control={control}
            {...register("cuPdate")}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CustomDatePicker value={value} onChange={onChange} />
            )}
          />
        </Field>
        <Label style={{ width: "105px" }}></Label>
        <Label style={{ width: "105px" }}></Label>
      </Wrapper>
    </Field>
  );
}

export default Tab4;
