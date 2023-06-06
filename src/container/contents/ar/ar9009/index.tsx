import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { ISEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import { AR9009SEARCH } from "app/path";
import { columns, fields } from "./data";

function AR9009({
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
  } = CreateReport("AR", "AR9009", menuId, AR9009SEARCH);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const submit = (params: ISEARCH) => {
    // params.sDate = DateWithoutDash(params.sDate);
    // params.eDate = DateWithoutDash(params.eDate);

    fetchData(params);
  };

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      const init = dataCommonDic.dataInit[0];
      reset({
        // sDate: init?.sDate,
        // eDate: init?.dDate,
        // jpCode: init?.jpCode,
        // swCode: init?.swCode,
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
                <Label style={{ minWidth: "80px" }}>영업소</Label>
                <Select register={register("areaCode")} width={InputSize.i120}>
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </>
            )}

            <Label style={{ minWidth: "80px" }}>년 - 월</Label>
            <Select register={register("dataInit")} width={InputSize.i120}>
              {dataCommonDic?.dataInit?.map((obj: any, idx: number) => (
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
      </form>
      <BasicGrid
        areaCode={ownAreaCode}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length ? data.length : 0}
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default AR9009;
