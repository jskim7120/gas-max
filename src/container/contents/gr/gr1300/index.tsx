import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useMidLine from "app/hook/useMidLine";
import useDictionary from "app/hook/useDictionary";
import useRowIndex from "app/hook/useRowIndex";
import use4Btns from "app/hook/use4Btns";
import { GR1300SEARCH } from "app/path";
import { useDispatch } from "app/store";
import { apiGet } from "app/axios";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { Select, Label, FormGroup } from "components/form/style";
import { ButtonColor } from "components/componentsType";
import GridLeft from "components/grid";
import Loader from "components/loader";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import Form from "./form";
import { fields, columns } from "./data";
import Table from "./table";

const leftSideWidth: number = 930;

function GR1300({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const { showDraggableLine, linePos } = useMidLine(leftSideWidth);
  const { dataCommonDic } = useDictionary("GR", "GR1300");
  const { getRowIndex, setRowIndex } = useRowIndex();
  const { show4Btns, addBtnUnclick, isAddBtnClicked } = use4Btns();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const [bbBuCode, setBbBuCode] = useState<Array<any>>([]);
  const [bbSupplyType, setBbSupplyType] = useState<Array<any>>([]);

  const rowIndex = getRowIndex(menuId, 0);

  useEffect(() => {
    if (dataCommonDic) {
      dataCommonDic?.bbBuCode && setBbBuCode(dataCommonDic?.bbBuCode);
      dataCommonDic?.bbSupplyType &&
        setBbSupplyType(dataCommonDic?.bbSupplyType);

      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuCode: dataCommonDic?.sBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  const getMin = (num1: number, num2: number) => {
    if (num1 > num2) {
      return num2;
    }
    return num1;
  };

  const fetchData = async (params: any, pos: string = "") => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const res = await apiGet(GR1300SEARCH, params);

    if (res) {
      if (res?.dataMain) {
        const lastIndex =
          res?.dataMain?.length > 1 ? res.dataMain.length - 1 : 0;
        setData(res?.dataMain);

        if (pos === "last") {
          setSelected(res.dataMain[lastIndex]);
          setRowIndex(menuId, 0, lastIndex);
        } else {
          if (rowIndex) {
            if (rowIndex > lastIndex) {
              setRowIndex(menuId, 0, lastIndex);
              setSelected(res.dataMain[lastIndex]);
            } else {
              setSelected(res.dataMain[rowIndex]);
            }
          }
        }
      } else {
        setData([]);
        setSelected({});
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
    }
    setLoading(false);
  };

  const submit = async (params: any) => {
    if (params?.sDate) {
      params.sDate = DateWithoutDash(params.sDate);
    }
    if (params?.eDate) {
      params.eDate = DateWithoutDash(params.eDate);
    }
    fetchData(params, "last");
  };

  return (
    <>
      <SearchWrapper className="h35">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "70px" }}>영업소</Label>
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
        <LeftSide style={{ width: `${linePos}px` }}>
          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            style={{ minWidth: leftSideWidth }}
          >
            <SearchWrapper
              className="h35"
              style={{
                minWidth: `${leftSideWidth}px`,
              }}
            >
              <FormGroup>
                <Label style={{ minWidth: "70px" }}>지급기간</Label>
                <Controller
                  control={control}
                  name="sDate"
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
                <Controller
                  control={control}
                  name="eDate"
                  render={({ field }) => <CustomDatePicker {...field} />}
                />

                <Label style={{ minWidth: "90px" }}>매입처명</Label>
                <Select register={register("sBuCode")}>
                  {dataCommonDic?.sBuCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <div className="buttons ml30">
                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlassBig width="15px" />}
                    color={ButtonColor.DANGER}
                    type="submit"
                    loader={
                      loading && (
                        <Loader
                          size={16}
                          style={{
                            marginRight: "12px",
                          }}
                        />
                      )
                    }
                  />
                </div>
              </FormGroup>
            </SearchWrapper>
          </form>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            menuId={menuId}
            rowIndex={rowIndex}
            style={{
              height: `calc(100% - 94px)`,
              minWidth: `${leftSideWidth}px`,
            }}
          />
          <Table data={data2} style={{ width: leftSideWidth - 18 }} />
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            menuId={menuId}
            dataCommonDic={dataCommonDic}
            selected={selected}
            fetchData={handleSubmit(submit)}
            isAddBtnClicked={isAddBtnClicked}
            addBtnUnclick={addBtnUnclick}
            show4Btns={show4Btns}
            bbBuCode={bbBuCode}
            setBbBuCode={setBbBuCode}
            bbSupplyType={bbSupplyType}
            setBbSupplyType={setBbSupplyType}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1300;
