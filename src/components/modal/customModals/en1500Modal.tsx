import Draggable from "react-draggable";
import { ModalWrapper } from "./style";
import EN1500 from "container/contents/rv/rv1100/en1500Modal";

function EN1500Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <Draggable handle=".handle">
      <ModalWrapper>
        <EN1500 setModalOpen={setIsOpen} />
      </ModalWrapper>
    </Draggable>
  );
}

export default EN1500Modal;
