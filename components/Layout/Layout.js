import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollTopArrow from "./ScrollTopArrow/ScrollTopArrow";
import { useDispatch } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetAllModelsQuery } from "@/store/apiServices/apiServices";

function Layout(props) { 
  const {data:AllModels} = useGetAllModelsQuery();
  useEffect(()=>{       
    localStorage.setItem("AllModels", JSON.stringify(AllModels));
  },[AllModels]);
  
  const route  = useRouter();
const dispatch = useDispatch();

useEffect(()=>{
  const userId = localStorage.getItem("userId");  
  userId && dispatch(authenticationActions.fillLoginDetails({userId:userId}));
  if(!userId && props.activePage=="userpanel") route.push("/");

dispatch(userInterestedCarsActions.fillShortlistedCars());
dispatch(userInterestedCarsActions.fillComparedCars());

},[]);
  return (
    <>
      <Header className={props.className} />
      {props.children}
      <Footer />
      <ScrollTopArrow/>
    </>
  );
}

export default Layout;


