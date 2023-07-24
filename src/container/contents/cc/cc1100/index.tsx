import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { CC1100SEARCH } from "app/path";
import { ICC1100SEARCH } from "./model";
import GridLeft from "components/grid";
import {
  LeftSide,
  MainWrapper,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import Form from "./form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";
import useDrawLine from "app/hook/useDrawLine";
import use4Btns from "app/hook/use4Btns";

const leftSideWidth: number = 860;

function CC1100({
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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

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

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, control, watch } =
    useForm<ICC1100SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1100" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();

      fetchData({
        areaCode: dataCommonDic?.areaCode[0].code,
        sDateT: dataCommonDic?.sDateT[0].code,
        sDateF: dataCommonDic?.sDateF[0].code,
        bankCd: "",
        codeGu: "0",
      });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
    }
  }, [selected]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      bankCd: "",
      codeGu: "0",
    });
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    const data = await apiGet(CC1100SEARCH, params);
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

  const submit = (data: ICC1100SEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "50px" }}>영업소</Label>
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
                  {[
                    { name: "현금", value: "0" },
                    { name: "예금", value: "1" },
                  ].map((option, index) => (
                    <Item key={index}>
                      <RadioButton
                        type="radio"
                        value={option.value}
                        id={option.value}
                        {...register(`codeGu`)}
                      />
                      <RadioButtonLabel htmlFor={`${option.value}`}>
                        {option.name}
                      </RadioButtonLabel>
                    </Item>
                  ))}
                  <Input
                    readOnly={watch("codeGu") === "0"}
                    register={register("bankCd")}
                    labelStyle={{ minWidth: "70px" }}
                    inputSize={InputSize.i100}
                  />

                  <Label style={{ minWidth: "80px" }}>기간</Label>
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
                  <div className="buttons ml30">
                    <Button
                      text="검색"
                      icon={!loading && <MagnifyingGlass />}
                      color={ButtonColor.DANGER}
                      type="submit"
                      loader={
                        loading && (
                          <>
                            <Loader
                              color="white"
                              size={13}
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
              setSelected={setSelected}
              setIsAddBtnClicked={setIsAddBtnClicked}
              fields={fields}
              columns={columns}
              menuId={menuId}
              rowIndex={0}
              style={{
                height: `calc(100% - 47px)`,
              }}
            />
          </div>
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            areaCode={watch("areaCode")}
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1100;
