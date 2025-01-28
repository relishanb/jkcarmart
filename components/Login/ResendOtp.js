import { useEffect, useState } from "react";
import styles from "./ResendOtp.module.css";

function ResendOtp(props){
    const [resendOTPClicked,setResendOTPClicked] = useState(0);
    const [resendSeconds, setResendSeconds] = useState(60);
    useEffect(()=>{   
    let seconds = resendSeconds;
    const interval = setInterval(() => {    
      seconds--;    
      if(seconds < 1) clearInterval(interval);
      setResendSeconds(seconds);    
    }, 1000);
    return () => clearInterval(interval);
    },[resendOTPClicked]);

    function resendOtp(){        
        props.resendOTP();
        setResendSeconds(60);
        setResendOTPClicked((prevValue)=>prevValue+1);
    }


return(<div className={styles.otp_resend_cover}><span className={`${styles.otp_resend} ${props.className}`} onClick={resendSeconds<1?resendOtp:(()=>{})}>
    Resend OTP {resendSeconds > 0  ?  <>in <span>{resendSeconds}s</span></> : ""}
    </span></div>)


}
export default ResendOtp;