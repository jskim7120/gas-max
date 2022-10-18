import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import API from "api";
import Button from "components/button/button";
import { ButtonType, ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { columns, fields } from "./data";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "./style";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN1100({
  name,
  depthFullName,
}: {
  name: string;
  depthFullName: string;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const [jnotry, setJnotry] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    fetchJNotry();
  }, []);

  useEffect(() => {
    if (jnotry.length > 0) {
      container = realgridElement.current as HTMLDivElement;
      dp = new LocalDataProvider(true);
      gv = new GridView(container);

      gv.setDataSource(dp);
      dp.setFields(fields);
      gv.setColumns(columns);
      dp.setRows(jnotry);

      gv.setHeader({
        height: 35,
      });
      gv.setFooter({ visible: false });
      gv.setOptions({
        indicator: { visible: true },
        checkBar: { visible: false },
        stateBar: { visible: false },
        // edit: { insertable: true, appendable: true },
      });
      gv.sortingOptions.enabled = true;
      gv.displayOptions._selectionStyle = "singleRow";

      if (jnotry.length > 0) {
        gv.setSelection({
          style: "rows",
          startRow: 0,
          endRow: 0,
        });

        // gv.setDisplayOptions({
        //   rowFocusVisible:true,
        //   rowFocusBackground:"#340000ff"
        // });

        gv.onSelectionChanged = () => {
          const itemIndex: any = gv.getCurrent().dataRow;
          setSelected(jnotry[itemIndex]);
        };
      }

      return () => {
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }
  }, [jnotry]);

  const fetchJNotry = async () => {
    try {
      const { data } = await API.get("/app/EN1100/list");
      if (data) {
        console.log("JNORTY:", data);
        setJnotry(data);
        setSelected(data[0]);
      }
    } catch (err) {
      console.log("JNOTRY DATA fetch error =======>", err);
    }
  };

  //if (!jnotry) return <p>...Loading</p>;

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
              setAddClicked(true);
              formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              setAddClicked(false);
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              setAddClicked(false);
              formRef.current.submitForm();
            }}
            color={ButtonColor.SECONDARY}
          />
          <Button
            text="취소"
            icon={<Reset />}
            onClick={() => {
              setAddClicked(false);
              formRef.current.resetForm("reset");
            }}
          />
        </div>
      </DetailHeader>
      <Wrapper>
        <TableWrapper ref={realgridElement}></TableWrapper>
        <DetailWrapper>
          <Form selected={selected} ref={formRef} />
        </DetailWrapper>
      </Wrapper>
    </>
  );
}

export default EN1100;
