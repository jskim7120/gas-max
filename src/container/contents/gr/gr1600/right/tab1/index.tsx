import { useEffect, useState } from "react";
import Table from "components/table";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset } from "components/allSvgIcon";
import { Input2, Select, Field } from "components/form/style";
import { InputSize } from "components/componentsType";
import InfoPerson from "assets/image/infoPerson.png";
import { InfoText } from "components/text";
function Tab1({
  register,
  errors,
  tabData,
  update,
  clearForm,
  selected,
}: {
  register: any;
  errors: any;
  tabData: any;
  update: any;
  clearForm: any;
  selected: any;
}) {
  const [buPdanga, setBuPdanga] = useState<string>();
  const [buPcost, setBuPcost] = useState<string>();

  const [buBdanga, setBuBdanga] = useState<string>();
  const [buBcost, setBuBcost] = useState<string>();

  const [buBldanga, setBuBldanga] = useState<string>();
  const [buBlcost, setBuBlcost] = useState<string>();

  useEffect(() => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      selected.buPdanga && setBuPdanga(selected.buPdanga);
      selected.buPcost && setBuPcost(selected.buPcost);

      selected.buBdanga && setBuBdanga(selected.buBdanga);
      selected.buBcost && setBuBcost(selected.buBcost);

      selected.buBldanga && setBuBldanga(selected.buBldanga);
      selected.buBlcost && setBuBlcost(selected.buBlcost);
    }
  }, [selected]);

  const data0 = [
    {
      1: <p>프로판</p>,
      2: (
        <Input2
          {...register("buPdanga")}
          id="buPdanga"
          type="text"
          value={buPdanga}
          inputSize={InputSize.i80}
          onChange={(e: any) => setBuPdanga(e.target.value)}
        />
      ),
      3: (
        <Input2
          {...register("buPcost")}
          id="buPcost"
          type="text"
          value={buPcost}
          inputSize={InputSize.i80}
          onChange={(e: any) => {
            setBuPcost(e.target.value);
          }}
        />
      ),
      4: (
        <p
          style={{
            height: "25px",
            borderRadius: "4px",
            border: "1px solid rgb(188,185 ,185)",
            padding: "0 6px",
            background: "aliceblue",
            margin: "5px",
          }}
        >
          {Number(buPdanga && buPdanga.replace(",", "")) +
            Number(buPcost && buPcost.replace(",", ""))}
        </p>
      ),
    },
    {
      1: <p>부탄</p>,
      2: (
        <Input2
          {...register("buBdanga")}
          id="buBdanga"
          type="text"
          value={buBdanga}
          inputSize={InputSize.i80}
          onChange={(e: any) => {
            setBuBdanga(e.target.value);
          }}
        />
      ),

      3: (
        <Input2
          {...register("buBcost")}
          id="buBcost"
          type="text"
          value={buBcost}
          inputSize={InputSize.i80}
          onChange={(e: any) => {
            setBuBcost(e.target.value);
          }}
        />
      ),
      4: (
        <p
          style={{
            height: "25px",
            borderRadius: "4px",
            border: "1px solid rgb(188,185 ,185)",
            padding: "0 6px",
            background: "aliceblue",
            margin: "5px",
          }}
        >
          {Number(buBdanga && buBdanga.replace(",", "")) +
            Number(buBcost && buBcost.replace(",", ""))}
        </p>
      ),
    },
    {
      1: <p>벌크</p>,
      2: (
        <Input2
          {...register("buBldanga")}
          id="buBldanga"
          type="text"
          value={buBldanga}
          inputSize={InputSize.i80}
          onChange={(e: any) => {
            setBuBldanga(e.target.value);
          }}
        />
      ),
      3: (
        <Input2
          {...register("buBlcost")}
          id="buBlcost"
          type="text"
          value={buBlcost}
          inputSize={InputSize.i80}
          onChange={(e: any) => {
            setBuBlcost(e.target.value);
          }}
        />
      ),
      4: (
        <p
          style={{
            height: "25px",
            borderRadius: "4px",
            border: "1px solid rgb(188,185 ,185)",
            padding: "0 6px",
            background: "aliceblue",
            margin: "5px",
          }}
        >
          {Number(buBldanga && buBldanga.replace(",", "")) +
            Number(buBlcost && buBlcost.replace(",", ""))}
        </p>
      ),
    },
  ];

  const data1 = [
    {
      1: (
        <Select
          {...register("buJpCode1")}
          style={{ margin: "5px" }}
          width={InputSize.i100}
        >
          {tabData?.buJpCode1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      2: (
        <Select
          {...register("buJpCode2")}
          style={{ margin: "5px" }}
          width={InputSize.i100}
        >
          {tabData?.buJpCode2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      3: (
        <Select
          {...register("buJpCode3")}
          style={{ margin: "5px" }}
          width={InputSize.i100}
        >
          {tabData?.buJpCode3?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      4: (
        <Select
          {...register("buJpCode4")}
          style={{ margin: "5px" }}
          width={InputSize.i100}
        >
          {tabData?.buJpCode4?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
  ];
  return (
    <>
      <Field flex style={{ justifyContent: "space-between" }}>
        <Field flex>
          <Field>
            <Field flex style={{ marginBottom: "10px" }}>
              <img src={InfoPerson} alt="info" />
              <p style={{ fontSize: "14px", marginLeft: "7px" }}>
                LPG 매입 단가
              </p>
            </Field>
            <Table
              tableHeader={["구분", "kg 단가", "수송비", "합계"]}
              tableData={data0}
            />
            <InfoText
              style={{ marginTop: "3px" }}
              text="LPG 매입단가는 Vat 포함 가격으로 계산합니다."
            />
          </Field>
          <Field style={{ marginLeft: "30px" }}>
            <Field flex style={{ marginBottom: "10px" }}>
              <img src={InfoPerson} alt="info" />
              <p style={{ fontSize: "14px", marginLeft: "7px" }}>
                무료 충전 품목
              </p>
            </Field>
            <Table tableHeader={["품목"]} tableData={data1} />
          </Field>
        </Field>
        <Field flex>
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={update}
          />
          <Button text="취소" icon={<Reset />} onClick={clearForm} />
        </Field>
      </Field>
    </>
  );
}

export default Tab1;
