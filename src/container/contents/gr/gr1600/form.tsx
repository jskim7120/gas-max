import React, { useState, useEffect } from "react";
import {
  Field,
  Input,
  Input2,
  Select,
  DividerGray,
  Wrapper,
  Label,
  FormGroup,
} from "components/form/style";
import { useForm } from "react-hook-form";
import { InputSize } from "components/componentsType";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import API from "app/axios";
import { GR160065 } from "app/path";

function Form({ selected }: { selected: any }) {
  const [tabId, setTabId] = useState(0);
  const [tabData, setTabData] = useState(null);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<any>();

  const fetchData = async () => {
    try {
      const { data: tabData } = await API.get(GR160065, {
        params: {
          areaCode: selected.areaCode,
          buCode: selected?.buCode,
        },
      });
      setTabData(tabData);
    } catch (err) {}
  };

  useEffect(() => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      fetchData();
      let newData: any = {};

      for (const [key, value] of Object.entries(selected)) {
        newData[key] = value;
      }
      reset(newData);
    }
  }, [selected]);
  return (
    <>
      <form>
        <Wrapper grid>
          <Input
            label="구분"
            register={register("buGubunName")}
            errors={errors["buGubunName"]?.message}
          />
          <Input
            label="코드"
            register={register("buCode")}
            errors={errors["buCode"]?.message}
          />
          <Input
            label="매입처명"
            register={register("buName")}
            errors={errors["buName"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="대표전화"
            register={register("buTel")}
            errors={errors["buTel"]?.message}
          />
          <Input
            label="Fax 번호"
            register={register("buFax")}
            errors={errors["buFax"]?.message}
          />
          <Input
            label="거래상태"
            register={register("buStaeName")}
            errors={errors["buStaeName"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="담당자명"
            register={register("buDamdang")}
            errors={errors["buDamdang"]?.message}
          />
          <Input
            label="담당자 번호"
            register={register("buHp")}
            errors={errors["buHp"]?.message}
          />
          <Input
            label="이메일"
            register={register("buEmail")}
            errors={errors["buEmail"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="비고"
            register={register("buBigo")}
            errors={errors["buBigo"]?.message}
          />
          <div></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: `rgba(104,103,103,0.09)`,
              width: "200px",
              height: "23px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "NotoSansKRRegular",
                fontSize: "10px",
                background: "#A7A7A7",
                height: "15px",
                width: "50px",
                color: "#fff",
                marginLeft: "12px",
                textAlign: "center",
                borderRadius: "2px",
              }}
            >
              미지급액
            </span>
            <span style={{ marginLeft: "20px" }}>{selected?.buCode}</span>
          </div>
        </Wrapper>

        <DividerGray />
      </form>
      <div style={{ marginTop: "15px" }}>
        <PlainTab
          tabHeader={["LPG  매입단가", "품목별 매입단가", "부품 매입단가"]}
          onClick={(id) => setTabId(id)}
        />
        <TabContentWrapper>
          {getTabContent(tabId, register, errors, tabData, selected)}
        </TabContentWrapper>
      </div>
    </>
  );
}

export default Form;
