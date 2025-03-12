import React from "react";
import { createPortal } from "react-dom";

const VideoModal = ({ maskOverlayClose, visible, onCancel }) => {
  const onMaskClick = () => {
    if (maskOverlayClose) {
      onCancel?.();
    }
  };

  if (!visible) return null;

  return createPortal(
    <div className="popup-video" id="popup-video" onClick={onMaskClick}>
      <div className="wrap">
        <iframe
          width="800"
          height="400"
          src="https://www.youtube.com/embed/oTsopKtMS_0?si=R9U3_EuR0DQfoScA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className="close" onClick={onCancel} />
    </div>,
    document.body
  );
};

export default VideoModal;
