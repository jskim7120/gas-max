import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import API from "app/axios";
import Button from "components/button/button";
import Loader from "components/loader";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { ButtonColor, FieldKind, ButtonType } from "components/componentsType";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { CM1300SEARCH } from "app/path";
import { Detail1Wrapper } from "./style";
import { Field, FormGroup, Input, Select } from "components/form/style";
import { useDispatch, useSelector } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import FormCM1300User from "./cm1300User";
import GridTop from "components/grid";
import { BuildingInfoText } from "components/text";

function CM1300({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isDelete } = useSelector((state) => state.modal);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1300",
  });

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const onSearchSubmit = async (data: any, para: any) => {
    fetchSearchData(data);
  };

  const fetchSearchData = async (params: any) => {
    try {
      let data: any;
      setLoading(true);
      if (params.searchInput1) {
        const { data } = await API.get(CM1300SEARCH, {
          params: { aptCode: params.searchInput1 },
        });
        if (data?.length > 0) {
          setData(data);
          setLoading(false);
        } else if (params.searchInput2) {
          const { data } = await API.get(CM1300SEARCH, {
            params: { aptName: params.searchInput2 },
          });
          if (data?.length > 0) {
            setData(data);
            setLoading(false);
          }
        }
      } else if (params.searchInput2) {
        const { data } = await API.get(CM1300SEARCH, {
          params: { aptName: params.searchInput2 },
        });
        if (data) {
          setData(data);
          setLoading(false);
        }
      } else {
        fetchListData();
      }
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("CM1300 data search fetch error =======>", err);
    }
  };

  const fetchListData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(CM1300SEARCH);
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("CM1300 data list fetch error =======>", err);
    }
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

  if (!data) return <p>...Loading</p>;

  return (
    <>
      {/* <SearchWrapper className="h35 mt5">
        <Field flex>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>
          <Select name="areaCode">
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Field>

        <div className="buttons m_left">
          <Button
            text="건물등록"
            icon={<Plus />}
            onClick={() => {
              formRef.current.setIsAddBtnClicked(true);
              formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            onClick={() => {
              dispatch(openModal({ type: "delModal" }));
              dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
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
            style={{ padding: "0 3px" }}
          />
          <BorderRight />
        </div>
      </SearchWrapper> */}
      <MainWrapper
        style={{
          marginTop: "5px",
          height: `calc(100% + 18px)`,
          border: "1px solid blue",
        }}
      >
        <LeftSide>
          <SearchWrapper className="h35">
            <FormGroup>
              <p>{depthFullName}</p>
              <p className="big">영업소</p>
              <Select name="areaCode">
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <div className="buttons">
              <Button
                text="건물등록"
                icon={<Plus />}
                onClick={() => {
                  formRef.current.setIsAddBtnClicked(true);
                  formRef.current.resetForm("clear");
                }}
                style={{ marginRight: "5px" }}
              />
              <Button
                text="삭제"
                icon={<Trash />}
                onClick={() => {
                  dispatch(openModal({ type: "delModal" }));
                  dispatch(addDeleteMenuId({ menuId: menuId }));
                }}
                style={{ marginRight: "5px" }}
              />
              <Button
                text="저장"
                icon={<Update />}
                color={ButtonColor.SECONDARY}
                onClick={() => {
                  formRef.current.crud(null);
                }}
                style={{ marginRight: "5px" }}
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
          </SearchWrapper>
          <SearchWrapper>
            <form onSubmit={handleSubmit(onSearchSubmit)}>
              <Field>
                <FormGroup>
                  <BuildingInfoText text="건물" />
                  <Input
                    label="코드"
                    register={register("searchInput1", {
                      required: false,
                    })}
                    kind={FieldKind.BORDER}
                  />
                  <Input
                    label="건물명"
                    register={register("searchInput2", {
                      required: false,
                    })}
                    kind={FieldKind.BORDER}
                  />
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
                  />
                </FormGroup>
              </Field>
            </form>
          </SearchWrapper>

          <GridTop
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            fields={fields}
            columns={columns}
            style={{ height: `45%` }}
          />

          <Detail1Wrapper>
            <Form
              selected={selected}
              ref={formRef}
              fetchData={fetchListData}
              menuId={menuId}
              setData={setData}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
              setSelected={setSelected}
            />
          </Detail1Wrapper>
        </LeftSide>
        <RightSide>
          <FormCM1300User
            menuId={menuId}
            depthFullName={depthFullName}
            selectedUser={selected}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CM1300;
