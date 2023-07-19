import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CM9005SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Wrapper, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM9005({
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
  } = CreateReport("CM", "CM9005", menuId, CM9005SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("cuJpGubun")) {
      setData([]);
    }
  }, [watch("cuJpGubun")]);

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        cuJpGubun: dataCommonDic?.cuJpGubun[0].code,
        cuJpCode: dataCommonDic?.cuJpCode[0].code,
        cuType: dataCommonDic?.cuType[0].code,
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        swCode: dataCommonDic?.swCode[0].code,
        cuStae: dataCommonDic?.cuStae[0].code,
      });
    }
  };

  const handleReset = () => {
    resetForm();
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "98px" }}>영업소</Label>

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
                icon={<ResetGray color="#707070" />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
              <Button
                text="엑셀"
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
                onClick={() => gridRef.current.saveToExcel()}
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper>
          <div style={{ width: "80%" }}>
            <Wrapper grid col={6}>
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>사용 가스 구분</Label>
                <Select
                  register={register("cuJpGubun")}
                  style={{ width: "100%" }}
                >
                  {dataCommonDic?.cuJpGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>가스 품목</Label>
                <Select
                  register={register("cuJpCode")}
                  style={{ width: "100%" }}
                >
                  {dataCommonDic?.cuJpCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>거래 구분</Label>
                <Select register={register("cuType")} style={{ width: "100%" }}>
                  {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>지역 분류</Label>
                <Select
                  register={register("cuJyCode")}
                  style={{ width: "100%" }}
                >
                  {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>담당 사원</Label>
                <Select register={register("swCode")} style={{ width: "100%" }}>
                  {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>거래 상태</Label>
                <Select register={register("cuStae")} style={{ width: "100%" }}>
                  {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>
          </div>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode={areaCode}
        data={data}
        fields={fields}
        columns={columns}
        menuId={menuId}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: `calc(100% - 84px)` }}
      />
    </>
  );
}

export default CM9005;
