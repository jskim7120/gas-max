import React, { useState, useEffect } from "react";
import { CM9003SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { DetailHeader, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlass,
  ExcelIcon,
} from "components/allSvgIcon";
import { SearchWrapper } from "./style";
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
import {
  ButtonColor,
  ButtonType,
  InputSize,
  FieldKind,
} from "components/componentsType";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
// import {
//   Plus,
//   Trash,
//   Update,
//   Reset,
//   MagnifyingGlassBig,
//   ExcelIcon,
// } from "components/allSvgIcon";

function CM9003({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9003",
  });

  console.log("CM9003:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      reportKind: dataCommonDic?.reportKind[0].code,
      cuType: dataCommonDic?.cuType[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      swCode: dataCommonDic?.swCode[0].code,
      cuCutype: dataCommonDic?.cuCutype[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CM9003SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("CM9003 data search fetch error =======>", err);
    }
  };

  const submit = (data: ISEARCH) => {
    console.log("IISEARCH:", data);
    fetchData(data);
  };

  return (
    <>
      <DetailHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "20px" }}>{depthFullName}</p>
          <p>
            <b>영업소</b>
          </p>

          <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
      </DetailHeader>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper>
            <div style={{ width: "80%" }}>
              <Wrapper grid col={6}>
                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>보고서종류</Label>
                  <Select
                    {...register("reportKind")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>거래구분</Label>
                  <Select
                    {...register("cuType")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <Field flex style={{ alignItems: "center" }}>
                  <Label>기간</Label>
                  <Controller
                    control={control}
                    {...register("sDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker value={value} onChange={onChange} />
                    )}
                  />
                  <Controller
                    control={control}
                    {...register("eDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker value={value} onChange={onChange} />
                    )}
                  />
                </Field>

                <FormGroup>
                  <Label>지역분류</Label>
                  <Select
                    {...register("cuJyCode")}
                    kind={FieldKind.BORDER}
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
                  <Label>담당사원</Label>
                  <Select
                    {...register("swCode")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>소비자형태</Label>
                  <Select
                    {...register("cuCutype")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </Wrapper>
            </div>

            <div className="button-wrapper">
              <Button
                text="등록"
                icon={!loading && <MagnifyingGlass />}
                color={ButtonColor.SECONDARY}
                type="submit"
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={21}
                        style={{ marginRight: "10px" }}
                      />
                    </>
                  )
                }
                style={{ marginRight: "10px" }}
              />
              <Button
                text="수정"
                icon={<Reset />}
                style={{ marginRight: "10px" }}
                type="button"
                color={ButtonColor.SUCCESS}
                onClick={() => {}}
              />
              <Button text="삭제" icon={<Trash />} type="button" />
            </div>
          </SearchWrapper>
        </form>

        {/* <Grid
          data={data.length > 0 && data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          openPopup={handleOpenPopup}
        /> */}
      </WrapperContent>
    </>
  );
}

export default CM9003;
