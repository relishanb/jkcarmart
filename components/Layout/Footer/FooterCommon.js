import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "@/store/filters";
import { useRouter } from "next/router";
import { useGetModelsQuery } from "@/store/apiServices/apiServices";
import { authenticationActions } from "@/store/authentication";
import { useEffect, useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";


function FooterCommon() {


  const dispatch = useDispatch();
  const route = useRouter();

  const populatModels = [
    { name: "Alto 800", brandName: "Maruti Suzuki", brandId:1, modelId:5 },
    { name: "Alto k10", brandName: "Maruti Suzuki", brandId:1, modelId:6 },
    { name: "i10", brandName: "Hyundai", brandId:2, modelId:60 },
    { name: "i20", brandName: "Hyundai", brandId:2, modelId:61 }, 
  ];

  const populatBrands = [
    { name: "Maruti Suzuki", id:1 },
    { name: "Hyundai", id:2 },
    { name: "Tata", id:3 },
    { name: "Renault", id:14 }, 
  ];

  const [selectedBrand,setSelectedBrand] = useState();
  const {data:brandModels} = useGetModelsQuery(selectedBrand,{skip:selectedBrand?false:true}); 

  function viewCarsByBrand(brandId,brandName){
    setSelectedBrand([brandId,brandName]);    
  }

  useEffect(()=>{
    if(selectedBrand && brandModels){
      //console.log("brandModels",brandModels);
      dispatch(filterActions.clearAllFilters()); 
      dispatch(filterActions.updateFilterData({filterName:"Brand", brand:selectedBrand[0], brandName:selectedBrand[1], models:brandModels.map(({modelId})=>modelId)}));
      dispatch(filterActions.applyFilter());    
      route.push("/car/cars"); 
    }
  },[selectedBrand,brandModels]);


  function viewCarsByModel(brandId,brandName,modelId){
    dispatch(filterActions.clearAllFilters()); 
    dispatch(filterActions.updateFilterData({filterName:"Model", brand:brandId, brandName:brandName, model:modelId}));
    dispatch(filterActions.applyFilter());    
    route.push("/car/cars"); 
  }









  //For Business Registration

  const authentication = useSelector((state) => state.authentication);

  const [active, setActive] = useState(false);

  const [isOpen, setIsopen] = useState(false);

  function toggleAuthenticationModel(status) {
    dispatch(
      authenticationActions.toggleAuthenticationModel({loginType:"Bussiness Login", isOpen:status == "open" ? true : false})
    );
    isOpen === true ? setIsopen(false) : setIsopen(true);
    setActive(!active);
  }

  return ( 
          <div className="footer_content">


            <div className="footer-section1">
              {/* <div className="footer_widget">
                <h3 className="title">FOLLOW US</h3>
                <ul className="social_share brand-sharing">
                  <li>
                    <a
                      href="https://www.facebook.com/jkcarmart/"
                      target="_blank"
                    >
                      <img src="/icons/facebook.png" alt="Facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/jkcarmart" target="_blank">
                      <img src="/icons/twitter.png" alt="Twitter" />
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="footer_div">
              <div className="footer_logo">
                <Link href="/" ><img src="/logo.png" width="150" /></Link>
            </div>

            <h1 className="section1_heading2">JKCarMart</h1>
            <span >Free platform for buying and selling used cars in Jammu and
Kashmir. Connect directly with sellers no middlemen are involved.</span>
</div>
              {/* <div className="footer_widget">
              <h3 className="title">EXPERIENCE JKCARMART APP</h3>
              <ul className="app_download brand-sharing">
                <li>
                  <a href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1" target="_blank">
                    <div className="mobileapp_container">
                      <img src="/icons/play-store.png" alt="Android" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://apps.apple.com/in/app/jkcarmart/id1629198882" target="_blank">
                    <div className="mobileapp_container">
                      <img src="/icons/apple-store.png" alt="ios" />
                    </div>
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h1 className="section1_heading">Get JKCarmart for free</h1>
              <span>Simply click on below to download Jkcarmart app for IOS and android for free</span>
              <div className="footer_widget">
            
              <ul className="app_download">
                <li>
                  <a id="download_app_ios" href="https://apps.apple.com/in/app/jkcarmart/id1629198882" target="_blank" className="download_app">
                    <div className="mobileapp_container">
                      <img src="/icons/apple_store.png" alt="IOS App" />
                    </div>
                  </a>
                </li>
                <li>
                  <a id="download_app_android" href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1" target="_blank" className="download_app">
                    <div className="mobileapp_container">
                      <img src="/icons/google_play.png" alt="Android App" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            </div>
            </div>



            
            <div className="footer-section2">

            {/* <div className="footer_widget">
                <h3 className="section2">Business Account</h3>
                <ul className="link_list_inline">
                  <li onClick={() => toggleAuthenticationModel("open")}>
                    Login/Register
                  </li>
                </ul>
              </div> */}

            <div>
                <h3 className="section2_heading">Popular Used Cars</h3>
                <ul className="section2_ul">
                {populatModels.map(({name,brandId,brandName,modelId})=>(

<li key={modelId} onClick={()=>viewCarsByModel(brandId,brandName,modelId)}>{name}</li>

      ))} 
                </ul>
              </div>
            <div className="">
         
                <h3 className="section2_heading">Usefull Links</h3>
                <ul className="section2_ul">
                  <li>
                    <Link href="/about">Why JKCarmart</Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ's</Link>
                  </li>
                  {/* <li>
                  <Link href="/contact">Contact Us</Link>
                </li> */}
                  <li>
                    <Link href="/blog">Blogs</Link>
                  </li>
                  <li>
                   <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
             

           
              </div>
            </div>

            <div className="footer-section2">

{/* <div className="footer_widget">
    <h3 className="section2">Business Account</h3>
    <ul className="link_list_inline">
      <li onClick={() => toggleAuthenticationModel("open")}>
        Login/Register
      </li>
    </ul>
  </div> */}

<div>
    <h3 className="section3_heading">Used Cars by Brands</h3>
    <ul className="section2_ul">
      {populatBrands.map(({name,id})=>(

<li key={id} onClick={()=>viewCarsByBrand(id,name)}>{name}</li>

      ))}      
    </ul>
  </div>
<div className="">

    <h3 className="section2_heading">Support</h3>
    <ul className="section2_ul">
      <li>
      <Link className="gtmEvent_emailLink_click" href="mailto: support@jkcarmart.com">
                      {" "}
                      support@jkcarmart.com
                    </Link>
      </li>
      <li>
      <Link className="gtmEvent_phoneLink_click" href="tel: 01912484817"> 0191-2484817</Link>
      </li>
  
    </ul>
 


  </div>
</div>

            
< div className="footer-section3">

{/* <div className="footer_widget">
    <h3 className="section2">Business Account</h3>
    <ul className="link_list_inline">
      <li onClick={() => toggleAuthenticationModel("open")}>
        Login/Register
      </li>
    </ul>
  </div> */}
  <div>
    <h3 className="section3_heading">Services</h3>
    <ul className="section2_ul">
      <li >
        <Link href="/car/cars">Buy Car</Link>
      </li>
      <li >
      <Link href="/car/sell">Sell Car</Link>
      </li>
       <li >
      <Link href="/car/dealers">Dealers</Link>
      </li>

    </ul>
    </div>
    {/* Join Our Channel Section */}


<div className="flex">
  <div>
  {/* Social Media Links Section */}
  <h3 className="section2_heading">Follow us on</h3>
  <div className="footer_widget">
    <ul className="section3_ul">
      <li className="section3_li">
        <a
          href="https://www.facebook.com/jkcarmart"
          target="_blank"
          className="follow_us"
          id="follow_us_facebook"
        >
          <img src="/icons/facebook.svg" alt="Facebook" />
        </a>
      </li>
      <li className="section3_li">
        <a
          href="https://www.instagram.com/jkcarmart"
          target="_blank"
          className="follow_us"
          id="follow_us_instagram"
        >
          <img src="/icons/instagram.svg" alt="Instagram" />
        </a>
      </li>
    </ul>
    <ul className="section3_ul">
      <li className="section3_li">
        <a
          href="https://www.youtube.com/@jkcarmart"
          target="_blank"
          className="follow_us"
          id="follow_us_youtube"
        >
          <img src="/icons/youtube.svg" alt="Youtube" />
        </a>
      </li>
      <li className="section3_li">
        <a
          href="https://twitter.com/jkcarmart"
          target="_blank"
          className="follow_us"
          id="follow_us_twitter"
        >
          <img src="/icons/twitter.svg" alt="Twitter" />
        </a>
      </li>
    </ul>
  </div>
  </div>

  {/* Join Our Channel Section */}
  <div className="footer_widget">
  <h3 className="section2_heading">Join our channel</h3>
    <ul className="section3_ul">
      <li className="section3_li">
        <a
          href="https://t.me/jkcarmart"
          target="_blank"
          className="follow_us flex items-center"
          id="follow_us_telegram"
        >
          <FaTelegramPlane className="text-gray-700 text-2xl" />
          {/* <span>Telegram Channel</span> */}
        </a>
      </li>
      <li className="section3_li">
        <a
          href="https://whatsapp.com/channel/0029Vb2p6uq84OmHVaxWnf2P" // Replace with your WhatsApp number
          target="_blank"
          className="follow_us flex items-center"
          id="follow_us_whatsapp"
        >
          <AiOutlineWhatsApp className="text-gray-700 text-2xl" />
          {/* <span>WhatsApp Channel</span> */}
        </a>
      </li>
    </ul>
  </div>
</div>;

</div>


            
          </div>
  );
}
export default FooterCommon;
