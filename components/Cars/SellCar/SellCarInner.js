import Card from "@/components/UI/Card";
import styles from "./SellCarInner.module.css";
import SellCarSteps from "./SellCarSteps/SellCarSteps";

import SellCarBrands from "./SellCarBrands";
import SellCarYears from "./SellCarYears";
import SellCarModels from "./SellCarModels";
import SellCarVariants from "./SellCarVariants";
import SellCarMileage from "./SellCarMileage";
import SellCarOwners from "./SellCarOwners";
import SellCarLocations from "./SellCarLocations";
import SellCarExpectedPrice from "./SellCarExpectedPrice";
import SellCarPhotos from "./SellCarPhotos";
import SellCarUserDetails from "./SellCarUserDetails";
import PrimaryButton from "@/components/UI/PrimaryButton";
import WhiteButton from "@/components/UI/WhiteButton";
import Modal from "@/components/UI/Modal";
import CarInfo from "../CarsData/CarInfo";

import { useDispatch, useSelector } from "react-redux";
import {
  sellCarStepNames,
  sellCarHeadings,
  sellCarActions,
} from "@/store/sellCar";
import { useEffect, useState } from "react";
import {
  usePostAdMutation,
  useGetUserByUserIdQuery,
  useUploadMultiCarImagesMutation,
} from "@/store/apiServices/apiServices";
import { useRouter } from "next/router";

let sellCarParameters = {
  userId: 0,
  sellerName: "",
  mobileNo: "",
  brandIdfk: 0,
  modelIdfk: 0,
  variantIdfk: 0,
  districtIdfk: 0,
  colorIdfk: 0,
  modelMonth: "",
  modelYear: 0,
  totalDriven: 0,
  color: "",
  expectedPrice: 0,
  fuelType: "",
  ownerType: "",
  registrationPlace: "",
  insuranceType: "",
  drivenBy: "",
  reason: "",
  comments: "",
  isSold: false,
  isPremium: false,
  saleCity: "",
  adType: "",
  adContentType: "Pending",
  transmission: "",
  sellerType: "Car Seller",
  createdBy: 0,
  bodyType: "",
  seater: 0,
};

function SellCarInner(props) {
  const route = useRouter();

  const [postAd, response] = usePostAdMutation();
  console.log("response", response);
  const [uploadMultiCarImages, uploadMultiCarImagesResponse] =
    useUploadMultiCarImagesMutation();

  useEffect(() => {
    console.log("uploadMultiCarImagesResponse", uploadMultiCarImagesResponse);
  }, [uploadMultiCarImagesResponse]);

  console.log("sellCarInfo", sellCarParameters.expectedPrice);
  useEffect(() => {
    console.log("post add response");
    console.log("response", response);

    const files = sellCarInfo.sellCarData[sellCarStepNames.Photos];
    console.log("uploaded files", files);
    const formData = new FormData();

    files &&
      files.map((file, index) => {
        formData.append("files", file.file);
      });

    const payload = { carId: parseInt(response.data?.statusCode), formData: formData, files: files };
    console.log("pyloadp", payload)
    uploadMultiCarImages(payload);

    if (props?.page == "UserPanelPostAd") {
      if (response.isSuccess)
        props.setActiveIndex({ id: "PostedAds", text: "Posted Ads" });
    } else {
      if (response.isSuccess) route.push("/userpanel");
    }
  }, [response]);

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sellCarActions.resetSellCarData());
  }, []);

  const [showModal, setShowModal] = useState(false);

  function showPreviewAd() {
    setShowModal(true);
  }

  function hidePreviewAd() {
    setShowModal(false);
  }

  const sellCarInfo = useSelector((state) => state.sellCar);

  const userId = parseInt(useSelector((state) => state.authentication.userId));
  sellCarParameters.userId = userId;

  const { data: userDetails } = useGetUserByUserIdQuery(userId);
  if (userDetails) {
    sellCarParameters.sellerName = userDetails.firstName;
    sellCarParameters.mobileNo = userDetails.mobileNo;
  }


  function postAdd() {
    for (const key in sellCarInfo.sellCarData) {
      switch (key) {
        case sellCarStepNames.Brand:
          sellCarParameters.brandIdfk = sellCarInfo.sellCarData[key][0].id;
          break;
        case sellCarStepNames.RegistrationYear:
          sellCarParameters.modelYear = sellCarInfo.sellCarData[key][0].id;
          break;
        case sellCarStepNames.Model:
          sellCarParameters.modelIdfk = sellCarInfo.sellCarData[key][0].id;
          break;
        case sellCarStepNames.Variant:
          sellCarParameters.variantIdfk = sellCarInfo.sellCarData[key][0].id;
          break;
        case sellCarStepNames.Mileage:
          sellCarParameters.totalDriven = Number(
            sellCarInfo.sellCarData[key][0].value.replace(/\D/g, "")
          );
          break;
        case sellCarStepNames.OwnerType:
          sellCarParameters.ownerType = sellCarInfo.sellCarData[key][0].value;
          break;
        case sellCarStepNames.Location:
          sellCarParameters.districtIdfk = sellCarInfo.sellCarData[key][0].id;
          break;
        case sellCarStepNames.ExpectedPrice:
          sellCarParameters.expectedPrice = parseInt(
            sellCarInfo.sellCarData[key][0].value.replace(/\D/g, ""),
            10
          );
          break;
      }
    }
    postAd(sellCarParameters);
  }

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.form_body}>
          <SellCarSteps sellCarInfo={sellCarInfo} />
          <div className="tab_content">
            <h3>{sellCarHeadings[sellCarInfo.activeStep]}</h3>

            <div className={styles.tab_content_data}>
              {sellCarInfo.activeStep == sellCarStepNames.Brand && (
                <SellCarBrands />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.RegistrationYear && (
                <SellCarYears />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.Model && (
                <SellCarModels />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.Variant && (
                <SellCarVariants />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.Mileage && (
                <SellCarMileage />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.OwnerType && (
                <SellCarOwners />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.Location && (
                <SellCarLocations />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.ExpectedPrice && (
                <SellCarExpectedPrice />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.Photos && (
                <SellCarPhotos />
              )}
              {sellCarInfo.activeStep == sellCarStepNames.UserDetails && (
                <SellCarUserDetails />
              )}
            </div>
          </div>
        </div>

        {((isLoggedIn && sellCarInfo.activeStep == sellCarStepNames.Photos && sellCarInfo.sellCarData[sellCarStepNames.Photos].length > 0) ||
          (sellCarInfo.activeStep == sellCarStepNames.UserDetails &&
            sellCarInfo.sellCarData.UserVerified)) && (
            <div className={styles.form_action}>
              {/* <WhiteButton onClick={showPreviewAd}>Preview Ad</WhiteButton> */}
              <PrimaryButton
                className="gtmEvent_sellCar_postAd w-full"
                onClick={postAdd}
              >
                Post Ad
              </PrimaryButton>
            </div>
          )}
      </Card>

      {showModal && (
        <Modal
          title="Preview Ad"
          width="width_350_px"
          closeModel={hidePreviewAd}
        >
          <CarInfo width="Full" />
        </Modal>
      )}
    </>
  );
}
export default SellCarInner;
