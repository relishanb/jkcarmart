import Card from "@/components/UI/Card";
import CarImagesSwiper from "./CarImagesSwiper";
import styles from "./CarInfo.module.css";
import CarInfoContent from "./CarInfoContent";
import { useRouter } from "next/router";
import { useUpdateAdViewsMutation } from "@/store/apiServices/apiServices";
import { FaRegEye } from "react-icons/fa";
import CarImagesSwiperHome from "./CarImageSwiperHome";

function CarInfo(props) {

  const [UpdateAdView] = useUpdateAdViewsMutation();

  const route = useRouter();

function viewCarDetails(){

  const visitorViewedCars = localStorage.getItem("visitorViewedCars") ? JSON.parse(localStorage.getItem("visitorViewedCars")) : [];

  // console.log("visitorViewedCars");
  // console.log(visitorViewedCars);

  if(!visitorViewedCars.includes(props.carInfo.carId)){
    UpdateAdView(props.carInfo.carId);
    const updatedVisitorViewedCars = [...visitorViewedCars, props.carInfo.carId];
    localStorage.setItem("visitorViewedCars", JSON.stringify(updatedVisitorViewedCars));
  }

  route.push(`/car/details/${props.carInfo.carId}`);

  // UpdateAdView(props.carInfo.carId);
  // route.push(`/car/details/${props.carInfo.carId}`);
};

  return (
    <div className={`${styles.ad_details} ${props.width=="Full"?styles.full_width:""}`}>
      <Card className={`border shadow-lg ${styles.ad_details_card} ${props.carInfo.isSold?styles.ad_details_card_sold:""}`}>

      {props.carInfo.isSold && <><div className={styles.sold_overlay}></div> <div className={styles.sold}>SOLD</div></>}

        <div className={styles.ad_image}>

        
        
        <div className={`${styles.ad_views} ad_views`}>
          <i className={`${styles.icon} px-1`}>
            <FaRegEye />
          </i>{" "}
          {props.carInfo.totalViews > 0 ? props.carInfo.totalViews : 0}
        </div>   
      
       { <CarImagesSwiperHome images={props.carInfo.carImagesList} carId={props.carInfo.carId} onImageClick="ViewCarDetails" viewCarDetails={viewCarDetails} />}
        </div>

<CarInfoContent carInfo={props.carInfo} onClick={viewCarDetails} />
      
      </Card>
    </div>
  );
}
export default CarInfo;
