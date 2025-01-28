import MultipleImagesUpload from "@/components/UI/MultipleImagesUpload";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sellCarActions,sellCarStepNames } from "@/store/sellCar";



function SellCarImages() {

  const [images, setImages] = useState();
  const maxNumber = 5;
  
  useEffect(()=>{
    const uploadedImages = JSON.parse(localStorage.getItem("uploadedImages"));
    //console.log("uploadedImages" , uploadedImages);
    setImages(uploadedImages);    
  },[]);

  const dispatch = useDispatch();  

  //console.log("Images Data",images);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setImages(imageList);    

    const carImages = imageList.map(({data_url})=>data_url);
    //console.log(carImages);


dispatch(sellCarActions.updateSellCarData({step:sellCarStepNames.Images, value:carImages}));
    
    localStorage.setItem('uploadedImages', JSON.stringify(imageList));


  };
  
  return ( <MultipleImagesUpload images={images} maxNumber={maxNumber} onChange={onChange} /> );
  
}

export default SellCarImages;
