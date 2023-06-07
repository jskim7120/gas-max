import React, { useState, useEffect } from "react";
import { GR1600TAB3, GR1600BPUPDATE } from "app/path";
import { apiGet, apiPost } from "app/axios";
import Grid from "./grid";
import { useForm } from "react-hook-form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { Update, Reset } from "components/allSvgIcon";

import { Input, Wrapper, Label, FormGroup } from "components/form/style";
import { FieldKind } from "components/componentsType";
import { toast } from "react-toastify";

const radioOptions = [
  {
    label: "전체부품",
    id: "0",
  },
  {
    label: "사용부품",
    id: "1",
  },
];

let dataOrig: any;
let editedRowIds: any = [];

function Tab3({
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
  } = useForm<{ bpGubun: string; bpName: string }>();

  const checkAvailability = (arr: any, val: any) => {
    return arr.some((arrVal: any) => val === arrVal);
  };

  const fetchData = async (params: any) => {
    // try {
    //   if (areaCode && buCode) {
    //     const { data: tab3Data } = await API.get(GR1600TAB3, {
    //       params: {
    //         areaCode: areaCode,
    //         buCode: buCode,
    //         bpGubun: params && params.bpGubun,
    //         bpName: params && params.bpName,
    //       },
    //     });

    //     setData(tab3Data);
    //     dataOrig = JSON.parse(JSON.stringify(tab3Data));
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    if (areaCode && buCode) {
      const tab3Data = await apiGet(GR1600TAB3, {
        areaCode: areaCode,
        buCode: buCode,
        bpGubun: params && params.bpGubun,
        bpName: params && params.bpName,
      });

      setData(tab3Data);
      dataOrig = JSON.parse(JSON.stringify(tab3Data));
    }
  };

  const submit = async () => {
    const formValues = getValues();
    console.log("formValues:", formValues);
    await fetchData(formValues);
  };

  const update = async () => {
    if (areaCode && buCode) {
      // try {
      //   // let successList: any = [];
      //   // let failList: any = [];

      //   editedRowIds.forEach(async (id: any) => {
      //     let response = await API.post(GR1600BPUPDATE, {
      //       areaCode: areaCode,
      //       buCode: buCode,
      //       ...data[id],
      //     });

      //     // if (response.status === 200) {
      //     //   successList.push(id);
      //     // } else {
      //     //   failList.push(id);
      //     // }
      //   });

      //   toast.success(`row ${editedRowIds} successfully changed.`, {
      //     autoClose: 500,
      //   });

      //   editedRowIds = [];
      // } catch (error: any) {}

      editedRowIds.forEach(async (id: any) => {
        let response = await apiPost(GR1600BPUPDATE, {
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

      editedRowIds = [];
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
          alignItems: "baseline",
        }}
      >
        <form autoComplete="off">
          <Wrapper style={{ alignItems: "center" }}>
            <FormGroup style={{ alignItems: "center" }}>
              <Label style={{ background: "transparent" }}>조회구분</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register("bpGubun")}
                    id={option.id}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>

            <Input
              label="부품명"
              register={register("bpName")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i120}
            />

            <Button
              text="검색"
              icon={<MagnifyingGlassBig width="17.188" height="17.141" />}
              kind={ButtonType.ROUND}
              type="button"
              style={{ height: "26px", marginBottom: "1px" }}
              onClick={handleSubmit(submit)}
            />
          </Wrapper>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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

export default Tab3;
