import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { CC1600SEARCH, CC160065, CC160062 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import GridLeft from "components/grid";
import { ICC1600SEARCH } from "./model";
import { fields, columns } from "./data";
import Form from "./form";
import { Select, FormGroup, Label } from "components/form/style";
import useDrawLine from "app/hook/useMidLine";
import use4Btns from "app/hook/use4Btns";

const leftSideWidth: number = 550;

function CC1600({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { show4Btns, addBtnUnclick, isAddBtnClicked, setIsAddBtnClicked } =
    use4Btns();
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [selected, setSelected] = useState<any>({});
  const [acsAccName, setAcsAccName] = useState([]);

  const { register, handleSubmit, reset, control, watch } =
    useForm<ICC1600SEARCH>({
      mode: "onSubmit",
    });

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const handleClickAdd = () => {
    formRef.current.resetForm("clear");
  };

  const handleClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const handleClickUpdate = () => {
    formRef.current.crud(null);
  };

  const handleClickReset = () => {
    formRef.current.resetForm("reset");
  };

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1600" });
    if (ownAreaCode) {
      fetchData({ areaCode: ownAreaCode });
    }
  }, []);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
      fetchData65({
        acsAccCode: selected.acsAccCode,
        acsCode: selected.acsCode,
        areaCode: ownAreaCode,
      });
      // fetchData62({ acsType: selected.acsType });
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    const datas = await apiGet(CC1600SEARCH, params);
    if (datas) {
      setData(datas);
      setSelected(datas[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const fetchData65 = async (params: any) => {
    const data65 = await apiGet(CC160065, params);
    if (data65) {
      // console.log("data65:", data65);

      setData65(data65.data[0]);
      setAcsAccName(data65.acsAccName);
    } else {
      setData65({});
      setAcsAccName([]);
    }
  };

  // const fetchData62 = async (params: any) => {
  //   try {
  //     const { data: data62 } = await API.get(CC160062, { params: params });
  //     if (data62) {
  //       // console.log("data62:", data62);
  //     } else {
  //     }
  //   } catch (err) {
  //     console.log("CC1600 data 65 fetch error =======>", err);
  //   }
  // };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "50px" }}>영업소</Label>
              {/*
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              */}
            </>
          )}

          <div className="buttons ml30">
            {show4Btns({
              handleClickAdd,
              handleClickDelete,
              handleClickUpdate,
              handleClickReset,
            })}
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <div
            style={{
              minWidth: leftSideWidth,
              height: "100%",
            }}
          >
            <GridLeft
              areaCode={ownAreaCode}
              data={data}
              setSelected={setSelected}
              fields={fields}
              columns={columns}
              menuId={menuId}
              rowIndex={0}
              style={{ height: "100%" }}
            />
          </div>
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            ref={formRef}
            data65={data65}
            acsAccName={acsAccName}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1600;
