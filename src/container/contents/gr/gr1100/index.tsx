import { useState, useEffect, useRef } from "react";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "app/store";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { GR1100SEARCH } from "app/path";
import Button from "components/button/button";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlassBig,
  ExcelIcon,
} from "components/allSvgIcon";
import Form from "./form";
import Grid from "./grid";
import { columns, fields } from "./data";
import { MainWrapper, RightSide, TopBar } from "../../commonStyle";
import Loader from "components/loader";

interface ISEARCH {
  areaCode: string;
  sBuGubun: string;
  sBuName: string;
  sBuStae: string;
}

function GR1100({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1100",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
        sBuStae: dataCommonDic?.sBuStae[0].code,
      });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const fetchData = async (params: ISEARCH) => {
    try {
      setLoading(true);
      const { data } = await API.get(GR1100SEARCH, {
        params: params,
      });
      if (data) {
        setData(data);
        setLoading(false);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("DATA fetch error =======>", err);
    }
  };

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  function deleteRowGrid() {
    try {
      formRef.current.setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  return (
    <>
      <TopBar>
        <Field flex>
          <p>{depthFullName}</p>
          <p
            className="big"
            style={{
              marginLeft: "27px",
              marginRight: "7px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            영업소
          </p>
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
            onClick={() => {
              formRef.current.setIsAddBtnClicked(true);
              formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              dispatch(openModal({ type: "delModal" }));
              dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {
              formRef.current.crud(null);
            }}
          />
          <Button
            text="취소"
            icon={<Reset />}
            onClick={() => {
              formRef.current.setIsAddBtnClicked(false);
              formRef.current.resetForm("reset");
            }}
          />
        </div>
      </TopBar>
      <MainWrapper>
        <div
          style={{ width: "50%", gap: "50%", borderRight: "3px solid #707070" }}
        >
          <form onSubmit={handleSubmit(submit)}>
            <div
              style={{
                borderBottom: "2px solid #707070",
                background: "#dbdbdb",
              }}
            >
              <Field
                flex
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "20px",
                }}
              >
                <Field flex>
                  <FormGroup>
                    <Label
                      style={{
                        minWidth: "auto",
                        padding: "3px 0 3px 12px",
                      }}
                    >
                      구분
                    </Label>
                    <Select {...register("sBuGubun")}>
                      {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <Input
                    label="매입처명"
                    labelStyle={{
                      minWidth: "auto",
                      marginLeft: "15px",
                      padding: "3px 0 3px 12px",
                    }}
                    register={register("sBuName")}
                    errors={errors["sBuName"]?.message}
                    inputSize={InputSize.i100}
                  />

                  <FormGroup>
                    <Label
                      style={{
                        minWidth: "auto",
                        padding: "3px 0 3px 12px",
                      }}
                    >
                      거래상태
                    </Label>
                    <Select {...register("sBuStae")}>
                      {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                </Field>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlassBig />}
                    kind={ButtonType.ROUND}
                    type="submit"
                    loader={
                      loading && (
                        <>
                          <Loader
                            color="white"
                            size={21}
                            style={{ marginRight: "10px" }}
                          />
                        </>
                      )
                    }
                    style={{ marginRight: "5px", height: "26px" }}
                  />

                  <Button
                    text="엑셀"
                    icon={<ExcelIcon />}
                    kind={ButtonType.ROUND}
                    color={ButtonColor.SECONDARY}
                    type="button"
                    style={{ marginRight: "5px", height: "26px" }}
                  />
                </div>
              </Field>
            </div>
            <Grid
              data={data ? data : []}
              fields={fields}
              columns={columns}
              setSelected={setSelected}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
            />
          </form>
        </div>
        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            tData={data}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1100;
