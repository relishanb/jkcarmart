import ImageUploading from 'react-images-uploading';
import styles from "./MultipleImagesUpload.module.css";
import Card from './Card';

import { FaArrowUp } from "react-icons/fa";
import { useDispatch } from 'react-redux';
// import { jsonServerApi } from '@/store/apiServices/apiServices';
import { useEffect } from 'react';
import Button from './UIcomponents/Button';

function MultipleImagesUpload(props) {

  console.log("MutltipleImagesUpload", props);


  // const dispatch = useDispatch();

  // const handleAction = () => {
  //   // Perform some action here (e.g., update, delete, etc.)
    
  //   // Then refetch the ad details
  //   dispatch(jsonServerApi.util.invalidateTags(['updateAd']));
  // };
  

useEffect(() => {

}, [props])



  return (
    <div className="App">
      {/* <Button variant='primary' onClick={handleAction}>Refresh Data</Button> */}

      <ImageUploading
        multiple
        acceptType={["jpg", "jpeg", "png"]}
        value={props.images}
        onChange={props.onChange}
        maxNumber={props.maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <div
            className={` ${styles.upload_images_wrapper}`}
          >
            {props.uploadedImages.length < props.maxNumber && (
              <button
                type="button"
                className={styles.upload_images}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <span className={styles.icon}>
                  <FaArrowUp />
                </span>
                {props.line1}
                <span>{props.line2}</span>
              </button>
            )}

            <button
              type="button"
              className={styles.remove_images}
              onClick={onImageRemoveAll}
            >
              Remove all images
            </button>

            <div className={`${styles.errors} pt-4`}>
              {errors && errors.acceptType && (
                <span>Your selected file type is not allowed</span>
              )}
              {errors && errors.maxNumber && (
                <span>Number of selected images exceed max limit</span>
              )}
            </div>

            <div
              className={`${styles.uploaded_images} ${(imageList.length < 1 && props.uploadedImages.length < 1) || props.uploadedImages.length >= props.maxNumber
                ? styles.uploaded_images_empty
                : ""
                }`}
            >
              {props.uploadedImages && props.uploadedImages.map((el, index) => {
                return (
                  <Card key={index} className=" md:px-3">
                    <div className={` flex flex-col justify-between items-center h-[100%] `}>
                      {props.uploadedImagesReturnType == "Base64" ? <img src={el.data_url} alt="" width="100" /> : <img src={el} alt="" width="100" />}

                      <div
                        className={` mt-3`}
                      >
                        <button
                          type="button"
                          onClick={() => props.removeImage(el, index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </ImageUploading>


    </div>
  );

}

export default MultipleImagesUpload;
