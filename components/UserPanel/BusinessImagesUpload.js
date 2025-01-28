import MultipleImagesUpload from "@/components/UI/MultipleImagesUpload";
import { useState } from "react";


function BusinessImagesUpload(props) {

  console.log("props.uploadedImages");
  console.log(props.uploadedImages);

  const [images, setImages] = useState();
  const maxNumber = 1;



  const onChange = (imageList, addUpdateIndex) => {

    // console.log("imageList");
    // console.log(imageList);

    props.handleFileChange(imageList[0].file);

    setImages(imageList);
    
  
  };
  
  return ( 
  <MultipleImagesUpload 
  line1="Upload Business Image" 
  line2="(Max  1 Image allowed)" 
  uploadedImages = {props.uploadedImages} 
  images={images} 
  maxNumber={maxNumber} 
  onChange={onChange} 
  removeImage={props.removeImage}  
  /> 
);
  
}

export default BusinessImagesUpload;
