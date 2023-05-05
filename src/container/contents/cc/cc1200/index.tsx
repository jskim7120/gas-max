import { useState, useEffect, useRef } from "react";
import { useDispatch } from "app/store";
import { CC1200SEARCH } from "app/path";
import { ICC1200SEARCH } from "./model";
import GridLeft from "components/grid";
import API from "app/axios";
import CheckBox from "components/checkbox";
import {
  MainWrapper,
  SearchWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import {
  FormGroup,
  Wrapper,
  Label,
  Field,
  Select,
} from "components/form/style";
import Form from "./form";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";
import CustomTopPart from "container/contents/customTopPart";
import FourButtons from "components/button/fourButtons";

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
  const dispatch = useDispatch();
  const [areaCode, setAreaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const [dataChk, setDataChk] = useState("N");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1200",
  });

  console.log("CC1200:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ICC1200SEARCH>({
    mode: "onSubmit",
  });

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
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && JSON.stringify(selected) !== "{}") {
      setAreaCode(selected?.areaCode);
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CC1200SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("CC1200 data search fetch error =======>", err);
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  const cancel = () => {
    resetSearchForm();
    setDataChk("N");
    setData([]);
  };

  const submit = (data: ICC1200SEARCH) => {
    if (dataChk === "Y") {
      data.userChk = "Y";
    } else {
      data.userChk = "N";
    }

    console.log("IISEARCH:", data);
    fetchData(data);
  };

  const handleUserChk = (event: any) => {
    if (event.target.checked) {
      setDataChk("Y");
    } else {
      setDataChk("N");
    }
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          <p>{depthFullName}</p>
          {ownAreaCode === "00" && (
            <>
              <p className="big">영업소</p>
              <Select
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
        </FormGroup>

        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <SearchWrapper
            style={{ alignItems: "baseline", justifyContent: "initial" }}
          >
            <div>
              <Wrapper
                grid
                col={2}
                fields="1fr 1.5fr"
                style={{ width: "min-content" }}
              >
                <form autoComplete="off">
                  <FormGroup>
                    <Label style={{ minWidth: "80px" }}>기간</Label>

                    <Controller
                      control={control}
                      {...register("sDateF")}
                      render={({ field: { onChange, value, name } }) => (
                        <CustomDatePicker
                          value={value}
                          onChange={onChange}
                          name={name}
                        />
                      )}
                    />
                    <p>~</p>

                    <Controller
                      control={control}
                      {...register("sDateT")}
                      render={({ field: { onChange, value, name } }) => (
                        <CustomDatePicker
                          value={value}
                          onChange={onChange}
                          name={name}
                        />
                      )}
                    />
                  </FormGroup>
                </form>
                <Field style={{ width: "280px" }}>
                  <FormGroup>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                    <CheckBox
                      register={{ ...register("userChk") }}
                      onChange={handleUserChk}
                    />
                    &nbsp;
                    <Label style={{ paddingTop: "4px" }}>
                      사용자등록 자료만 보기
                    </Label>
                  </FormGroup>
                </Field>
              </Wrapper>
            </div>

            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
            >
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                color={ButtonColor.DANGER}
                type="submit"
                onClick={handleSubmit(submit)}
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
                style={{ marginRight: "10px" }}
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
          </SearchWrapper>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: `calc(100% - 38px)` }}
          />
        </LeftSide>
        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1200;
