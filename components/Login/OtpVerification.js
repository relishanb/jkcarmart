import OtpInput from "./OtpInput";


import { useSelector, useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";

import PrimaryButton from "../UI/PrimaryButton";
import styles from "./Login.module.scss"
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useGetLoginDetailsQuery, useAddUserAfterValidOTPMutation } from "@/store/apiServices/apiServices";

function OtpVerification() {




  const [resendOTPClicked, setResendOTPClicked] = useState(false);

  const mobileNumber = useSelector(state => state.authentication.mobileNumber);

  const { data: userDetails, refetch: refetchUserDetails } = useGetLoginDetailsQuery(mobileNumber);


  //const {data:userDetailsVerified,refetch:refetchUserDetailsVerified} = useUpdateUserAfterValidOTPMutation(mobileNumber);
  const [addUserAfterValidOTPMutation, response] = useAddUserAfterValidOTPMutation();


  // console.log("response");
  // console.log(response);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(authenticationActions.verifyOTP({ userId: response.data.userid }));
      // route.push("/userpanel");
    }
  }, [response])



  const otpGenerated = userDetails?.otp;
  //console.log(`OTP Generated ${otpGenerated}`)

  useEffect(() => {
    //console.log("effect");
    refetchUserDetails();
  }, [resendOTPClicked]);

  //const otpGenerated = "1234";

  const route = useRouter();

  const [isVerifyOTPButtonDisabled, setIsVerifyOTPButtonDisabled] = useState(true);
  const [isOTPValid, setIsOTPValid] = useState(true);

  const dispatch = useDispatch();

  function verifyOTP() {
    const otpInputs = document.getElementsByClassName("otp_input");
    let otpEntered = [...otpInputs].map(element => element.value);
    otpEntered = otpEntered.join("");

    if (otpGenerated == otpEntered) {
      setIsOTPValid(true);
      addUserAfterValidOTPMutation(mobileNumber);

    } else {
      setIsOTPValid(false)
    }
  }

  function showPasswordScreen() {
    dispatch(authenticationActions.changeScreen("LoginPassword"))
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
            <h3 className={styles.title}>OTP Verification</h3>
            <p className={styles.sub_title}>
              Please enter the 4-digit code sent to your mobile
            </p>
          </div>

          <OtpInput isOTPValid={isOTPValid} setIsOTPValid={setIsOTPValid} setIsVerifyOTPButtonDisabled={setIsVerifyOTPButtonDisabled} setResendOTPClicked={setResendOTPClicked} />

          <div className={`form_action ${styles.form_action}`}>
            <PrimaryButton disabled={isVerifyOTPButtonDisabled} onClick={verifyOTP}>Verify OTP</PrimaryButton>
          </div>

          {/* <div className={styles.alternateMode} onClick={showPasswordScreen}>
having trouble with OTP? <span>continue with password</span>
</div> */}

        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
