import React from 'react';
import { PrivacyData } from './PrivacyData';
import styles from './Terms.module.scss';

const Privacy = () => {

   return (
        <div className={styles.terms_area}>
            <div className='container'>
              
            <div className="sec-heading">
          <h2>
           <span>Privacy</span> Policy
          </h2>
        </div>
        <div className={styles.lists}>
                    <ol className={styles.privacy}>
              {PrivacyData.map(({title, content},index) => (
                  <li key={index}>
                    <span>{title}</span>
                    {content}
                    </li>

              ))}
              </ol>
              </div>

            </div>
        </div>
        );
  }
export default Privacy