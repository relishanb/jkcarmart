// SkeletonLoading.js

import React from 'react';
import styles from './SkeletonLoading.module.scss';

const SkeletonLoading = () => {
  return (
    <div className={styles.skeletonLoading}>
      <div className={styles.header}></div>
      <div className={styles.content}></div>
      <div className={styles.content}></div>
      <div className={styles.content}></div>
    </div>
  );
};

export default SkeletonLoading;
