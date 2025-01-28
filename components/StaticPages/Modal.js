import React from "react";
import ReactDom from "react-dom";

const PortalRoot = document.getElementById("portal");
const Modal = ({ children, isOpen, close }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <button className="modal__btn-close" onClick={close}>
        Close
      </button>
      {children}
      <div className="modal__overlay" onClick={close}></div>
    </div>,
    PortalRoot
  );
};

export default Modal;
