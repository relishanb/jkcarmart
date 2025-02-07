// import React, {useEffect, useState} from "react";
// import styles from '../EditPostedCar.module.scss';
// import { EditYear, EditFuelType, EditMileage, EditOwner, EditTransmissionType, EditBodyType, EditSeats, EditColor } from "./EditPostedCarData";
// import Select from 'react-select';
// import { FaRupeeSign, FaArrowUp } from "react-icons/fa";
// import CarImagesUpload from "./CarImagesUpload";

// import Card from "../UI/Card";
// import PrimaryButton from "../UI/PrimaryButton";

// import { useUpdateAdMutation, useUpdateCarImagesMutation, useDeleteCarImageMutation ,useGetLocationsQuery, useGetBodyTypesQuery , useGetColorsQuery ,useGetAdDetailsByCarIdQuery } from "@/store/apiServices/apiServices";
// import { useDispatch, useSelector } from "react-redux";
// import { updateCarActions,updateCarFields } from "@/store/updateCar";

// let updateCarParameters = {
//   "carId": 0,
//   "districtIdfk": 0,
//   "colorIdfk": 0,
//   "modelMonth": "",
//   "modelYear": 0,
//   "totalDriven": 0,  
//   "expectedPrice": 0,
//   "fuelType": "",
//   "ownerType": "",  
//   "comments": "",
//   "isSold": false,
//   "transmission": "",
//   "bodyType": "",
//   "seater": 0,  
// };

// const EditPostedCar = (props) => {   
//     const {data:carInfo, refetch} = useGetAdDetailsByCarIdQuery(props.id);
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         dispatch(updateCarActions.fillUpdateCarData(carInfo))
//     },[carInfo]);

//     const EditCarData = useSelector(state=>state.updateCar.updateCarData);

//     const {data:allLocations} = useGetLocationsQuery();   

//     let locations = [];
//     allLocations && allLocations.forEach(({districtId,districtName})=>{
//       locations.push({value:districtId,label:districtName});
//     });

//     const {data:allBodyTypes} = useGetBodyTypesQuery();    
//     let bodyTypes = [];
//     allBodyTypes && allBodyTypes.forEach(({bodyId,bodyType})=>{
//       bodyTypes.push({value:bodyId,label:bodyType});
//     });

//     const {data:allColors} = useGetColorsQuery();    
//     let colors = [];
//     allColors && allColors.forEach(({colorId,colorName})=>{
//       colors.push({value:colorId,label:colorName});
//     });
    
//     const [selectedOption, setSelectedOption] = useState(null);
//     function updateEditCarData(parms){      
//       if(parms.field==updateCarFields.Mileage || parms.field==updateCarFields.ExpectedPrice){       
//         if (parms.data != "" && parms.data < 1) return;
//         dispatch(updateCarActions.updateEditCarData({field:parms.field,id:0,value:parms.data}));
//       }
//       else if(parms.field==updateCarFields.CarDescription){       
//         dispatch(updateCarActions.updateEditCarData({field:parms.field,id:0,value:parms.data}));
//       }
//       else{
//         setSelectedOption(parms.data);
//         dispatch(updateCarActions.updateEditCarData({field:parms.field,id:parms.data.value,value:parms.data.label}));
//       }  
//     }

//     const [updateAd,response] = useUpdateAdMutation();

//     useEffect(()=>{
//       if(response.isSuccess ) {
//         alert(response.data.apiMessage);
//         refetch();
//         }
//     },[response.isSuccess]);

//     function updateAdData(){
//     updateCarParameters.carId = props.id;
//     for(const key in EditCarData){
//       switch(key){       

//         case updateCarFields.Location:
//           updateCarParameters.districtIdfk = EditCarData[key][0].id;
//         break;
//         case updateCarFields.Color:
//           updateCarParameters.colorIdfk = EditCarData[key][0].id;
//         break;
//         case updateCarFields.RegistrationYear:
//             updateCarParameters.modelYear = EditCarData[key][0].value;
//           break; 
//         case updateCarFields.Mileage:
//           updateCarParameters.totalDriven = EditCarData[key][0].value;
//           break;
//         case updateCarFields.ExpectedPrice:
//           updateCarParameters.expectedPrice = Number(EditCarData[key][0].value);
//           break;
//         case updateCarFields.FuelType:
//           updateCarParameters.fuelType = EditCarData[key][0].value;
//           break;
//         case updateCarFields.OwnerType:
//             updateCarParameters.ownerType = EditCarData[key][0].value;
//           break;
//         case updateCarFields.CarDescription:
//           updateCarParameters.comments = EditCarData[key][0].value;
//           break;
//         case updateCarFields.Transmission:
//           updateCarParameters.transmission = EditCarData[key][0].value;
//           break;
//         case updateCarFields.BodyType:
//           updateCarParameters.bodyType = EditCarData[key][0].value;
//           break;
//         case updateCarFields.Seats:
//           updateCarParameters.seater = EditCarData[key][0].value;
//           break;
//       }
//     }

// updateAd(updateCarParameters);
//     }

//     const [updateAdImages] = useUpdateCarImagesMutation();

//     const handleFileChange = (file) => {
//       const formData = new FormData();
//       formData.append('file', file);
//       const payload = {carId:props.id,formData:formData, file:file }
//       updateAdImages(payload);
//     };

//     const [removeCarImage,deleteResponse] = useDeleteCarImageMutation();

// function removeImage(image,position){
//   const imageName = image.split(`/${props.id}/`)[1];
//   const payload = {carId:props.id,carImage:imageName}
//   removeCarImage(payload);
// }

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       background: "none",
//       borderRadius: "10px",
//       border: "1px solid #e2e2e2",
//       boxShadow: "none",
//       "&:hover": {
//         borderColor:  "var(--primary_color)",
//       }
//       ,
//       placeholder: (defaultStyles) => {
//         return {
//             ...defaultStyles,
//             color: '#ffffff',
//         }
//     }
//     })
//   };  
//     return (
//       carInfo && (
//         <>
//           <Card className={styles.card}>
//             <div className={styles.ad}>
//               <form className={styles.form}>
//                 <div className={styles.form_group}>
//                   {/* Brand */}
//                   <div className={styles.select_wrapper}>
//                     <label>Brand</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.brandidfk,
//                         label: carInfo.brandName,
//                       }}
//                       styles={customStyles}
//                       isDisabled
//                     />
//                   </div>

//                   {/* Model */}
//                   <div className={styles.select_wrapper}>
//                     <label>Model</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.modelidfk,
//                         label: carInfo.modelName,
//                       }}
//                       styles={customStyles}
//                       isDisabled
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Variant */}
//                   <div className={styles.select_wrapper}>
//                     <label>Variant</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.variantidfk,
//                         label: carInfo.variantName,
//                       }}
//                       styles={customStyles}
//                       isDisabled
//                     />
//                   </div>

//                   {/* Year */}
//                   <div className={styles.select_wrapper}>
//                     <label>Year</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.modelYear,
//                         label: carInfo.modelYear,
//                       }}
//                       styles={customStyles}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.RegistrationYear,
//                           data: e,
//                         })
//                       }
//                       options={EditYear}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Mileage */}
//                   <div className={styles.select_wrapper}>
//                     <label>Kilometer Driven</label>
//                     <input
//                       className={styles.input_field}
//                       type="number"
//                       placeholder="Kilometer Driven"
//                       value={
//                         EditCarData.Mileage[0]?.value
//                           ? EditCarData.Mileage[0]?.value
//                           : ""
//                       }
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.Mileage,
//                           data: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   {/* Owners */}
//                   <div className={styles.select_wrapper}>
//                     <label>No. of Owners</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.ownerType,
//                         label: carInfo.ownerType,
//                       }}
//                       styles={customStyles}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.OwnerType,
//                           data: e,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Location */}
//                   <div className={styles.select_wrapper}>
//                     <label>Location</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.districtName,
//                         label: carInfo.districtName,
//                       }}
//                       styles={customStyles}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.Location,
//                           data: e,
//                         })
//                       }
//                       options={locations}
//                     />
//                   </div>
//                   <div className={styles.select_wrapper}>
//                     <label>Expected Price</label>
//                     <div className={styles.input_icons}>
//                       <span className="">
//                         <FaRupeeSign />{" "}
//                       </span>
//                       <input
//                         className={styles.input_field}
//                         type="number"
//                         placeholder="Expected Price"
//                         value={
//                           EditCarData.ExpectedPrice[0]?.value
//                             ? EditCarData.ExpectedPrice[0]?.value
//                             : ""
//                         }
//                         onChange={(e) =>
//                           updateEditCarData({
//                             field: updateCarFields.ExpectedPrice,
//                             data: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.sub_title}>
//                   Some More Information About Your Car
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Fuel Type */}

//                   <div className={styles.select_wrapper}>
//                     <label>Fuel Type</label>
//                     <Select
//                       defaultValue={{
//                         value: carInfo.fuelType,
//                         label: carInfo.fuelType,
//                       }}
//                       styles={customStyles}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.FuelType,
//                           data: e,
//                         })
//                       }
//                       options={EditFuelType}
//                     />
//                   </div>
//                   {/* Transmission Type */}
//                   <div className={styles.select_wrapper}>
//                     <label>Transmission Type</label>
//                     <Select
//                       styles={customStyles}
//                       defaultValue={{
//                         value: carInfo.transmission,
//                         label: carInfo.transmission,
//                       }}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.Transmission,
//                           data: e,
//                         })
//                       }
//                       options={EditTransmissionType}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Body Type */}
//                   <div className={styles.select_wrapper}>
//                     <label>Body Type</label>
//                     <Select
//                       styles={customStyles}
//                       defaultValue={{
//                         value: carInfo.bodyType,
//                         label: carInfo.bodyType,
//                       }}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.BodyType,
//                           data: e,
//                         })
//                       }
//                       options={bodyTypes}
//                     />
//                   </div>
//                   {/* Seats */}
//                   <div className={styles.select_wrapper}>
//                     <label>Seats</label>
//                     <Select
//                       styles={customStyles}
//                       defaultValue={{
//                         value: carInfo.seater,
//                         label: carInfo.seater,
//                       }}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.Seats,
//                           data: e,
//                         })
//                       }
//                       options={EditSeats}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   {/* Color */}
//                   <div className={styles.select_wrapper}>
//                     <label>Color</label>
//                     <Select
//                       styles={customStyles}
//                       defaultValue={{
//                         value: carInfo.coloridfk,
//                         label: carInfo.colorName,
//                       }}
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.Color,
//                           data: e,
//                         })
//                       }
//                       options={colors}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.form_group}>
//                   <div className={styles.select_wrapper}>
//                     <label>Car Description</label>
//                     <textarea
//                       rows={2}
//                       name="Comments"
//                       className={styles.input_field}
//                       placeholder="Enter Comment"
//                       value={
//                         EditCarData.CarDescription[0]?.value
//                           ? EditCarData.CarDescription[0]?.value
//                           : ""
//                       }
//                       onChange={(e) =>
//                         updateEditCarData({
//                           field: updateCarFields.CarDescription,
//                           data: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>

                 
//                 </div>

//                 <div className={styles.center}>
//                   <PrimaryButton type="button" onClick={updateAdData}>
//                     Update
//                   </PrimaryButton>
//                 </div>
//               </form>
//             </div>
//           </Card>

//           <Card className={styles.card}>
//             <div className={styles.image_upload}>
//               <div className={styles.form_group}>
//                 <div className={styles.select_wrapper}>
//                   <div className={styles.file}>
//                     <CarImagesUpload uploadedImages = {carInfo.carImagesList}  handleFileChange={handleFileChange} removeImage={removeImage} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </>
//       )
//     );}
//  export default EditPostedCar;

import React from 'react'

export const EditPostedCar = () => {
  return (
    <div>EditPostedCar</div>
  )
}
