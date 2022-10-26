import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import API from "app/axios";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { ButtonType, ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { columns, fields } from "./data";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "./style";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN1500({
  name,
  depthFullName,
}: {
  name: string;
  depthFullName: string;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const [selected, setSelected] = useState();
  const [data, setData] = useState([]);
  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);
    gv.setHeader({
      height: 30,
    });

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(data);

    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  const fetchData = async () => {
    try {
      const { data } = await API.get("/app/EN1500/list");
      if (data) {
        setData(data);
      }
    } catch (err) {
      console.log("JNOTRY DATA fetch error =======>", err);
    }
  };

  if (!data) return <p>...Loading</p>;
  return (
    <>
      <DetailHeader>
        <p>{depthFullName}</p>
        <div className="buttons">
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              formRef.current.update();
            }}
            color={ButtonColor.SECONDARY}
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
          <Form
            selected={selected ? selected : data[0]}
            ref={formRef}
            fetchData={fetchData}
          />
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data.length > 0 ? data.length : 0} />
    </>
  );
}

export default EN1500;
