import React, { useEffect, useState } from "react";
import styles from './EditPostedAd.module.scss';
import { EditYear, EditFuelType, EditMileage, EditOwner, EditTransmissionType, EditBodyType, EditSeats, EditColor } from "./EditPostedAdData";
import Select from 'react-select';
import { FaRupeeSign, FaArrowUp } from "react-icons/fa";
import CarImagesUpload from "./CarImagesUpload";

import Card from "../UI/Card";
import PrimaryButton from "../UI/PrimaryButton";

import { useUpdateAdMutation, useUpdateCarImagesMutation, useDeleteCarImageMutation, useGetLocationsQuery, useGetBodyTypesQuery, useGetColorsQuery, useGetAdDetailsByCarIdQuery, useUpdateAdIsSoldMutation } from "@/store/apiServices/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { updateCarActions, updateCarFields } from "@/store/updateCar";
import { isMobile } from "react-device-detect";
import CustomSelect from "../UI/CustomSelect";

let updateCarParameters = {
  "carId": 0,
  "districtIdfk": 0,
  "colorIdfk": 0,
  "modelMonth": "",
  "modelYear": 0,
  "totalDriven": 0,
  "expectedPrice": 0,
  "fuelType": "",
  "ownerType": "",
  "comments": "",
  "isSold": false,
  "transmission": "",
  "bodyType": "",
  "seater": 0,
};

const EditPostedAd = (props) => {
  const [soldStatus, setSoldStatus] = useState(props.isSold);

  const { data: carInfo, refetch } = useGetAdDetailsByCarIdQuery(props.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (carInfo) {
      dispatch(updateCarActions.fillUpdateCarData(carInfo));
    }
  }, [carInfo, dispatch]);
  console.log("carInfo", carInfo)
  const EditCarData = useSelector((state) => state.updateCar.updateCarData);

  useEffect(() => {
    console.log("EditCarData", EditCarData);
  }, [EditCarData]);


  const { data: allLocations } = useGetLocationsQuery();

  let locations = [];
  allLocations && allLocations.forEach(({ districtId, districtName }) => {
    locations.push({ value: districtId, label: districtName });
  });
  console.log("locations", locations)
  const { data: allBodyTypes } = useGetBodyTypesQuery();
  let bodyTypes = [];
  allBodyTypes && allBodyTypes.forEach(({ bodyId, bodyType }) => {
    bodyTypes.push({ value: bodyId, label: bodyType });
  });

  const { data: allColors } = useGetColorsQuery();
  let colors = [];
  allColors && allColors.forEach(({ colorId, colorName }) => {
    colors.push({ value: colorId, label: colorName });
  });

  const [selectedOption, setSelectedOption] = useState(null);
  function updateEditCarData(parms) {
    if (parms.field == updateCarFields.Mileage || parms.field == updateCarFields.ExpectedPrice) {
      if (parms.data != "" && parms.data < 1) return;
      dispatch(updateCarActions.updateEditCarData({ field: parms.field, id: 0, value: parms.data }));
    }
    else if (parms.field == updateCarFields.CarDescription) {
      dispatch(updateCarActions.updateEditCarData({ field: parms.field, id: 0, value: parms.data }));
    }
    else {
      setSelectedOption(parms.data);
      dispatch(updateCarActions.updateEditCarData({ field: parms.field, id: parms.data.value, value: parms.data.label }));
    }
  }

  const [updateAd, response] = useUpdateAdMutation();

  useEffect(() => {
    if (response.isSuccess) {
      alert(response.data.apiMessage);
      refetch();
    }
  }, [response.isSuccess]);

  function updateAdData() {
    updateCarParameters.carId = props.id;
    for (const key in EditCarData) {
      switch (key) {

        case updateCarFields.Location:
          updateCarParameters.districtIdfk = EditCarData[key][0].id;
          break;
        case updateCarFields.Color:
          updateCarParameters.colorIdfk = EditCarData[key][0].id;
          break;
        case updateCarFields.RegistrationYear:
          updateCarParameters.modelYear = EditCarData[key][0].value;
          break;
        case updateCarFields.Mileage:
          updateCarParameters.totalDriven = EditCarData[key][0].value;
          break;
        case updateCarFields.ExpectedPrice:
          updateCarParameters.expectedPrice = Number(EditCarData[key][0].value);
          break;
        case updateCarFields.FuelType:
          updateCarParameters.fuelType = EditCarData[key][0].value;
          break;
        case updateCarFields.OwnerType:
          updateCarParameters.ownerType = EditCarData[key][0].value;
          break;
        case updateCarFields.CarDescription:
          updateCarParameters.comments = EditCarData[key][0].value;
          break;
        case updateCarFields.Transmission:
          updateCarParameters.transmission = EditCarData[key][0].value;
          break;
        case updateCarFields.BodyType:
          updateCarParameters.bodyType = EditCarData[key][0].value;
          break;
        case updateCarFields.Seats:
          updateCarParameters.seater = EditCarData[key][0].value;
          break;
      }
    }

    updateAd(updateCarParameters);
  }

  const [updateAdImages] = useUpdateCarImagesMutation();

  const handleFileChange = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = { carId: props.id, formData: formData, file: file }
    updateAdImages(payload);
  };

  const [removeCarImage, deleteResponse] = useDeleteCarImageMutation();

  function removeImage(image, position) {
    const imageName = image.split(`/${props.id}/`)[1];
    const payload = { carId: props.id, carImage: imageName }
    removeCarImage(payload);
  }

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setIsFormChanged(false);
  }, [carInfo]);

  function handleFieldChange(parms) {
    updateEditCarData(parms);
    setIsFormChanged(true);
  }

  const handleUpdateAdData = () => {
    updateAdData();
    isMobile && (props.setIsDrawerOpen(false));
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };



  return (
    carInfo && (
      <div className="flex flex-col h-screen overflow-y-auto py-4">
        <div className="order-2 md:order-1 border md:border-none p-2 rounded pb-16">

          <div className={styles.ad}>
            <form className={styles.form}>
              <div className={styles.form_group}>
                {/* Brand */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Brand</label>
                  <CustomSelect
                    value={
                      carInfo.brandName
                        ? { value: carInfo.brandName, label: carInfo.brandName }
                        : null
                    }
                    isDisabled
                  />
                </div>


                {/* Model */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Model</label>
                  <CustomSelect
                    value={
                      carInfo.modelName
                        ? { value: carInfo.modelName, label: carInfo.modelName }
                        : null
                    }
                    isDisabled
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                {/* Variant */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Variant</label>
                  <CustomSelect
                    value={
                      carInfo.variantName
                        ? { value: carInfo.variantName, label: carInfo.variantName }
                        : null
                    }
                    isDisabled
                  />
                </div>

                {/* Year */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Year</label>
                  <CustomSelect
                    value={
                      EditCarData.RegistrationYear[0]?.value
                        ? EditYear.find(
                          (option) =>
                            String(option.value) === String(EditCarData.RegistrationYear[0]?.value)
                        ) || null
                        : null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.RegistrationYear,
                        data: e,
                      })
                    }
                    options={EditYear}
                  />
                </div>

              </div>

              <div className={styles.form_group}>
                {/* Mileage */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Mileage</label>
                  <input
                    className={`${styles.input_field} px-3 py-2`}
                    type="number"
                    placeholder="Mileage"
                    value={EditCarData.Mileage[0]?.value || ""}
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.Mileage,
                        data: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Owners */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">No. of Owners</label>
                  <CustomSelect
                    value={
                      EditOwner.find(
                        (option) => option.label === EditCarData.OwnerType[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.OwnerType,
                        data: e,
                      })
                    }
                    options={EditOwner}
                  />
                </div>


              </div>

              <div className={styles.form_group}>
                {/* Location */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Location</label>

                  <CustomSelect
                    value={
                      locations.find(
                        (option) => option.label === EditCarData.Location[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.OwnerType,
                        data: e,
                      })
                    }
                    options={locations}
                  />
                </div>
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Expected Price</label>
                  <div className={styles.input_icons}>
                    <span className="">
                      <FaRupeeSign />{" "}
                    </span>
                    <input
                      className={`${styles.input_field} py-2 px-6`}
                      type="text"
                      placeholder="Expected Price"
                      value={
                        EditCarData.ExpectedPrice[0]?.value
                          ? formatCurrency(EditCarData.ExpectedPrice[0]?.value)
                          : ""
                      }
                      onChange={(e) =>
                        handleFieldChange({
                          field: updateCarFields.ExpectedPrice,
                          data: e.target.value.replace(/[^\d]/g, ''),
                        })
                      }
                    />

                  </div>
                </div>
              </div>

              <div className={styles.sub_title}>
                Some More Information About Your Car
              </div>

              <div className={styles.form_group}>
                {/* Fuel Type */}

                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Fuel Type</label>
                  <CustomSelect
                    value={
                      EditFuelType.find(
                        (option) => option.label === EditCarData.FuelType[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.FuelType,
                        data: e,
                      })
                    }
                    options={EditFuelType}
                  />
                </div>
                {/* Transmission Type */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Transmission Type</label>
                  <CustomSelect
                    value={
                      EditTransmissionType.find(
                        (option) => option.label === EditCarData.Transmission[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.Transmission,
                        data: e,
                      })
                    }
                    options={EditTransmissionType}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                {/* Body Type */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Body Type</label>
                  <CustomSelect
                    value={
                      EditBodyType.find(
                        (option) => option.label === EditCarData.BodyType[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.BodyType,
                        data: e,
                      })
                    }
                    options={EditBodyType}
                  />
                </div>
                {/* Seats */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Seats</label>
                  <CustomSelect
                    value={
                      EditSeats.find(
                        (option) => option.label === EditCarData.Seats[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.Seats,
                        data: e,
                      })
                    }
                    options={EditSeats}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                {/* Color */}
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Color</label>
                  <CustomSelect
                    value={
                      EditColor.find(
                        (option) => option.label === EditCarData.Color[0]?.value
                      ) || null
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.Color,
                        data: e,
                      })
                    }
                    options={EditColor}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                <div className={styles.select_wrapper}>
                  <label className="font-semibold text-sm">Car Description</label>
                  <textarea
                    rows={2}
                    name="Comments"
                    className={`${styles.input_field} p-3`}
                    placeholder="Enter Comment"
                    value={
                      EditCarData.CarDescription[0]?.value
                        ? EditCarData.CarDescription[0]?.value
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange({
                        field: updateCarFields.CarDescription,
                        data: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className={styles.center}>
                <PrimaryButton
                  className="w-full md:w-fit"
                  type="button"
                  onClick={handleUpdateAdData}
                  disabled={!isFormChanged}
                >
                  Update
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
        <div className="order-1 md:order-2 md:mt-4 ">
          <div className={styles.image_upload}>
            <div className={styles.form_group}>
              <div className={styles.select_wrapper}>
                <div className={styles.file}>
                  <CarImagesUpload uploadedImages={carInfo.carImagesList} handleFileChange={handleFileChange} removeImage={removeImage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default EditPostedAd;