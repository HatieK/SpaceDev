import React from "react";

import { createPortal } from "react-dom";

const Modal = ({ children, maskOverlayClose, visible, onCancel }) => {
  const onMaskClick = () => {
    if (maskOverlayClose) {
      onCancel?.();
    }
  };

  if (!visible) return null;

  return createPortal(
    <div className="popup-video" id="popup-video" onClick={onMaskClick}>
      <div className="wrap">{children}</div>
      <div className="close" onClick={onCancel} />
    </div>,
    document.body
  );
};

export default Modal;
