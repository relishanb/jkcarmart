import { useDispatch, useSelector } from "react-redux";
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import styles from "./CarInfoContent.module.css";
import { FaTachometerAlt, FaTint, FaUserTie, FaMapMarkerAlt, FaRegCalendarAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { FuelIcon, MeterIcon, PetrolIcon } from "@/components/Layout/Icons/Icons";


function CarInfoContent(props) {

  const shortlistedCars = useSelector(state => state.userInterestedCars.shortlistedCars);
  const comparedCars = useSelector(state => state.userInterestedCars.comparedCars);

  const dispatch = useDispatch();

  function toggleShortlistedCars(e, carId) {

    (shortlistedCars.length > 19 && !shortlistedCars.includes(carId)) ? alert("You can shortlist only 20 cars at a time") : dispatch(userInterestedCarsActions.toggleShortlistedCars(carId));

    e.stopPropagation();
  }

  function toggleComparedCars(e, carId) {

    (comparedCars.length > 1 && !comparedCars.includes(carId)) ? alert("You can compare only 2 cars at a time") : dispatch(userInterestedCarsActions.toggleComparedCars(carId));

    e.stopPropagation();

  }

  const date = new Date(props.carInfo.createDate);
  const postDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  function numDifferentiation(val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2);
      if (parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length - 3);
      val = val + ' Crore';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2);
      if (parseInt(val.slice(-2)) < 1) val = val.substring(0, val.length - 3);
      val = val + ' Lakh';
    }
    return val;
  }

  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(80000)

  let expectedPrice;

  if (props.carInfo.expectedPrice >= 100000) {
    expectedPrice = numDifferentiation(props.carInfo.expectedPrice);
  }
  else {
    expectedPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props.carInfo.expectedPrice);
  }

  const FormatCurrency = (value) => {
    if (!value) return '';
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const Driven = FormatCurrency(props.carInfo.totalDriven);
  return (
    <div className={`${styles.card_body} ${props.carInfo.isSold ? styles.card_body_sold : ""}`} onClick={props.onClick}>



      <div className={`${styles.ad_detail}`}>
        <h4
          className={`${styles.ad_title} font-normal not-italic leading-normal gap-x-[4px] md:font-medium md:leading-6 md:text-lg`}
        >{props.carInfo.modelYear}
          <span className={styles.dot_seperator}></span>
          {props.carInfo.brand}
          <span className={styles.dot_seperator}></span> {props.carInfo.modelName}
        </h4>

        <div className={styles.ad_actions}>
          <div
            className={`addto_shortlisted_cars ${styles.shortlist} ${shortlistedCars.includes(props.carInfo.carId) ? styles.active : ""
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

      <div className={`${styles.ad_price} flex gap-1 md:block text-orange-500 text-[22px] md:text-[20px]`}>
        <span className={`${styles.currency} text-orange-500 md:text-black text-[22px] md:text-[20px] `}>₹</span>
        <span className={`${styles.price} text-orange-500 md:text-black text-[22px] md:text-[20px]`}>{expectedPrice}</span>
      </div>

      <div className={`${styles.ad_detail} ${styles.ad_detail_multi}`}>
        <span className="flex items-center gap-1">
          <MeterIcon />
          {Driven} km
        </span>

        {props.carInfo.fuelType &&
          <>
            <span className={styles.dot_seperator}></span>
            <span className="flex items-center gap-1">
              <PetrolIcon />
              {props.carInfo.fuelType}
            </span>
          </>
        }

        {props.carInfo.transmission &&
          <>
            <span className={styles.dot_seperator}></span>
            <span className="flex items-center gap-1">
              <FuelIcon />
              {props.carInfo.transmission}
            </span>
          </>
        }
      </div>

    </div>
  );
}
export default CarInfoContent;
