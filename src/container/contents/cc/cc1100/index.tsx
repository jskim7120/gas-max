import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { CC1100SEARCH } from "app/path";
import { ICC1100SEARCH } from "./model";
import API from "app/axios";
import {
  MainWrapper,
  SearchWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
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
import Grid from "../grid";
import { columns, fields } from "./data";
import CustomTopPart from "container/contents/customTopPart";

function CC1100({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [codeGu, setCodeGu] = useState<boolean>(false);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1100",
  });

  const { register, handleSubmit, reset, control } = useForm<ICC1100SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const resetSearchForm = () => {
    reset({
      codeGu: "0",
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
    });
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CC1100SEARCH, { params: params });
      if (data) {
        setData(data);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      console.log("CC1200 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetSearchForm();
    setData([]);
  };

  const submit = (data: ICC1100SEARCH) => {
    if (codeGu) {
      data.codeGu = "1";
    }
    fetchData(data);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <MainWrapper>
        <LeftSide>
          <form onSubmit={handleSubmit(submit)}>
            <SearchWrapper className="h35" style={{ justifyContent: "start" }}>
              <FormGroup>
                {[
                  { name: "현금", value: "0" },
                  { name: "예금", value: "1" },
                ].map((option, index) => {
                  return (
                    <Item key={index}>
                      <RadioButton
                        type="radio"
                        value={option.value}
                        {...register("codeGu")}
                        id={option.value}
                        onChange={() => setCodeGu((prev) => !prev)}
                      />
                      <RadioButtonLabel htmlFor={`${option.value}`}>
                        {option.name}
                      </RadioButtonLabel>
                    </Item>
                  );
                })}
                {codeGu}
                <Input
                  readOnly={!codeGu}
                  register={register("codeGu")}
                  labelStyle={{ minWidth: "70px" }}
                  inputSize={InputSize.i100}
                />

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

              <div className="buttons">
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
                  style={{ margin: " 0 5px 0 30px" }}
                />
                <Button
                  text="취소"
                  icon={<ResetGray />}
                  type="button"
                  color={ButtonColor.LIGHT}
                  onClick={cancel}
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
            dataCommonDic={dataCommonDic}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1100;