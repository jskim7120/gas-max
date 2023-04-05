import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useDispatch, useSelector } from "app/store";
import API from "app/axios";
import { CM1100SEARCH, CM110065 } from "app/path";
import { ICM1100SEARCH } from "./model";
import { openModal, addCM1105, addCM1106 } from "app/state/modal/modalSlice";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import {
  Plus,
  Trash,
  Reset,
  MagnifyingGlassBig,
  ExcelIcon,
} from "components/allSvgIcon";
import { Input, Select, FormGroup, Label } from "components/form/style";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import Grid from "./grid";
import { columns, fields } from "./data";
import CM1100Footer from "./footer";
import Loader from "components/loader";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM1100Page({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const dispatch = useDispatch();

  const [data, setData] = useState<any>([]);
  const [data65, setData65] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const [areaCode, setAreaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1100",
  });

  const { register, handleSubmit, reset } = useForm<ICM1100SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
      fetchData65();
      dispatch(
        addCM1106({ areaCode: selected.areaCode, cuCode: selected.cuCode })
      );
    }
  }, [selected]);

  const submit = async (data: ICM1100SEARCH) => {
    fetchData(data);
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataSearch } = await API.get(CM1100SEARCH, {
        params: { ...params, areaCode: areaCode },
      });

      if (dataSearch?.length > 0) {
        setData(dataSearch);
        setSelected(dataSearch[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      setSelected({});
      console.log("CM1100 data search fetch error =======>", err);
    }
  };

  const fetchData65 = async () => {
    try {
      const { data: dataS65 } = await API.get(CM110065, {
        params: { cuCode: selected.cuCode, areaCode: selected.areaCode },
      });
      if (Object.keys(dataS65).length > 0) {
        setData65(dataS65);
      } else {
        setData65({});
      }
    } catch (err) {
      setData65({});
      console.log("CM1100 data search fetch error =======>", err);
    }
  };

  const onClickUpdate = async () => {
    if (Object.keys(selected).length > 0) {
      if (areaCode !== "") {
        openPopup({
          cuCode: selected.cuCode,
          areaCode: areaCode,
          status: "UPDATE",
        });
      }
    } else {
      toast.warning("please select row from grid", {
        autoClose: 500,
      });
    }
  };

  const onClickAdd = () => {
    if (Object.keys(selected).length > 0 && areaCode !== "") {
      openPopup({
        cuCode: selected.cuCode,
        areaCode: areaCode,
        status: "INSERT",
      });
    } else {
      openPopup({
        cuCode: "",
        areaCode: areaCode,
        status: "INSERT",
      });
    }
  };

  const openPopup = (params: any) => {
    dispatch(addCM1105(params));
    dispatch(openModal({ type: "cm1105Modal" }));
  };

  const resetSearchForm = () => {
    reset({
      cuType: dataCommonDic?.cuType[0].code,
      cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
      swCode: dataCommonDic?.swCode[0].code,
      cuEtOption: dataCommonDic?.cuEtOption[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      cuGong: dataCommonDic?.cuGong[0].code,
      cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
      cuStae: dataCommonDic?.cuStae[0].code,
    });
    setAreaCode(dataCommonDic?.areaCode[0].code);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          <p>{depthFullName}</p>
          {ownAreaCode === "00" && (
            <>
              <p className="big">영업소</p>
              <Select
                // value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
        </FormGroup>

        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={onClickAdd}
          />
          <Button
            text="수정"
            icon={<Reset />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={onClickUpdate}
          />
          <Button text="삭제" icon={<Trash />} type="button" />
        </div>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper>
            <div>
              <FormGroup>
                <Input
                  label="거래처명"
                  register={register("cuName")}
                  inputSize={InputSize.i150}
                />
                <Input
                  label="전화"
                  register={register("cuTel")}
                  inputSize={InputSize.i150}
                />
                <Input
                  label="주소/비고"
                  register={register("cuAddr")}
                  inputSize={InputSize.i150}
                />
                <Input
                  label="대표,계약자명,계약번호"
                  register={register("cuGongname")}
                  labelStyle={{
                    minWidth: "160px",
                  }}
                  inputSize={InputSize.i150}
                />
              </FormGroup>

              <FormGroup>
                <Label>거래구분</Label>
                <Select {...register("cuType")} width={InputSize.i150}>
                  {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>담당사원</Label>
                <Select {...register("swCode")} width={InputSize.i150}>
                  {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>지역분류</Label>
                <Select {...register("cuJyCode")} width={InputSize.i150}>
                  {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label
                  style={{
                    minWidth: "160px",
                  }}
                >
                  관리자
                </Label>
                <Select {...register("cuCustgubun")} width={InputSize.i150}>
                  {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>거래상태</Label>
                <Select {...register("cuStae")} width={InputSize.i150}>
                  {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>수금방법</Label>
                <Select {...register("cuSukumtype")} width={InputSize.i150}>
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>기타분류</Label>
                <Select {...register("cuEtOption")} width={InputSize.i150}>
                  {dataCommonDic?.cuEtOption?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>공급사업자</Label>
                <Select {...register("cuGong")} width={InputSize.i150}>
                  {dataCommonDic?.cuGong?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="미수금액"
                  register={register("cuMisu")}
                  textAlign="right"
                  labelStyle={{
                    minWidth: "160px",
                  }}
                  inputSize={InputSize.i150}
                />
              </FormGroup>
            </div>
            <div className="button-wrapper">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlassBig />}
                kind={ButtonType.ROUND}
                type="submit"
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={19}
                        style={{ marginRight: "10px" }}
                        borderWidth="3px"
                      />
                    </>
                  )
                }
              />
              <Button
                text="엑셀"
                icon={<ExcelIcon />}
                kind={ButtonType.ROUND}
                color={ButtonColor.SECONDARY}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid
          data={data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          openPopup={openPopup}
          areaCode={ownAreaCode}
        />

        <CM1100Footer data={data65} />
      </WrapperContent>
    </>
  );
}

export default CM1100Page;
