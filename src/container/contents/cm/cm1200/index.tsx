// REACT
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// ./
import { fields, columns } from "./data";
import { ICM1200SEARCH, ICM120065USERINFO, ICM120065SUPPLYTYPE } from "./modul";
import GridTable from "./gridTable";
import Form from "./form";
import {
  DetailHeader,
  DetailWrapper,
  TableWrapper,
  Wrapper,
  FormSectionTitle,
  FormSeaction,
} from "../../commonStyle";
// COMPONENTS
import Button from "components/button/button";
import {
  MagnifyingGlassBig,
  Plus,
  Reset,
  Trash,
  Update,
} from "components/allSvgIcon";
import {
  ButtonColor,
  ButtonType,
  FieldKind,
  InputSize,
} from "components/componentsType";
import { Field, FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import HomeIconSvg from "assets/image/home-icon.svg";
import PersonIconSvg from "assets/image/person-icon.svg";
//GRID
import { GridView, LocalDataProvider } from "realgrid";
// APP
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
  addCM1105,
} from "app/state/modal/modalSlice";
import { useDispatch, useSelector } from "app/store";
import { CM120065, CM1200SEARCH } from "app/path";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { SearchWrapper } from "../cm1100/cm100Style";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function CM1200({
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
  const [selected, setSelected] = useState<ICM1200SEARCH>();
  const [selectedUserInfo, setSelectedUserInfo] = useState([
    {} as ICM120065USERINFO,
  ]);
  const [selectedSupplyTab, setSelectedSupplyTab] = useState([
    {} as ICM120065SUPPLYTYPE,
  ]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectAreaCode, setSelectAreaCode] = useState("");
  const { isDelete } = useSelector((state) => state.modal);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1200",
  });

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(data);
    gv.setHeader({ header: 35 });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    fetchData({});
  }, []);

  useEffect(() => {
    if (selected && selected.cuCode) {
      searchFetchData({ cuCode: selected.cuCode });
    } else {
      setSelectedUserInfo([]);
    }
  }, [selected]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (selected && selected?.areaCode) {
      setSelectAreaCode(selected?.areaCode);
    }
  }, [selected]);

  const onSearchSubmit = async (data: any) => {
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

  const fetchData = async (params: any) => {
    try {
      const { data } = await API.get(CM1200SEARCH, { params: params });
      if (data && data[0]) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("CM1200 data search fetch error =======>", err);
    }
  };

  const searchFetchData = async ({ cuCode }: { cuCode: string }) => {
    try {
      const { data } = await API.get(CM120065, {
        params: { cuCode },
      });
      if (data && data?.userInfo) {
        setSelectedUserInfo(data?.userInfo);
      } else {
        setSelectedUserInfo([]);
      }

      if (data && data?.supplyTab) {
        setSelectedSupplyTab(data?.supplyTab);
      }
    } catch (err) {
      console.log("CM120065 data fetch error =======>", err);
    }
  };

  const onChangeAreaCode = (e: string) => {
    e && setSelectAreaCode(e);
  };

  const handleOpenPopup = async (index: number, cuCode: any, areaCode: any) => {
    try {
      dispatch(
        addCM1105({
          cuCode: cuCode,
          areaCode: areaCode,
        })
      );
      dispatch(openModal({ type: "cm1105Modal" }));
    } catch (err: any) {}
  };

  return (
    <>
      <DetailHeader>
        <div className="title-and-areacode">
          <p>{depthFullName}</p>
          <Field flex style={{ margin: "0px 20px" }}>
            <p>영업소 </p>
            <Select
              onChange={(e) => onChangeAreaCode(e.target.value)}
              width={InputSize.i120}
              value={selectAreaCode ? selectAreaCode : ""}
              style={{ marginLeft: "5px" }}
            >
              {dataCommonDic?.areaCode?.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.code}>
                    {option.codeName}
                  </option>
                );
              })}
            </Select>
          </Field>
        </div>
        <div className="buttons">
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
      </DetailHeader>
      <Wrapper>
        <TableWrapper width="30%">
          <SearchWrapper style={{ borderBottom: "2px solid #707070" }}>
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              style={{ padding: "5px 0px" }}
            >
              <Field>
                <FormGroup>
                  <Label className="lable-check">
                    <CheckBox title="건물명" rtl={false} />
                  </Label>
                  <Input
                    register={register("sCuName", {
                      required: true,
                    })}
                    kind={FieldKind.BORDER}
                  />
                  <Button
                    text="검색"
                    icon={<MagnifyingGlassBig />}
                    kind={ButtonType.ROUND}
                    type="submit"
                  />
                </FormGroup>
              </Field>
            </form>
          </SearchWrapper>
          <div
            style={{ width: "100%", height: "95%" }}
            ref={realgridElement}
          ></div>
        </TableWrapper>
        <DetailWrapper width="70%">
          <FormSeaction topBorder={false}>
            <FormSectionTitle>
              <h4>
                <img src={HomeIconSvg} />
                건물 정보
              </h4>
            </FormSectionTitle>
            <Form
              ref={formRef}
              selectAreaCode={selectAreaCode}
              setSelectAreaCode={setSelectAreaCode}
              selected={selected}
              dataCommonDic={dataCommonDic}
              selectedSupplyTab={selectedSupplyTab}
              fetchData={fetchData}
              setData={setData}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
              setSelected={setSelected}
            />
          </FormSeaction>
          <FormSeaction topBorder={true}>
            <FormSectionTitle>
              <h4>
                <img src={PersonIconSvg} />
                사용자 정보
              </h4>
              <div className="buttons">
                <Button
                  text="사용자 추가"
                  icon={<Plus />}
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    dispatch(
                      addCM1105({
                        cuCode: selected?.cuCode ? selected?.cuCode : "",
                        areaCode: selectAreaCode ? selectAreaCode : "",
                        status: "INSERT",
                        cuCount: selected?.cuCount ?? 0,
                      })
                    );
                    dispatch(openModal({ type: "cm1105Modal" }));
                  }}
                />
                <Button
                  text="사용자 수정"
                  icon={<Plus />}
                  style={{ marginRight: "5px" }}
                />
                <Button
                  text="삭제"
                  icon={<Trash />}
                  style={{ marginRight: "5px" }}
                />
              </div>
            </FormSectionTitle>
            <GridTable
              selected={selectedUserInfo}
              openPopup={handleOpenPopup}
            />
          </FormSeaction>
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default CM1200;
