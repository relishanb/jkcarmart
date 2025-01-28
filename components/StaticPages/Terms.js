import React from 'react';
import { TermsData } from './TermsData';
import styles from './Terms.module.scss';

const Terms = () => {

 

    
   return (
        <div className={styles.terms_area}>
            <div className='container'>

            <div className="sec-heading">
          <h2>
          Terms <span>&amp;</span>  Conditions
          </h2>
        </div>

        <div>
        Welcome to JK CARMART! By accessing and using our platform, you agree to comply with the following terms and conditions which govern the use of our services. Please read these terms carefully before using our website.
        </div>

        <div className={styles.lists}>
                    <ol>

                    <li>
                   <span>Acceptance of Terms</span>
                   By accessing or using JK CARMART, you agree to be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our platform.
                    </li>

                    <li>
                    <span>Description of Service</span>
                    JK CARMART is a platform that facilitates the direct buying and selling of used J&amp;K Registered cars. We provide a free access service, connecting buyers and sellers without any intermediaries.
                    </li>

                    <li>
                    <span>User Responsibilities</span>
                    <ul className={styles.innerList}>
                      <li>You must be at least 18 years old to use our services.</li>
                      <li>You agree to provide accurate and up-to-date information while using our platform.</li>
                      <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                      <li>You are solely responsible for any activity that occurs under your account.</li>
                    </ul>
                    </li>

                    <li>
                    <span>Listing and Selling</span>
                    <ul className={styles.innerList}>
                      <li>When listing a car for sale, you must provide accurate and detailed information about the vehicle's condition and specifications.</li>
                      <li>You must have legal ownership of the car you are selling and ensure it is free from any liens or encumbrances.</li>
                      <li>JK CARMART reserves the right to remove any listings that violate our policies or contain false information.</li>                     
                    </ul>
                    </li>

                    <li>
                    <span>Buying</span>
                    <ul className={styles.innerList}>
                      <li>When purchasing a car through our platform, it is your responsibility to thoroughly inspect the vehicle and verify all details before making a decision</li>
                      <li>JK CARMART is not involved in the transaction between buyers and sellers and does not guarantee the condition or authenticity of any car listed on our platform.</li>                                           
                    </ul>
                    </li>                   

                    <li>
                    <span>Prohibited Activities</span>
                    <ul className={styles.innerList}>
                      <li>Users are strictly prohibited from engaging in fraudulent, illegal, or deceptive activities on our platform.</li>
                      <li>You may not use automated systems or software to access or interact with JK CARMART without our explicit consent.</li>                                           
                    </ul>
                    </li>

                    <li>
                    <span>Intellectual Property</span>
                    <ul className={styles.innerList}>
                      <li>All content and materials on JK CARMART, including logos, images, and text, are the property of JK CARMART and are protected by intellectual property laws.</li>
                      <li>You may not reproduce, modify, or distribute any content from our platform without our prior written consent.</li>                                           
                    </ul>
                    </li>

                    <li>
                    <span>Disclaimer of Warranties</span>
                    <ul className={styles.innerList}>
                      <li>JK CARMART provides its services on an "as-is" and "as-available" basis. We do not guarantee the accuracy, completeness, or reliability of any information on our platform.</li>
                      <li>JK CARMART disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>                                           
                    </ul>
                    </li>

                    <li>
                    <span>Limitation of Liability</span>
                    <ul className={styles.innerList}>
                      <li>JK CARMART shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our platform.</li>                                                             
                    </ul>
                    </li>

                    <li>
                    <span>Modification of Terms</span>
                    <ul className={styles.innerList}>
                      <li>JK CARMART reserves the right to modify these terms and conditions at any time without prior notice. Any changes will be effective upon posting on our website.</li>                                                          
                    </ul>
                    </li>

                    <li>
                    <span>Governing Law</span>
                    <ul className={styles.innerList}>
                      <li>These terms and conditions shall be governed by and construed in accordance with the laws of the Jammu and Kashmir region.</li>                                                         
                    </ul>
                    </li>

              </ol>
              </div>

              <div>
              By using JK CARMART, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you have any questions or concerns, please contact our support team. Happy car buying and selling!
              </div>

            </div>
        </div>
        );
  }
export default Terms