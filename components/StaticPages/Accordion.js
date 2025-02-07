import React, { useState } from 'react';
import styles from './Faq.module.scss'; 

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${styles.accordion_item} ${isActive && styles.active}`}>
      <button id="accordion-button-1" onClick={() => setIsActive(!isActive)}>
      <div className='flex md:block'>
        <span className={`${styles.accordion_title} `}>
          {title}
          </span>
      <span className={`${styles.icon} `} aria-hidden="true">
        {isActive ? '-' : '+'}</span>
      </div>
        </button>
      <div className={styles.accordion_content}>
      {isActive &&<p>{content}</p>}
      </div>
    </div>
  );
};

export default Accordion;