import {
  Input,
  Select,
  Field,
  Wrapper,
  FormGroup,
  Label,
} from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import { Controller } from "react-hook-form";
import { InputSize } from "components/componentsType";
import Form from "container/contents/en/en1500/form";

function Tab4({
  dataCommonDic,
  register,
  control,
}: {
  dataCommonDic: any;
  register: Function;
  control: any;
}) {
  return (
    <Field>
      <FormGroup>
        <Input
          label="계약번호"
          register={register("cuGongno")}
          inputSize={InputSize.i130}
        />
        <Input
          label="계약자명"
          register={register("cuGongname")}
          inputSize={InputSize.i130}
        />

        <Controller
          control={control}
          {...register("cuJuminno")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              label="생년월일"
              value={value}
              onChange={onChange}
              name={name}
              mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
              inputSize={InputSize.i130}
            />
          )}
        />

        <Label>최종 점검일</Label>
        <Controller
          control={control}
          {...register("cuHdate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              name={name}
              onChange={onChange}
              style={{ width: "130px" }}
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label>공급 계약일</Label>
        <Controller
          control={control}
          {...register("cuGongdate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              name={name}
              onChange={onChange}
              style={{ width: "130px" }}
            />
          )}
        />

        <Label>계약 만료일</Label>
        <Controller
          control={control}
          {...register("cuGongdateT")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              name={name}
              onChange={onChange}
              style={{ width: "130px" }}
            />
          )}
        />

        <Label>계약갱신</Label>
        <Select register={register("cuExtendType")} width={InputSize.i130}>
          {dataCommonDic?.cuExtendType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>계약 갱신일</Label>
        <Controller
          control={control}
          {...register("cuExtendDate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "130px" }}
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label>용기소유자</Label>
        <Select register={register("cuUsertong")} width={InputSize.i130}>
          {dataCommonDic?.cuUsertong?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>시설소유자</Label>
        <Select register={register("cuUsersisul")} width={InputSize.i130}>
          {dataCommonDic?.cuUsersisul?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>보일러 사용</Label>
        <Select register={register("cuBoilerYn")} width={InputSize.i130}>
          {dataCommonDic?.cuBoilerYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>온수기 사용</Label>
        <Select register={register("cuWaterYn")} width={InputSize.i130}>
          {dataCommonDic?.cuWaterYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>배관시설</Label>
        <Select register={register("cuPipelineYn")} width={InputSize.i130}>
          {dataCommonDic?.cuPipelineYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>차단 장치</Label>
        <Select register={register("cuBlockYn")} width={InputSize.i130}>
          {dataCommonDic?.cuBlockYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>시설적합유무</Label>
        <Select register={register("cuSisulyn")} width={InputSize.i130}>
          {dataCommonDic?.cuSisulyn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>검사 대상</Label>
        <Select register={register("cuGumsa")} width={InputSize.i130}>
          {dataCommonDic?.cuGumsa?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>체적시설 개선일</Label>

        <Controller
          control={control}
          {...register("cuSisuldate")}
          render={({ field: { onChange, name, value } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "130px" }}
            />
          )}
        />

        <Label>퓨즈콕 개선일</Label>

        <Controller
          control={control}
          {...register("cuPdate")}
          render={({ field: { onChange, name, value } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "130px" }}
            />
          )}
        />
      </FormGroup>
    </Field>
  );
}

export default Tab4;
