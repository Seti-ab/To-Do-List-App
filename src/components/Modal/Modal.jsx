import React from "react";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ show, handleClose, text, handleConfirm, actions }) => {
  return (
    <div className={show ? styles.showModal : styles.hideModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <span className={styles.closeIcon} onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </span>
          <div className={styles.content}>
            <p>{text}</p>
            {actions && (
              <div className={styles.actions}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                >
                  Yes
                </button>
                <button className={styles.cancelButton} onClick={handleClose}>
                  No
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.backdrop} onClick={handleClose}></div>
      </div>
    </div>
  );
};

export default Modal;
