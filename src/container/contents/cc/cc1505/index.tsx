import React, { useEffect, useState, useRef } from "react";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { fields, columns } from "./data";
import GridLeft from "components/grid";
import { CC1505SEARCH, CC150565 } from "app/path";
import Form from "./form";
import useDrawLine from "app/hook/useDrawLine";
import use4Btns from "app/hook/use4Btns";

const leftSideWidth: number = 500;

function CC1505({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [data65, setData65] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

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

  const { show4Btns, addBtnUnclick } = use4Btns(
    isAddBtnClicked,
    setIsAddBtnClicked,
    handleClickAdd,
    handleClickDelete,
    handleClickUpdate,
    handleClickReset
  );

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1505" });
  }, []);

  useEffect(() => {
    if (ownAreaCode) {
      fetchData({ areaCode: ownAreaCode });
    }
  }, [ownAreaCode]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }

      fetchData65({ accCode: selected.accCode, areaCode: ownAreaCode });
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    const datas = await apiGet(CC1505SEARCH, params);
    if (datas) {
      setData(datas);
      setSelected(datas[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(CC150565, params);
    if (res) {
      setData65(res[0]);
    } else {
      setData65({});
    }
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <div className="buttons ml30">{show4Btns()}</div>
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
              setIsAddBtnClicked={setIsAddBtnClicked}
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
            ref={formRef}
            data={data65}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CC1505;
