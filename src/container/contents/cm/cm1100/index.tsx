import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useDispatch, useSelector } from "app/store";
import API from "app/axios";
import { CM1100SEARCH, CM110065, CM1100DELETE } from "app/path";
import { ICM1100SEARCH } from "./model";
import {
  openModal,
  addCM1105,
  addCM1106,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
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
  const [loading, setLoading] = useState(false);
  const { isDelete } = useSelector((state) => state.modal);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1100",
  });

  const { register, handleSubmit, reset, getValues } = useForm<ICM1100SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
      fetchData65();
      dispatch(
        addCM1106({ areaCode: selected.areaCode, cuCode: selected.cuCode })
      );
    }
  }, [selected]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const submit = async (data: ICM1100SEARCH) => {
    fetchData(data);
  };

  const deleteRowGrid = async () => {
    let params: any = {};
    params.areaCode = selected?.areaCode;
    params.cuCode = selected?.cuCode;
    try {
      const response: any = await API.post(CM1100DELETE, params);
      if (response.status === 200) {
        toast.success("삭제하였습니다", {
          autoClose: 500,
        });
        const values = getValues();
        await fetchData(values);
      } else {
        alert(response?.response?.data?.message);
      }
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataSearch } = await API.get(CM1100SEARCH, {
        params: params,
      });

      if (dataSearch && dataSearch?.length > 0) {
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
      if (dataS65 && Object.keys(dataS65).length > 0) {
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
    if (selected && Object.keys(selected).length > 0) {
      openPopup({
        cuCode: selected.cuCode,
        areaCode: selected.areaCode,
        status: "UPDATE",
        source: "CM1100",
      });
    } else {
      alert("등록 거래처를 선택하세요");
    }
  };

  const onClickAdd = () => {
    if (selected && Object.keys(selected).length > 0) {
      openPopup({
        cuCode: selected.cuCode,
        areaCode: selected.areaCode,
        status: "INSERT",
        source: "CM1100",
      });
    } else {
      alert("등록 거래처를 선택하세요");
    }
  };

  const onClickDelete = () => {
    if (selected && Object.keys(selected)?.length > 0) {
      dispatch(openModal({ type: "delModal" }));
      dispatch(addDeleteMenuId({ menuId: menuId }));
    } else {
      alert("등록 거래처를 선택하세요");
    }
  };

  const openPopup = (params: any) => {
    dispatch(addCM1105(params));
    dispatch(openModal({ type: "cm1105Modal" }));
  };

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      cuType: dataCommonDic?.cuType[0].code,
      cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
      swCode: dataCommonDic?.swCode[0].code,
      cuEtOption: dataCommonDic?.cuEtOption[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      cuGong: dataCommonDic?.cuGong[0].code,
      cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
      cuStae: dataCommonDic?.cuStae[0].code,
    });
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label>영업소</Label>
              <Select register={register("areaCode")} width={InputSize.i150}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
          <div className="buttons">
            <Button
              text="등록"
              icon={<Plus />}
              type="button"
              onClick={onClickAdd}
            />
            <Button
              text="수정"
              icon={<Reset />}
              type="button"
              onClick={onClickUpdate}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              type="button"
              onClick={onClickDelete}
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
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
                <Label>거래 구분</Label>
                <Select register={register("cuType")} width={InputSize.i150}>
                  {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>담당 사원</Label>
                <Select register={register("swCode")} width={InputSize.i150}>
                  {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>지역 분류</Label>
                <Select register={register("cuJyCode")} width={InputSize.i150}>
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
                <Select
                  register={register("cuCustgubun")}
                  width={InputSize.i150}
                >
                  {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>거래 상태</Label>
                <Select register={register("cuStae")} width={InputSize.i150}>
                  {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>수금 방법</Label>
                <Select
                  register={register("cuSukumtype")}
                  width={InputSize.i150}
                >
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>기타 분류</Label>
                <Select
                  register={register("cuEtOption")}
                  width={InputSize.i150}
                >
                  {dataCommonDic?.cuEtOption?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>공급 사업자</Label>
                <Select register={register("cuGong")} width={InputSize.i150}>
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
            <div style={{ marginBottom: "40px", marginRight: "37px" }}>
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlassBig />}
                kind={ButtonType.ROUND}
                style={{ width: "85px" }}
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
