import Draggable from "react-draggable";
import FooterModal from "container/contents/footer/form";
import { ModalWrapper } from "./style";

const customStyle = {
  width: "923px",
  height: "650px",
};

function CustomerModal({
  onClose,
  setIsOpen,
}: {
  onClose: Function;
  setIsOpen: Function;
}) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper style={{ ...customStyle }}>
        <FooterModal onClose={onClose} setIsOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default CustomerModal;
