import React from 'react';
import styles from './Contact.module.scss';
import { FaEnvelope, FaFax, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';

import PrimaryButton from '../UI/PrimaryButton';

const Contact = () => {
    
   return (
        <div className={styles.contact_area}>
            <div className='container'>

            <div className="sec-heading">
          <h2>
           <span>Contact</span> Us
          </h2>
        </div>


                <div className='row'>
                  <div className='col-lg-12'>                    
                    <div className={styles.contact_info}>
                      <div className={styles.location}>
                        <div className={styles.icon}>
                          <FaMapMarkedAlt />
                        </div>
                        <div className={styles.info}>
                          <span class={styles.title}>Address</span>
                          <p>2nd Floor, Shiva Complex, Opposite Lajwanti Hospital Greater Kailash, Main Highway Jammu - 180010 J&K (India)</p>
                        </div>
                      </div>
                      <div className={styles.location}>
                        <div className={styles.icon}>
                          <FaPhoneAlt />
                        </div>
                        <div className={styles.info}>
                          <span class={styles.title}>Phone</span>
                          <p><a href='tel:01912484817'>0191-2484817</a></p>
                        </div>
                      </div>                    
                      <div className={styles.location}>
                        <div className={styles.icon}>
                          <FaEnvelope />
                        </div>
                        <div className={styles.info}>
                          <span class={styles.title}>Email</span>
                          <p><a href='mailto:support@jkcarmart.com'>support@jkcarmart.com</a></p>
                        </div>
                      </div>
                    </div>

                  </div>


                  {/* <div className='col-lg-7'>                 
                  <form className={styles.contact_form}>
                    <div className={styles.form_group}>
                      <input type='text' name='Name' className={styles.form_control} placeholder='Name' required />
                    </div>
                    <div className={styles.form_group}>
                      <input type='text' name='Email' className={styles.form_control} placeholder='Email' required />
                    </div>
                    <div className={styles.form_group}>
                       <input type='text' name='Phone' className={styles.form_control} placeholder='Mobile Number' required />
                    </div>
                    <div className={styles.form_group}>
                      <textarea name='messgae' className={styles.form_control} rows='12' placeholder='Message'></textarea>
                    </div>
                    <PrimaryButton>Submit</PrimaryButton>
                  </form>
                  </div> */}


              </div>
            </div>
            </div>
        );
  }
export default Contact