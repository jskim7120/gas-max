import {
  MagnifyingGlass,
  Plus,
  Reset,
  Trash,
  Update,
} from "components/allSvgIcon";
import Button from "components/button/button";
import { useEffect, useRef, useState } from "react";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import {
  DetailHeader,
  DetailWrapper,
  TableWrapper,
  Wrapper,
  FormSectionTitle,
  FormSeaction,
} from "../style";
import { fields, columns } from "./data";
import Form from "./form";
import { ButtonColor, FieldKind } from "components/componentsType";
import { useDispatch } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { Field, FormGroup, Input, Label } from "components/form/style";
import CheckBox from "components/checkbox";
import { useForm } from "react-hook-form";
import API from "app/axios";
import HomeIconSvg from "assets/image/home-icon.svg";
import PersonIconSvg from "assets/image/person-icon.svg";

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
  const [selected, setSelected] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
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
    }
  }, [data]);

  const onSearchSubmit = async (data: any) => {
    fetchData(data);
  };

  const fetchData = async (params: any) => {
    try {
      const { data } = await API.get("/app/CM1200/search", { params: params });
      if (data) {
        setData(data);
      }
    } catch (err) {
      console.log("CM1200 data search fetch error =======>", err);
    }
  };

  return (
    <>
      <DetailHeader>
        <p>{depthFullName}</p>
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
          <form onSubmit={handleSubmit(onSearchSubmit)}>
            <Field>
              <FormGroup>
                <Label>
                  <CheckBox title="건물명" rtl={false} />
                </Label>
                <Input
                  register={register("searchInput", {
                    required: true,
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
          <div
            style={{ width: "100%", height: "95%" }}
            ref={realgridElement}
          ></div>
        </TableWrapper>
        <DetailWrapper width="70%">
          <FormSeaction topBorder={false}>
            <FormSectionTitle>
              <img src={HomeIconSvg} />
              <h4>건물 정보</h4>
            </FormSectionTitle>
            <Form selected={selected} selectedRowIndex={selectedRowIndex} />
          </FormSeaction>
          <FormSeaction topBorder={true}>
            <FormSectionTitle>
              <img src={PersonIconSvg} />
              <h4>건물 정보</h4>
            </FormSectionTitle>
            <p>table</p>
          </FormSeaction>
        </DetailWrapper>
      </Wrapper>
    </>
  );
}

export default CM1200;
