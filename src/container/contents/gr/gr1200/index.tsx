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
import { apiGet } from "app/axios";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Label, FormGroup } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import GridLeft from "components/grid";
import Form from "./form";
import { GR1200SEARCH } from "app/path";
import Loader from "components/loader";
import { DateWithoutDash } from "helpers/dateFormat";
import Table from "./table";
import { fields, columns, layout } from "./data";

const minWidth = "auto";

function GR1200({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1200",
  });

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [data2, setData2] = useState({});
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBcBuCode: dataCommonDic?.sBcBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
      fetchData({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBcBuCode: dataCommonDic?.sBcBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const res = await apiGet(GR1200SEARCH, params);

    if (res) {
      if (res?.realgridData) {
        setData(res?.realgridData);
        setSelected(res?.realgridData[0]);
        setSelectedRowIndex(0);
      } else {
        setData([]);
        setSelected({});
        setSelectedRowIndex(0);
      }
      if (res?.totalData) {
        setData2(res?.totalData[0]);
      } else {
        setData2([]);
      }
    } else {
      setData([]);
      setData2([]);
      setSelected({});
      setSelectedRowIndex(0);
    }
    setLoading(false);
    setIsAddBtnClicked(false);
    setIsCancelBtnDisabled(true);
  };

  const submit = async (data: any) => {
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "40px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            style={{ minWidth: minWidth }}
          >
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

                <Label style={{ minWidth: "80px" }}>매입처</Label>
                <Select register={register("sBcBuCode")} width={InputSize.i160}>
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
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsAddBtnClicked={setIsAddBtnClicked}
            setIsCancelBtnDisabled2={setIsCancelBtnDisabled}
            style={{ height: `calc(100% - 210px)`, minWidth: minWidth }}
            layout={layout}
          />
          <Table data={data2} style={{ minWidth: minWidth }} />
        </LeftSide>
        <RightSide>
          <Form
            menuId={menuId}
            dataCommonDic={dataCommonDic}
            selected={selected}
            fetchData={handleSubmit(submit)}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
            isCancelBtnDisabled={isCancelBtnDisabled}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1200;
