import React from "react";
import "../css/confirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null; // Only render if the modal is open

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal Content */}
      <div className="confirm-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Yes
          </button>
          <button onClick={onClose} className="cancel-btn">
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
