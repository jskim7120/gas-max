import { useState, useEffect, useRef } from "react";
import { apiGet } from "app/axios";
import { EN1500LIST } from "app/path";
import { useSelector } from "app/store";
import useMidLine from "app/hook/useMidLine";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset } from "components/allSvgIcon";
import Form from "./form";
import Grid from "../grid";
import { columns, fields } from "./data";
import { MainWrapper, RightSide, SearchWrapper } from "../../commonStyle";

const leftSideWidth: number = 500;

function EN1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const activeTabId = useSelector((state) => state.tab.activeTabId);

  const { showDraggableLine, linePos } = useMidLine(leftSideWidth);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === "F7") {
        event.preventDefault();
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
    const data1500 = await apiGet(EN1500LIST);
    if (data1500) {
      setData(data1500);
      setSelected(data1500[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const handleClickBtn1 = () => {
    formRef.current.update();
  };

  const handleClickBtn2 = () => {
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35">
        <div className="buttons">
          <Button
            text="저장 (F7)"
            icon={<Update />}
            onClick={handleClickBtn1}
            color={ButtonColor.SECONDARY}
            ref={btnRef1}
          />
          <Button
            text="취소 (F9)"
            icon={<Reset />}
            onClick={handleClickBtn2}
            ref={btnRef2}
          />
        </div>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <Grid
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          style={{ width: `${linePos}px` }}
          menuId={menuId}
          rowIndex={data ? data?.length - 1 : 0}
        />
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form ref={formRef} selected={selected} fetchData={fetchData} />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default EN1500;
