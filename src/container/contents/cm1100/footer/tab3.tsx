import React from "react";
import { CM110065 } from "app/path";
import {
  Wrapper,
  Divider,
  DividerGray,
  Input,
  Select,
  Field,
  Label,
} from "components/form/style";
import { useForm } from "react-hook-form";
import { InputSize } from "components/componentsType";
import { TabTable } from "./style";
import { ICM110065 } from "./model";

function Tab2({ data }: { data: any }) {
  const submit = async (data: ICM110065) => {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ICM110065>();

  return (
    <>
      <TabTable>
        <thead>
          <tr>
            <th className="blue" rowSpan={2}>
              비고
            </th>
            <td rowSpan={2}>
              <Input
                register={register("cuBigo1")}
                errors={errors["cuBigo1"]?.message}
                className="small"
                inputSize={InputSize.md}
              />
              <Input
                register={register("cuBigo2")}
                errors={errors["cuBigo2"]?.message}
                className="small"
                inputSize={InputSize.md}
              />
            </td>
            <th className="blue" rowSpan={2}>
              메모
            </th>
            <td rowSpan={2} style={{ verticalAlign: "top" }}>
              <Input
                register={register("cuMemo")}
                errors={errors["cuMemo"]?.message}
                className="small"
                inputSize={InputSize.md}
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
            <th>농협은행</th>
            <th>12345-12345-12345</th>
            <th>조아테크</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Input
                register={register("cuRh2o")}
                errors={errors["cuRh2o"]?.message}
                className="small"
              />
            </th>
            <th>
              <div style={{ display: "flex" }}>
                <Input
                  register={register("cuRdangaTypeName")}
                  errors={errors["cuRdangaTypeName"]?.message}
                  className="small"
                  inputSize={InputSize.sm}
                />
                <Input
                  register={register("cuRdanga")}
                  errors={errors["cuRdanga"]?.message}
                  className="small"
                  inputSize={InputSize.sm}
                />
              </div>
            </th>
          </tr>
          <tr>
            <td>
              <Input
                register={register("bankName")}
                errors={errors["bankName"]?.message}
                className="small"
              />
            </td>
            <td>
              <Input
                register={register("acctNo")}
                errors={errors["acctNo"]?.message}
                className="small"
              />
            </td>
            <td>
              <Input
                register={register("depositor")}
                errors={errors["depositor"]?.message}
                className="small"
              />
            </td>
            <td>
              <Input
                register={register("cmsGubun")}
                errors={errors["cmsGubun"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td>
              <Input
                register={register("cmsBanknm")}
                errors={errors["cmsBanknm"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td>
              <Input
                register={register("cmsAcctno")}
                errors={errors["cmsAcctno"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td>
              <Input
                register={register("cmsDepositor")}
                errors={errors["cmsDepositor"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td>
              <Input
                register={register("cmsAppdt")}
                errors={errors["cmsAppdt"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td>
              <Input
                register={register("cmsState")}
                errors={errors["cmsState"]?.message}
                className="small jccenter"
                inputSize={InputSize.sm}
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </TabTable>
    </>
  );
}

export default Tab2;
