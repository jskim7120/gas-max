import { useState, useEffect, useRef } from "react";
import { useSelector } from "app/store";
import Draggable from "react-draggable";
import API from "app/axios";
import { EN1500LIST } from "app/path";

import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset } from "components/allSvgIcon";
import Form from "./form";
import Grid from "../grid";
import { columns, fields } from "./data";
import { MainWrapper, RightSide, SearchWrapper } from "../../commonStyle";

function EN1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const isOpen = useSelector((state) => state.sidebar);
  const activeTabId = useSelector((state) => state.tab.activeTabId);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [linePos, setLinePos] = useState(420);
  const [color, setColor] = useState("#707070");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === "F7") {
        event.preventDefault();
        btnRef1.current.focus();
        // formRef.current.crud(null);
        formRef.current.update();
      }
    }

    if (activeTabId) {
      if (activeTabId === menuId) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeTabId]);

  const fetchData = async () => {
    try {
      const { data: data1500 } = await API.get(EN1500LIST);
      if (data1500) {
        setData(data1500);
        setSelected(data1500[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setSelectedRowIndex(0);
    } catch (err) {
      setData([]);
      setSelected({});
      console.log("JNOTRY DATA fetch error =======>", err);
    }
  };
  const handleDrag = (event: any, ui: any) => {
    if (ui.x > -4) {
      if (color === "transparent") {
        setColor("#707070");
      }
    } else {
      if (color === "#707070") {
        setColor("transparent");
      }
    }

    if (ui.x > 0) {
      setLinePos(ui.x);
    } else {
      event.stopPropagation();
      setLinePos(0);
    }
  };

  return (
    <>
      <SearchWrapper className=" mt5" style={{ height: "40px" }}>
        <div className="buttons">
          <Button
            text="저장 (F7)"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              formRef.current.update();
            }}
            color={ButtonColor.SECONDARY}
            ref={btnRef1}
          />
        </div>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper style={{ height: `calc(100% - 7px)` }}>
        <Grid
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          style={{ width: `${linePos}px` }}
          menuId={menuId}
          rowIndex={0}
        />
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
        </RightSide>

        <Draggable
          axis="x"
          bounds="parent"
          onDrag={handleDrag}
          position={{ x: linePos, y: 0 }}
          disabled={linePos < 0}
        >
          <div
            style={{
              position: "absolute",
              top: "110px",
              left: `${isOpen} ? 87px : 5px`,
              width: "4px",
              height: "calc(100% - 190px)",
              backgroundColor: color,
              cursor: "col-resize",
            }}
          ></div>
        </Draggable>
      </MainWrapper>
    </>
  );
}

export default EN1500;
