import React, { useState, useEffect } from "react";
import { GR1600TAB2, GR1600JPUPDATE } from "app/path";
import API from "app/axios";
import Grid from "./grid";
import { useForm } from "react-hook-form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import { Update, Reset } from "components/allSvgIcon";

import {
  Field,
  Input,
  Input2,
  Select,
  DividerGray,
  Wrapper,
  Label,
  FormGroup,
} from "components/form/style";
import { FieldKind } from "components/componentsType";
import { toast } from "react-toastify";

const radioOptions = [
  {
    label: "전체품목",
    id: "0",
  },
  {
    label: "사용품목",
    id: "1",
  },
];

let dataOrig: any;
let editedRowIds: [];

function Tab2({ buCode, areaCode }: { buCode: string; areaCode: string }) {
  const [data, setData] = useState<any>([]);
  const [commitedRowId, setCommitedRowId] = useState<any>();

  useEffect(() => {
    if (areaCode && buCode) {
      fetchData(null);
    }
  }, [areaCode, buCode]);

  useEffect(() => {
    console.log(commitedRowId);
  }, [commitedRowId]);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ jpGubun: string; jpName: string }>();

  const fetchData = async (params: any) => {
    try {
      if (areaCode && buCode) {
        const { data: tab2Data } = await API.get(GR1600TAB2, {
          params: {
            areaCode: areaCode,
            buCode: buCode,
            jpGubun: params && params.tabJpGubun1,
            jpName: params && params.tabJpGubun1,
          },
        });

        setData(tab2Data);

        dataOrig = JSON.parse(JSON.stringify(tab2Data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    if (buCode) {
      const formValues = getValues();
      await fetchData(formValues);
    } else {
      console.log("buCode bhgui");
    }
  };
  console.log(editedRowIds);

  const update = async () => {
    try {
      let successList: any = [];
      let failList: any = [];

      editedRowIds.forEach(async (id: any) => {
        let response = await API.post(GR1600JPUPDATE, {
          areaCode: areaCode,
          buCode: buCode,
          ...data[id],
        });

        if (response.status === 200) {
          successList.push(id);
        } else {
          failList.push(id);
        }
      });

      console.log(successList, successList.length);

      if (successList.length > 0) {
        console.log("successList.length:", successList);
        toast.success(`successfully changed.`);
      }
      //setEditedRowIds([]);
    } catch (error: any) {}
  };

  const resetTable = () => {
    let dataCopy: any = JSON.parse(JSON.stringify(dataOrig));
    setData([...dataCopy]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <form style={{ marginBottom: "10px" }}>
          <Wrapper>
            <FormGroup style={{ alignItems: "center" }}>
              <Label style={{ background: "transparent" }}>조회구분</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register("jpGubun")}
                    id={option.id}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
            <Input
              label="품명"
              register={register("jpName")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i120}
            />

            <Button
              text="검색"
              icon={<MagnifyingGlassBig width="17.188" height="17.141" />}
              kind={ButtonType.ROUND}
              type="button"
              style={{ marginRight: "5px", height: "26px" }}
              onClick={handleSubmit(submit)}
            />
          </Wrapper>
        </form>
        <div>
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={update}
          />
          <Button text="취소" icon={<Reset />} onClick={resetTable} />
        </div>
      </div>
      <Grid data={data} setData={setData} setCommitedRowId={setCommitedRowId} />
    </div>
  );
}

export default Tab2;
