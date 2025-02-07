import {
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'
import { userInterestedCarsActions } from "@/store/userInterestedCars";
import CarImagesSwiper from "./CarImagesSwiper";
import CarAdsSwiper from "./CarAdsSwiper";
import styles from "./CarInfoDetailed.module.scss";
import { useUpdateSellerViewsMutation } from "@/store/apiServices/apiServices";
import { FaUserTie, FaRegEnvelope, FaPhoneAlt, FaRegEye, FaRegHeart, FaHeart, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useGetAdDetailsByCarIdQuery, useGetAdsQuery } from "@/store/apiServices/apiServices";
import { Dot, LocationIcon, LocationIconJK, PhoneIcon, PhoneIcon2 } from "@/components/Layout/Icons/Icons";
import SellingPrice from "./sellingPrice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ContactModal from './ContactModal';
import Popover from '@/components/UI/UIcomponents/Popover';
import EmiCalculator from '@/components/Emicalculator/EmicalculatorTwo';
import Button from '@/components/UI/UIcomponents/Button';
import Modal from '@/components/UI/UIcomponents/Modal';
import LoanEligibility from './LoanEligibility';
import AddSideSection from './AddSideSection';
import { IoShareSocialOutline } from 'react-icons/io5';

function CarInfoDetailed(props) {

    const [showContactModal, setShowContactModal] = useState(false);
    const [showEligibilityModal, setShowEligibilityModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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

    const [showContactInfo, setShowContactInfo] = useState(false);

    const [UpdateSellerView, response] = useUpdateSellerViewsMutation();

    console.log("useUpdateSellerViewsMutation response", response);

    const handleContactSellerClick = (userId) => {
        setShowContactInfo(true);
        UpdateSellerView(userId);
    };

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

    const { data: carDetails, status } = useGetAdDetailsByCarIdQuery(props.id);

    let carInfo;
    if (carDetails) carInfo = { brand: carDetails.brandName, carId: carDetails.car_ID, variant: carDetails.variantName, ...carDetails };

    const filterProperties = `ci.car_ID != ${props.id}`;

    const { data: allSimilarCars } = useGetAdsQuery({
        filterList: [
            {
                "propertyName": filterProperties,
                "propertyVal": "",
                "operator": "",
                "conjuction": ""
            }
        ],
        paging: {
            "pageNumber": 1,
            "pageLines": 20
        },
        sortList: [
            {
                "propertyName": "salecity",
                "sortType": "asc"
            }
        ]
    });

    const handleOpenEligibilityModal = () => {
        setShowEligibilityModal(true);
    }

    const handleCloseEligibilityModal = () => {
        setShowEligibilityModal(false);
        setName('');
        setEmail('');
        setPhoneNumber('');
    }


    const handleCheckEligibility = () => {
        console.log("name", name);
        console.log("email", email);
        console.log("phoneNumber", phoneNumber);
        alert("Check loan eligibility is not implemented, data is logged in console, and close button is clicked automatically !!!");
        handleCloseEligibilityModal();
    };


    return (
        status == "fulfilled" && carInfo && allSimilarCars &&
        <div className={styles.carDetailedPage}>
            <section className="first_section mt-32">
                <div className="container">
                    <div className={styles.car_details}>
                        <div className="row">
                            <div className={`col-lg-8 ${styles.carImages}`}>
                                {/* views over carImagesSwiper */}
                                <div className={styles.ad_views}>
                                    <i className={styles.icon}>
                                        <FaRegEye />
                                    </i>{" "}
                                    {carInfo.totalViews > 0 ? carInfo.totalViews : 0}
                                </div>
                                <CarImagesSwiper images={carInfo.carImagesList} carId={carInfo.carId}  />
                                <div className={styles.carDetails}>

                                    {/* Right side car details section mobile view*/}
                                    <div className={`${styles.card1} ${styles.seller_details} ${styles.hide_desktop} relative`}>
                                        <div className="flex flex-col">
                                            {/* 1st line */}
                                            <div className="flex flex-wrap items-center space-x-2 text-lg">
                                                <span>{carInfo.modelYear}</span>
                                                <span className="text-gray-500 mx-1">
                                                    <Dot />
                                                </span>
                                                <span>{carInfo.brand}</span>
                                                <span className="text-gray-500 mx-1">
                                                    <Dot />
                                                </span>
                                                <span>{carInfo.modelName}</span>
                                            </div>

                                            {/* 2nd and 3rd line */}
                                            <ul className="space-y-2 text-lg text-gray-500">
                                                {/* 2nd line */}
                                                <li className="flex items-center space-x-2">
                                                    <span>{carInfo.totalDriven} km</span>
                                                    <span className="text-gray-500 mx-1">
                                                        <Dot />
                                                    </span>
                                                    <span>{carInfo.fuelType}</span>
                                                    <span className="text-gray-500 mx-1">
                                                        <Dot />
                                                    </span>
                                                    <span>{carInfo.transmission}</span>
                                                </li>

                                                {/* 3rd line */}
                                                <li className="flex items-center space-x-1">
                                                    <i className="text-gray-600">
                                                        <LocationIconJK />
                                                    </i>
                                                    <span>{carInfo.districtName}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={styles.carDetails1}>
                                        <span className={`${styles.hide_desktop}`}>
                                            <SellingPrice carInfo={carInfo} />
                                        </span>
                                        {/* Left side car details section */}
                                        <h2 className="font-semibold text-xl">Car Details</h2>
                                        <div className={styles.table_outer}>
                                            <div className={`${styles.table} mb-0 md:mb-10`} >
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Brand </span>
                                                    <span className={styles.carName}>{carInfo.brand}</span>
                                                </div>

                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Model </span>
                                                    <span className={styles.carName}>{carInfo.modelName}</span>
                                                </div>


                                                <div className={`${styles.tableRow} ${styles.tableRow_double}`}>
                                                    <span className={styles.Brand}>Variant </span>
                                                    <span className={styles.carName}>{carInfo.variant}</span>
                                                </div>
                                            </div>

                                            <div className={styles.table}>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Regn. Year </span>
                                                    <span className={styles.carName}>{carInfo.modelYear}</span>
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Color</span>
                                                    {carInfo.colorName && carInfo.colorName != "" ? <span className={styles.carName}>{carInfo.colorName}</span> : <span className={styles.carName}>N/A</span>}
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Transmission </span>
                                                    {carInfo.transmission && carInfo.transmission != "" ? <span className={styles.carName}>{carInfo.transmission}</span> : <span className={styles.carName}>N/A</span>}
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Kms Driven </span>
                                                    <span className={styles.carName}>{carInfo.totalDriven}</span>
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Fuel Type </span>
                                                    {carInfo.fuelType && carInfo.fuelType != "" ? <span className={styles.carName}>{carInfo.fuelType}</span> : <span className={styles.carName}>N/A</span>}
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Seats </span>
                                                    {carInfo.seater && carInfo.seater != "" && carInfo.seater > 0 ? <span className={styles.carName}>{carInfo.seater}</span> : <span className={styles.carName}>N/A</span>}
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Owner Type </span>
                                                    <span className={styles.carName}>{carInfo.ownerType}</span>
                                                </div>
                                                <div className={styles.tableRow}>
                                                    <span className={styles.Brand}>Body Type </span>
                                                    {carInfo.bodyType && carInfo.bodyType != "" ? <span className={styles.carName}>{carInfo.bodyType}</span> : <span className={styles.carName}>N/A</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                {/* Right side car details section */}
                                <div className={`${styles.card1} ${styles.seller_details} ${styles.hide_mobile} relative`}>
                                    <div className="flex flex-col">
                                        {/* 1st line */}
                                        <div className="flex flex-wrap items-center space-x-2 text-lg">
                                            <span>{carInfo.modelYear}</span>
                                            <span className="text-gray-500 mx-1">
                                                <Dot />
                                            </span>
                                            <span>{carInfo.brand}</span>
                                            <span className="text-gray-500 mx-1">
                                                <Dot />
                                            </span>
                                            <span>{carInfo.modelName}</span>
                                        </div>

                                        {/* 2nd and 3rd line */}
                                        <ul className="space-y-2 text-lg text-gray-500">
                                            {/* 2nd line */}
                                            <li className="flex items-center space-x-2">
                                                <span>{carInfo.totalDriven} km</span>
                                                <span className="text-gray-500 mx-1">
                                                    <Dot />
                                                </span>
                                                <span>{carInfo.fuelType}</span>
                                                <span className="text-gray-500 mx-1">
                                                    <Dot />
                                                </span>
                                                <span>{carInfo.transmission}</span>
                                            </li>

                                            {/* 3rd line */}
                                            <li className="flex items-center space-x-1">
                                                <i className="text-gray-600">
                                                    <LocationIconJK />
                                                </i>
                                                <span>{carInfo.districtName}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Share and Wishlist Icons */}
                                    <div className="absolute top-4 right-5 flex items-center gap-4">
                                        <div>
                                            <WhatsappShareButton
                                                url={`https://www.jkcarmart.com/car/details/${props.carInfo.car_ID}`}
                                                title={`${props.carInfo.brandName} ${props.carInfo.modelName} | ${props.carInfo.modelYear} | ${props.carInfo.totalDriven}kms | ₹${props.carInfo.carExpectedPrice}`}
                                                separator=" : "
                                            >
                                                <FaWhatsapp round className="text-2xl text-gray-400 hover:text-black mt-1 social_share_car" id="social_share_car_whatsapp" />
                                            </WhatsappShareButton>
                                        </div>

                                        <div className={`${styles.ad_detail} flex items-center`}>
                                            <div className={`${styles.wishlistCont} flex items-center`}>
                                                <div className={`${styles.ad_actions}`}>
                                                    {props.carInfo.isSold ? (
                                                        <div className="bg-red-500 text-white px-2 py-1 rounded">SOLD</div>
                                                    ) : (
                                                        <div
                                                            className={`addto_shortlisted_cars ${styles.shortlist} ${shortlistedCars.includes(props.carInfo.carId) ? styles.active : ""
                                                                } cursor-pointer`}
                                                            onClick={(e) => toggleShortlistedCars(e, props.carInfo.carId)}
                                                        >
                                                            {shortlistedCars.includes(props.carInfo.carId) ? (
                                                                <FaHeart className="text-orange-500 text-2xl" />
                                                            ) : (
                                                                <FaRegHeart className="text-gray-400 text-2xl hover:text-black" />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className={styles.hide_mobile}>
                                    <SellingPrice carInfo={carInfo} />
                                </span>
                                <LoanEligibility carId={carInfo.carId} />
                                {/* <AddSideSection/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* View similar cars section */}
            <section className="similar_Cars">
                <div className={styles.similarCars}>
                    <div className="container">
                        <div className="sec-heading">
                            <h2 className='font-bold text-md md:pb-5'>View Similar Cars</h2>
                        </div>
                        <CarAdsSwiper carAdsList={allSimilarCars} />

                    </div>
                    <div>
                        <Link href="/car/cars" className={styles.ViewButton}>View other cars</Link>
                    </div>
                </div>
            </section>

            {/* bottom banner */}
            <section className="bg_color">
                <div className="flex justify-center">
                    <div className={styles.sellYourCarAd}>
                        <div className={styles.sellYourCarSection}>
                            <div className={styles.section1}>
                                <span className={styles.headingText}>Sell your car your way</span>
                                <span className={`${styles.otherText1} ${styles.hide_desktop} `}>
                                    Get started with your free car listing. Choose your price and showcase your car hassle-free.
                                </span>
                                <span className={`${styles.otherText} ${styles.hide_mobile}`}>
                                    Get started with your free car listing. Choose
                                    <br />
                                    your price and showcase your car hassle-free.
                                </span>
                                <span>
                                    <Link href="/car/sell" className={styles.BrowseButton}>
                                        Sell your cars
                                    </Link>
                                </span>
                            </div>
                            <div className={styles.BannerSellCarImg}>
                                <img src="/vector/BannerSellCar.png" alt="BannerSellCar" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Static Contact Mobile View */}
            <div className={`${styles.static_section} ${styles.hide_desktop}`}>
                <div className={styles.ad_detail}>
                    <div className={styles.wishlistCont}>
                        <div className={styles.ad_actions}>
                            {props.carInfo.isSold ? <div className={styles.sold}>SOLD</div> :
                                <div
                                    className={`${styles.shortlist} ${shortlistedCars.includes(props.carInfo.carId) ? styles.active : ""
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
                            }
                        </div>
                        <span>Wishlist</span>
                    </div>
                </div>


                <div>
                    {showContactModal && (
                        <ContactModal onClose={() => setShowContactModal(false)} contactInfo={props.carInfo} />
                    )}

                    {!showContactModal ? (
                        <button
                            className={styles.contactSeller}
                            onClick={() => setShowContactModal(true)}
                        >
                            <span className={styles.phone_icon}><PhoneIcon2 /></span><span className={styles.ContactSeller}> Contact Seller</span>
                        </button>
                    ) : null}
                </div>


            </div>
        </div>
    );
}

export default CarInfoDetailed;