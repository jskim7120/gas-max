import Draggable from "react-draggable";
import FooterModal from "container/contents/footer/form";
import styled from "styled-components";

const CustomerSearch = styled.div`
  width: 923px;
  height: 650px;
  background: #fff;

  box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 5px 9px -3px rgba(0, 0, 0, 0.7);
`;

function CustomerModal({
  onClose,
  setIsOpen,
}: {
  onClose: Function;
  setIsOpen: Function;
}) {
  return (
    <Draggable handle=".handle">
      <CustomerSearch>
        <FooterModal onClose={onClose} setIsOpen={setIsOpen} />
      </CustomerSearch>
    </Draggable>
  );
}

export default CustomerModal;
