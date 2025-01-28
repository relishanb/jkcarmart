import React from "react";
import styles from './UserPanel.module.scss';
import EditPostedAd from "./EditPostedAd";

import CarsShortlistedInner from "../Cars/CarsShortlisted/CarsShortlistedInner";

const Favourite = () => {
  return(
<CarsShortlistedInner />
    // <div className="">
    //   <h3 className={styles.title}>Favourite</h3>
    //   <EditPostedAd />
    // </div>
  )
 }
 export default Favourite;