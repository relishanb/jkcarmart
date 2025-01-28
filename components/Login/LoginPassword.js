import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import PrimaryButton from "../UI/PrimaryButton";
import styles from "./Login.module.scss"
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

function LoginPassword() {

  const route = useRouter();

  const [password,setPassword] = useState("");

  function updatePasswordValue(e){
    setPassword(e.target.value);
    };


  const dispatch = useDispatch();

function updatePassword(){
dispatch(authenticationActions.updatePassword(password));
route.push("/userpanel");
}

function showOTPScreen(){
  dispatch(authenticationActions.changeScreen("OTPVerification"))
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
            <h3 className={styles.title}>Set <span>or</span> Enter Password</h3>
          <p className={styles.sub_title}>Please enter password to continue</p>
            </div>
          
            <input              
              type="text"              
              className={styles.form_control}
              placeholder="Enter Password"   
              value={password}           
              onChange={updatePasswordValue}
              maxLength="10"
              autoFocus
            />

          <div className={`form_action ${styles.form_action}`}>
            <PrimaryButton disabled={password.length < 5} onClick={updatePassword}>Submit</PrimaryButton>
          </div>

          <div className={styles.alternateMode} onClick={showOTPScreen}>
having trouble with password? <span>continue with OTP</span>
</div>

        </div>
      </div>
    </div>
  );
}

export default LoginPassword;
