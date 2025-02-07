import { useDeleteBusinessImageMutation, useGetLocationsQuery, useGetUserByUserIdQuery, useUpdateBusinessImageMutation, useUpdateProfileMutation } from "@/store/apiServices/apiServices";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdArrowUpward } from "react-icons/md";
import { useSelector } from "react-redux";
import Select from "react-select";
import styles from "../UserPanel.module.scss"
import BusinessImagesUpload from "../BusinessImagesUpload";
import Button from "@/components/UI/UIcomponents/Button";
import PrimaryButton from "@/components/UI/PrimaryButton";
import CustomSelect from "@/components/UI/CustomSelect";

const EditProfile = ({ setIsOpen }) => {
  const [isDealer, setIsDealer] = useState(false);

  function toggleBusinessImageBlock(checked) {
    setIsDealer(checked);
  }

  const [updateBusinessImage, imageResponse] = useUpdateBusinessImageMutation();

  const loggedUserId = useSelector(state => state.authentication.userId);

  const { data: userDetails } = useGetUserByUserIdQuery(loggedUserId);

  const handleFileChange = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const payload = { userId: userDetails.user_ID, formData: formData, file: file }
    updateBusinessImage(payload);
  };

  const [removeBusinessImage, deleteResponse] = useDeleteBusinessImageMutation();

  function removeImage() {
    const payload = { userId: loggedUserId }
    removeBusinessImage(payload);
  }

  const [updateProfile, response] = useUpdateProfileMutation();

  useEffect(() => {
    if (response.isSuccess) {
      alert(response.data.apiMessage);
    }
  }, [response.isSuccess]);


  useEffect(() => {
    userDetails?.userType == "Car Dealer" && setIsDealer(true);
  }, [userDetails]);


  const { data: allLocations } = useGetLocationsQuery();
  let locations = [];
  allLocations && allLocations.forEach(({ districtId, districtName }) => {
    locations.push({ value: districtId, label: districtName });
  });


  const [selectedOption, setSelectedOption] = useState();

  const formErrors = {
    Name: {
      required: { value: true, message: "Please Enter Your Name" },
    },
    Email: {
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Please Enter a Valid Email Address",
      },
    },
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("uploaded", data)
    setIsOpen(false)
    const userUpdatedData = {
      "userId": loggedUserId,
      "firstName": data.name,
      "emailId": data.email,
      "districtId": data.district.value,
      "userType": data.userType ? "Car Dealer" : "Car Seller",
      "address": data.address
    }
    console.log("name", userUpdatedData.firstName)
    updateProfile(userUpdatedData);
  };
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setIsFormChanged(false);
  }, [userDetails]);

  function handleFieldChange(parms) {
    setIsFormChanged(true);
  }
  return (
    userDetails && (
      <div className="px-1 pb-32 overflow-auto max-h-screen">
        <div className="mt-6 p-4 w-full bg-white rounded-xl shadow-lg border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter Name"
                {...register("name", formErrors.Name)}
                defaultValue={userDetails.firstName}
                onChange={handleFieldChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-100 focus:ring-0 focus:border-gray-300"
                defaultValue={userDetails.mobileNo}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter Email Address"
                {...register("email", formErrors.Email)}
                defaultValue={userDetails.emailID}
                onChange={handleFieldChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <Controller
                name="district"
                control={control}
                placeholder="Select District"
                defaultValue={userDetails.districtId > 0 ? { value: userDetails.districtId, label: userDetails.districtName } : undefined}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={locations}
                    placeholder="Select District"
                    // classNamePrefix="select"
                    // className={styles.customStyles}
                    defaultValue={userDetails.districtId > 0 ? { value: userDetails.districtId, label: userDetails.districtName } : undefined}
                    onChange={(value) => {
                      field.onChange(value);
                      handleFieldChange();
                    }}
                  />
                )}
              />

            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Address</label>
              <textarea
                placeholder="Address"
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                {...register("address")}
                defaultValue={userDetails.address1}
                rows="3"
                onChange={handleFieldChange}
              />
            </div>

            {/* Dealer Toggle */}
            <div className="flex justify-center items-center space-x-2">
              <input
                type="checkbox"
                id="cbx"
                {...register("userType")}
                defaultChecked={userDetails.userType == "Car Dealer"}
                onClick={(e) => toggleBusinessImageBlock(e.target.checked)}
                className="h-5 w-5 appearance-none border border-gray-300 rounded-md checked:bg-orange-500 checked:border-orange-500 relative flex items-center justify-center"
                onChange={handleFieldChange}
              />
              <label htmlFor="cbx" className="text-sm font-medium text-gray-700">
                Are you a Dealer?
              </label>
              <style>
                {`
    input[type="checkbox"]:checked::after {
      content: "✔";
      color: white;
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `}
              </style>
            </div>


            {isDealer && (
              <div className="border p-4 text-center bg-orange-50">
                <BusinessImagesUpload uploadedImages={userDetails.dealerImagesList ? userDetails.dealerImagesList : []} handleFileChange={handleFileChange} removeImage={removeImage} />
              </div>
            )}
          </form>
        </div>

        <div className=" bg-white flex justify-center ">
          <PrimaryButton
            type="button"
            className="fixed bottom-1 w-[90%]"
            onClick={handleSubmit(onSubmit)}
            disabled={
              !isFormChanged}
          >
            Update
          </PrimaryButton>
        </div>

      </div>
    ));
};

export default EditProfile;
