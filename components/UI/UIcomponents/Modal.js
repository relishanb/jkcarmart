// Modal.js
import styles from "./Modal.module.css"; // Create a CSS module named Modal.module.css

function Modal(props) {
    return (
        <div className={styles.modalOverlay} >
            <div className={`${styles.modalContent} ${props.width}`}>
                <div className={styles.modalHeader}>
                    <span className={styles.modalTitle}>{props.title}</span>
                <button type="button" className={styles.close} onClick={props.closeModel} >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                </button>
                </div>
                 <div className={styles.modalBody}>
                      {props.children}
                 </div>
           </div>
        </div>
    );
}
export default Modal;