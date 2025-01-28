import Header from "./Header/Header";
import FooterBuy from "./Footer/FooterBuy";
import ScrollTopArrow from "./ScrollTopArrow/ScrollTopArrow";
import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetAllModelsQuery } from "@/store/apiServices/apiServices";



function LayoutBuy(props) { 


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
      <FooterBuy />
      <ScrollTopArrow/>
    </>
  );
}

export default LayoutBuy;
