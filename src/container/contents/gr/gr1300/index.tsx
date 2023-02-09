import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import API from "app/axios";
import { GR1300SEARCH, GR130065 } from "app/path";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Field, Label, FormGroup } from "components/form/style";
import Grid from "../grid";
import { columns, fields } from "./data";
import Form from "./form";
import Table from "./table";
import Loader from "components/loader";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
} from "helpers/dateFormat";

const minWidth = "900px";

function GR1300({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1300",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});

  const [selected, setSelected] = useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuCode: dataCommonDic?.sBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected) {
      fetchData65();
    }
  }, [selected]);

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
      const res = await API.get(GR1300SEARCH, { params: params });
      if (res.status === 200) {
        setData(res?.data);
        // setData2(res?.data?.totalData[0]);
        setSelected(res?.data?.[0]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("GR1300 DATA fetch error =======>", err);
    }
  };

  const fetchData65 = async () => {
    try {
      const { data } = await API.get(GR130065, {
        params: {
          areaCode: selected?.areaCode,
          bbBuCode: selected?.bbBuCode,
          bbDate: selected?.bbDate,
          bbSno: selected?.bbSno,
          // bcChitType: "0",
        },
      });

      if (data) {
        setData65(data);
      } else {
        setData65({});
      }
    } catch (err) {
      console.log("GR1300 65 DATA fetch error =======>", err);
    }
  };

  const submit = async (data: any) => {
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <Field flex>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>
          <Select {...register("areaCode")}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form onSubmit={handleSubmit(submit)} style={{ minWidth: minWidth }}>
            <SearchWrapper className="h35">
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>지급기간</Label>
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

                <Label>매입처명</Label>
                <Select {...register("sBuCode")}>
                  {dataCommonDic?.sBuCode?.map((obj: any, idx: number) => (
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
              </div>
            </SearchWrapper>
          </form>
          <Grid
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "calc(100% - 82px)", minWidth: minWidth }}
          />
          <Table data={data} style={{ minWidth: minWidth }} />
        </LeftSide>
        <RightSide>
          <Form
            dataCommonDic={dataCommonDic}
            data65={data65}
            setData65={setData65}
            selected={selected}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1300;
