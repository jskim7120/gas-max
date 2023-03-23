import { useEffect } from "react";
import { Input, TextArea } from "components/form/style";
import { useForm } from "react-hook-form";
import { InputSize } from "components/componentsType";
import { TabTable } from "./style";
import { ICM110065 } from "./model";

function Tab2({ data }: { data: any }) {
  // const submit = async (data: ICM110065) => {};

  const { register, handleSubmit, reset, getValues } = useForm<ICM110065>();

  useEffect(() => {
    if (
      data !== undefined &&
      (data?.tab31.length > 0 || data?.tab32.length > 0)
    ) {
      reset({
        cuBigo1: data.tab31[0].cuBigo1,
        cuBigo2: data.tab31[0].cuBigo2,
        cuMemo: data.tab31[0].cuMemo,
        cuRh2o: data.tab31[0].cuRh2o,
        cuRdangaTypeName: data.tab31[0].cuRdangaTypeName,
        cuRdanga: data.tab31[0].cuRdanga,
        bankName: data.tab32[0].bankName,
        acctNo: data.tab32[0].acctNo,
        depositor: data.tab32[0].depositor,
        cmsGubun: data.tab32[0].cmsGubun,
        cmsBanknm: data.tab32[0].cmsBanknm,
        cmsAcctno: data.tab32[0].cmsAcctno,
        cmsDepositor: data.tab32[0].cmsDepositor,
        cmsAppdt: data.tab32[0].cmsAppdt,
        cmsState: data.tab32[0].cmsState,
      });
    }
  }, [data]);

  return (
    <>
      <TabTable>
        <thead>
          <tr>
            <th className="blue" rowSpan={2}>
              비고
            </th>
            <td rowSpan={2}>
              <Input register={register("cuBigo1")} className="small" />
              <Input register={register("cuBigo2")} className="small" />
            </td>
            <th className="blue" rowSpan={2}>
              메모
            </th>
            <td rowSpan={2} style={{ verticalAlign: "top" }}>
              <TextArea
                style={{ width: "99.4%", height: "92%", margin: "2px" }}
                id={register("cuMemo").name}
                {...register("cuMemo")}
              />
            </td>
          </tr>
          <tr></tr>
        </thead>
      </TabTable>
      <TabTable>
        <thead>
          <tr>
            <th className="blue" colSpan={3}>
              고객전용 입금계좌
            </th>
            <th className="blue" colSpan={6}>
              자동이체 정보
            </th>
            <th className="blue" colSpan={2}>
              체적 단가
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="light-blue">은행</th>
            <th className="light-blue">계좌번호</th>
            <th className="light-blue">예금주</th>
            <th className="light-blue">CMS구분</th>
            <th className="light-blue">은행명</th>
            <th className="light-blue">계좌번호</th>
            <th className="light-blue">예금주</th>
            <th className="light-blue">약정일</th>
            <th className="light-blue">납부자상태</th>
            <th className="light-blue">압력</th>
            <th className="light-blue">루베단가</th>
          </tr>
          <tr>
            <td>
              <Input register={register("bankName")} className="small" />
            </td>
            <td>
              <Input register={register("acctNo")} className="small" />
            </td>
            <td>
              <Input register={register("depositor")} className="small" />
            </td>
            <td>
              <Input
                register={register("cmsGubun")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input
                register={register("cmsBanknm")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input
                register={register("cmsAcctno")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input
                register={register("cmsDepositor")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input
                register={register("cmsAppdt")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input
                register={register("cmsState")}
                className="small jccenter"
                inputSize={InputSize.i100}
              />
            </td>
            <td>
              <Input register={register("cuRh2o")} className="small" />
            </td>
            <td>
              <div style={{ display: "flex" }}>
                <Input
                  register={register("cuRdangaTypeName")}
                  className="small"
                  inputSize={InputSize.i100}
                />
                <Input
                  register={register("cuRdanga")}
                  className="small"
                  inputSize={InputSize.i100}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </TabTable>
    </>
  );
}

export default Tab2;
