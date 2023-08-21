import { useState, useEffect, useRef } from "react";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { CC1200SEARCH } from "app/path";
import { ICC1200SEARCH } from "./model";
import GridLeft from "components/grid";
import CheckBox from "components/checkbox";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { addDeleteMenuId } from "app/state/modal/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
import { FormGroup, Label, Select } from "components/form/style";
import Form from "./form";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";
import useDrawLine from "app/hook/useMidLine";
import use4Btns from "app/hook/use4Btns";
import { DateWithoutDash } from "helpers/dateFormat";
import useModal from "app/hook/useModal";

const leftSideWidth: number = 800;

function CC1200({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { show4Btns, addBtnUnclick, isAddBtnClicked, setIsAddBtnClicked } =
    use4Btns();
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const { showDeleteModal, openModal } = useModal();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});

  const handleClickAdd = () => {
    formRef.current.resetForm("clear");
  };

  const handleClickDelete = () => {
    openModal();
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  const handleClickUpdate = () => {
    formRef.current.crud(null);
  };

  const handleClickReset = () => {
    formRef.current.resetForm("reset");
  };

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, watch, control } =
    useForm<ICC1200SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1200" });
  }, []);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
    });
  };

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
      fetchData({
        areaCode: dataCommonDic?.areaCode[0].code,
        sDateT: DateWithoutDash(dataCommonDic?.sDateT[0].code),
        sDateF: DateWithoutDash(dataCommonDic?.sDateF[0].code),
        userChk: "N",
      });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      addBtnUnclick();
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    setLoading(true);
    const data = await apiGet(CC1200SEARCH, params);

    if (data) {
      setData(data);
      setSelected(data[0]);
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

  const submit = (params: any) => {
    params.userChk = params.userChk ? "Y" : "N";
    params.sDateT = DateWithoutDash(params.sDateT);
    params.sDateF = DateWithoutDash(params.sDateF);
    fetchData(params);
  };

  return (
    <>
      {showDeleteModal()}
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
          <div className="buttons ml30">
            {show4Btns({
              handleClickAdd,
              handleClickDelete,
              handleClickUpdate,
              handleClickReset,
            })}
          </div>
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
                  <CheckBox
                    register={register("userChk")}
                    title="사용자등록 자료만 보기"
                    rtl
                    style={{ marginLeft: "20px" }}
                  />
                  <div className="buttons ml30">
                    <Button
                      text="검색"
                      icon={!loading && <MagnifyingGlassBig width="15" />}
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
                    <Button
                      text="취소"
                      icon={<ResetGray />}
                      style={{ marginRight: "10px" }}
                      type="button"
                      color={ButtonColor.LIGHT}
                      onClick={cancel}
                    />
                  </div>
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
            setIsAddBtnClicked={setIsAddBtnClicked}
            areaCode={watch("areaCode")}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1200;
