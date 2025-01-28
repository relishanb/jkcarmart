import React, { useEffect, useState } from "react";
import Select from 'react-select';
import Image from "next/image";
import styles from "./UserPanel.module.scss";


import PrimaryButton from "../UI/PrimaryButton";
import BusinessImagesUpload from "./BusinessImagesUpload";

import { useForm,Controller  } from "react-hook-form";

import Card from "../UI/Card";

import { useGetUserByUserIdQuery, useGetLocationsQuery, useUpdateProfileMutation, useUpdateBusinessImageMutation, useDeleteBusinessImageMutation } from "@/store/apiServices/apiServices";
import { useSelector } from "react-redux";

const Profile = () => {

  const [isDealer,setIsDealer] = useState(false);


  function toggleBusinessImageBlock(checked){
    setIsDealer(checked);
  }

  const [updateBusinessImage,imageResponse] = useUpdateBusinessImageMutation();

  //imageResponse && console.log(imageResponse);

  const handleFileChange = (file) => {    
    const formData = new FormData();
    formData.append('file', file);
    const payload = {userId:userDetails.user_ID,formData:formData, file:file }
    updateBusinessImage(payload);
  };


  const [removeBusinessImage,deleteResponse] = useDeleteBusinessImageMutation();

  // deleteResponse && console.log("deleteResponse"); console.log(deleteResponse);

function removeImage(){
const payload = {userId:loggedUserId}
removeBusinessImage(payload);
}

  const [updateProfile,response] = useUpdateProfileMutation();

useEffect(()=>{
  if(response.isSuccess ) {
    alert(response.data.apiMessage);
    }
},[response.isSuccess]);

  const loggedUserId = useSelector(state=>state.authentication.userId);

  const {data:userDetails} = useGetUserByUserIdQuery(loggedUserId);

  useEffect(()=>{
    userDetails?.userType == "Car Dealer" && setIsDealer(true);
  },[userDetails]);


  const {data:allLocations} = useGetLocationsQuery();
    let locations = [];
    allLocations && allLocations.forEach(({districtId,districtName})=>{
      locations.push({value:districtId,label:districtName});
    });


  const [selectedOption, setSelectedOption] = useState();

const formErrors = {
  Name: {
    required: { value: true, message: "Please Enter Your Name" },
  },
  MobileNumber: {
    required: { value: true, message: "Please Enter Your Mobile Number" },
    minLength: { value: 10, message: "Please Enter a Valid Mobile Number" },
    maxLength: { value: 10, message: "Please Enter a Valid Mobile Number" },
    pattern: {
      value: /^[0-9+-]+$/,
      message: "Please Enter a Valid Mobile Number",
    },
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
    const userUpdatedData = {
      "userId": loggedUserId,
      "firstName": data.name,      
      "emailId": data.email,
      "districtId": data.district.value,
      "userType": data.userType?"Car Dealer":"Car Seller",
      "address": data.address
    }

    updateProfile(userUpdatedData);

  };

  return (
    userDetails && (
      <>
      <Card className={styles.card}>
        <div className={styles.center}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles.form} ${styles.profile}`}
          >
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                {errors.name && (
                  <span className={styles.error}>{errors.name.message}</span>
                )}
                <div className={styles.input_group}>
                  <input
                    type="text"
                    className={styles.form_style}
                    placeholder="Enter Name"
                    {...register("name", formErrors.Name)}
                    defaultValue={userDetails.firstName}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                {errors.mobileNumber && (
                  <span className={styles.error}>
                    {errors.mobileNumber.message}
                  </span>
                )}
                <div className={styles.input_group}>
                  <input
                    type="text"
                    maxLength="10"
                    className={styles.form_style}
                    placeholder="Enter Mobile Number"
                    {...register("mobileNumber", formErrors.MobileNumber)}
                    defaultValue={userDetails.mobileNo}
                     readOnly                   
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.form_group}>
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
                <div className={styles.input_group}>
                  <input
                    type="text"
                    className={styles.form_style}
                    placeholder="Enter Email Address"
                    {...register("email", formErrors.Email)}
                    defaultValue={userDetails.emailID}
                  />
                </div>
              </div>
              <div className={styles.form_group}>
                <Controller
                  name="district"
                  control={control}
                  placeholder="Select District"
                  defaultValue={userDetails.districtId > 0 ? {value:userDetails.districtId, label:userDetails.districtName} : undefined}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={locations}
                      placeholder="Select District"
                      classNamePrefix="select"
                      className={styles.customStyles}
                      defaultValue={userDetails.districtId > 0 ? {value:userDetails.districtId, label:userDetails.districtName} : undefined}
                    />
                  )}
                />               
              </div>
            </div>

            <div className={styles.form_group}>
              <textarea
                rows="5"
                name="Address"
                className={styles.form_style}
                placeholder="Address"
                {...register("address")}
                defaultValue={userDetails.address1}
              />
            </div>

            <div className={styles.form_group}>
              <input
                className={styles.inp_cbx}
                id="cbx"
                type="checkbox"
                style={{ display: "none" }}
                {...register("userType")}
                defaultChecked={userDetails.userType=="Car Dealer"?true:false} 
                onClick={(e)=>toggleBusinessImageBlock(e.target.checked)}
              />
              <label className={styles.cbx} htmlFor="cbx">
                <span>
                  <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span>Are you a Dealer?</span>
              </label>
            </div>
            <div className={`${styles.center} ${styles.mt40}`}>
              <PrimaryButton type="submit">Update Profile</PrimaryButton>
            </div>
          </form>
        </div>
      </Card>


{isDealer && 
<Card className={styles.card}>
            <div className={styles.image_upload}>        

              <div className={styles.form_group}>
                <div className={styles.select_wrapper}>
                  <div className={styles.file}>
                    <BusinessImagesUpload uploadedImages = {userDetails.dealerImagesList ? userDetails.dealerImagesList : []}  handleFileChange={handleFileChange} removeImage={removeImage}  />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        }

          </>

    )
  );
};
export default Profile;
