import { useGetFakeLoginDetailsQuery } from "@/store/apiServices/apiServices";
import PrimaryButton from "../UI/PrimaryButton";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./FakeLogin.module.css";
import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";

function FakeLogin(){

   const route = useRouter();
   const dispatch  = useDispatch();

    const [mobileNumber,setMobileNumber] = useState();

    console.log(mobileNumber);
    
 const response   = useGetFakeLoginDetailsQuery(mobileNumber, {skip:mobileNumber?false:true});

 useEffect(()=>{
   if(response.isSuccess){
      if(response.data.userid > 0){
         dispatch(authenticationActions.verifyOTP({userId:response.data.userid}));      
         route.push("/userpanel");
      }         
   }    
 },[response])

 //response && console.log(response);

 function login(){
    setMobileNumber(document.getElementById("mobileNumber").value)
 }

 return(
<div className={styles.fake_login_wrapper}>
<div className={styles.fake_login}>
<input
              id="mobileNumber"
              type="tel"
              name="phone"              
              placeholder="Enter Mobile Number"            
              maxLength="10"
              className="form_control"
            />

<PrimaryButton onClick={login}>Login</PrimaryButton>

</div>
</div>

 )

}

export default FakeLogin;