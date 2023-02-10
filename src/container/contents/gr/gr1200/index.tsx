import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import {
  MagnifyingGlassBig,
  ResetGray,
  ExcelIcon,
} from "components/allSvgIcon";
import API from "app/axios";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Field, Label, FormGroup } from "components/form/style";
import { ButtonColor } from "components/componentsType";
import GridLeft from "../grid";
import Form from "./form";
import { GR1200SEARCH, GR120065 } from "app/path";
import Loader from "components/loader";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
} from "helpers/dateFormat";
import Table from "./table";
import { fields, columns, layout } from "./data";
import CustomTopPart from "container/contents/customTopPart";

const minWidth = "900px";
function GR1200({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1200",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState({});
  // const [data65, setData65] = useState({});
  // const [data65Detail, setData65Detail] = useState<any[]>();

  const [selected, setSelected] = useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBcBuCode: dataCommonDic?.sBcBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  // useEffect(() => {
  //   if (selected) {
  //     fetchData65();
  //   }
  // }, [selected]);

  const fetchData = async (params: any) => {
    try {
      if (params.sDate !== undefined) {
        params.sDate =
          typeof params.sDate === "string"
            ? formatDateByRemoveDash(params.sDate)
            : formatDateToStringWithoutDash(params.sDate);
      }
      if (params.eDate !== undefined) {
        params.eDate =
          typeof params.eDate === "string"
            ? formatDateByRemoveDash(params.eDate)
            : formatDateToStringWithoutDash(params.eDate);
      }
      setLoading(true);
      const res = await API.get(GR1200SEARCH, { params: params });
      if (res.status === 200) {
        setData(res?.data?.realgridData);
        setData2(res?.data?.totalData[0]);
        setSelected(res?.data?.realgridData[0]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("GR1200 DATA fetch error =======>", err);
    }
  };

  // const fetchData65 = async () => {
  //   try {
  //     const { data } = await API.get(GR120065, {
  //       params: {
  //         areaCode: selected?.areaCode,
  //         bcDate: formatDateByRemoveDash(selected?.bcDate),
  //         sBcBuCode: selected?.bcBuCode,
  //         bcSno: selected?.bcSno,
  //         bcChitType: selected?.bcChitType,
  //       },
  //     });

  //     if (data) {
  //       setData65(data?.mainData[0]);
  //       setData65Detail([...data?.detailData]);
  //     } else {
  //       setData65({});
  //       setData65Detail([]);
  //     }
  //   } catch (err) {
  //     console.log("GR1200 65 DATA fetch error =======>", err);
  //   }
  // };

  const submit = async (data: any) => {
    fetchData(data);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
      />
      <MainWrapper>
        <LeftSide>
          <form onSubmit={handleSubmit(submit)} style={{ minWidth: minWidth }}>
            <SearchWrapper className="h35">
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>기간</Label>
                <Controller
                  control={control}
                  {...register("sDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
                <Controller
                  control={control}
                  {...register("eDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />

                <Label>매입처</Label>
                <Select {...register("sBcBuCode")}>
                  {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <div className="buttons">
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig width="15px" />}
                  style={{ marginRight: "5px" }}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={15}
                          borderWidth="2px"
                          style={{ marginRight: "10px" }}
                        />
                      </>
                    )
                  }
                />
                <Button
                  text="취소"
                  icon={<ResetGray />}
                  style={{ marginRight: "5px" }}
                  color={ButtonColor.LIGHT}
                />
                <Button
                  text="엑셀"
                  icon={<ExcelIcon width="18px" />}
                  color={ButtonColor.LIGHT}
                />
              </div>
            </SearchWrapper>
          </form>
          <GridLeft
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: `calc(100% - 196px)`, minWidth: minWidth }}
          />
          <Table data={data2} style={{ minWidth: minWidth }} />
        </LeftSide>
        <RightSide>
          <Form
            dataCommonDic={dataCommonDic}
            selected={selected}
            // data={data65}
            // setData65Detail={setData65Detail}
            // data65Detail={data65Detail}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1200;
