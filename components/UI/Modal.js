import styles from "./Modal.module.css";

const Modal = (props) => {
    return (
      <div className={styles.modal}>
        <div className={`${styles.modalDialog} ${props.width?styles[props.width]:""}`}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitile}>{props.title}</h4>
              <button
                className={styles.modalClose}
                onClick={props.closeModel}
              >
                &#10006;
              </button>
            </div>
            <div className={styles.modalBody}>{props.children}</div>
          </div>
        </div>
      </div>
    );
  };

export default Modal;