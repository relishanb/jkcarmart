
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import styles from "./ContactModal.module.scss";
import { PhoneIcon2 } from "@/components/Layout/Icons/Icons";

const ContactModal = ({ onClose, contactInfo }) => {

    console.log(contactInfo.firstName);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <ul className={styles.contactCard}>
        <li className={styles.contactCardLi1}>
          <span>{contactInfo.firstName}</span>
        </li>
        <li className={styles.contactCardLi2}>
          <span className={styles.phoneNumber}>{contactInfo.mobileNo}</span>
          <div className={styles.iconContainer}>
            <i className={styles.icon}><PhoneIcon2 /></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  );
};

export default ContactModal;
