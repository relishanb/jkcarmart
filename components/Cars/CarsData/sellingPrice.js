import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
// import { FiArrowRight } from "react-icons/fi";
import { useUpdateSellerViewsMutation } from "@/store/apiServices/apiServices";
import { EyeIconJK } from "@/components/Layout/Icons/Icons";
import styles from "./sellingPrice.module.scss";
import { EligibilityForm } from "./EligibilityForm";
import EmiCalculatorTwo from "@/components/Emicalculator/EmicalculatorTwo";

function SellingPrice(props) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [UpdateSellerView] = useUpdateSellerViewsMutation();

  const handleContactSellerClick = (userId) => {
    setShowContactInfo(true);
    UpdateSellerView(userId);
  };

  const closeModal = () => {
    setShowModal(false)

  };

  const numDifferentiation = (val) => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Crore`;
    if (val >= 100000) return `${(val / 100000).toFixed(2)} Lakh`;
    return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(val);
  };

  const expectedPrice =
    props.carInfo.expectedPrice >= 100000
      ? numDifferentiation(props.carInfo.expectedPrice)
      : new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(props.carInfo.expectedPrice);

  return (
    <div className={styles.card_body}>
      {/* Selling Price Section */}
      {/* desktop */}
      <div className="justify-between items-center px-4 py-2 border border-gray-200  bg-white rounded-md mb-2 hidden md:flex">
        <div>
          <span className={styles.sellingPrice}>Selling Price</span>
          <div className={styles.ad_price}>
            <span className={styles.currency}><FaRupeeSign /></span>
            <span className={styles.price}>{expectedPrice}</span>
          </div>
        </div>
        <button
          onClick={() => setShowEMIModal(true)}
          className="text-white bg-orange-500 p-2 rounded-lg cursor-pointer"
        >
          Calculate EMI
        </button>
      </div>

      {/* mobile */}
      <div className="flex justify-between items-center gap-4 px-4 py-6 border border-gray-200 rounded-md mb-6 w-full max-w-full md:hidden bg-white">
        <div>
          <span className="text-gray-500 font-semibold text-sm">Selling Price</span>
          <div className="w-full">
            <h3 className="text-2xl font-bold whitespace-nowrap">₹{expectedPrice}</h3>
          </div>
        </div>
        <button
          onClick={() => setShowEMIModal(true)}
          className="whitespace-nowrap text-white bg-orange-500 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
        >
          Calculate EMI
        </button>
      </div>


      {/* Contact Seller Section */}
      <div className={`${styles.contactContainer} flex flex-col items-center gap-3 p-4 border bg-white border-gray-200 rounded-md `}>
        {!showContactInfo && (
          <button
            className={`view_car_seller_details ${styles.contactSeller} bg-orange-500 text-white w-full rounded-md py-2`}
            onClick={() => handleContactSellerClick(props.carInfo.user_ID)}
          >
            Contact Seller
          </button>
        )}
        <div className={styles.EyeIconCont}>
          <span className={styles.EyeIcon}><EyeIconJK /></span>
          <span className={styles.EyeIconText}>{props.carInfo.totalViews} people are interested</span>
        </div>
      </div>


      {/* Modal for Contact Info */}
      {showContactInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowContactInfo(false)}>
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl text-gray-600 mb-2">Seller</h3>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-black">{props.carInfo.mobileNo}</span>
              <MdAddCall className="text-orange-500 text-3xl" />
            </div>
          </div>
        </div>
      )}

      {/* EMI Calculator Modal */}
      {showEMIModal && (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-75" onClick={() => setShowEMIModal(false)}>
          <div className="p-6 rounded-lg max-w-full" onClick={(e) => e.stopPropagation()}>
            <EmiCalculatorTwo setShowModal={setShowModal} showModal={showModal} defaultLoanAmount={props.carInfo.expectedPrice} />
          </div>
        </div>
      )}

      {/* Check Eligibility Section */}

      {/* Eligibility Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
          <EligibilityForm closeModal={closeModal} />

        </div>
      )}

    </div>
  );
}

export default SellingPrice;
