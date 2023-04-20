import React from "react";
import Table from "components/table";
import { Input, Select, Field } from "components/form/style";
import {
  PaymentLineCnt,
  PaymentLineCnt1,
  PaymentLineCnt2,
  PaymentLineCnt3,
} from "../../commonStyle";
import { InputSize } from "components/componentsType";

function getTabContent(id: number, register: any, jnJiro: any) {
  const data1 = [
    {
      1: "양식 1",
      jnJiroSNo: (
        <Input
          register={register("jnJiroSNo")}
          textAlign="center"
          maxLength="6"
        />
      ),
      jnJirono: (
        <Input
          register={register("jnJirono")}
          textAlign="center"
          maxLength="7"
        />
      ),
      jnJiroBigo: <Input register={register("jnJiroBigo")} maxLength="7" />,
      jnJiro: (
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
      jnJiroSNo02: (
        <Input
          register={register("jnJiroSNo02")}
          textAlign="center"
          maxLength="6"
        />
      ),
      jnJirono02: (
        <Input
          register={register("jnJirono02")}
          textAlign="center"
          maxLength="7"
        />
      ),
      jnJiroBigo02: (
        <Input register={register("jnJiroBigo02")} maxLength="20" />
      ),
      jnJiro2: (
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
      jnJiroSNo03: (
        <Input
          register={register("jnJiroSNo03")}
          textAlign="center"
          maxLength="6"
        />
      ),
      jnJirono03: (
        <Input
          register={register("jnJirono03")}
          textAlign="center"
          maxLength="7"
        />
      ),
      jnJiroBigo03: (
        <Input register={register("jnJiroBigo03")} maxLength="20" />
      ),
      jnJiro3: (
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
      jnJiroSNo04: (
        <Input
          register={register("jnJiroSNo04")}
          textAlign="center"
          maxLength="6"
        />
      ),
      jnJirono04: (
        <Input
          register={register("jnJirono04")}
          textAlign="center"
          maxLength="7"
        />
      ),
      jnJiroBigo04: (
        <Input register={register("jnJiroBigo04")} maxLength="20" />
      ),
      jnJiro4: (
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
      jnBankno1: (
        <Input
          register={register("jnBankno1")}
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
      jnBankno2: (
        <Input
          register={register("jnBankno2")}
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
      jnBankno3: (
        <Input
          register={register("jnBankno3")}
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
      jnBankno4: (
        <Input
          register={register("jnBankno4")}
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
        <PaymentLineCnt1>
          <Table
            tableHeader={[
              "지로 양식",
              "승인 번호",
              "지로 번호",
              "상 호(구분명)",
              "용지 형식",
            ]}
            tableData={data1}
            onClick={(item) => console.log("table", item)}
          />
        </PaymentLineCnt1>
      );
    case 1:
      return (
        <PaymentLineCnt2>
          <Table
            tableHeader={["내용"]}
            tableData={data2}
            onClick={(item) => console.log("table", item)}
          />
        </PaymentLineCnt2>
      );
    case 2:
      return (
        <PaymentLineCnt3>
          <Table
            tableHeader={["은행명", "계좌 번호"]}
            tableData={data3}
            onClick={(item) => console.log("table", item)}
          />
        </PaymentLineCnt3>
      );
    case 3:
      return (
        <PaymentLineCnt>
          <div className="title">결재</div>
          <Table
            tableHeader={["결재 1", "결재 2", "결재 3", "결재 4", "결재 5"]}
            tableData={data4}
            onClick={(item) => console.log("table", item)}
          />
        </PaymentLineCnt>
      );
  }
  return null;
}

export default getTabContent;
