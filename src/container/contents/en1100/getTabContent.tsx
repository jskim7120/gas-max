import React from "react";
import Table from "components/table";
import {
  Input,
  Select,
  Field,
  ErrorText,
  PaymentLineCnt,
} from "components/form/style";
import { InputSize } from "components/componentsType";

function getTabContent(
  id: number,
  register: any,
  errors: any,
  jnJiro: any,
  isJnJiroError: boolean
) {
  const data1 = [
    {
      1: "양식 1",
      2: (
        <Input
          register={register("jnJiroSNo")}
          errors={errors["jnJiroSNo"]?.message}
          textAlign="center"
        />
      ),
      3: (
        <Input
          register={register("jnJirono")}
          errors={errors["jnJirono"]?.message}
          textAlign="center"
        />
      ),
      4: (
        <Input
          register={register("jnJiroBigo")}
          errors={errors["jnJiroBigo"]?.message}
        />
      ),
      5: (
        <Field>
          {isJnJiroError ? (
            "error occured"
          ) : (
            <Select style={{ width: "195px" }} {...register("jnJiro")}>
              {jnJiro?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
          <div>
            <ErrorText>{errors && errors["jnJiro"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 2",
      2: (
        <Input
          register={register("jnJiroSNo02")}
          errors={errors["jnJiroSNo02"]?.message}
          textAlign="center"
        />
      ),
      3: (
        <Input
          register={register("jnJirono02")}
          errors={errors["jnJirono02"]?.message}
          textAlign="center"
        />
      ),
      4: (
        <Input
          register={register("jnJiroBigo02")}
          errors={errors["jnJiroBigo02"]?.message}
        />
      ),
      5: (
        <Field>
          {isJnJiroError ? (
            "error occured"
          ) : (
            <Select style={{ width: "195px" }} {...register("jnJiro2")}>
              {jnJiro?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
          <div>
            <ErrorText>{errors && errors["jnJiro2"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 3",
      2: (
        <Input
          register={register("jnJiroSNo03")}
          errors={errors["jnJiroSNo03"]?.message}
          textAlign="center"
        />
      ),
      3: (
        <Input
          register={register("jnJirono03")}
          errors={errors["jnJirono03"]?.message}
          textAlign="center"
        />
      ),
      4: (
        <Input
          register={register("jnJiroBigo03")}
          errors={errors["jnJiroBigo03"]?.message}
        />
      ),
      5: (
        <Field>
          {isJnJiroError ? (
            "error occured"
          ) : (
            <Select style={{ width: "195px" }} {...register("jnJiro3")}>
              {jnJiro?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
          <div>
            <ErrorText>{errors && errors["jnJiro3"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      1: "양식 4",
      2: (
        <Input
          register={register("jnJiroSNo04")}
          errors={errors["jnJiroSNo04"]?.message}
          textAlign="center"
        />
      ),
      3: (
        <Input
          register={register("jnJirono04")}
          errors={errors["jnJirono04"]?.message}
          textAlign="center"
        />
      ),
      4: (
        <Input
          register={register("jnJiroBigo04")}
          errors={errors["jnJiroBigo04"]?.message}
        />
      ),
      5: (
        <Field>
          {isJnJiroError ? (
            "error occured"
          ) : (
            <Select style={{ width: "195px" }} {...register("jnJiro4")}>
              {jnJiro?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
          <div>
            <ErrorText>{errors && errors["jnJiro4"]?.message}</ErrorText>
          </div>
        </Field>
      ),
    },
  ];

  const data2 = [
    {
      JnOrderO1: (
        <Input
          register={register("JnOrderO1")}
          errors={errors["JnOrderO1"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
    {
      JnOrderO2: (
        <Input
          register={register("JnOrderO2")}
          errors={errors["JnOrderO2"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
    {
      JnOrderO3: (
        <Input
          register={register("JnOrderO3")}
          errors={errors["JnOrderO3"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
    {
      JnOrderO4: (
        <Input
          register={register("JnOrderO4")}
          errors={errors["JnOrderO4"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
    {
      JnOrderO5: (
        <Input
          register={register("JnOrderO5")}
          errors={errors["JnOrderO5"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
    {
      JnOrderO6: (
        <Input
          register={register("JnOrderO6")}
          errors={errors["JnOrderO6"]?.message}
          inputSize={InputSize.xxl}
        />
      ),
    },
  ];

  const data3 = [
    {
      jnBank1: (
        <Input
          register={register("jnBank1")}
          errors={errors["jnBank1"]?.message}
          inputSize={InputSize.md290}
        />
      ),
      jnBankNo1: (
        <Input
          register={register("jnBankno1")}
          errors={errors["jnBankNo1"]?.message}
          inputSize={InputSize.md290}
        />
      ),
    },
    {
      jnBank2: (
        <Input
          register={register("jnBank2")}
          errors={errors["jnBank2"]?.message}
          inputSize={InputSize.md290}
        />
      ),
      jnBankNo2: (
        <Input
          register={register("jnBankno2")}
          errors={errors["jnBankNo2"]?.message}
          inputSize={InputSize.md290}
        />
      ),
    },
    {
      jnBank3: (
        <Input
          register={register("jnBank3")}
          errors={errors["jnBank3"]?.message}
          inputSize={InputSize.md290}
        />
      ),
      jnBankNo3: (
        <Input
          register={register("jnBankno3")}
          errors={errors["jnBankNo3"]?.message}
          inputSize={InputSize.md290}
        />
      ),
    },
    {
      jnBank4: (
        <Input
          register={register("jnBank4")}
          errors={errors["jnBank4"]?.message}
          inputSize={InputSize.md290}
        />
      ),
      jnBankNo4: (
        <Input
          register={register("jnBankno4")}
          errors={errors["jnBankNo4"]?.message}
          inputSize={InputSize.md290}
        />
      ),
    },
  ];

  const data4 = [
    {
      jnMark1: (
        <Input
          register={register("jnMark1")}
          errors={errors["jnMark1"]?.message}
          inputSize={InputSize.sm}
          textAlign="center"
        />
      ),
      jnMark2: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
          textAlign="center"
        />
      ),
      jnMark3: (
        <Input
          register={register("jnMark3")}
          errors={errors["jnMark3"]?.message}
          inputSize={InputSize.sm}
          textAlign="center"
        />
      ),
      jnMark4: (
        <Input
          register={register("jnMark4")}
          errors={errors["jnMark4"]?.message}
          inputSize={InputSize.sm}
          textAlign="center"
        />
      ),
      jnMark5: (
        <Input
          register={register("jnMark5")}
          errors={errors["jnMark5"]?.message}
          inputSize={InputSize.sm}
          textAlign="center"
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
        <Table
          tableHeader={["내용"]}
          tableData={data2}
          onClick={(item) => console.log("table", item)}
        />
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
        <PaymentLineCnt>
          <div className="title">결재</div>
          <Table
            tableHeader={["결재1", "결재2", "결재3", "결재4", "결재5"]}
            tableData={data4}
            onClick={(item) => console.log("table", item)}
          />
        </PaymentLineCnt>
      );
  }
  return null;
}

export default getTabContent;
