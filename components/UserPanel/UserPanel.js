import React, {useState,useEffect} from "react";
import styles from './UserPanel.module.scss'
import {TabsData} from './TabsData';
import PostedAds from "./PostedAds";
import Favourite from "./Favourite";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import SetPassword from "./SetPassword";
import SellCarInner from "../Cars/SellCar/SellCarInner";
import EditPostedAd from "./EditPostedAd";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "@/store/authentication";
import { useRouter } from "next/router";

const UserPanel = () => {

const activeScreenValues = useSelector(state => state.userPanel.activeScreen);

const [activeIndex, setActiveIndex] = useState(activeScreenValues);

useEffect(()=>{
  setActiveIndex(activeScreenValues);
},[activeScreenValues]);

const route  = useRouter();

const dispatch = useDispatch();

  const handleClick = (data) => {
    if(data.id!="Logout"){
      setActiveIndex(data);
    }
    else{
      dispatch(authenticationActions.loggout());
      route.push("/");
    }    
  };

  const [carId,setCarId] = useState("");
 
  function editAd(car){
    setCarId(car);
    setActiveIndex({id:"EditAd",text:"Edit Ad"});
   }

  const [isOpen, setIsOpen] = useState(false);
    return (
     <>
      <section className={`first_section ${styles.dashboard_area} mt-32`}>
        <div className='container'>

        <div className="sec-heading px-1 md:px-0">
          <h2>
          {activeIndex.text}
          </h2>
        </div>

          <div className='row'>
           
            <div className={` col-md-3 ${styles.col_tabs}`}>

            <button className={`${styles.close_tabs} ${isOpen ? 'show' : 'hide'}`} onClick={() => setIsOpen(false)}>&times;</button>
            
              <div className={styles.tabs}>
              <ul className={`${styles.nav_tabs} `}>
                {TabsData.map(({id, icon, text},index) => ( 
                <li key={index} onClick={() => {
                  handleClick({id,text});                                   
                }}>
                      <span className={`${styles.nav_link} ${activeIndex.id == id ? "active" : ""}`}>
                        {icon} {text}
                      </span>                      
                </li>
                ))}
              </ul>
              </div>
              
              </div>
              <div className={`col-md-9 ${styles.mob_width}`}>
              <div className={styles.tabs_right}>
                  <div className={` ${styles.panel} ${styles.posted_ads}`}>
                    {activeIndex.id=="PostedAds" && <PostedAds onEdit={editAd} />}
                    {activeIndex.id=="PostAd" && <SellCarInner page="UserPanelPostAd" setActiveIndex={setActiveIndex} />}
                    {activeIndex.id=="EditAd" && <EditPostedAd id={carId} />}
                    {activeIndex.id=="FavouriteAds" && <Favourite />}
                    {activeIndex.id=="EditProfile" && <Profile />}
                    {activeIndex.id=="SetPassword" && <SetPassword />}
                    {activeIndex.id=="ChangePassword" && <ChangePassword />}
                  </div>
              </div>
              </div>
            </div>
            </div>
      </section>
      </>
    );
  };
  
  export default UserPanel;