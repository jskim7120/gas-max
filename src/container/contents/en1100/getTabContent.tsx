import React from "react";
import Table from "components/table";
import { Input, Select, Field, ErrorText } from "components/form/style";
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
        />
      ),
      3: (
        <Input
          register={register("jnJirono")}
          errors={errors["jnJirono"]?.message}
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
            <Select style={{ width: "150px" }} {...register("jnJiro")}>
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
        />
      ),
      3: (
        <Input
          register={register("jnJirono02")}
          errors={errors["jnJirono02"]?.message}
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
            <Select style={{ width: "150px" }} {...register("jnJiro2")}>
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
        />
      ),
      3: (
        <Input
          register={register("jnJirono03")}
          errors={errors["jnJirono03"]?.message}
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
            <Select style={{ width: "150px" }} {...register("jnJiro3")}>
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
        />
      ),
      3: (
        <Input
          register={register("jnJirono04")}
          errors={errors["jnJirono04"]?.message}
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
            <Select style={{ width: "150px" }} {...register("jnJiro4")}>
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
      edJnOrderO1: (
        <Input
          register={register("jnMark1")}
          errors={errors["jnMark1"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      edJnOrderO2: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      edJnOrderO3: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      edJnOrderO4: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      edJnOrderO5: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      edJnOrderO6: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
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
        />
      ),
      jnBankNo1: (
        <Input
          register={register("jnBankno1")}
          errors={errors["jnBankNo1"]?.message}
        />
      ),
    },
    {
      jnBank2: (
        <Input
          register={register("jnBank2")}
          errors={errors["jnBank2"]?.message}
        />
      ),
      jnBankNo2: (
        <Input
          register={register("jnBankno2")}
          errors={errors["jnBankNo2"]?.message}
        />
      ),
    },
    {
      jnBank3: (
        <Input
          register={register("jnBank3")}
          errors={errors["jnBank3"]?.message}
        />
      ),
      jnBankNo3: (
        <Input
          register={register("jnBankno3")}
          errors={errors["jnBankNo3"]?.message}
        />
      ),
    },
    {
      jnBank4: (
        <Input
          register={register("jnBank4")}
          errors={errors["jnBank4"]?.message}
        />
      ),
      jnBankNo4: (
        <Input
          register={register("jnBankno4")}
          errors={errors["jnBankNo4"]?.message}
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
        />
      ),
      jnMark2: (
        <Input
          register={register("jnMark2")}
          errors={errors["jnMark2"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      jnMark3: (
        <Input
          register={register("jnMark3")}
          errors={errors["jnMark3"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      jnMark4: (
        <Input
          register={register("jnMark4")}
          errors={errors["jnMark4"]?.message}
          inputSize={InputSize.sm}
        />
      ),
      jnMark5: (
        <Input
          register={register("jnMark5")}
          errors={errors["jnMark5"]?.message}
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
        <Table
          tableHeader={["내용"]}
          tableData={data4}
          onClick={(item) => console.log("table", item)}
        />
        // <div>
        //   <Input
        //     register={register("edJnOrderO1")}
        //     errors={errors["edJnOrderO1"]?.message}
        //     fullWidth
        //   />
        //   <Input
        //     register={register("edJnOrderO2")}
        //     errors={errors["edJnOrderO2"]?.message}
        //     fullWidth
        //   />
        //   <Input
        //     register={register("edJnOrderO3")}
        //     errors={errors["edJnOrderO3"]?.message}
        //     fullWidth
        //   />
        //   <Input
        //     register={register("edJnOrderO4")}
        //     errors={errors["edJnOrderO4"]?.message}
        //     fullWidth
        //   />
        //   <Input
        //     register={register("edJnOrderO5")}
        //     errors={errors["edJnOrderO5"]?.message}
        //     fullWidth
        //   />
        //   <Input
        //     register={register("edJnOrderO6")}
        //     errors={errors["edJnOrderO6"]?.message}
        //     fullWidth
        //   />
        // </div>
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
