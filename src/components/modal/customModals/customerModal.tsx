import FooterModal from "container/contents/footer/form";
import styled from "styled-components";

const CustomerSearch = styled.div`
  width: 923px;
  height: 650px;
  background: #fff;
`;

function CustomerModal() {
  return (
    <CustomerSearch>
      <FooterModal />
    </CustomerSearch>
  );
}

export default CustomerModal;
