import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CM9004SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import { Select, FormGroup, Wrapper, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM9004({
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
  } = CreateReport("CM", "CM9004", menuId, CM9004SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [cuSekyn, setCuSekyn] = useState("N");

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(selected)?.length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        cuGong: dataCommonDic?.cuGong[0].code,
        cuType: dataCommonDic?.cuType[0].code,
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        swCode: dataCommonDic?.swCode[0].code,
        cuStae: dataCommonDic?.cuStae[0].code,
      });
    }
  };

  const handleReset = () => {
    resetForm("reset");
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "66px" }}>영업소</Label>

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
                <Label style={{ minWidth: "auto" }}>공급 사업</Label>
                <Select
                  register={register("cuGong")}
                  style={{ width: "100%" }}
                  // onChange={(e) => setReportKind(e.target.value)}
                >
                  {dataCommonDic?.cuGong?.map((obj: any, idx: number) => (
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
                <Label>거래 상태</Label>
                <Select register={register("cuStae")} style={{ width: "100%" }}>
                  {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup style={{ marginLeft: "36px" }}>
                <CheckBox
                  title=""
                  register={register("cuSekumyn")}
                  rtl={false}
                  onChange={(e: any) =>
                    e.target.checked ? setCuSekyn("Y") : setCuSekyn("N")
                  }
                />
                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: "NotoSansKRRegular",
                  }}
                >
                  계산서 발행거래처만 보기
                </p>
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
        style={{ height: `calc(100% - 36px)` }}
        // evenFill
      />
    </>
  );
}

export default CM9004;
