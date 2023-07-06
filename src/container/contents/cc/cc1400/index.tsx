import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import GridLeft from "components/grid";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { ICC1400SEARCH } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { fields, columns } from "./data";
import Form from "./form";
import { CC1400SEARCH } from "app/path";
import { DateWithoutDash } from "helpers/dateFormat";
import useDrawLine from "app/hook/useDrawLine";
import use4Btns from "app/hook/use4Btns";

const leftSideWidth: number = 800;

function CC1400({
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
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1400" });
  }, []);

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
    }
  }, [selected]);

  const { register, handleSubmit, reset, control } = useForm<ICC1400SEARCH>({
    mode: "onSubmit",
  });

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

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sSwCode: dataCommonDic?.sSwCode[0].code,
    });
  };

  const submit = (params: any) => {
    params.sDateF = DateWithoutDash(params.sDateF);

    params.sDateT = DateWithoutDash(params.sDateT);

    fetchData(params);
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    const res = await apiGet(CC1400SEARCH, params);
    if (res) {
      setData(res);
      setSelected(res[0]);
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  const cancel = () => {
    resetSearchForm();
    setData([]);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
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
                    {...register("sDateF")}
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <p>~</p>
                  <Controller
                    control={control}
                    {...register("sDateT")}
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />

                  <Label>사원</Label>
                  <Select register={register("sSwCode")} width={InputSize.i120}>
                    {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
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
                    style={{ margin: "0 15px 0 50px" }}
                  />
                  <Button
                    text="취소"
                    type="button"
                    icon={<ResetGray />}
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
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            setSelected={setSelected}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1400;
