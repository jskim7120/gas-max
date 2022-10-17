import React from "react";
import Table from "components/table";
import {
  Input,
  InputTest,
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
} from "components/form/style";
import { InputSize } from "components/componentsType";

function getTabContent(id: number, register: any, errors: any) {
  // console.log("register:", { ...register("jnJiroSNo") });
  const data1 = [
    {
      1: "양식 1",
      2: <InputTest name="jnJiroSNo" register={register} errors={errors} />,
      3: <InputTest name="jnJiroNo" register={register} errors={errors} />,
      4: <InputTest name="jnJiroBigo" register={register} errors={errors} />,
      5: (
        <Field>
          <Select style={{ width: "150px" }} {...register("jnJiro")}>
            <option value="0">0</option>
            <option value="1">1</option>
          </Select>
          <div>
            <ErrorText>{errors && errors["jnJiro"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 2",
      2: <InputTest name="jnJiroSNo02" register={register} errors={errors} />,
      3: <InputTest name="jnJiroNo02" register={register} errors={errors} />,
      4: <InputTest name="jnJiroBigo02" register={register} errors={errors} />,
      5: (
        <Field>
          <Select style={{ width: "150px" }} {...register("jnJiro2")}>
            <option value="0">0</option>
          </Select>
          <div>
            <ErrorText>{errors && errors["jnJiro2"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 3",
      2: <InputTest name="jnJiroSNo03" register={register} errors={errors} />,
      3: <InputTest name="jnJiroNo03" register={register} errors={errors} />,
      4: <InputTest name="jnJiroBigo03" register={register} errors={errors} />,
      5: (
        <Field>
          <Select style={{ width: "150px" }} {...register("jnJiro3")}>
            <option value="0">0</option>
          </Select>
          <div>
            <ErrorText>{errors && errors["jnJiro3"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 4",
      2: <InputTest name="jnJiroSNo04" register={register} errors={errors} />,
      3: <InputTest name="jnJiroNo04" register={register} errors={errors} />,
      4: <InputTest name="jnJiroBigo04" register={register} errors={errors} />,
      5: (
        <Field>
          <Select style={{ width: "150px" }} {...register("jnJiro4")}>
            <option value="0">0</option>
          </Select>
          <div>
            <ErrorText>{errors && errors["jnJiro4"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
  ];

  const data3 = [
    {
      jnBank1: <InputTest name="jnBank1" register={register} errors={errors} />,
      jnBankNo1: (
        <InputTest name="jnBankNo1" register={register} errors={errors} />
      ),
    },
    {
      jnBank2: <InputTest name="jnBank2" register={register} errors={errors} />,
      jnBankNo2: (
        <InputTest name="jnBankNo2" register={register} errors={errors} />
      ),
    },
    {
      jnBank3: <InputTest name="jnBank3" register={register} errors={errors} />,
      jnBankNo3: (
        <InputTest name="jnBankNo3" register={register} errors={errors} />
      ),
    },
    {
      jnBank4: <InputTest name="jnBank4" register={register} errors={errors} />,
      jnBankNo4: (
        <InputTest name="jnBankNo4" register={register} errors={errors} />
      ),
    },
  ];

  const data4 = [
    {
      jnMark1: (
        <InputTest
          name="jnMark1"
          register={register}
          errors={errors}
          inputSize={InputSize.sm}
        />
      ),
      jnMark2: (
        <InputTest
          name="jnMark2"
          register={register}
          errors={errors}
          inputSize={InputSize.sm}
        />
      ),
      jnMark3: (
        <InputTest
          name="jnMark3"
          register={register}
          errors={errors}
          inputSize={InputSize.sm}
        />
      ),
      jnMark4: (
        <InputTest
          name="jnMark4"
          register={register}
          errors={errors}
          inputSize={InputSize.sm}
        />
      ),
      jnMark5: (
        <InputTest
          name="jnMark5"
          register={register}
          errors={errors}
          inputSize={InputSize.sm}
        />
      ),
    },
  ];

  switch (id) {
    case 0:
      return (
        <Table
          tableHeader={[
            "지로 양식",
            "승인번호",
            "지로번호",
            "상호(구분명)",
            "용지 형식",
          ]}
          tableData={data1}
          onClick={(item) => console.log("table", item)}
        />
      );
    case 1:
      return (
        <div>
          <InputTest
            name="edJnOrderO1"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            name="edJnOrderO2"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            name="edJnOrderO3"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            name="edJnOrderO4"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            name="edJnOrderO5"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            name="edJnOrderO6"
            register={register}
            errors={errors}
            fullWidth
          />
        </div>
      );
    case 2:
      return (
        <Table
          tableHeader={["은행명", "계좌번호"]}
          tableData={data3}
          onClick={(item) => console.log("table", item)}
        />
      );
    case 3:
      return (
        <Table
          tableHeader={["담 당", "과 장", "부 장", "전 무", "대 표"]}
          tableData={data4}
          onClick={(item) => console.log("table", item)}
        />
      );
  }
  return null;
}

export default getTabContent;
