import { useDispatch, useSelector } from "react-redux";
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import styles from "./CarInfoContent.module.css";
import { FaTachometerAlt,FaTint,FaUserTie,FaMapMarkerAlt,FaRegCalendarAlt,FaRegHeart,FaHeart } from "react-icons/fa";
import Checkbox from "@/components/UI/Checkbox";

function CarInfoContent(props) {
 
  const shortlistedCars = useSelector(state=>state.userInterestedCars.shortlistedCars);
  const comparedCars = useSelector(state=>state.userInterestedCars.comparedCars);

  const dispatch = useDispatch();

function toggleShortlistedCars(e,carId){

  (shortlistedCars.length > 19 && !shortlistedCars.includes(carId)) ?  alert("You can shortlist only 20 cars at a time") :  dispatch(userInterestedCarsActions.toggleShortlistedCars(carId));
   
  e.stopPropagation();
}  

function toggleComparedCars(e,carId){

  (comparedCars.length > 1 && !comparedCars.includes(carId)) ?  alert("You can compare only 2 cars at a time") :  dispatch(userInterestedCarsActions.toggleComparedCars(carId));
  
  e.stopPropagation();

} 

const date =   new Date(props.carInfo.createDate);
const postDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

function numDifferentiation(val) {
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2);
    if(parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length-3);
    val = val + ' Crore';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2);
    if(parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length-3);
    val = val + ' Lakh';
  }  
  return val;
}

new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(80000)

let expectedPrice;

if(props.carInfo.expectedPrice >= 100000){
   expectedPrice = numDifferentiation(props.carInfo.expectedPrice);
}
else{
   expectedPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props.carInfo.expectedPrice);
}
  return (
    <div className={`${styles.card_body} ${props.carInfo.isSold?styles.card_body_sold:""}`} onClick={props.onClick}>



      <div className={`${styles.ad_detail}`}>
      <h4
          className={styles.ad_title}
        >{props.carInfo.modelYear}
         <span className={styles.dot_seperator}></span>
          {props.carInfo.brand} {props.carInfo.modelName}
           </h4> 

        <div className={styles.ad_actions}> 
          <div            
            className={`addto_shortlisted_cars ${styles.shortlist} ${
              shortlistedCars.includes(props.carInfo.carId) ? styles.active : ""
            }`}
            onClick={(e) => toggleShortlistedCars(e, props.carInfo.carId)}
          >
            <i className={styles.icon}>
              {shortlistedCars.includes(props.carInfo.carId) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </i>
          </div>
        </div>
      </div>

      <div className={styles.ad_price}>
          <span className={styles.currency}>₹</span>
          <span className={styles.price}>{expectedPrice}</span>
        </div>

      <div className={`${styles.ad_detail} ${styles.ad_detail_multi}`}>
        <span>         
          {props.carInfo.totalDriven} km
        </span>

        {props.carInfo.transmission &&
          <>
          <span className={styles.dot_seperator}></span>
        <span>          
          {props.carInfo.transmission}
        </span>
          </>
        }

        
        {props.carInfo.fuelType &&
        <>
        <span className={styles.dot_seperator}></span>
          <span>            
            {props.carInfo.fuelType}
          </span>     
        </>     
        }
      </div>
    
    </div>
  );
}
export default CarInfoContent;
