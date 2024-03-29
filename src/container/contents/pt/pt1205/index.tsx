import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useSelector, useDispatch } from "app/store";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import {
  Update,
  Reset,
  WhiteClose,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import Grid from "components/grid2";
import { FormGroup, Input } from "components/form/style";
import { PT1205SEARCH } from "app/path";
import { SearchWrapper } from "container/contents/commonStyle";
import { IPT1205 } from "./model";
import { columns, fields } from "./data";
import Form from "./form";

function FormIP1205({ setModalOpen }: { setModalOpen: Function }) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, getValues } = useForm<IPT1205>();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const [loading, setLoading] = useState(false);
  const areaCode = useSelector((state) => state.auth.areaCode);
  const ptAreaCode = useSelector((state) => state.modal.pt1205.areaCode);
  const ptScuCode = useSelector((state) => state.modal.pt1205.cuCode);
  const ptScuName = useSelector((state) => state.modal.pt1205.cuName);
  const ptCuCmisu = useSelector((state) => state.modal.pt1205.cuCmisu);
  const [data, setData] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const [totalGuAmount, setTotalGuAmount] = useState(0);

  useEffect(() => {
    getCommonDictionary({ groupId: "PT", functionName: "PT1205" });
    //firstFetchData();
  }, []);

  useEffect(() => {
    if (ptScuCode && ptScuName) {
      resetForm();
    }
  }, [ptScuCode]);

  const resetForm = () => {
    reset({
      sCuCode: ptScuCode,
      sCuName: ptScuName,
    });
  };
  const calc = (i: number, s: string) => {
    console.log("triggering add minus", data[i].gjMisujan);
    if (i !== undefined && s !== undefined) {
      if (s === "Y") {
        setTotalGuAmount((prev) => prev + data[i].gjMisujan);
      } else if (s === "N") {
        setTotalGuAmount((prev) => prev - data[i].gjMisujan);
      } else {
        setTotalGuAmount((prev) => prev - 0);
      }
    }
  };

  const fetchSearchData = async (params: any) => {
    setLoading(true);
    const res = await apiGet(PT1205SEARCH, {
      sCuCode: params.sCuCode,
      areaCode: ptAreaCode,
    });

    if (res) {
      setData(res);
      setSelected(res[0]);
    } else {
      setData([]);
      setSelected({});
    }

    setLoading(false);
  };

  const firstFetchData = async () => {
    setLoading(true);
    const res = await apiGet(PT1205SEARCH, {
      sCuCode: ptScuCode,
      areaCode: ptAreaCode,
    });

    if (res) {
      setData(res);
      setSelected(res[0]);
    } else {
      setData([]);
      setSelected({});
    }

    setLoading(false);
  };

  const onSearchSubmit = async (params: any) => {
    console.log("When trigger modal", params);
    fetchSearchData(params);
  };

  console.log(totalGuAmount, "is amount");
  return (
    <form autoComplete="off">
      <SearchWrapper
        style={{
          background: "#0B97F6",
          height: "40px",
          borderBottom: "none",
        }}
        className="handle"
      >
        <FormGroup style={{ gap: "3px" }}>
          <Input
            label="거래처"
            register={register("sCuName")}
            textAlign="left"
            labelStyle={{
              minWidth: "60px",
            }}
          />
          <Button
            // text="검색"
            icon={<MagnifyingGlassBig />}
            kind={ButtonType.SQUARE_SMALL}
            type="submit"
            style={{
              background: "#666666",
              borderRadius: "5px",
              border: "none",
              height: "30px",
              width: "35px",
            }}
          />
          <Input
            register={register("sCuCode")}
            textAlign="left"
            inputSize={InputSize.i120}
          />
        </FormGroup>
        <div className="buttons">
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {}}
            type="button"
          />
          <Button
            text="취소"
            style={{ marginRight: "5px" }}
            icon={<Reset />}
            type="button"
            onClick={() => {}}
          />
          <span
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </div>
      </SearchWrapper>

      <div style={{ display: "flex", width: "100%" }}>
        <Grid
          areaCode={areaCode}
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          style={{
            height: "500px",
            width: "90%",
            borderRight: "1px solid #000",
            margin: "10px",
          }}
          isEditable={false}
          calc={calc}
          isSortable={false}
        />
        <Form
          selected={selected}
          ref={formRef}
          setData={setData}
          setSelected={setSelected}
          dataCommonDic={dataCommonDic}
          totalGuAmount={totalGuAmount}
          cuCmisu={ptCuCmisu}
        />
      </div>
    </form>
  );
}

export default FormIP1205;
