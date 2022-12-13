import React, { useState, useEffect } from "react";
import { CM9004SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { DetailHeader, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { Reset, MagnifyingGlass, ExcelIcon } from "components/allSvgIcon";
import { SearchWrapper } from "./style";
import CheckBox from "components/checkbox";
import {
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
import DataGridFooter from "components/dataGridFooter/dataGridFooter";

import Grid from "./grid";

function CM9004({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cuSekyn, setCuSekyn] = useState("N");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9004",
  });

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
  console.log(dataCommonDic);
  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      cuGong: dataCommonDic?.cuGong[0].code,
      cuType: dataCommonDic?.cuType[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      swCode: dataCommonDic?.swCode[0].code,
      cuStae: dataCommonDic?.cuStae[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    params.cuSekumyn = cuSekyn;
    let paramTemp: any = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== "" && value !== undefined) {
        paramTemp = { ...paramTemp, [key]: value };
      }
    }

    try {
      setLoading(true);
      const { data } = await API.get(CM9004SEARCH, { params: paramTemp });

      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("CM9004 data search fetch error =======>", err);
    }
  };

  const submit = (data: ISEARCH) => {
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
                  <Label style={{ minWidth: "auto" }}>공급사업</Label>
                  <Select
                    {...register("cuGong")}
                    kind={FieldKind.BORDER}
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
                  <Label>거래상태</Label>
                  <Select
                    {...register("cuStae")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
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
                      fontSize: "12px",
                      fontFamily: "NotoSansKRRegular",
                    }}
                  >
                    계산서 발행거래처만 보기
                  </p>
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
                        size={13}
                        borderWidth="2px"
                        style={{ marginRight: "10px" }}
                      />
                    </>
                  )
                }
                style={{ marginRight: "10px" }}
              />
              <Button
                text="수정"
                icon={<Reset color="#707070" />}
                style={{ marginRight: "10px" }}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={() => {}}
              />
              <Button
                text="삭제"
                icon={<ExcelIcon />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid data={data ? data : []} />
        <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
      </WrapperContent>
    </>
  );
}

export default CM9004;
