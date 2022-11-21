import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useForm } from "react-hook-form";
import API from "app/axios";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import {
  Plus,
  Trash,
  Update,
  Reset,
  MagnifyingGlass,
  UserCm1300Icon,
} from "components/allSvgIcon";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { ButtonColor, FieldKind } from "components/componentsType";
import { Wrapper, DetailHeader } from "../en/style";
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
import { Field, FormGroup, Input } from "components/form/style";
import HomeIconSvg from "assets/image/home-icon.svg";
import { useDispatch, useSelector } from "app/store";
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

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    // if (data?.length > 0) {
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
    // }
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
      if (params.searchInput1) {
        const { data } = await API.get("/app/CM1300/search", {
          params: { aptCode: params.searchInput1 },
        });
        if (data?.length > 0) {
          setData(data);
        } else if (params.searchInput2) {
          const { data } = await API.get("/app/CM1300/search", {
            params: { aptName: params.searchInput2 },
          });
          if (data?.length > 0) {
            setData(data);
          }
        }
      } else if (params.searchInput2) {
        const { data } = await API.get("/app/CM1300/search", {
          params: { aptName: params.searchInput2 },
        });
        if (data) {
          setData(data);
        }
      }
      if (data) {
        setData(data);
      }
    } catch (err) {
      console.log("CM1300 data search fetch error =======>", err);
    }
  };

  const fetchListData = async () => {
    try {
      const { data } = await API.get("/app/CM1300/search");
      if (data) {
        setData(data);
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
      <Wrapper style={{ gap: "3px" }}>
        <Grid1Container>
          <form onSubmit={handleSubmit(onSearchSubmit)}>
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
                  type="submit"
                  icon={<MagnifyingGlass />}
                  style={{ marginRight: "5px", background: "red" }}
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
