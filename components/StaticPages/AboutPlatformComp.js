import React from 'react';
import Image from 'next/image';
import styles from './About.module.scss'


const AboutPlatformComp=(props)=>{
    const {title, content, img} = props;

    return (
      <>
      <div className='col-lg-4'>
                        <div className={styles.service_info}>
                            <div className={styles.icon}>
                                <Image src={img} alt='' />
                            </div>
                            <div className={styles.content}>
                                <h3>{title}</h3>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
      </>
    );
  }
 
export default AboutPlatformComp