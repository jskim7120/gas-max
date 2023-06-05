import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { ISEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";
import BasicGrid from "components/basicGrid";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";

function AR9003({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    gridIndexes,
    dispatch,
    dataCommonDic,
  } = CreateReport("AR", "AR9003", menuId, "searchPath");
  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const submit = (data: ISEARCH) => {
    // fetchData(data);
  };

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      const init = dataCommonDic.dataInit[0];
      reset({
        sDate: init?.sDate,
        eDate: init?.dDate,
        swCode: init?.swCode,
        chkSv: init?.chkSv === "Y",
        cuJyCode: init?.cuJyCode,
        reportKind: init?.reportKind,
      });
    }
  }, [dataCommonDic]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {ownAreaCode === "00" && (
              <>
                <Label style={{ minWidth: "90px" }}>영업소</Label>
                <Select register={register("areaCode")} width={InputSize.i120}>
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </>
            )}
            <Label style={{ minWidth: "90px" }}>보고서종류</Label>
            <Select register={register("reportKind")} width={InputSize.i200}>
              {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
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
                style={{ minWidth: "max-content" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ minWidth: "max-content" }}
                type="button"
                color={ButtonColor.LIGHT}
                // onClick={cancel}
              />
              <Button
                text="엑셀"
                style={{ minWidth: "max-content" }}
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
          <FormGroup>
            <Label style={{ minWidth: "90px" }}>기간</Label>
            <Controller
              control={control}
              {...register("sDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ width: "120px" }}
                />
              )}
            />
            <Controller
              control={control}
              {...register("eDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ width: "120px" }}
                />
              )}
            />

            <Input
              label="거래처명"
              labelStyle={{ minWidth: "90px" }}
              register={register("aptName")}
              inputSize={InputSize.i200}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "90px" }}>사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "216px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="무료시설 자료만 조회"
              rtl
              style={{ marginLeft: "61px" }}
              register={register("chkSv")}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        columns={columns1}
        fields={fields1}
        data={data}
        rowIndex={data?.length ? data.length : 0}
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default AR9003;
