import { useSelector, useDispatch } from "react-redux";
import { sellCarActions,sellCarStepNames } from "@/store/sellCar";
import { useEffect, useState } from "react";
import MultipleImagesUpload from "@/components/UI/MultipleImagesUpload";
import BlackButton from "@/components/UI/BlackButton";

function SellCarPhotos() {

  const isLoggedIn = useSelector(state=>state.authentication.isLoggedIn);
  const sellCarInfo = useSelector((state)=>state.sellCar);

  const dispatch = useDispatch();

  //const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {

    // console.log("imageList");
    // console.log(imageList);

    //setImages(imageList);

    // const carImages = imageList.map(({ file }) => file);

    // console.log("carImages");
    // console.log(carImages);

    dispatch(sellCarActions.updateSellCarData({step:sellCarInfo.activeStep,id:1,value:imageList}));


    imageList && imageList.map((file,index) => {
      console.log("imageList inside map",file.file);
    });


    
  };

  function removeImage(image,position){
    console.log("image position",position);
    dispatch(sellCarActions.removeImage(position));
  }

  function updateStep(){ 
    dispatch(sellCarActions.updateSellCarStep({step:sellCarInfo.activeStep}));
  }

  return (
    <>
      <div className="input_group">
        <MultipleImagesUpload
          line1="Upload Car Photos"
          line2="(Max  5 Photos allowed)"
          uploadedImages={sellCarInfo.sellCarData[sellCarStepNames.Photos]}
          uploadedImagesReturnType="Base64"
          images={sellCarInfo.sellCarData[sellCarStepNames.Photos]}
          maxNumber={maxNumber}
          onChange={onChange}
          removeImage={removeImage}
        />        
      </div>
      {!isLoggedIn && sellCarInfo.sellCarData[sellCarStepNames.Photos].length > 0 && <div className="text-right"><BlackButton onClick={updateStep} className="gtmEvent_sellCarStep_uploadPhotos">Next</BlackButton></div>}
    </>
  );
  
}

export default SellCarPhotos;
