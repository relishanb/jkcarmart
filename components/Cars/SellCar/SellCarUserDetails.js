import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellCarStepNames, sellCarActions } from "@/store/sellCar";
import { authenticationActions } from "@/store/authentication";
import BlackButton from "@/components/UI/BlackButton";
import { useGetLoginDetailsQuery,useAddUserAfterValidOTPMutation } from "@/store/apiServices/apiServices";

import ResendOtp from "@/components/Login/ResendOtp";

function SellCarUserDetails() {
  const sellCarInfo = useSelector((state) => state.sellCar);

  const name = sellCarInfo.sellCarData[sellCarStepNames.UserDetails][0]?.value.Name;
  const mobileNumber = sellCarInfo.sellCarData[sellCarStepNames.UserDetails][0]?.value.MobileNumber;

  

  const dispatch = useDispatch();

  function updateUserDetails() {
    if(document.getElementById("js_mobile_number").value.length > 10) return;
    const UserDetails = {Name:"Seller", MobileNumber:document.getElementById("js_mobile_number").value};
    dispatch(
      sellCarActions.updateSellCarData({
        step: sellCarInfo.activeStep,
        id:1,
        value: UserDetails,
      })
    );
  }

  const [activeLoginScreen,setActiveLoginScreen] = useState("Get Otp");
  const {data:userDetails, refetch} = useGetLoginDetailsQuery(mobileNumber,{skip:activeLoginScreen=="Get Otp"?true:false});

  // console.log("userDetails");
  // console.log(userDetails);

  const [validMobileNumber,setValidMobileNumber] = useState(true);
  
useEffect(()=>{
  if(mobileNumber && mobileNumber.length == 10) setValidMobileNumber(true);
},[mobileNumber]);

  function getOtp(){   
    if (mobileNumber && mobileNumber.length == 10) {
      setValidMobileNumber(true);
      setActiveLoginScreen("Verify Otp");
    } 
    else{
      setValidMobileNumber(false);
    }
  }

  const [addUserAfterValidOTPMutation,response] = useAddUserAfterValidOTPMutation();
  // console.log("response");
  // console.log(response);
  useEffect(()=>{
    if(response.isSuccess){
      dispatch(authenticationActions.verifyOTP({userId:response.data.userid}));      
    }    
  },[response]);


  const [validOTP,setValidOTP] = useState(true);

  function verifyOtp(){
    const otpEntered = document.getElementById("js_otp").value;
    if(userDetails.otp==otpEntered) {
      //console.log(`otp get : ${userDetails.otp} & otp entered : ${otpEntered}`)
      dispatch(sellCarActions.verifyUser());
      addUserAfterValidOTPMutation(mobileNumber);
      setValidOTP(true);
      setActiveLoginScreen("Otp Success");
    }
    else{
      setValidOTP(false);
    }
    //console.log(`otp get : ${userDetails.otp} & otp entered : ${otpEntered}`)
  }

  function resendOtp(){
    refetch();
  }

  return (
    <>


      {/* <div className="form_group  width_350_px">
        <input
          className="form_control"
          id="js_name"
          placeholder="Your Name"
          value={name?name:""}
          onChange={updateUserDetails}
        />
      </div> */}

{activeLoginScreen=="Get Otp" && 
      <>
      
      <div className="form_group  width_350_px">
        {!validMobileNumber && <div className="form_error">Please Enter Valid Mobile Number</div>}
        <input
          type="number"
          className="form_control"
          id="js_mobile_number"
          placeholder="Enter Mobile Number"
          value={mobileNumber?mobileNumber:""}          
          onChange={updateUserDetails}
        />        
      </div>

      <div className="form_group  width_350_px">
      <BlackButton className="gtmEvent_sellCarStep_getOTP" onClick={getOtp}>Get OTP</BlackButton>        
      </div>
      
      </>
}


{activeLoginScreen=="Verify Otp" && 
     <>
     
     <div className="form_group  width_350_px">
     {!validOTP && <div className="form_error">Please Enter Valid OTP</div>}
        <input
          className="form_control"
          id="js_otp"
          placeholder="Enter OTP"         
          maxLength="10"          
        />

      </div>

      <div className="form_group  width_350_px verify_otp_action">
      <BlackButton className="gtmEvent_sellCarStep_verifyOTP" onClick={verifyOtp}>Verify OTP</BlackButton>    
       <ResendOtp className="gtmEvent_sellCarStep_resendOTP" resendOtp={resendOtp} />
      </div>
     
     </>

}

{activeLoginScreen=="Otp Success" && 
<>
<div className="verify_otp_success">
OTP Verified Successfully
</div>
</>
}

    </>
  );
}
export default SellCarUserDetails;
