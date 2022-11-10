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
    <TabTable>
      <tr>
        <th className="green">사업번호</th>
        <th colSpan={3}>
          <Input
            register={register("cuNo")}
            errors={errors["cuNo"]?.message}
            className="small green"
          />
        </th>
        <th className="green">상호</th>
        <th colSpan={3}>
          <Input
            register={register("cuSangho")}
            errors={errors["cuSangho"]?.message}
            className="small green"
          />
        </th>
        <th className="green">대표</th>
        <th colSpan={3}>
          <Input
            register={register("cuSajang")}
            errors={errors["cuSajang"]?.message}
            className="small green"
          />
        </th>
        <th className="green">시설 투자비</th>
        <th colSpan={2}>
          <Input
            register={register("cuSvKumack")}
            errors={errors["cuSvKumack"]?.message}
            className="small green"
          />
        </th>
      </tr>
      <tr>
        <th colSpan={2} className="green">
          법정검사
        </th>
        <th colSpan={6} className="green">
          저장탱크
        </th>
        <th colSpan={4} className="green">
          기화기
        </th>
        <th colSpan={3} className="green">
          계량기
        </th>
      </tr>
      <tr>
        <th className="light-green">시설구분</th>
        <td>
          <Input
            register={register("cuTankName")}
            errors={errors["cuTankName"]?.message}
            className="small light-green"
          />
        </td>
        <th className="light-green">용랑</th>
        <th className="light-green">제조번호</th>
        <th className="light-green">제작년월</th>
        <th className="light-green">외관검사</th>
        <th className="light-green">개방검사</th>
        <th className="light-green">발신기</th>
        <th className="light-green">용량</th>
        <th className="light-green">제조번호</th>
        <th className="light-green">제작년월</th>
        <th className="light-green">장치검사</th>
        <th className="light-green">모델</th>
        <th className="light-green">유효기간</th>
        <th className="light-green">발신</th>
      </tr>
      <tr>
        <th>완성검사</th>
        <td>
          <Input
            register={register("cuFinishDate")}
            errors={errors["cuFinishDate"]?.message}
            className="small white"
          />
        </td>
        <td>
          <Input
            register={register("tankVol1")}
            errors={errors["tankVol1"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankSno1")}
            errors={errors["tankSno1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("tankMakeDate1")}
            errors={errors["tankMakeDate1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("tankOutsideDate1")}
            errors={errors["tankOutsideDate1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("tankInsideDate1")}
            errors={errors["tankInsideDate1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("tankTransmCd1")}
            errors={errors["tankTransmCd1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("gasifyVol1")}
            errors={errors["gasifyVol1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("gasifySno1")}
            errors={errors["gasifySno1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("gasifyMakeDate1")}
            errors={errors["gasifyMakeDate1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("gasifyCheckDate1")}
            errors={errors["gasifyCheckDate1"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("cuMeterTypeName")}
            errors={errors["cuMeterTypeName"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("cuMeterTurm")}
            errors={errors["cuMeterTurm"]?.message}
            className="small "
          />
        </td>
        <td>
          <Input
            register={register("cuMTransmCd")}
            errors={errors["cuMTransmCd"]?.message}
            className="small "
          />
        </td>
      </tr>
      <tr>
        <td style={{ width: "110px", textAlign: "center" }}>정기검사</td>
        <td>
          <Input
            register={register("cuCircuitDate")}
            errors={errors["cuCircuitDate"]?.message}
            className="small white"
          />
        </td>
        <td>
          <Input
            register={register("tankVol2")}
            errors={errors["tankVol2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankSno2")}
            errors={errors["tankSno2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankMakeDate2")}
            errors={errors["tankMakeDate2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankOutsideDate2")}
            errors={errors["tankOutsideDate2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankInsideDate2")}
            errors={errors["tankInsideDate2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("tankTransmCd2")}
            errors={errors["tankTransmCd2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("gasifyVol2")}
            errors={errors["gasifyVol2"]?.message}
            className="small"
          />
        </td>

        <td>
          <Input
            register={register("gasifySno2")}
            errors={errors["gasifySno2"]?.message}
            className="small"
          />
        </td>

        <td>
          <Input
            register={register("gasifyMakeDate2")}
            errors={errors["gasifyMakeDate2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("gasifyCheckDate2")}
            errors={errors["gasifyCheckDate2"]?.message}
            className="small"
          />
        </td>
        <td>
          <Input
            register={register("cuMeterLrName")}
            errors={errors["cuMeterLrName"]?.message}
            className="small"
          />
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Input
            register={register("cuMeterM3")}
            errors={errors["cuMeterM3"]?.message}
            className="small"
          />
        </td>
        <td></td>
        <td>
          <Input
            register={register("cuRh2o")}
            errors={errors["cuRh2o"]?.message}
            className="small"
          />
        </td>
      </tr>
    </TabTable>
  );
}

export default Tab2;
