import { MouseEventHandler } from "react";
import Draggable from "react-draggable";
import FooterModal from "container/contents/footer/form";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "923px",
};

function CustomerModal({
  setIsOpen,
  onClose,
}: {
  setIsOpen: Function;
  onClose: MouseEventHandler;
}) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <FooterModal setIsOpen={setIsOpen} onClose={onClose} />
      </ModalWrapper>
    </Draggable>
  );
}

export default CustomerModal;
