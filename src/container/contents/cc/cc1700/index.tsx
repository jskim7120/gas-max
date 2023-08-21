import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { CC1700SEARCH, CC170065 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { addDeleteMenuId } from "app/state/modal/modalSlice";
import { Select, FormGroup, Label } from "components/form/style";
import GridLeft from "components/grid";
import { fields, columns } from "./data";
import { ICC1700SEARCH } from "./model";
import Form from "./form";
import useDrawLine from "app/hook/useMidLine";
import use4Btns from "app/hook/use4Btns";
import useModal from "app/hook/useModal";

const leftSideWidth: number = 880;

function CC1700({
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
  const { showDeleteModal, openModal } = useModal();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [selected, setSelected] = useState<any>({});

  const { register, handleSubmit, reset, control, watch } =
    useForm<ICC1700SEARCH>({
      mode: "onSubmit",
    });

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1700" });
  }, []);

  const handleClickAdd = () => {
    formRef.current.resetForm("clear");
  };

  const handleClickDelete = () => {
    openModal();
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  const handleClickUpdate = () => {
    formRef.current.crud(null);
  };

  const handleClickReset = () => {
    formRef.current.resetForm("reset");
  };

  useEffect(() => {
    if (dataCommonDic) {
      fetchData({ acbAreaCode: dataCommonDic.areaCode[0].code });
      resetSearchForm();
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
      fetchData65({
        acbAreaCode: selected.acbAreaCode,
        acbCode: selected.acbCode,
      });
    }
  }, [selected]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
    });
  };

  const submit = (params: any) => {};

  const fetchData = async (params: any) => {
    const datas = await apiGet(CC1700SEARCH, params);

    if (datas) {
      setData(datas);
      setSelected(datas[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const fetchData65 = async (params: any) => {
    const data65 = await apiGet(CC170065, params);
    if (data65 && data65?.length > 0) {
      setData65(data65[0]);
    } else {
      setData65({});
    }
  };

  return (
    <>
      {showDeleteModal()}
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "48px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
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
              style={{ height: `100%` }}
            />
          </div>
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            areaCode={watch("areaCode")}
            data65={data65}
            setData65={setData65}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1700;
