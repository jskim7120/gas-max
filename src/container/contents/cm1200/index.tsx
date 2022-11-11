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
import { DetailHeader, DetailWrapper, TableWrapper, Wrapper } from "../style";
import { fields, columns } from "./data";
import Form from "./form";
import { ButtonColor, FieldKind } from "components/componentsType";
import { useDispatch } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { Field, FormGroup, Input, Label } from "components/form/style";
import CheckBox from "components/checkbox";
import { useForm } from "react-hook-form";
import API from "app/axios";

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
  const buildingRealgridElements = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      container = buildingRealgridElements.current as HTMLDivElement;
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
        console.log("data", data);
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
      </DetailHeader>
      <Wrapper>
        <div></div>
        <TableWrapper width="30%" ref={buildingRealgridElements}>
            <form onSubmit={handleSubmit(onSearchSubmit)}>
              <Field>
                <FormGroup>
                  <Label>
                    <CheckBox title="관리비" rtl={false} />
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
        </TableWrapper>
        <DetailWrapper width="70%">
          <Form selected={selected} selectedRowIndex={selectedRowIndex} />
        </DetailWrapper>
      </Wrapper>
    </>
  );
}

export default CM1200;
