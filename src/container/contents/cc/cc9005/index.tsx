import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import BasicGrid from "components/basicGrid";
import { fields, columns } from "./data";
import { ICC9005SEARCH } from "./model";
import Form from "./form";
import { ResetGray, Trash, Update } from "components/allSvgIcon";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { FormGroup, Select, Label } from "components/form/style";

function CC9005({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const gridRef = useRef() as React.MutableRefObject<any>;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC9005" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
    }
  }, [dataCommonDic]);

  useEffect(() => {}, [selected]);

  const resetSearchForm = () => {};

  const { register, handleSubmit, reset, control } = useForm<ICC9005SEARCH>({
    mode: "onSubmit",
  });

  const submit = (params: any) => {};

  const fetchData = async (params: any) => {};

  const fetchData65 = async (params: any) => {};

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
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "70px" }}>영업소</Label>

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
              <Button text="삭제" icon={<Trash />} onClick={onClickDelete} />
              <Button
                text="저장"
                icon={<Update />}
                color={ButtonColor.SECONDARY}
                onClick={onClickUpdate}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                color={ButtonColor.LIGHT}
                onClick={onClickReset}
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
      </form>
      <MainWrapper>
        <LeftSide>
          <BasicGrid
            ref={gridRef}
            areaCode={areaCode}
            data={data}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 0px)` }}
          />
        </LeftSide>
        <RightSide>
          <Form
            data65={data65}
            setData65={setData65}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
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

export default CC9005;
