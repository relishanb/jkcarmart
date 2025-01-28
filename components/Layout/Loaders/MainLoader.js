import React from 'react'
import styles from "./MainLoader.module.scss";
const MainLoader = () => {
  return (
    <div className={styles.main}>
        <span>
            <img src="/loader/CarLoader.gif" alt="" />
        </span>
    </div>
  )
}

export default MainLoader