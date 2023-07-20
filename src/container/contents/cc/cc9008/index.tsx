import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9009SEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";

function GR9008({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
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
  } = CreateReport("CC", "CC9008", menuId, CC1100SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ICC9009SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ICC9009SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init: any = dataCommonDic.dataInit[0];
      reset({});
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
        <SearchWrapper className="h35 mt5">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "70px" }}>영업소</Label>
            <Select width={InputSize.i130} register={register("areaCode")}>
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>기간</Label>
            <Controller
              control={control}
              name="sDateF"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Controller
              control={control}
              name="sDateT"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Label style={{ minWidth: "80px" }}>차량</Label>
            <Select width={InputSize.i130} register={register("carCode")}>
              {dataCommonDic?.carCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>정비명</Label>
            <Select width={InputSize.i130} register={register("carJbc")}>
              {dataCommonDic?.carJbc?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

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
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode={areaCode}
        data={data}
        columns={columns}
        fields={fields}
        menuId={menuId}
        rowIndex={0}
        style={{ height: `calc(100% - 84px)` }}
      />
    </>
  );
}

export default GR9008;
