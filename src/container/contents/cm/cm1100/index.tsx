import React, { useEffect, useState } from "react";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { ICM1100SEARCH } from "./model";
import { useForm } from "react-hook-form";
import { openModal, closeModal, addCM1105 } from "app/state/modal/modalSlice";
import { useSelector, useDispatch } from "app/store";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonType,
  InputSize,
  FieldKind,
} from "components/componentsType";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlassBig,
  ExcelIcon,
} from "components/allSvgIcon";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { DetailHeader, WrapperContent } from "../../commonStyle";
import { SearchWrapper } from "./cm100Style";
import API from "app/axios";
import Grid from "./grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import { columns, fields } from "./data";
import CM1100Footer from "./footer";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { CM1100SEARCH } from "app/path";

function CM1100Page({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1100",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ICM1100SEARCH>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
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
  }, [dataCommonDic]);

  const submit = async (data: ICM1100SEARCH) => {
    fetchData(data);
  };

  const fetchData = async (params: any) => {
    try {
      const { data } = await API.get(CM1100SEARCH, { params: params });
      if (data) {
        setData(data);
      }
    } catch (err) {
      console.log("CM1100 data search fetch error =======>", err);
    }
  };

  const handleOpenPopup = async (index: number) => {
    try {
      setSelected(data[index]);

      dispatch(
        addCM1105({
          cuCode: data[index].cuCode,
          areaCode: data[index].areaCode,
        })
      );
      dispatch(openModal({ type: "cm1105Modal" }));
    } catch (err: any) {}
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
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
              dispatch(
                addCM1105({
                  cuCode: "",
                  areaCode: "",
                })
              );
              dispatch(openModal({ type: "cm1105Modal" }));
            }}
          />
          <Button
            text="수정"
            icon={<Reset />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
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
              setData([]);
            }}
          />
          <Button text="삭제" icon={<Trash />} type="button" />
        </div>
      </DetailHeader>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper>
            <div style={{ width: "90%" }}>
              <Wrapper grid col={5}>
                <Input
                  label="거래처명"
                  register={register("cuName")}
                  kind={FieldKind.BORDER}
                />
                <Input
                  label="전화"
                  register={register("cuTel")}
                  kind={FieldKind.BORDER}
                />
                <Input
                  label="주소/비고"
                  register={register("cuAddr")}
                  kind={FieldKind.BORDER}
                />
                <Input
                  label="대표,계약자명,계약번호"
                  register={register("cuGongname")}
                  kind={FieldKind.BORDER}
                  labelStyle={{
                    minWidth: "137px",
                  }}
                />
              </Wrapper>

              <Wrapper grid col={5}>
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
                  <Label
                    style={{
                      minWidth: "137px",
                    }}
                  >
                    관리자
                  </Label>
                  <Select
                    {...register("cuCustgubun")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuCustgubun?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
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
              </Wrapper>

              <Wrapper grid col={5}>
                <FormGroup>
                  <Label>수금방법</Label>
                  <Select
                    {...register("cuSukumtype")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuSukumtype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>기타분류</Label>
                  <Select
                    {...register("cuEtOption")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuEtOption?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>공급사업자</Label>
                  <Select
                    {...register("cuGong")}
                    kind={FieldKind.BORDER}
                    style={{ width: "100%" }}
                  >
                    {dataCommonDic?.cuGong?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <Input
                  label="미수금액"
                  register={register("cuMisu")}
                  kind={FieldKind.BORDER}
                  textAlign="right"
                  labelStyle={{
                    minWidth: "137px",
                  }}
                />
              </Wrapper>
            </div>
            <div className="button-wrapper">
              <Button
                text="검색"
                icon={<MagnifyingGlassBig />}
                kind={ButtonType.ROUND}
                type="submit"
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
          data={data.length > 0 && data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          openPopup={handleOpenPopup}
        />
        <CM1100Footer />
      </WrapperContent>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
    // <>
    //   <div style={{ borderBottom: "2px solid #707070" }}>
    //     <form onSubmit={handleSubmit(submit)}>
    //       <DetailHeader>
    //         <div style={{ display: "flex", alignItems: "center" }}>
    //           <p style={{ marginRight: "20px" }}>{depthFullName}</p>
    //           <p>
    //             <b>영업소</b>
    //           </p>

    //           <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
    //             {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
    //               <option key={idx} value={obj.code}>
    //                 {obj.codeName}
    //               </option>
    //             ))}
    //           </Select>
    //           <div>
    //             <ErrorText>{errors["areaCode"]?.message}</ErrorText>
    //           </div>
    //         </div>
    //         <div className="buttons">
    //           <Button
    //             text="등록"
    //             icon={<Plus />}
    //             style={{ marginRight: "5px" }}
    //             type="button"
    //             onClick={() => {
    //               dispatch(
    //                 addCM1105({
    //                   cuCode: "",
    //                   areaCode: "",
    //                 })
    //               );
    //               dispatch(openModal({ type: "cm1105Modal" }));
    //             }}
    //           />

    //           <Button
    //             text="수정"
    //             icon={<Reset />}
    //             style={{ marginRight: "5px" }}
    //             type="button"
    //             onClick={() => {
    //               reset({
    //                 areaCode: dataCommonDic?.areaCode[0].code,
    //                 cuType: dataCommonDic?.cuType[0].code,
    //                 cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
    //                 swCode: dataCommonDic?.swCode[0].code,
    //                 cuEtOption: dataCommonDic?.cuEtOption[0].code,
    //                 cuJyCode: dataCommonDic?.cuJyCode[0].code,
    //                 cuGong: dataCommonDic?.cuGong[0].code,
    //                 cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
    //                 cuStae: dataCommonDic?.cuStae[0].code,
    //               });
    //               setData([]);
    //             }}
    //           />
    //           <Button text="삭제" icon={<Trash />} type="button" />
    //         </div>
    //       </DetailHeader>
    //       <SearchWrapper>
    //         <div style={{ width: "90%" }}>
    //           <Wrapper grid col={5}>
    //             <Input
    //               label="거래처명"
    //               register={register("cuName")}
    //               errors={errors["cuName"]?.message}
    //               kind={FieldKind.BORDER}
    //             />
    //             <Input
    //               label="전화"
    //               register={register("cuTel")}
    //               errors={errors["cuTel"]?.message}
    //               kind={FieldKind.BORDER}
    //             />
    //             <Input
    //               label="주소/비고"
    //               register={register("cuAddr")}
    //               errors={errors["cuAddr"]?.message}
    //               kind={FieldKind.BORDER}
    //             />
    //             <Input
    //               label="대표,계약자명,계약번호"
    //               register={register("cuGongname")}
    //               errors={errors["cuGongname"]?.message}
    //               kind={FieldKind.BORDER}
    //               labelStyle={{
    //                 minWidth: "137px",
    //               }}
    //             />
    //           </Wrapper>

    //           <Wrapper grid col={5}>
    //             <Field>
    //               <FormGroup>
    //                 <Label>거래구분</Label>
    //                 <Select
    //                   {...register("cuType")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
    //                     <option key={idx} value={obj.code}>
    //                       {obj.codeName}
    //                     </option>
    //                   ))}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuType"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label>담당사원</Label>
    //                 <Select
    //                   {...register("swCode")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
    //                     <option key={idx} value={obj.code}>
    //                       {obj.codeName}
    //                     </option>
    //                   ))}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["swCode"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label>지역분류</Label>
    //                 <Select
    //                   {...register("cuJyCode")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
    //                     <option key={idx} value={obj.code}>
    //                       {obj.codeName}
    //                     </option>
    //                   ))}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuJyCode"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label
    //                   style={{
    //                     minWidth: "137px",
    //                   }}
    //                 >
    //                   관리자
    //                 </Label>
    //                 <Select
    //                   {...register("cuCustgubun")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuCustgubun?.map(
    //                     (obj: any, idx: number) => (
    //                       <option key={idx} value={obj.code}>
    //                         {obj.codeName}
    //                       </option>
    //                     )
    //                   )}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuCustgubun"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label>거래상태</Label>
    //                 <Select
    //                   {...register("cuStae")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
    //                     <option key={idx} value={obj.code}>
    //                       {obj.codeName}
    //                     </option>
    //                   ))}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuStae"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //           </Wrapper>

    //           <Wrapper grid col={5}>
    //             <Field>
    //               <FormGroup>
    //                 <Label>수금방법</Label>
    //                 <Select
    //                   {...register("cuSukumtype")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuSukumtype?.map(
    //                     (obj: any, idx: number) => (
    //                       <option key={idx} value={obj.code}>
    //                         {obj.codeName}
    //                       </option>
    //                     )
    //                   )}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuSukumtype"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label>기타분류</Label>
    //                 <Select
    //                   {...register("cuEtOption")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuEtOption?.map(
    //                     (obj: any, idx: number) => (
    //                       <option key={idx} value={obj.code}>
    //                         {obj.codeName}
    //                       </option>
    //                     )
    //                   )}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuEtOption"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Field>
    //               <FormGroup>
    //                 <Label>공급사업자</Label>
    //                 <Select
    //                   {...register("cuGong")}
    //                   kind={FieldKind.BORDER}
    //                   style={{ width: "100%" }}
    //                 >
    //                   {dataCommonDic?.cuGong?.map((obj: any, idx: number) => (
    //                     <option key={idx} value={obj.code}>
    //                       {obj.codeName}
    //                     </option>
    //                   ))}
    //                 </Select>
    //               </FormGroup>
    //               <div>
    //                 <ErrorText>{errors["cuGong"]?.message}</ErrorText>
    //               </div>
    //             </Field>
    //             <Input
    //               label="미수금액"
    //               register={register("cuMisu")}
    //               errors={errors["cuMisu"]?.message}
    //               kind={FieldKind.BORDER}
    //               textAlign="right"
    //               labelStyle={{
    //                 minWidth: "137px",
    //               }}
    //             />
    //           </Wrapper>
    //         </div>
    //         <div className="button-wrapper">
    //           <Button
    //             text="검색"
    //             icon={<MagnifyingGlassBig />}
    //             kind={ButtonType.ROUND}
    //             type="submit"
    //           />
    //           <Button
    //             text="엑셀"
    //             icon={<ExcelIcon />}
    //             kind={ButtonType.ROUND}
    //             color={ButtonColor.SECONDARY}
    //             type="button"
    //           />
    //         </div>
    //       </SearchWrapper>
    //     </form>
    //   </div>
    //   <WrapperContent>
    //     <Grid
    //       data={data.length > 0 && data}
    //       columns={columns}
    //       fields={fields}
    //       setSelected={setSelected}
    //       openPopup={handleOpenPopup}
    //     />
    //     <CM1100Footer />
    //   </WrapperContent>
    //   <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    // </>
  );
}

export default CM1100Page;
