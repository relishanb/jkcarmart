import MultipleImagesUpload from "@/components/UI/MultipleImagesUpload";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCarActions,updateCarFields } from "@/store/updateCar";

function CarImagesUpload(props) {

  console.log("props.uploadedImages");
  console.log(props.uploadedImages);

  const [images, setImages] = useState();
  const maxNumber = 5;

  const dispatch = useDispatch();  

  const onChange = (imageList, addUpdateIndex) => {

    // console.log("imageList");
    // console.log(imageList);

    props.handleFileChange(imageList[0].file);

    setImages(imageList);
    const carImages = imageList.map(({ data_url }) => data_url);
    dispatch(
      updateCarActions.updateEditCarData({
        field: updateCarFields.Images,
        id:0,
        value: carImages,
      })
    );
  };
  
  return ( <MultipleImagesUpload line1="Upload Car Images" line2="(Max  5 Images allowed)"  uploadedImages = {props.uploadedImages} images={images} maxNumber={maxNumber} onChange={onChange} removeImage={props.removeImage} /> );
  
}

export default CarImagesUpload;
