import { useState, useEffect, useRef } from "react";
import API from "app/axios";
import { useDispatch } from "app/store";
import { EN1500LIST } from "app/path";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset } from "components/allSvgIcon";
import Form from "./form";
import Grid from "../grid";
import { columns, fields } from "./data";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { Wrapper, DetailWrapper, DetailHeader } from "../../commonStyle";

function EN1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await API.get(EN1500LIST);
      if (data) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
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
              // formRef.current.setIsAddBtnClicked(false);
              formRef.current.resetForm("reset");
            }}
          />
        </div>
      </DetailHeader>
      <Wrapper>
        <Grid
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
        <DetailWrapper>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
    </>
  );
}

export default EN1500;
