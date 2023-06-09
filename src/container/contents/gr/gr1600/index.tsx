import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { GR1600SEARCH } from "app/path";
import { InputSize, ButtonColor, ButtonType } from "components/componentsType";
import Button from "components/button/button";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import {
  MainWrapper,
  SearchWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import Form from "./right/form";
import Grid from "components/grid";
import { ISEARCH } from "./model";
import { fields, columns } from "./data";
import Loader from "components/loader";
import CustomTopPart from "container/contents/customTopPart";

let values1: any;
let labels1: any;
let values2: any;
let labels2: any;
const minWidth = "822px";

function GR1600({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getCommonDictionary({ groupId: "GR", functionName: "GR1600" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        buGubun: dataCommonDic?.sBuGubun[0].code,
      });
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });

      values1 = [];
      labels1 = [];
      values2 = [];
      labels2 = [];

      dataCommonDic?.jpDangaType.map((item: any) => {
        values1.push(item.code);
        labels1.push(item.codeName);
      });

      dataCommonDic?.jpVatKind.map((item: any) => {
        values2.push(item.code);
        labels2.push(item.codeName);
      });
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    if (params?.buGubun && params.buGubun === "9") {
      delete params.buGubun;
    }
    setLoading(true);
    const SEARCHDATA = await apiGet(GR1600SEARCH, params);

    if (SEARCHDATA) {
      setData(SEARCHDATA);
      setLoading(false);
    }
  };

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "34px" }}>영업소</Label>
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
                <Label
                  style={{
                    minWidth: "48px",
                  }}
                >
                  구분
                </Label>
                <Select register={register("buGubun")} width={InputSize.i100}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  register={register("buName")}
                  inputSize={InputSize.i200}
                />
              </FormGroup>
              <div className="buttons">
                <Button
                  text="검색"
                  icon={
                    !loading && (
                      <MagnifyingGlassBig width="17.188" height="17.141" />
                    )
                  }
                  kind={ButtonType.ROUND}
                  type="submit"
                  style={{ marginRight: "5px", height: "26px" }}
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={17}
                          style={{ marginRight: "10px" }}
                          borderWidth="2px"
                        />
                      </>
                    )
                  }
                />

                <Button
                  text="엑셀"
                  icon={<ExcelIcon />}
                  kind={ButtonType.ROUND}
                  color={ButtonColor.SECONDARY}
                  type="button"
                  style={{ height: "26px" }}
                />
              </div>
            </SearchWrapper>
          </form>
          <Grid
            areaCode={areaCode}
            data={data}
            columns={columns}
            fields={fields}
            menuId={menuId}
            rowIndex={data?.length > 1 ? data.length - 1 : 0}
            setSelected={setSelected}
            style={{ height: `calc(100% - 15px)` }}
            evenFill
          />
        </LeftSide>
        <RightSide>
          <Form
            selected={selected}
            values1={values1}
            values2={values2}
            labels1={labels1}
            labels2={labels2}
            fetchLeftData={handleSubmit(submit)}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1600;
