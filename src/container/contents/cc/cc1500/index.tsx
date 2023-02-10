import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
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
  Plus,
  Trash,
  Update,
} from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "../grid";
import { fields, columns } from "./data";
import Form from "./form";
import { CC1500SEARCH, CC150065 } from "app/path";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
} from "helpers/dateFormat";

function CC1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1500",
  });

  useEffect(() => {
    if (dataCommonDic) {
      //console.log("dataCommonDic:::", dataCommonDic);
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      //console.log("selected::::", Object.keys(selected).length, selected);

      fetchData65({
        areaCode: selected?.areaCode,
        cjCaCode: selected?.cjCaCode,
        cjDate: selected?.cjDate,
        cjSno: selected?.cjSno,
      });
    }
  }, [selected]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      cjCaCode: dataCommonDic?.sCaCode[0].code,
    });
  };

  const { register, handleSubmit, reset, control } = useForm<ICC1500SEARCH>({
    mode: "onSubmit",
  });

  const submit = (params: any) => {
    params.sDateF =
      typeof params.sDateF === "string"
        ? formatDateByRemoveDash(params.sDateF)
        : formatDateToStringWithoutDash(params.sDateF);

    params.sDateT =
      typeof params.sDateT === "string"
        ? formatDateByRemoveDash(params.sDateT)
        : formatDateToStringWithoutDash(params.sDateT);

    fetchData(params);
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataCC1500 } = await API.get(CC1500SEARCH, {
        params: params,
      });

      if (dataCC1500) {
        setData(dataCC1500);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      console.log("CC1500 data search fetch error =======>", err);
    }
  };

  const fetchData65 = async (params: any) => {
    try {
      const { data: dataCC150065 } = await API.get(CC150065, {
        params: params,
      });

      //console.log("65 data:::", dataCC150065);

      if (dataCC150065) {
        setData65({
          ...dataCC150065[0],
          areaCode: selected.areaCode,
          cjDate: selected.cjDate,
        });
      } else {
        setData65([]);
      }
    } catch (err) {
      setData65([]);
      console.log("CC1500 65 fetch error =======>", err);
    }
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <Field flex>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>

          <Select {...register("areaCode")}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>
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
          <SearchWrapper className="h35">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>기간</Label>
              <Controller
                control={control}
                {...register("sDateF")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
              <p
                style={{
                  width: "auto",
                  display: "block",
                  textAlign: "center",
                }}
              >
                ~
              </p>
              <Controller
                control={control}
                {...register("sDateT")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />

              <Label>차량</Label>
              <Select {...register("cjCaCode")} width={InputSize.i120}>
                {dataCommonDic?.sCaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                type="button"
                color={ButtonColor.SECONDARY}
                onClick={handleSubmit(submit)}
                style={{ marginLeft: "30px" }}
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={16}
                        style={{ marginRight: "10px" }}
                        borderWidth="2px"
                      />
                    </>
                  )
                }
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ marginLeft: "5px" }}
                color={ButtonColor.LIGHT}
                onClick={() => {
                  resetSearchForm();
                  setData([]);
                }}
              />
            </FormGroup>
          </SearchWrapper>
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
          <Form
            data65={data65}
            setData65={setData65}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            // selected={selected}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1500;
