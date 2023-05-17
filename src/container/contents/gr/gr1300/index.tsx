import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import API from "app/axios";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Label, FormGroup } from "components/form/style";
import { ButtonColor } from "components/componentsType";
import GridLeft from "components/grid";
import Form from "./form";
import { GR1300SEARCH } from "app/path";
import Loader from "components/loader";
import { DateWithoutDash } from "helpers/dateFormat";
import Table from "./table";
import { fields, columns } from "./data";
import CustomTopPart from "container/contents/customTopPart";

const minWidth = "900px";

function GR1300({
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
    functionName: "GR1300",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuCode: dataCommonDic?.sBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      if (params.sDate !== undefined) {
        params.sDate = DateWithoutDash(params.sDate);
      }
      if (params.eDate !== undefined) {
        params.eDate = DateWithoutDash(params.eDate);
      }
      setLoading(true);
      const res = await API.get(GR1300SEARCH, { params: params });
      if (res?.data && res?.data?.length > 0) {
        setData(res.data);
        setSelected(res.data[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setLoading(false);
    } catch (err) {
      setData([]);
      setSelected({});
      setLoading(false);
      console.log("GR1300 DATA fetch error =======>", err);
    }
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
              <Label style={{ minWidth: "62px" }}>영업소</Label>

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
                <Select register={register("sBuCode")}>
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
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: `calc(100% - 82px)`, minWidth: minWidth }}
          />
          <Table data={data} style={{ minWidth: minWidth }} />
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

export default GR1300;
