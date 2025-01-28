import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import PrimaryButton from "../UI/PrimaryButton";
import styles from "./Login.module.scss"
import { useEffect, useState } from "react";


function LoginForm() {

  const [mobileNumber,setMobileNumber] = useState("");

  function validateMobileNumber(e){
      const pattern = /^[0-9]+$/;
      if(e.target.value.match(pattern) || e.target.value =="") setMobileNumber(e.currentTarget.value);
    };


  const dispatch = useDispatch();

function verifyMobileNumber(){

dispatch(authenticationActions.verifyMobileNumber(mobileNumber));
}

  return (
    <div className={`row ${styles.row}`}>
      <div className={`col-lg-6 ${styles.login_start}`}>

<div className={styles.image_block}>
<img src="/login.png" />
</div>

      </div>
      <div className={`col-lg-6 ${styles.login_form}`}>
        <div>
            <div className={styles.heading}>
            <h3 className={styles.title}>Login <span>or</span> Register</h3>
          <p className={styles.sub_title}>We will send you One Time Password(OTP) via SMS</p>
            </div>
          
            <input
              id="mobileNumber"
              type="tel"
              name="phone"
              className={styles.form_control}
              placeholder="Enter Mobile Number"   
              value={mobileNumber}           
              onChange={validateMobileNumber}
              maxLength="10"
            />

          <div className={`form_action ${styles.form_action}`}>
            <PrimaryButton disabled={mobileNumber.length < 10} onClick={verifyMobileNumber}>Get OTP</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
