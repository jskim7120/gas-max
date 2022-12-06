import { useState, useEffect } from "react";
import {
  Input,
  Divider,
  Wrapper,
  FormGroup,
  Label,
  Select,
} from "components/form/style";
import { useForm } from "react-hook-form";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
// import getTabContent from "./getTabContent";
import API from "app/axios";
import { toast } from "react-toastify";
import { GR110065, GR1100UPDATE } from "app/path";
import { IGR1100SEARCH } from "../model";

function Form({
  selected,
  values1,
  values2,
  labels1,
  labels2,
  fetchLeftData,
  dataCommonDic,
}: {
  selected: any;
  values1: any;
  values2: any;
  labels1: any;
  labels2: any;
  fetchLeftData: any;
  dataCommonDic: any;
}) {
  const [tabId, setTabId] = useState(0);
  const [tabData, setTabData] = useState(null);

  const {
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGR1100SEARCH>();

  const fetchData = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      try {
        const { data: tabData } = await API.get(GR110065, {
          params: {
            areaCode: selected.areaCode,
            // buCode: selected?.buCode,
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

        const response: any = await API.post(GR1100UPDATE, {
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
    <div style={{ padding: "0px 10px" }}>
      <form>
        <Wrapper grid>
          <Input
            label="매입처코드"
            register={register("buCode")}
            errors={errors["buCode"]?.message}
          />
          <Input
            label="매입처 구분"
            register={register("buGubun")}
            errors={errors["buGubun"]?.message}
          />
        </Wrapper>

        <Wrapper grid>
          <Input
            label="매입처명"
            register={register("buName")}
            errors={errors["buName"]?.message}
          />
          <FormGroup>
            <Label>거래상태</Label>
            <Select {...register("buStae")}>
              {dataCommonDic?.buStae?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
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
        </Wrapper>

        <Wrapper grid>
          <Input
            label="비고"
            register={register("buBigo")}
            errors={errors["buBigo"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="사업자번호"
            register={register("buNo")}
            errors={errors["buNo"]?.message}
          />
          <Input
            label="종사업장"
            register={register("buRCode")}
            errors={errors["buRCode"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="상호"
            register={register("buSangho")}
            errors={errors["buSangho"]?.message}
          />
          <Input
            label="대표자명"
            register={register("buSajang")}
            errors={errors["buSajang"]?.message}
          />
        </Wrapper>
        <Divider />
      </form>

      {/* <div style={{ marginTop: "15px" }}>
        <PlainTab
          tabHeader={["LPG  매입단가", "품목별 매입단가", "부품 매입단가"]}
          onClick={(id) => setTabId(id)}
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
      </div> */}
    </div>
  );
}

export default Form;
