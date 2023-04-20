import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "app/store";
import { CM9004SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import { Select, FormGroup, Wrapper, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import CustomTopPart from "../../customTopPart";
import Grid from "components/grid";
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [cuSekyn, setCuSekyn] = useState("N");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9004",
  });

  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    resetForm();
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
      } else {
        setData([]);
      }
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log("CM9004 data search fetch error =======>", err);
    }
  };

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
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

  const cancel = () => {
    resetForm();
    setData([]);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper>
            <div style={{ width: "80%" }}>
              <Wrapper grid col={6}>
                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>공급사업</Label>
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
                  <Label>거래구분</Label>
                  <Select
                    register={register("cuType")}
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
                    register={register("swCode")}
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
                  <Label>거래상태</Label>
                  <Select
                    register={register("cuStae")}
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

            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px", marginRight: "15px" }}
            >
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
                style={{ marginRight: "10px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray color="#707070" />}
                style={{ marginRight: "10px" }}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={cancel}
              />
              <Button
                text="엑셀"
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid
          areaCode={areaCode}
          data={data}
          setSelected={setSelected}
          fields={fields}
          columns={columns}
          style={{ height: `calc(100% - 38px)` }}
          evenFill
        />
      </WrapperContent>
    </>
  );
}

export default CM9004;
