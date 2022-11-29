import React from "react";
import Table from "components/table";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset } from "components/allSvgIcon";
import { Input, Select, Field, Wrapper } from "components/form/style";
import InfoPerson from "assets/image/infoPerson.png";
function Tab1({
  register,
  errors,
  tabData,
}: {
  register: any;
  errors: any;
  tabData: any;
}) {
  const data0 = [
    {
      1: <p>프로판</p>,
      2: (
        <Input
          register={register("buPdanga")}
          errors={errors["buPdanga"]?.message}
        />
      ),
      3: (
        <Input
          register={register("buPcost")}
          errors={errors["buPcost"]?.message}
        />
      ),
      4: (
        <Input
          register={register("buPsum")}
          errors={errors["buPsum"]?.message}
        />
      ),
    },
    {
      1: <p>부탄</p>,
      2: (
        <Input
          register={register("buBdanga")}
          errors={errors["buBdanga"]?.message}
        />
      ),
      3: (
        <Input
          register={register("buBcost")}
          errors={errors["buBcost"]?.message}
        />
      ),
      4: (
        <Input
          register={register("buBsum")}
          errors={errors["buBsum"]?.message}
        />
      ),
    },
    {
      1: <p>벌크</p>,
      2: (
        <Input
          register={register("buBldanga")}
          errors={errors["buBldanga"]?.message}
        />
      ),
      3: (
        <Input
          register={register("buBlcost")}
          errors={errors["buBlcost"]?.message}
        />
      ),
      4: (
        <Input
          register={register("buBlsum")}
          errors={errors["buBlsum"]?.message}
        />
      ),
    },
  ];

  const data1 = [
    {
      1: (
        <Select {...register("buJpCode1")}>
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
        <Select {...register("buJpCode2")}>
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
        <Select {...register("buJpCode3")}>
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
        <Select {...register("buJpCode4")}>
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
      <Field
        flex
        style={{
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <Field flex>
          <img src={InfoPerson} alt="info" />
          <p style={{ fontSize: "14px", marginLeft: "7px" }}>LPG 매입 단가</p>
        </Field>
        <Field flex>
          <img src={InfoPerson} alt="info" />
          <p style={{ fontSize: "14px", marginLeft: "7px" }}>무료 충전 품목</p>
        </Field>
        <Field flex>
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
          />
          <Button text="취소" icon={<Reset />} />
        </Field>
      </Field>
      <Field flex>
        <div>
          <Table
            tableHeader={["구분", "kg 단가", "수송비", "합계"]}
            tableData={data0}
          />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <Table tableHeader={["품목"]} tableData={data1} />
        </div>
      </Field>
    </>
  );
}

export default Tab1;
