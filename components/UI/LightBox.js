import styles from "./LightBox.module.css";

const LightBox = (props) => {
    return (
      <div className={styles.modal}>
        <div className={`${styles.modalDialog} ${props.width?styles[props.width]:""}`}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>              
              <button
                className={styles.modalClose}
                onClick={props.close}
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

export default LightBox;