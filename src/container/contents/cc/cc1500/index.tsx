import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import GridLeft from "components/grid";
import { CC1500SEARCH, CC150065 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import CustomDatePicker from "components/customDatePicker";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { fields, columns } from "./data";
import { ICC1500SEARCH } from "./model";
import Form from "./form";
import { DateWithoutDash } from "helpers/dateFormat";
import useDrawLine from "app/hook/useDrawLine";
import use4Btns from "app/hook/use4Btns";

const leftSideWidth: number = 880;

function CC1500({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1500" });
  }, []);

  const handleClickAdd = () => {
    formRef.current.resetForm("clear");
  };

  const handleClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const handleClickUpdate = () => {
    formRef.current.crud(null);
  };

  const handleClickReset = () => {
    formRef.current.resetForm("reset");
  };

  const { show4Btns, addBtnUnclick } = use4Btns(
    isAddBtnClicked,
    setIsAddBtnClicked,
    handleClickAdd,
    handleClickDelete,
    handleClickUpdate,
    handleClickReset
  );

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
      fetchData65({
        areaCode: selected?.areaCode,
        cjCaCode: selected?.cjCaCode,
        cjDate: selected?.cjDate,
        cjSno: selected?.cjSno,
      });
    }
  }, [selected]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      cjCaCode: dataCommonDic?.sCaCode[0].code,
    });
  };

  const { register, handleSubmit, reset, control } = useForm<ICC1500SEARCH>({
    mode: "onSubmit",
  });

  const fetchData = async (params: any) => {
    setLoading(true);
    const res = await apiGet(CC1500SEARCH, params);
    if (res) {
      setData(res);
      setSelected(res[0]);
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(CC150065, params);
    if (res) {
      setData65({
        ...res[0],
        areaCode: selected.areaCode,
        cjDate: selected.cjDate,
      });
    } else {
      setData65([]);
    }
  };

  const cancel = () => {
    resetSearchForm();
    setData([]);
  };

  const submit = (params: any) => {
    params.sDateF = DateWithoutDash(params.sDateF);
    params.sDateT = DateWithoutDash(params.sDateT);
    fetchData(params);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "01" && (
            <>
              <Label style={{ minWidth: "48px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
          <div className="buttons ml30">{show4Btns()}</div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <div
            style={{
              minWidth: leftSideWidth,
              height: "100%",
            }}
          >
            <SearchWrapper className="h35">
              <form onSubmit={handleSubmit(submit)} autoComplete="off">
                <FormGroup>
                  <Label style={{ minWidth: "48px" }}>기간</Label>
                  <Controller
                    control={control}
                    name="sDateF"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <p>~</p>
                  <Controller
                    control={control}
                    name="sDateT"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />

                  <Label style={{ minWidth: "70px" }}>차량</Label>
                  <Select
                    register={register("cjCaCode")}
                    width={InputSize.i120}
                  >
                    {dataCommonDic?.sCaCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>

                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlass />}
                    type="submit"
                    color={ButtonColor.DANGER}
                    style={{ marginLeft: "30px" }}
                    loader={
                      loading && (
                        <>
                          <Loader
                            color="white"
                            size={16}
                            style={{ marginRight: "10px" }}
                            borderWidth="2px"
                          />
                        </>
                      )
                    }
                  />
                  <Button
                    text="취소"
                    icon={<ResetGray />}
                    type="button"
                    style={{ marginLeft: "5px" }}
                    color={ButtonColor.LIGHT}
                    onClick={cancel}
                  />
                </FormGroup>
              </form>
            </SearchWrapper>

            <GridLeft
              areaCode={ownAreaCode}
              data={data}
              fields={fields}
              columns={columns}
              setSelected={setSelected}
              menuId={menuId}
              rowIndex={0}
              setIsAddBtnClicked={setIsAddBtnClicked}
              style={{ height: `calc(100% - 47px)` }}
            />
          </div>
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            data65={data65}
            setData65={setData65}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selected={selected}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1500;
