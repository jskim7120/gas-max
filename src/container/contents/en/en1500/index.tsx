import { useState, useEffect, useRef } from "react";
import API from "app/axios";
import { EN1500LIST } from "app/path";
import Draggable from "react-draggable";
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

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [linePos, setLinePos] = useState(420);

  useEffect(() => {
    fetchData();
  }, []);

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
    setLinePos(ui.x);
  };

  return (
    <>
      <SearchWrapper className=" mt5" style={{ height: "40px" }}>
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
        </div>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper style={{ height: `calc(100% - 7px)` }}>
        <Grid
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          // style={{ minWidth: "420px" }}
          style={{ width: `${linePos}px` }}
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
        >
          <div
            style={{
              position: "absolute",
              top: "110px",
              left: "5px",
              width: "4px",
              height: "calc(100% - 190px)",
              backgroundColor: "#707070",
              cursor: "col-resize",
            }}
          ></div>
        </Draggable>
      </MainWrapper>
    </>
  );
}

export default EN1500;
