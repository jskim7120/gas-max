import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { ICC1500SEARCH } from "./model";

function CC1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1500",
  });

  console.log("dataCommonDic:::", dataCommonDic);

  const { register, handleSubmit, reset, control } = useForm<ICC1500SEARCH>({
    mode: "onSubmit",
  });

  return (
    <>
      1500
      <SearchWrapper style={{ height: "35px", marginTop: "5px" }}>
        1555
        {/* <div style={{ display: "flex", alignItems: "baseline" }}>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>

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
            text="출력"
            icon={<Document />}
            type="button"
            color={ButtonColor.LIGHT}
          />
        </div> */}
      </SearchWrapper>
    </>
  );
}

export default CC1500;
