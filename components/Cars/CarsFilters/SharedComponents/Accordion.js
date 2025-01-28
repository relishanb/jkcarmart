import {FaPlus,FaMinus} from "react-icons/fa"
import styles from "./Accordation.module.css";
import { useState } from "react";
function Accordation(props) {
const [isOpen,setIsOpen] = useState(false);
  return (
    <div className={`${styles.accordion_block} ${isOpen?styles.open:""} ${props.filterActive?styles.active:""}`}>
      <div className={styles.accordion} onClick={()=>setIsOpen(!isOpen)}>
        <h3 className={styles.filter_title}>{props.heading}</h3>
        {isOpen?<FaMinus />:<FaPlus />}
        </div>
      <div className={styles.panel}>
        {props.children}
      </div>
    </div>
  );
}

export default Accordation;
