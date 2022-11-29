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
import { MagnifyingGlassBig, Update, Reset } from "components/allSvgIcon";
import { Input, Wrapper, Label, FormGroup } from "components/form/style";
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
let editedRowIds: any = [];

function Tab2({
  buCode,
  areaCode,
  values1,
  values2,
  labels1,
  labels2,
}: {
  buCode: string;
  areaCode: string;
  values1: any;
  values2: any;
  labels1: any;
  labels2: any;
}) {
  const [data, setData] = useState<any>([]);
  const [commitedRowId, setCommitedRowId] = useState<any>();

  useEffect(() => {
    if (areaCode && buCode) {
      fetchData(null);
    }
  }, [areaCode, buCode]);

  useEffect(() => {
    if (commitedRowId !== undefined) {
      console.log("commitedRowId:", commitedRowId);
      if (!checkAvailability(editedRowIds, commitedRowId)) {
        editedRowIds.push(commitedRowId);
      }
    }
  }, [commitedRowId]);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ jpGubun: string; jpName: string }>();

  const checkAvailability = (arr: any, val: any) => {
    return arr.some((arrVal: any) => val === arrVal);
  };

  const fetchData = async (params: any) => {
    try {
      if (areaCode && buCode) {
        const { data: tab2Data } = await API.get(GR1600TAB2, {
          params: {
            areaCode: areaCode,
            buCode: buCode,
            jpGubun: params && params.jpGubun,
            jpName: params && params.jpName,
          },
        });
        console.log("tab2Data:", tab2Data);
        setData(tab2Data);
        dataOrig = JSON.parse(JSON.stringify(tab2Data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    const formValues = getValues();
    console.log("formValues:", formValues);
    await fetchData(formValues);
  };

  const update = async () => {
    if (areaCode && buCode) {
      try {
        // let successList: any = [];
        // let failList: any = [];

        editedRowIds.forEach(async (id: any) => {
          let response = await API.post(GR1600JPUPDATE, {
            areaCode: areaCode,
            buCode: buCode,
            ...data[id],
          });

          // if (response.status === 200) {
          //   successList.push(id);
          // } else {
          //   failList.push(id);
          // }
        });

        toast.success(`row ${editedRowIds} successfully changed.`, {
          autoClose: 500,
        });

        editedRowIds = [];
      } catch (error: any) {}
    }
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
      <Grid
        data={data}
        setData={setData}
        setCommitedRowId={setCommitedRowId}
        values1={values1}
        values2={values2}
        labels1={labels1}
        labels2={labels2}
      />
    </div>
  );
}

export default Tab2;
