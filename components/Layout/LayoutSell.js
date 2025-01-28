import Header from "./Header/Header";
import FooterSell from "./Footer/FooterSell";
import ScrollTopArrow from "./ScrollTopArrow/ScrollTopArrow";
import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetAllModelsQuery } from "@/store/apiServices/apiServices";



function LayoutSell(props) { 


  const {data:AllModels} = useGetAllModelsQuery();
  useEffect(()=>{       
    localStorage.setItem("AllModels", JSON.stringify(AllModels));
  },[AllModels]);
  

  const route  = useRouter();

const dispatch = useDispatch();

useEffect(()=>{
  const userId = localStorage.getItem("userId");  
  //console.log("userId:" + userId)
  userId && dispatch(authenticationActions.fillLoginDetails({userId:userId}));
  if(!userId && props.activePage=="userpanel") route.push("/");

dispatch(userInterestedCarsActions.fillShortlistedCars());
dispatch(userInterestedCarsActions.fillComparedCars());

},[]);





// console.log("isLoggedIn:" + isLoggedIn);
// useEffect(()=>{
//   if(!isLoggedIn) route.push("/");
// },[]);



  return (
    <>
      <Header className={props.className} />
      {props.children}
      <FooterSell />
      <ScrollTopArrow/>
    </>
  );
}

export default LayoutSell;
