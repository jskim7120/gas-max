import { useState } from "react";
import Modal from "components/modal/modal";

function useModal2({ params }: { params: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const showAR1100AsModal = () => {
    return (
      <Modal
        type="ar1100AsModal"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        params={params}
      />
    );
  };

  return {
    closeModal,
    openModal,
    showAR1100AsModal,
  };
}

export default useModal2;
