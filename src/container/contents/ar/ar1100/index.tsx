import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonType,
  InputSize,
  FieldKind,
} from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  Plus,
  Trash,
  Update,
  Reset,
  ExcelIcon,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import { Select, Label, FormGroup, Input } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";

function AR1100({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "AR",
    functionName: "AR1100",
  });
  console.log("dataCommonDicdataCommonDicdataCommonDic:", dataCommonDic);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<any>({
    mode: "onSubmit",
  });

  const submit = async (data: any) => {};
  return (
    <>
      <SearchWrapper className="h35 mt5">
        <p>{depthFullName}</p>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {}}
          />
          <Button
            text="수정"
            icon={<Reset />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {}}
          />
          <Button text="삭제" icon={<Trash />} type="button" />
          <Button
            text="엑셀"
            icon={<ExcelIcon width="19px" height="19px" />}
            color={ButtonColor.LIGHT}
            type="button"
          />
        </div>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <div
            style={{
              background: "rgba(101,84,255,0.37)",
              height: "77px",
              border: "1px solid rgba(104,103,103,0.35)",
              borderRadius: "5px",
              margin: "1px",
              padding: "5px 16px",
            }}
          >
            <FormGroup>
              <Label>판매일자</Label>
              <Controller
                control={control}
                {...register("sDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
              <Input
                register={register("bcJunno")}
                inputSize={InputSize.i200}
              />
              <Button
                text="조회"
                icon={!loading && <MagnifyingGlassBig width="15px" />}
                style={{ marginRight: "5px" }}
                color={ButtonColor.PURPLE}
                type="submit"
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={15}
                        borderWidth="2px"
                        style={{ marginRight: "10px" }}
                      />
                    </>
                  )
                }
              />
              <Label>사원</Label>
              <Select {...register("sBcBuCode")} width={InputSize.i100}>
                {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label>입금구분</Label>
              <Select {...register("sBcBuCode")} width={InputSize.i100}>
                {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label>대납구분</Label>
              <Select {...register("sBcBuCode")} width={InputSize.i100}>
                {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label>등록구분</Label>
              <Select {...register("sBcBuCode")} width={InputSize.i100}>
                {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>거래상태 :</Label>
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="접수"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="배송중"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="완료"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="예약"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="취소"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="연기"
                rtl
                style={{ width: "80px" }}
              />
              <Label>거래구분 :</Label>
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="중량"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="체적"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="용기"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="기구"
                rtl
                style={{ width: "80px" }}
              />
              <CheckBox
                register={{ ...register("cuSekumyn") }}
                title="A/S"
                rtl
                style={{ width: "80px" }}
              />
            </FormGroup>
          </div>
        </form>
      </WrapperContent>
    </>
  );
}

export default AR1100;
