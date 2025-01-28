import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { SiYoutube } from "react-icons/si";
import styles from "./businessInfoPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddUpdateBusinessAccountInfoMutation,
  useGetBusinessInfoByUserIdQuery,
  useGetAllCitiesQuery 
} from "@/store/apiServices/apiServices";

import Swal from "sweetalert2";

const BusinessInfoPage = ({ onNextClick, fetchedData }) => {
  const [addUpdateBusinessAccountInfo] =
    useAddUpdateBusinessAccountInfoMutation();

  const dispatch = useDispatch();
  const router = useRouter();
  const authenticatedUserId = useSelector(
    (state) => state.authentication.userId
  );

  // State for selected payment options
  const [selectedItems, setSelectedItems] = useState([]);
  const [businessInfoData, setBusinessInfoData] = useState(null);

  const [paymentMethods, setPaymentMethods] = useState([]);
  // State for user input in city field
const [cityInput, setCityInput] = useState("");

const [isTyping, setIsTyping] = useState(false);

  const { data: cities, error: citiesError } = useGetAllCitiesQuery("");


  // Function to get data from input fields
  const getFieldValue = (fieldName) => {
    return document.querySelector(`[name="${fieldName}"]`)?.value || "";
  };

  // Handle item click event for payment options
  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Handle Next button click event
  const onFrameContainer29Click = useCallback(async () => {
    try {
      const compulsoryFields = [
        "yourName",
        "businessName",
        "mobileNo",
        "email",
        "whatsappNo",
        "pincode",
        "address1",
        "address2",
        "yearsInBusiness",
        "landmark",
      ];

      const missingFields = compulsoryFields.filter(
        (field) => !getFieldValue(field)
      );
      if (missingFields.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Please fill in the following fields: ${missingFields.join(
            ", "
          )}`,
        });
        return;
      }

      const businessInfoPayload = {
        userId: authenticatedUserId,
        username: getFieldValue("yourName"),
        businessName: getFieldValue("businessName"),
        mobileNo: getFieldValue("mobileNo"),
        emailId: getFieldValue("email"),
        whatsappNo: getFieldValue("whatsappNo"),
        pincode: getFieldValue("pincode"),
        address1: getFieldValue("address1"),
        address2: getFieldValue("address2"),
        registeredFrom: getFieldValue("cityId"),
        districtId: 0,
        landmark: getFieldValue("landmark"),
        totalYears: parseFloat(getFieldValue("yearsInBusiness")),
        aboutBusiness: getFieldValue("aboutBusiness"),
      };
      console.log("businessInfoPayload", businessInfoPayload);

      const methodID = businessInfoData?.paymentMethods[0]?.methodID || 0;

      // Prepare the payload for web links
      let weblinksPayload;
      if (
        businessInfoData?.accountLinks &&
        businessInfoData.accountLinks.length > 0
      ) {
        // Update existing web links (when editing data)
        weblinksPayload = {
          userId: authenticatedUserId,
          weblinks: businessInfoData.accountLinks.map((link) => ({
            linkID: link.linkID, 
            portal: link.portal,
            link: getFieldValue(`${link.portal.toLowerCase()}link`),
          })),
        };
      } else {
        // Add new web links (when adding data for the first time)
        weblinksPayload = {
          userId: authenticatedUserId,
          weblinks: [
            {
              linkID: 0,
              portal: "Web",
              link: getFieldValue("weblink"),
            },
            {
              linkID: 0,
              portal: "Instagram",
              link: getFieldValue("instagramlink"),
            },
            {
              linkID: 0,
              portal: "Facebook",
              link: getFieldValue("facebooklink"),
            },
            {
              linkID: 0,
              portal: "Youtube",
              link: getFieldValue("youtubelink"),
            },
          ],
        };
      }

      const paymentMethodPayload = {
        paymentMethodID: methodID,
        userId: authenticatedUserId,
        paymentMethod: selectedItems.join(", "),
      };

      console.log({
        businessInfo: businessInfoPayload,
        weblinks: weblinksPayload,
        paymentMethod: paymentMethodPayload,
      });

      const response = await addUpdateBusinessAccountInfo({
        businessInfo: businessInfoPayload,
        weblinks: weblinksPayload,
        paymentMethod: paymentMethodPayload,
      });

      // Check the response and handle success/error
      if (response.error) {
        // Handle error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save info. Please try again later.",
        });
      } else if (response.data) {
        // Handle success
        Swal.fire({
          icon: "success",
          title: "Info Saved",
          text: "Info saved successfully.",
        });
        onNextClick();
        window.scrollTo(0, 0); 
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving info. Please try again later.",
      });

      console.error("Error adding/updating business account info:", error);
    }
  }, [
    addUpdateBusinessAccountInfo,
    authenticatedUserId,
    businessInfoData,
    onNextClick,
    selectedItems,
  ]);

  const { data: businessInfo, error: businessInfoError } =
    useGetBusinessInfoByUserIdQuery(authenticatedUserId);
  const fetchBusinessInfoData = useCallback(async () => {
    try {
      if (businessInfo) {
        setBusinessInfoData(businessInfo);
      } else {
        console.log("Business info data not found.");
      }
    } catch (error) {
      console.error("Error fetching business info data:", error);
    }
  }, [businessInfo]);

  useEffect(() => {
    fetchBusinessInfoData();
  }, [fetchBusinessInfoData]);

  useEffect(() => {
    if (businessInfoData) {
      document.querySelector(`[name="yourName"]`).value =
        businessInfoData.userName || "";
      document.querySelector(`[name="businessName"]`).value =
        businessInfoData.businessName || "";
      document.querySelector(`[name="mobileNo"]`).value =
        businessInfoData.mobileNo || "";
      document.querySelector(`[name="email"]`).value =
        businessInfoData.emailID || "";
      document.querySelector(`[name="yearsInBusiness"]`).value =
        businessInfoData.totalYears || "";
      document.querySelector(`[name="whatsappNo"]`).value =
        businessInfoData.whatsappNo || "";
      document.querySelector(`[name="pincode"]`).value =
        businessInfoData.pincode || "";
      document.querySelector(`[name="address1"]`).value =
        businessInfoData.address1 || "";
      document.querySelector(`[name="address2"]`).value =
        businessInfoData.address2 || "";
      document.querySelector(`[name="landmark"]`).value =
        businessInfoData.landmark || "";
      document.querySelector(`[name="cityId"]`).value =
        businessInfoData.cityId || "";

      // Populate web links
      if (
        businessInfoData.accountLinks &&
        Array.isArray(businessInfoData.accountLinks)
      ) {
        businessInfoData.accountLinks.forEach((link) => {
          document.querySelector(
            `[name="${link.portal.toLowerCase()}link"]`
          ).value = link.link || "";
        });
      }

      // Populate payment methods
      if (
        businessInfoData.paymentMethods &&
        Array.isArray(businessInfoData.paymentMethods)
      ) {
        const methodID = businessInfoData.paymentMethods[0]?.methodID || 0;
        const paymentMethods =
          businessInfoData.paymentMethods[0]?.paymentMethod || "";
        const selectedPaymentMethods = paymentMethods
          .split(",")
          .map((method) => method.trim());
        setSelectedItems(selectedPaymentMethods);
      }
    }
  }, [businessInfoData, setSelectedItems]);

  return (
    <div className={styles.businessInfoPage}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          {/* Business/Professional Name */}
          <div className={styles.businessNameParent}>
            <div className={styles.businessName}>
              <span>Business name</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.businessprofessionalNameWrapper}
              type="text"
              placeholder="Business/Professional name"
              name="businessName"
              required
            />
          </div>

          {/* Your Name */}
          <div className={styles.businessNameParent}>
            <div className={styles.businessName}>
              <span>Your name</span>
              <span className={styles.span}>*</span>
            </div>
            <input
              className={styles.businessprofessionalNameWrapper}
              type="text"
              placeholder="Add your name"
              name="yourName"
              required
            />
          </div>

          <div className={styles.frameContainer}>
            {/* WhatsApp Number */}
            <div className={styles.whatsappNoParent}>
              <div className={styles.businessName}>
                <span>WhatsApp no.</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.whatsappNumberWrapper}
                type="tel"
                placeholder="WhatsApp number"
                name="whatsappNo"
                required
              />
            </div>

            {/* Contact Number */}
            <div className={styles.whatsappNoParent}>
              <div className={styles.businessName}>
                <span>Contact no.</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.whatsappNumberWrapper}
                type="tel"
                placeholder="Mobile number"
                name="mobileNo"
                required
              />
            </div>

            {/* Years in Business */}
            <div className={styles.whatsappNoParent}>
              <div className={styles.businessName}>
                <span>Years in business</span>
                <span className={styles.span}>*</span>
              </div>
              <input
                className={styles.numberOfYearsWrapper}
                type="number"
                step="0.01"
                placeholder="Number of years"
                name="yearsInBusiness"
                required
              />
            </div>
          </div>

          <div className={styles.frameDiv}>
            {/* Address */}
            <div className={styles.whatsappNoParent}>
              <div className={styles.businessName}>
                <span>Address</span>
                <span className={styles.span}>*</span>
              </div>
              <div className={styles.frameParent1}>
                <input
                  className={styles.address1Wrapper}
                  type="text"
                  placeholder="Address 1"
                  name="address1"
                  required
                />

                <input
                  className={styles.address1Wrapper}
                  type="text"
                  name="address2"
                  placeholder="Address 2"
                  required
                />

<input
  className={styles.cityWrapper}
  type="text"
  placeholder="City"
  name="cityId"
  value={cityInput}
  onChange={(e) => {
    setCityInput(e.target.value);
    setIsTyping(e.target.value.length > 0); 
  }}
  required
/>

{isTyping && cities && (
  <ul className={styles.suggestionList}>
    {cities
      .filter(city => city.cityName.toLowerCase().includes(cityInput.toLowerCase()))
      .map(city => (
        <li
          key={city.cityId}
          onClick={() => {
            setCityInput(city.cityName);
            setIsTyping(false); 
          }}
          className={styles.suggestionItem}
        >
          {city.cityName}
        </li>
      ))
    }
  </ul>
)}



{/* <input
  className={styles.cityWrapper}
  type="text"
  placeholder="City"
  name="cityId"
  value={cityInput}
  onChange={(e) => setCityInput(e.target.value)}
  list="citiesList"
  required
/>
<datalist id="citiesList">
  {cities &&
    cities.map(city => (
      <option key={city.cityId} value={city.cityName} />
    ))}
</datalist> */}



                <input
                  className={styles.cityWrapper}
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  required
                />

                <input
                  className={styles.cityWrapper}
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  required
                />
              </div>
            </div>

            {/* Other Links */}
            <div className={styles.whatsappNoParent}>
              <div className={styles.businessName}>Other Links</div>
              <div className={styles.frameParent2}>
                <div className={styles.iconsWeblinkParent}>
                  <MdEmail className={styles.iconsWeblink} />
                  <input
                    className={styles.iconTextWrapper}
                    type="text"
                    placeholder="E-Mail Link"
                    name="email"
                    required
                  />
                </div>

                {/* No 'required' attribute for non-required fields */}
                <div className={styles.iconsWeblinkParent}>
                  <img
                    className={styles.iconsWeblink}
                    alt=""
                    src="/icons--weblink.svg"
                  />
                  <input
                    className={styles.iconTextWrapper}
                    type="text"
                    placeholder="Web Link"
                    name="weblink"
                  />
                </div>

                <div className={styles.iconsWeblinkParent}>
                  <AiFillInstagram className={styles.iconsWeblink} />
                  <input
                    className={styles.iconTextWrapper}
                    type="text"
                    placeholder="Instagram Link"
                    name="instagramlink"
                  />
                </div>

                <div className={styles.iconsWeblinkParent}>
                  <FaFacebook className={styles.iconsWeblink} />
                  <input
                    className={styles.iconTextWrapper}
                    type="text"
                    placeholder="Facebook Link"
                    name="facebooklink"
                  />
                </div>

                <div className={styles.iconsWeblinkParent}>
                  <SiYoutube className={styles.iconsWeblink} />
                  <input
                    className={styles.iconTextWrapper}
                    type="text"
                    placeholder="YouTube Link"
                    name="youtubelink"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.whatsappNoParent}>
            {/* Payment Options */}
            <div className={styles.paymentsOptionsParent}>
              <div className={styles.businessName}>
                <span>Payments options</span>
                <span className={styles.span}>*</span>
              </div>
              <div className={styles.selectTheMode}>
                select the mode of payments accepted by your business
              </div>
            </div>

            <div className={styles.component94Parent}>
              <ul className={styles.horizontalList}>
                {/* Render payment options */}
                {["Cash", "UPI", "Debit/Credit Cards", "Cheque"].map((item) => (
                  <li
                    key={item}
                    className={`${styles.component94} ${
                      selectedItems.includes(item) ? styles.selected : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className={styles.itemText}>{item}</div>
                    {selectedItems.includes(item) && (
                      <span
                        className={styles.closeIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                      >
                        &#10006;
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          className={styles.nextWrapper}
          onClick={onFrameContainer29Click}
        >
          <b className={styles.next}>Next</b>
        </button>
      </div>

      <div className={styles.component104}>
        <div className={styles.businessInfoParent}>
          <div className={styles.businessInfo}>Business Info</div>
          <div className={styles.categoriesServices}>Categories & services</div>
          <div className={styles.categoriesServices}>Timings</div>
          <div className={styles.photos}>Photos</div>
        </div>
        <div className={styles.component104Inner}>
          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoPage;
