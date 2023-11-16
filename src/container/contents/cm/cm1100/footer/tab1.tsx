import React, { useRef, useEffect, useState } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useDispatch } from "app/store";
import { addCM1106 } from "app/state/modal/modalSlice";
import Button from "components/button/button";
import { ButtonType } from "components/componentsType";
import { Notebook, Edit2, WhiteCloseCircle } from "components/allSvgIcon";
import Modal from "components/modal/modal";
import { columns, fields } from "./data";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function Tab1({ data, selected }: { data: any; selected: any }) {
  const [gridData, setGridData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const realgridElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(data)?.length > 0 && data?.tab1) {
      setGridData(data.tab1);
    } else {
      setGridData([]);
    }
  }, [data?.tab1]);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    if (gridData && gridData.length > 0) {
      dp.setRows(gridData);
    }
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
    gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [gridData]);

  const openPopupCM1106 = async () => {
    dispatch(
      addCM1106({
        source: "CM1100",
        areaCode: selected?.areaCode,
        cuCode: selected?.cuCode,
      })
    );
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        type="cm1106Modal"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "100%", height: "160px" }}
          ref={realgridElement}
        ></div>
        <div
          style={{
            width: "100px",
            margin: "10px 0 0 10px",
          }}
        >
          <Button
            text="품목추가"
            icon={<Notebook />}
            withoutLine
            style={{
              marginBottom: "7px",
              width: "130px",
            }}
            kind={ButtonType.SQUARE_BIG}
            type="button"
            onClick={openPopupCM1106}
          />
          <Button
            text="품목수정"
            icon={<Edit2 />}
            withoutLine
            style={{
              marginBottom: "7px",
              width: "130px",
            }}
            kind={ButtonType.SQUARE_BIG}
            type="button"
          />

          <Button
            text="품목삭제"
            icon={<WhiteCloseCircle />}
            withoutLine
            style={{
              width: "130px",
            }}
            kind={ButtonType.SQUARE_BIG}
            type="button"
          />
        </div>
      </div>
    </>
  );
}

export default Tab1;
