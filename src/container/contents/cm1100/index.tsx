import React from "react";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";

function CM1100Page({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
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
  } = useForm<IJNOSAUP>();

  console.log("CM:", dataCommonDic);
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <DetailHeader>
          <div>
            <p>{depthFullName}</p>
            <Select {...register("areaCode")}>
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
            />
            <Button
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
            />
            {/* <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
          /> */}
            <Button text="취소" icon={<Reset />} />
          </div>
        </DetailHeader>
      </form>
    </>
  );
}

export default CM1100Page;
