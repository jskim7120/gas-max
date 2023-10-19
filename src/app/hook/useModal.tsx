import { MouseEventHandler, useState } from "react";
import Modal from "components/modal/modal";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const showCM1105Modal = () => {
    return <Modal type="cm1105Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showCM1106Modal = () => {
    return <Modal type="cm1106Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showGR1200Modal = () => {
    return <Modal type="gr1200Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showGR1300Modal = () => {
    return <Modal type="gr1300Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showCC1100Modal = () => {
    return <Modal type="cc1100Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showCC1200Modal = () => {
    return <Modal type="cc1200Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showPT1105Modal = () => {
    return <Modal type="pt1105Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showPT1205Modal = () => {
    return <Modal type="pt1205Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showMenuModal = () => {
    return <Modal type="menuModal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showAccountModal = () => {
    return <Modal type="accountModal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showInfoModal = () => {
    return <Modal type="infoModal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showDeleteModal = () => {
    return <Modal type="delModal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showReLoginModal = () => {
    return <Modal type="reLoginModal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showEN1500Modal = () => {
    return <Modal type="en1500Modal" isOpen={isOpen} setIsOpen={setIsOpen} />;
  };

  const showCustomerModal = ({ onClose }: { onClose?: MouseEventHandler }) => {
    return (
      <Modal
        type="customerModal"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={onClose && onClose}
      />
    );
  };

  const showAR1100BpSaleModal = () => {
    return (
      <Modal type="ar1100BpSaleModal" isOpen={isOpen} setIsOpen={setIsOpen} />
    );
  };

  const showAR1100BupumModal = () => {
    return (
      <Modal type="ar1100BupumModal" isOpen={isOpen} setIsOpen={setIsOpen} />
    );
  };

  return {
    closeModal,
    openModal,
    showCM1105Modal,
    showCM1106Modal,
    showGR1200Modal,
    showGR1300Modal,
    showCC1100Modal,
    showCC1200Modal,
    showPT1105Modal,
    showPT1205Modal,
    showMenuModal,
    showAccountModal,
    showInfoModal,
    showDeleteModal,
    showReLoginModal,
    showCustomerModal,
    showEN1500Modal,
    showAR1100BpSaleModal,
    showAR1100BupumModal,
  };
}

export default useModal;
