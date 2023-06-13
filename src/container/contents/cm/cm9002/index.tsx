import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CM9002SEARCH } from "app/path";
import { ICM9002SEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import CheckBox from "components/checkbox";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import {
  Input,
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM9002({
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
  } = CreateReport("CM", "CM9002", menuId, CM9002SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [dataChk, setDataChk] = useState(true);

  const { register, handleSubmit, reset, control } = useForm<ICM9002SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = (type: string) => {
    if (type === "reset") {
      if (dataCommonDic) {
        const init = dataCommonDic.dataInit[0];
        reset({
          areaCode: dataCommonDic?.areaCode[0].code,
          reportKind: init?.reportKind,
          cuType: init?.cuType,
          cuGumsa: init?.cuGumsa,
          cuJyCode: init?.cuJyCode,
          swCode: init?.swCode,
          cuCustgubun: init?.cuCustgubun,
          cuCutype: init?.cuCutype,
          cuStae: init?.cuStae,
          cuSukumtype: init?.cuSukumtype,
          cuJangbu: init?.cuJangbu,
          cuMisu: init?.cuMisu,
        });
      }
    }
  };

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
    setDataChk(true);
  };

  const submit = (data: ICM9002SEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "90px" }}>영업소</Label>

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
                icon={<ResetGray />}
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
        <SearchWrapper style={{ alignItems: "baseline" }}>
          <div>
            <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>보고서 종류</Label>
                <Select
                  width={InputSize.i130}
                  register={register("reportKind")}
                >
                  {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>거래 구분</Label>
                <Select register={register("cuType")} width={InputSize.i130}>
                  {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>지역 분류</Label>
                <Select register={register("cuJyCode")} width={InputSize.i130}>
                  {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup style={{ width: "362px" }}>
                <Label style={{ minWidth: "90px" }}>담당 사원</Label>
                <Select
                  register={register("swCode")}
                  width={InputSize.i130}
                  style={{ marginLeft: "4px" }}
                >
                  {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label style={{ minWidth: "90px" }}>관리 책임자</Label>
                <Select
                  register={register("cuCustgubun")}
                  width={InputSize.i130}
                >
                  {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "90px" }}>검사 대상</Label>
                <Select register={register("cuGumsa")} width={InputSize.i130}>
                  {dataCommonDic?.cuGumsa?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>
            <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>미수 구분</Label>
                <Select register={register("cuMisu")} width={InputSize.i130}>
                  {dataCommonDic?.cuMisu?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>소비자 형태</Label>
                <Select register={register("cuCutype")} width={InputSize.i130}>
                  {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup style={{ width: "255px" }}>
                <Label style={{ minWidth: "90px" }}>거래 상태</Label>
                <Select register={register("cuStae")} width={InputSize.i130}>
                  {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <Field
                flex
                style={{
                  alignItems: "center",
                  // width: "335px",
                }}
              >
                <p style={{ width: "69px" }}>등록기간</p>
                <CheckBox
                  register={{ ...register("dataChk") }}
                  onChange={(e: any) => setDataChk(e.target.checked)}
                  checked={dataChk}
                />
                <Controller
                  control={control}
                  {...register("sDate")}
                  render={({ field: { onChange, value } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      style={{ marginLeft: "8px", width: "130px" }}
                      readOnly={!dataChk}
                    />
                  )}
                />
                <Controller
                  control={control}
                  {...register("eDate")}
                  render={({ field: { onChange, value } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      readOnly={!dataChk}
                      style={{ width: "130px" }}
                    />
                  )}
                />
              </Field>
              <FormGroup>
                <Label style={{ minWidth: "90px" }}>수금 방법</Label>
                <Select
                  register={register("cuSukumtype")}
                  width={InputSize.i130}
                >
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "90px" }}>장부 구분</Label>
                <Select register={register("cuJangbu")} width={InputSize.i130}>
                  {dataCommonDic?.cuJangbu?.map((obj: any, idx: number) => (
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

      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <BasicGrid
          ref={gridRef}
          areaCode={areaCode}
          data={data}
          columns={columns}
          fields={fields}
          menuId={menuId}
          rowIndex={data?.length > 1 ? data.length - 1 : 0}
          style={{ height: `calc(100% - 12px)` }}
          evenFill
        />
      </WrapperContent>
    </>
  );
}

export default CM9002;
