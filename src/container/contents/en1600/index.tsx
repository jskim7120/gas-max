import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./data";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import API from "app/axios";
import Form from "./form";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN1600({ depthFullName }: { depthFullName: string }) {
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [sawon, setSawon] = useState([]);
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    fetchSawon();
  }, []);

  useEffect(() => {
    if (sawon.length > 0) {
      container = realgridElement.current as HTMLDivElement;
      dp = new LocalDataProvider(true);
      gv = new GridView(container);

      gv.setDataSource(dp);
      dp.setFields(fields);
      gv.setColumns(columns);
      dp.setRows(sawon);
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

      if (sawon.length > 0) {
        gv.setSelection({
          style: "rows",
          startRow: 0,
          endRow: 0,
        });

        gv.onSelectionChanged = () => {
          const itemIndex: any = gv.getCurrent().dataRow;
          setSelected(sawon[itemIndex]);
        };
      }

      return () => {
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }
  }, [sawon]);

  const fetchSawon = async () => {
    try {
      const { data } = await API.get("/app/EN1600/list");
      if (data) {
        //console.log("SAWON:", data);
        setSawon(data);
        setSelected(data[0]);
      }
    } catch (err) {
      console.log("SAWON DATA fetch error =======>", err);
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
              formRef.current.setIsAddBtnClicked(false);
              formRef.current.crud("delete");
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
        <TableWrapper ref={realgridElement}></TableWrapper>
        <DetailWrapper>
          <Form selected={selected} ref={formRef} fetchSawon={fetchSawon} />
        </DetailWrapper>
      </Wrapper>
    </>
  );
}

export default EN1600;
