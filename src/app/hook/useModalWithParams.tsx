import { useState } from "react";
import Modal from "components/modal/modal";

function useModalWithParams({ params }: { params: any }) {
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

  const showAR1100Sukum01Modal = () => {
    return (
      <Modal
        type="ar1100Sukum01Modal"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        params={params}
      />
    );
  };

  const showAR1100Sukum02Modal = () => {
    return (
      <Modal
        type="ar1100Sukum02Modal"
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
    showAR1100Sukum01Modal,
    showAR1100Sukum02Modal,
  };
}

export default useModalWithParams;
