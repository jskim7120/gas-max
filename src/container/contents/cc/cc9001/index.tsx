import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9001SEARCH } from "./model";
import BasicGrid from "components/basicGrid";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
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
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("CC", "CC9001", menuId, CC1100SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ICC9001SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ICC9001SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>계정 과목</Label>
            <Select register={register("acjAccCode")} width={InputSize.i120}>
              {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "60px" }}>기간</Label>
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
                onClick={handleReset}
              />
            </div>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode="00"
        data={data}
        menuId={menuId}
        rowIndex={0}
        fields={fields}
        columns={columns}
        style={{ height: `calc(100% - 84px)` }}
      />
    </>
  );
}

export default CC9001;
