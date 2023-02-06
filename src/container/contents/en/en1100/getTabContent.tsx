import React from "react";
import Table from "components/table";
import { Input, Select, Field } from "components/form/style";
import { PaymentLineCnt } from "../../commonStyle";
import { InputSize } from "components/componentsType";

function getTabContent(id: number, register: any, jnJiro: any) {
  const data1 = [
    {
      1: "양식 1",
      2: (
        <Input
          register={register("jnJiroSNo")}
          textAlign="center"
          maxLength="6"
        />
      ),
      3: (
        <Input
          register={register("jnJirono")}
          textAlign="center"
          maxLength="7"
        />
      ),
      4: <Input register={register("jnJiroBigo")} maxLength="7" />,
      5: (
        <Field>
          <Select width={InputSize.i250} {...register("jnJiro")}>
            {jnJiro?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      ),
    },
    {
      1: "양식 2",
      2: (
        <Input
          register={register("jnJiroSNo02")}
          textAlign="center"
          maxLength="6"
        />
      ),
      3: (
        <Input
          register={register("jnJirono02")}
          textAlign="center"
          maxLength="7"
        />
      ),
      4: <Input register={register("jnJiroBigo02")} maxLength="20" />,
      5: (
        <Field>
          <Select width={InputSize.i250} {...register("jnJiro2")}>
            {jnJiro?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      ),
    },
    {
      1: "양식 3",
      2: (
        <Input
          register={register("jnJiroSNo03")}
          textAlign="center"
          maxLength="6"
        />
      ),
      3: (
        <Input
          register={register("jnJirono03")}
          textAlign="center"
          maxLength="7"
        />
      ),
      4: <Input register={register("jnJiroBigo03")} maxLength="20" />,
      5: (
        <Field>
          <Select width={InputSize.i250} {...register("jnJiro3")}>
            {jnJiro?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      ),
    },
    {
      1: "양식 4",
      2: (
        <Input
          register={register("jnJiroSNo04")}
          textAlign="center"
          maxLength="6"
        />
      ),
      3: (
        <Input
          register={register("jnJirono04")}
          textAlign="center"
          maxLength="7"
        />
      ),
      4: <Input register={register("jnJiroBigo04")} maxLength="20" />,
      5: (
        <Field>
          <Select width={InputSize.i250} {...register("jnJiro4")}>
            {jnJiro?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      ),
    },
  ];

  const data2 = [
    {
      jnOrder01: (
        <Input register={register("jnOrder01")} inputSize={InputSize.xxl} />
      ),
    },
    {
      jnOrder02: (
        <Input register={register("jnOrder02")} inputSize={InputSize.xxl} />
      ),
    },
    {
      jnOrder03: (
        <Input register={register("jnOrder03")} inputSize={InputSize.xxl} />
      ),
    },
    {
      jnOrder04: (
        <Input register={register("jnOrder04")} inputSize={InputSize.xxl} />
      ),
    },
    {
      jnOrder05: (
        <Input register={register("jnOrder05")} inputSize={InputSize.xxl} />
      ),
    },
    {
      jnOrder06: (
        <Input register={register("jnOrder06")} inputSize={InputSize.xxl} />
      ),
    },
  ];

  const data3 = [
    {
      jnBank1: (
        <Input
          register={register("jnBank1")}
          inputSize={InputSize.md290}
          maxLength="15"
        />
      ),
      jnBankNo1: (
        <Input
          register={register("jnBankNo1")}
          inputSize={InputSize.md290}
          maxLength="20"
        />
      ),
    },
    {
      jnBank2: (
        <Input
          register={register("jnBank2")}
          inputSize={InputSize.md290}
          maxLength="15"
        />
      ),
      jnBankNo2: (
        <Input
          register={register("jnBankNo2")}
          inputSize={InputSize.md290}
          maxLength="20"
        />
      ),
    },
    {
      jnBank3: (
        <Input
          register={register("jnBank3")}
          inputSize={InputSize.md290}
          maxLength="15"
        />
      ),
      jnBankNo3: (
        <Input
          register={register("jnBankNo3")}
          inputSize={InputSize.md290}
          maxLength="20"
        />
      ),
    },
    {
      jnBank4: (
        <Input
          register={register("jnBank4")}
          inputSize={InputSize.md290}
          maxLength="15"
        />
      ),
      jnBankNo4: (
        <Input
          register={register("jnBankNo4")}
          inputSize={InputSize.md290}
          maxLength="20"
        />
      ),
    },
  ];

  const data4 = [
    {
      jnMark1: (
        <Input
          register={register("jnMark1")}
          textAlign="center"
          maxLength="8"
        />
      ),
      jnMark2: (
        <Input
          register={register("jnMark2")}
          textAlign="center"
          maxLength="8"
        />
      ),
      jnMark3: (
        <Input
          register={register("jnMark3")}
          textAlign="center"
          maxLength="8"
        />
      ),
      jnMark4: (
        <Input
          register={register("jnMark4")}
          textAlign="center"
          maxLength="8"
        />
      ),
      jnMark5: (
        <Input
          register={register("jnMark5")}
          textAlign="center"
          maxLength="8"
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
