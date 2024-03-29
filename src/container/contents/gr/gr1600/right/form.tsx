import { useState, useEffect } from "react";
import { Input, Divider, Wrapper } from "components/form/style";
import { useForm } from "react-hook-form";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { apiGet, apiPost } from "app/axios";
import { toast } from "react-toastify";
import { GR160065, GR1600UPDATE } from "app/path";
import { IGR1600SEARCH } from "../model";
import { removeCommas, formatMoney } from "helpers/currency";

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

  const [buPsum, setBuPsum] = useState<number>(0);
  const [buBsum, setBuBsum] = useState<number>(0);
  const [buBlsum, setBuBlsum] = useState<number>(0);

  const { register, reset, control, getValues, watch } =
    useForm<IGR1600SEARCH>();

  const watcher = watch();

  useEffect(() => {
    if (
      watcher?.buPdanga ||
      watcher?.buPcost ||
      watcher?.buBdanga ||
      watcher?.buBcost ||
      watcher?.buBldanga ||
      watcher?.buBlcost
    ) {
      const buPdanga: number = watcher?.buPdanga
        ? +removeCommas(watcher?.buPdanga, "number")
        : 0;

      const buPcost: number = watcher?.buPcost
        ? +removeCommas(watcher?.buPcost, "number")
        : 0;
      const s1: number = buPdanga + buPcost;
      setBuPsum(s1);

      const buBdanga: number = watcher?.buBdanga
        ? +removeCommas(watcher?.buBdanga, "number")
        : 0;

      const buBcost: number = watcher?.buBcost
        ? +removeCommas(watcher?.buBcost, "number")
        : 0;

      const s2: number = buBdanga + buBcost;
      setBuBsum(s2);

      const buBldanga: number = watcher?.buBldanga
        ? +removeCommas(watcher?.buBldanga, "number")
        : 0;

      const buBlcost: number = watcher?.buBlcost
        ? +removeCommas(watcher?.buBlcost, "number")
        : 0;

      const s3: number = buBldanga + buBlcost;
      setBuBlsum(s3);
    }
  }, [
    watcher?.buPdanga,
    watcher?.buPcost,
    watcher.buBdanga,
    watcher.buBcost,
    watcher.buBldanga,
    watcher.buBlcost,
  ]);

  const fetchData = async () => {
    // if (selected !== undefined && JSON.stringify(selected) !== "{}") {
    //   try {
    //     const { data: tabData } = await API.get(GR160065, {
    //       params: {
    //         areaCode: selected.areaCode,
    //         buCode: selected?.buCode,
    //       },
    //     });

    //     setTabData(tabData);
    //   } catch (err) {}
    // }
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      const tabData = await apiGet(GR160065, {
        areaCode: selected.areaCode,
        buCode: selected?.buCode,
      });
      setTabData(tabData);
    }
  };

  useEffect(() => {
    fetchData();
    clearForm();
  }, [selected]);

  const update = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      // try {
      //   const formValues = getValues();

      //   const response: any = await apiPost(GR1600UPDATE, {
      //     areaCode: formValues.areaCode,
      //     buCode: formValues.buCode,
      //     buPdanga:
      //       formValues.buPdanga && Number(formValues.buPdanga.replace(",", "")),
      //     buBdanga:
      //       formValues.buBdanga && Number(formValues.buBdanga.replace(",", "")),
      //     buBldanga:
      //       formValues.buBldanga &&
      //       Number(formValues.buBldanga.replace(",", "")),
      //     buPcost:
      //       formValues.buPcost && Number(formValues.buPcost.replace(",", "")),
      //     buBcost:
      //       formValues.buBcost && Number(formValues.buBcost.replace(",", "")),
      //     buBlcost:
      //       formValues.buBlcost && Number(formValues.buBlcost.replace(",", "")),
      //     buJpCode1: formValues.buJpCode1,
      //     buJpCode2: formValues.buJpCode2,
      //     buJpCode3: formValues.buJpCode3,
      //     buJpCode4: formValues.buJpCode4,
      //   });

      //   if (response.status === 200) {
      //     fetchLeftData();
      //     toast.success("update successfull", {
      //       autoClose: 500,
      //     });
      //   } else {
      //     toast.error(response?.response?.data?.message, { autoClose: 500 });
      //   }
      // } catch (err) {
      //   console.log("error::::::::", err);
      // }

      const formValues = getValues();

      const response: any = await apiPost(GR1600UPDATE, {
        areaCode: formValues.areaCode,
        buCode: formValues.buCode,
        buPdanga:
          formValues.buPdanga && Number(formValues.buPdanga.replace(",", "")),
        buBdanga:
          formValues.buBdanga && Number(formValues.buBdanga.replace(",", "")),
        buBldanga:
          formValues.buBldanga && Number(formValues.buBldanga.replace(",", "")),
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

      if (response) {
        fetchLeftData();
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
      <form autoComplete="off">
        <Wrapper grid>
          <Input label="구분" register={register("buGubunName")} />
          <Input label="코드" register={register("buCode")} />
          <Input label="매입처명" register={register("buName")} />
        </Wrapper>

        <Wrapper grid>
          <Input label="대표전화" register={register("buTel")} />
          <Input label="Fax 번호" register={register("buFax")} />
          <Input label="거래 상태" register={register("buStaeName")} />
        </Wrapper>

        <Wrapper grid>
          <Input label="담당자명" register={register("buDamdang")} />
          <Input label="담당자 번호" register={register("buHp")} />
          <Input label="이메일" register={register("buEmail")} />
        </Wrapper>

        <Wrapper grid>
          <Input label="비 고" register={register("buBigo")} />
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
              height: "30px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "NotoSansKRRegular",
                fontSize: "15px",
                background: "#A7A7A7",
                height: "22px",
                width: "80px",
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
                fontSize: "15px",
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
            control,
            tabData,
            buPsum,
            buBsum,
            buBlsum,
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
