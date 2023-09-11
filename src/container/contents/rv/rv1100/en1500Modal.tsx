import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "app/store";
import { EN150062 } from "app/path";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Update, Reset, WhiteClose } from "components/allSvgIcon";
import Form from "container/contents/en/en1500/form";
import { ModalBlueHeader } from "components/modal/customModals/style";
import { FormGroup, Label } from "components/form/style";

const EN1500Modal = ({ setModalOpen }: { setModalOpen: Function }) => {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const areaCode = useSelector((state) => state.modal.rv1100);

  const [selected, setSelected] = useState<any>({});

  useEffect(() => {
    if (areaCode !== undefined && JSON.stringify(areaCode) !== "{}") {
      fetchData(areaCode);
    }
  }, []);

  const fetchData = async (params: any) => {
    const response = await apiGet(EN150062, params);
    if (response) {
      setSelected(response[0]);
    }
  };

  return (
    <form>
      <ModalBlueHeader
        className="handle h40"
        style={{ background: "rgba(101, 84, 255, 0.37)" }}
      >
        <FormGroup>
          <Label>거래처 사용품목</Label>
          <div className="buttons ml30">
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={() => {
                formRef.current.update();
              }}
              type="button"
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={() => {
                formRef.current.resetForm("reset");
              }}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>

      <Form ref={formRef} selected={selected} />
    </form>
  );
};

export default EN1500Modal;
