import styles from "./LoginModal.module.css";

const LoginModal = (props) => {
    return (
      <div className={styles.modal}>
        <div className={`${styles.modalDialog} ${props.width?props.width:""}`}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>              
              <button
                className={styles.modalClose}
                onClick={props.onClose}
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

export default LoginModal;