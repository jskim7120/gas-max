import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useForm } from "react-hook-form";
import API from "app/axios";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import Loader from "components/loader";
import {
  Plus,
  Trash,
  Update,
  Reset,
  UserCm1300Icon,
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
import { Wrapper, DetailHeader } from "../../commonStyle";
import { CM1300SEARCH } from "app/path";
import {
  Grid1Container,
  Grid2Container,
  Table1Wrapper,
  Detail1Wrapper,
  FormTitle,
  UpdateButtonsContainer,
  BorderRight,
  Detail2Wrapper,
} from "./style";
import {
  Field,
  FormGroup,
  Input,
  Select,
  Divider,
} from "components/form/style";
import HomeIconSvg from "assets/image/home-icon.svg";
import { useDispatch, useSelector } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import FormCM1300User from "./cm1300User";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function CM1300({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const realgridElement = useRef<HTMLDivElement>(null);
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
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(data);
    gv.setHeader({
      height: 35,
    });
    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.setEditOptions({ editable: false });

    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
      setSelectedRowIndex(itemIndex);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    fetchListData();
  }, []);

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
        if (data === undefined) setLoading(false);
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
      <DetailHeader>
        <p>{depthFullName}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "245px",
            gap: "7px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <p className="big">영업소</p>
          <Select name="areaCode" kind={FieldKind.BORDER}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
        <div className="buttons m_left">
          <Button
            text="건물등록"
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
            style={{ marginRight: "12px" }}
            onClick={() => {
              dispatch(openModal({ type: "delModal" }));
              dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <BorderRight />
        </div>
      </DetailHeader>
      <Wrapper>
        <Grid1Container>
          <form
            onSubmit={handleSubmit(onSearchSubmit)}
            style={{
              background: "#dbdbdb",
              borderBottom: "3px solid #707070",
              height: "40px",
            }}
          >
            <Field>
              <FormGroup>
                <FormTitle onClick={fetchListData}>
                  <img src={HomeIconSvg} />
                  <p>건물</p>
                </FormTitle>
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

          <Table1Wrapper ref={realgridElement}></Table1Wrapper>
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
            <UpdateButtonsContainer>
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
                style={{ padding: "0 3px" }}
              />
            </UpdateButtonsContainer>
          </Detail1Wrapper>
        </Grid1Container>
        <Grid2Container>
          <form>
            <Field>
              <FormGroup>
                <FormTitle>
                  <UserCm1300Icon />
                  <p>사용자</p>
                </FormTitle>
              </FormGroup>
            </Field>
          </form>
          <Detail2Wrapper>
            <FormCM1300User
              menuId={menuId}
              depthFullName={depthFullName}
              selectedUser={selected}
            />
          </Detail2Wrapper>
        </Grid2Container>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default CM1300;
