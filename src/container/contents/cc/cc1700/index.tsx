import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import CustomDatePicker from "components/customDatePicker";
import {
  MagnifyingGlass,
  ResetGray,
  Plus,
  Trash,
  Update,
} from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import GridLeft from "components/grid";
import { fields, columns } from "./data";
import { ICC1700SEARCH } from "./model";
import Form from "./form";
import { CustomAreaCodePart } from "container/contents/customTopPart";
import FourButtons from "components/button/fourButtons";
import { getValue } from "@testing-library/user-event/dist/utils";

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
  const dispatch = useDispatch();
  const [areaCode, setAreaCode] = useState("");
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1700" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      setAreaCode(dataCommonDic.areaCode[0].code);
      fetchData({ acbAreaCode: dataCommonDic.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      fetchData65({
        acbAreaCode: selected.acbAreaCode,
        acbCode: selected.acbCode,
      });
    }
  }, [selected]);

  const resetSearchForm = () => {};

  const { register, handleSubmit, reset, control, getValues } =
    useForm<ICC1700SEARCH>({
      mode: "onSubmit",
    });

  const submit = (params: any) => {};

  const fetchData = async (params: any) => {
    // try {
    //   const { data: datas } = await API.get(CC1700SEARCH, { params: params });

    //   if (datas) {
    //     setData(datas);
    //     setSelected(datas[0]);
    //   } else {
    //     setData([]);
    //     setSelected({});
    //   }
    // } catch (err) {
    //   setData([]);
    //   setSelected({});
    //   console.log("CC1700 data search fetch error =======>", err);
    // }

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
    // try {
    //   const { data: data65 } = await API.get(CC170065, { params: params });
    //   if (data65 && data65?.length > 0) {
    //     setData65(data65[0]);
    //   } else {
    //     setData65({});
    //   }
    // } catch (err) {
    //   setData65({});

    //   console.log("CC1700 data 65 fetch error =======>", err);
    // }

    const data65 = await apiGet(CC170065, params);
    if (data65 && data65?.length > 0) {
      setData65(data65[0]);
    } else {
      setData65({});
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "48px" }}>영업소</Label>
              <Select
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
          <FourButtons
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            onClickReset={onClickReset}
            isAddBtnClicked={isAddBtnClicked}
          />
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            style={{ height: `100%` }}
          />
        </LeftSide>
        <RightSide>
          <Form
            areaCode={areaCode}
            data65={data65}
            setData65={setData65}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1700;
