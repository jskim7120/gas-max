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
          inputSize={InputSize.i140}
        />
        <Input
          label="계약자명"
          register={register("cuGongname")}
          inputSize={InputSize.i140}
        />

        <Controller
          control={control}
          name="cuJuminno"
          render={({ field }) => (
            <Input
              label="생년월일"
              {...field}
              mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
              inputSize={InputSize.i140}
            />
          )}
        />

        <Label>최종 점검일</Label>
        <Controller
          control={control}
          name="cuHdate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label>공급 계약일</Label>
        <Controller
          control={control}
          name="cuGongdate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />

        <Label style={{ minWidth: "140px" }}>계약 만료일</Label>
        <Controller
          control={control}
          name="cuGongdateT"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />

        <Label style={{ minWidth: "140px" }}>계약갱신</Label>
        <Select register={register("cuExtendType")} width={InputSize.i140}>
          {dataCommonDic?.cuExtendType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>계약 갱신일</Label>
        <Controller
          control={control}
          name="cuExtendDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Label>용기소유자</Label>
        <Select register={register("cuUsertong")} width={InputSize.i140}>
          {dataCommonDic?.cuUsertong?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>시설소유자</Label>
        <Select register={register("cuUsersisul")} width={InputSize.i140}>
          {dataCommonDic?.cuUsersisul?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>보일러 사용</Label>
        <Select register={register("cuBoilerYn")} width={InputSize.i140}>
          {dataCommonDic?.cuBoilerYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>온수기 사용</Label>
        <Select register={register("cuWaterYn")} width={InputSize.i140}>
          {dataCommonDic?.cuWaterYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>배관시설</Label>
        <Select register={register("cuPipelineYn")} width={InputSize.i140}>
          {dataCommonDic?.cuPipelineYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>차단 장치</Label>
        <Select register={register("cuBlockYn")} width={InputSize.i140}>
          {dataCommonDic?.cuBlockYn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>시설적합유무</Label>
        <Select register={register("cuSisulyn")} width={InputSize.i140}>
          {dataCommonDic?.cuSisulyn?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>

        <Label>검사 대상</Label>
        <Select register={register("cuGumsa")} width={InputSize.i140}>
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
          name="cuSisuldate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />

        <Label style={{ minWidth: "140px" }}>퓨즈콕 개선일</Label>

        <Controller
          control={control}
          name="cuPdate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "120px" }} />
          )}
        />
      </FormGroup>
    </Field>
  );
}

export default Tab4;
