import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { ICC1500SEARCH } from "./model";
import CustomDatePicker from "components/customDatePicker";
import {
  MagnifyingGlass,
  ResetGray,
  Document,
  Plus,
  Trash,
  Update,
} from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Input,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "../grid";
import { fields, columns } from "./data";
import Form from "./form";

function CC1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
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
      <SearchWrapper style={{ height: "35px", marginTop: "5px" }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
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
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {}}
          />
          <Button
            text="취소"
            icon={<ResetGray />}
            color={ButtonColor.LIGHT}
            onClick={() => {}}
          />
        </div>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <SearchWrapper style={{ height: "35px" }}>dvfd</SearchWrapper>
          <Grid
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: `calc(100% - 38px)` }}
          />
        </LeftSide>
        <RightSide>
          <Form />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1500;
