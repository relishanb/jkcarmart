import ImageUploading from 'react-images-uploading';
import styles from "./MultipleImagesUpload.module.css";
import Card from './Card';

import {  FaArrowUp } from "react-icons/fa";

function MultipleImagesUpload(props) {  
  return (
    <div className="App">
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
            className={`upload__image-wrapper ${styles.upload_images_wrapper}`}
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

            <div className={styles.errors}>
              {errors && errors.acceptType && (
                <span>Your selected file type is not allowed</span>
              )}
              {errors && errors.maxNumber && (
                <span>Number of selected images exceed max limit</span>
              )}
            </div>

            <div
              className={`${styles.uploaded_images} ${
                (imageList.length < 1 && props.uploadedImages.length < 1) || props.uploadedImages.length >= props.maxNumber
                  ? styles.uploaded_images_empty
                  : ""
              }`}
            >
              {props.uploadedImages && props.uploadedImages.map((el, index) => {
                return (
                  <Card key={index} className={styles.card}>
                    <div className={`image-item ${styles.uploaded_image}`}>
                      {props.uploadedImagesReturnType == "Base64" ? <img src={el.data_url} alt="" width="100" /> : <img src={el} alt="" width="100" /> }
                      
                      <div
                        className={`image-item__btn-wrapper ${styles.uploaded_image_action}`}
                      >
                        <button
                          type="button"
                          onClick={() => props.removeImage(el,index)}
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
