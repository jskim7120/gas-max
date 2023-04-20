import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
import { CC1100SEARCH } from "app/path";
import { ICC9001SEARCH } from "./model";
import GridLeft from "components/grid";
import API from "app/axios";
import {
  MainWrapper,
  SearchWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";

function CC9001({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC9001",
  });

  const { register, handleSubmit, reset, control } = useForm<ICC9001SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
    });
  };

  const fetchData = async (params: any) => {};

  const cancel = () => {
    resetSearchForm();
    setData([]);
  };

  const submit = (data: ICC9001SEARCH) => {};

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ border: "none" }}>
          <form onSubmit={handleSubmit(submit)}>
            <SearchWrapper className="h35" style={{ justifyContent: "start" }}>
              <FormGroup>
                <Label style={{ minWidth: "62px" }}>계정과목</Label>
                <Select
                  register={register("acjAccCode")}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "60px" }}>기간</Label>
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
          <GridLeft
            areaCode="00"
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            fields={fields}
            columns={columns}
            style={{ height: `calc(100% - 38px)` }}
          />
        </LeftSide>
      </MainWrapper>
    </>
  );
}

export default CC9001;
