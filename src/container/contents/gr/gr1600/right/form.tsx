import { useState, useEffect } from "react";
import { Input, Divider, Wrapper } from "components/form/style";
import { useForm } from "react-hook-form";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import API from "app/axios";
import { toast } from "react-toastify";
import { GR160065, GR1600UPDATE } from "app/path";
import { IGR1600SEARCH } from "../model";

function Form({
  selected,
  values1,
  values2,
  labels1,
  labels2,
  fetchLeftData,
}: {
  selected: any;
  values1: any;
  values2: any;
  labels1: any;
  labels2: any;
  fetchLeftData: any;
}) {
  const [tabId, setTabId] = useState(0);
  const [tabData, setTabData] = useState(null);

  const {
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGR1600SEARCH>();

  const fetchData = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      try {
        const { data: tabData } = await API.get(GR160065, {
          params: {
            areaCode: selected.areaCode,
            buCode: selected?.buCode,
          },
        });

        setTabData(tabData);
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchData();
    clearForm();
  }, [selected]);

  const update = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      try {
        const formValues = getValues();

        const response: any = await API.post(GR1600UPDATE, {
          areaCode: formValues.areaCode,
          buCode: formValues.buCode,
          buPdanga:
            formValues.buPdanga && Number(formValues.buPdanga.replace(",", "")),
          buBdanga:
            formValues.buBdanga && Number(formValues.buBdanga.replace(",", "")),
          buBldanga:
            formValues.buBldanga &&
            Number(formValues.buBldanga.replace(",", "")),
          buPcost:
            formValues.buPcost && Number(formValues.buPcost.replace(",", "")),
          buBcost:
            formValues.buBcost && Number(formValues.buBcost.replace(",", "")),
          buBlcost:
            formValues.buBlcost && Number(formValues.buBlcost.replace(",", "")),
          buJpCode1: formValues.buJpCode1,
          buJpCode2: formValues.buJpCode2,
          buJpCode3: formValues.buJpCode3,
          buJpCode4: formValues.buJpCode4,
        });

        if (response.status === 200) {
          fetchLeftData();
          toast.success("update successfull", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.response?.data?.message, { autoClose: 500 });
        }
      } catch (err) {
        console.log("error::::::::", err);
      }
    }
  };

  const clearForm = () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};

      for (const [key, value] of Object.entries(selected)) {
        newData[key] = value;
      }
      reset(newData);
    }
  };

  return (
    <div style={{ padding: "10px", width: "900px" }}>
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
              justifyContent: "space-between",
              justifySelf: "flex-end",
              margin: "0 5px",
              alignItems: "center",
              background: `rgba(104,103,103,0.09)`,
              width: "250px",
              height: "25px",
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
            <span
              style={{
                marginLeft: "20px",
                fontFamily: "NotoSansKRRegular",
                fontSize: "12px",
                paddingRight: "10px",
              }}
            >
              {selected?.buCode}
            </span>
          </div>
        </Wrapper>
        <Divider />
      </form>

      <div style={{ marginTop: "15px" }}>
        <PlainTab
          tabHeader={["LPG  매입단가", "품목별 매입단가", "부품 매입단가"]}
          onClick={(id) => setTabId(id)}
          tabId={tabId}
        />
        <TabContentWrapper>
          {getTabContent(
            tabId,
            register,
            errors,
            tabData,
            selected,
            values1,
            values2,
            labels1,
            labels2,
            update,
            clearForm
          )}
        </TabContentWrapper>
      </div>
    </div>
  );
}

export default Form;
