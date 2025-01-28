import ResendOtp from "./ResendOtp";
import { useRef, useState } from "react";
import styles from "./OtpInput.module.css";

function OtpInput(props){

    const [otpValue,setOTPValue] = useState(["","","",""]);

    const otp_input_1 = useRef();
    const otp_input_2 = useRef();
    const otp_input_3 = useRef();
    const otp_input_4 = useRef();

    function updateOTPValue(e,inputIndex){ 
     
      
        let newOTPValue = otpValue;
        newOTPValue[inputIndex] = e.target.value;
        setOTPValue(prevState=>{
          let newOTPValue = prevState;
          newOTPValue[inputIndex] = e.target.value;
          return [...newOTPValue];
        });
      
        switch (inputIndex) {
          case 0:
            otp_input_2.current.focus();
            break;
          case 1:
            otp_input_3.current.focus();
            break;
          case 2:
            otp_input_4.current.focus();
            break;
        }
      
        const otpInputs = document.getElementsByClassName("otp_input");
        const otp = [...otpInputs].map(element=>element.value);
        otp.join("").length == 4 ? props.setIsVerifyOTPButtonDisabled(false) : props.setIsVerifyOTPButtonDisabled(true);
      
      }

      function resendOTP(){    
        setOTPValue(["","","",""]);
        props.setIsOTPValid(true);
        props.setIsVerifyOTPButtonDisabled(true);
        otp_input_1.current.focus();
        props.setResendOTPClicked(true);
      }

return(<>
<div className="otp_input_group">
            <input value={otpValue[0]} ref={otp_input_1} onChange={(e)=>updateOTPValue(e,0)} className="otp_input" type="text" maxLength="1" autoFocus  />
            <input value={otpValue[1]} ref={otp_input_2} onChange={(e)=>updateOTPValue(e,1)} className="otp_input" type="text" maxLength="1"  />
            <input value={otpValue[2]} ref={otp_input_3} onChange={(e)=>updateOTPValue(e,2)} className="otp_input" type="text" maxLength="1"  />
            <input value={otpValue[3]} ref={otp_input_4} onChange={(e)=>updateOTPValue(e,3)} className="otp_input" type="text" maxLength="1"  />
          </div>

          {!props.isOTPValid && <div className={styles.form_error}>Please enter a valid OTP</div>}

          <ResendOtp resendOTP={resendOTP}/>
</>)
}
export default OtpInput;