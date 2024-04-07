import { useCallback, useEffect, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';

interface ModalProps {
  modalContainerClass?: string;
  modalContainerStyle?: CSSProperties;
  modalClass?: string;
  modalStyle?: CSSProperties;
  closeComponent?: ReactNode;
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({
  modalContainerClass,
  modalContainerStyle,
  modalClass,
  modalStyle,
  closeComponent,
  closeModal,
  children,
}: ModalProps) => {
  const [scrolled] = useState<number>(document.documentElement.scrollTop);

  useEffect(() => {
    const b = document.body;
    if (b.clientHeight > window.screen.availHeight) {
      b.style.position = 'fixed';
      b.style.overflowY = 'scroll';
      b.style.top = `-${scrolled}px`;
    }
  }, [scrolled]);

  const close = useCallback(() => {
    const b = document.body;
    b.style.position = 'static';
    b.style.overflowY = 'auto';
    b.style.top = ''; // not necessary
    window.scrollTo(0, scrolled);
    closeModal();
  }, [scrolled, closeModal]);

  return (
    <div
      onClick={close}
      className={`default-modal-container ${
        modalContainerClass !== undefined && modalContainerClass
      }`}
      style={modalContainerStyle !== undefined ? modalContainerStyle : {}}
    >
      <div
        className={`default-modal ${modalClass !== undefined && modalClass}`}
        style={modalStyle !== undefined ? modalStyle : {}}
      >
        <div className="modal-close-container">
          <div onClick={close}>
            {closeComponent ? closeComponent : <span>x</span>}
          </div>
        </div>
        <div className="default-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
