import React, { useState } from "react";
import Select from 'react-select';
import styles from './PostedAds.module.scss';
import { FaRegCalendarAlt, FaTachometerAlt, FaMapMarkerAlt, FaRupeeSign, FaPencilAlt, FaRegTrashAlt, FaTint, FaAngleDown, FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import { useGetUserAdsQuery, useUpdateAdIsSoldMutation } from "@/store/apiServices/apiServices";
import CarImagesSwiper from "./CarImagesSwiper";
import { useSelector } from "react-redux";
import Checkbox from "../UI/Checkbox";

const PostedAds = (props) => {
  const [updateAdIsSold, response] = useUpdateAdIsSoldMutation();
  
  function updateCarSold(carId, isSold) {
    updateAdIsSold({ carId, isSold });
  }

  const TabGroup = [
    { title: 'All' },
    { title: 'Pending' },
    { title: 'Approved' }
  ];

  const [postedAdsTabActive, setPostedAdsTabActive] = useState("All");
  const [postedAdsTabsDropdown, setPostedAdsTabsDropdown] = useState(false);

  let userId = useSelector(state => state.authentication.userId);
  userId = parseInt(userId);

  const { data: cars } = useGetUserAdsQuery(userId);

  let UserCars;
  if (postedAdsTabActive === "All") {
    UserCars = cars;
  } else if (postedAdsTabActive === "Pending") {
    UserCars = cars.filter(({ postedCarStatus }) => postedCarStatus === "Pending");
  } else if (postedAdsTabActive === "Approved") {
    UserCars = cars.filter(({ postedCarStatus }) => postedCarStatus === "Approved");
  }

  return (
    <div className={styles.ads_list}>
      <div className={`${styles.pos_relative} ${postedAdsTabsDropdown ? "show" : ""}`}>
        <div className={styles.tabgroup} onClick={() => setPostedAdsTabsDropdown((dropdown) => !dropdown)}>
          <ul className={styles.tab_list} aria-expanded={postedAdsTabsDropdown ? "true" : "false"}>
            <li>
              {TabGroup.map(({ title }, index) => (
                <span
                  key={index}
                  className={`${styles.tab} ${postedAdsTabActive === title ? styles.active : ""}`}
                  onClick={() => setPostedAdsTabActive(title)}
                >
                  {title}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
      
      {UserCars?.map((car, index) => {
        const date = new Date(car.createDate);
        const postDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        return (
          <div key={index} className={styles.ad_container}>
            <div className={styles.ad_status}>
              {(car.postedCarStatus === "Pending" || car.postedCarStatus === "") ? (
                <span className={styles.pending}>{car.postedCarStatus}</span>
              ) : (
                <span className={styles.approved}>{car.postedCarStatus}</span>
              )}
            </div>

            <div className={styles.ad_img}>
              <CarImagesSwiper images={car.carImagesList} carId={car.car_ID} onImageClick="ViewFullImage" />
            </div>

            <div className={styles.ad_detail}>
              <h5 className={styles.ad_title}>
                <Link href={`/car/details/${car.car_ID}`}>
                  {`${car.brandName} ${car.modelName} ${car.variantName}`}
                </Link>
              </h5>
              <div className={styles.ad_detail_multi}>
                <span>
                  <FaRegCalendarAlt />{car.modelYear}
                </span>
                <span>
                  <FaTachometerAlt />{car.totalDriven}
                </span>
                <span>
                  <FaRupeeSign />{car.expectedPrice}
                </span>
              </div>
              <div className={styles.ad_detail_others}>
                <span>{car.ownerType}</span>
                <span>{car.districtName}</span>
              </div>
              <div className={styles.inline_spans}>
                <span className={styles.ad_date}>
                  <span>Posted on</span> {postDate}
                </span>
                <span className={styles.total_views}>
                  <span>Total Views</span> {car.totalViews}
                </span>
              </div>
            </div>

            <div className={styles.ad_actions}>
              <div className={styles.actions}>
                {car.postedCarStatus === "Approved" && (
                  <div className={styles.btn_sold}>
                    <Checkbox
                      id={index}
                      label="Sold"
                      checked={car.isSold ? "checked" : ""}
                      onClick={(e) => updateCarSold(car.car_ID, e.target.checked)}
                    />
                  </div>
                )}
                {car.postedCarStatus === "Pending" ? (
                  <span className={styles.icon} onClick={() => props.onEdit(car.car_ID)}>
                    <FaPencilAlt /> Edit
                  </span>
                ) : (
                  <span title="Cannot Edit Approved Ads" className={`${styles.icon} ${styles.disabled}`}>
                    <FaPencilAlt /> Edit
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostedAds;
