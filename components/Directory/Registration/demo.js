import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Photos.module.scss";
import {
  useUploadBusinessProfileImageMutation,
  useUploadServicePhotosMutation,
  useGetBusinessProfilePicturesQuery,
  useGetBusinessServicePhotosQuery,
} from "@/store/apiServices/apiServices";
import swal from "sweetalert2";
import { uploadStart, uploadSuccess, uploadFailure } from "@/store/photos";

const Photos = ({ onNextClick, onBackClick }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [profilePictureId, setProfilePictureId] = useState(null);
  const authenticatedUserId = useSelector((state) => state.authentication.userId);
  const [uploadBusinessProfileImageMutation] = useUploadBusinessProfileImageMutation();
  const [uploadServicePhotosMutation] = useUploadServicePhotosMutation();
  const profilePicturesQuery = useGetBusinessProfilePicturesQuery(authenticatedUserId);
  const servicePhotosQuery = useGetBusinessServicePhotosQuery(authenticatedUserId);
  
  const [profilePictures, setProfilePictures] = useState("");
  const { businessImages, profilePicture, isUploading, error } = useSelector((state) => state.photos);

console.log("businessImages", businessImages);

  useEffect(() => {
    if (authenticatedUserId) {
      dispatch(fetchImages(authenticatedUserId));
    }
  }, [dispatch, authenticatedUserId]);

  const handleBackClick = useCallback(() => {
    onBackClick();
  }, [onBackClick]);



  const openGallery = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedPicture = e.target.result;
        setUploadedPicture(uploadedPicture);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  

  const openGalleryForMultiSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (event) => {
      const files = event.target.files;
      const images = [...selectedImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const uploadedPicture = e.target.result;
          const isDuplicate = images.some((image) => image === uploadedPicture);

          if (!isDuplicate) {
            images.push(uploadedPicture);
            setSelectedImages(images);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSelect = (event) => {
    const files = event.target.files;
    const updatedSelectedImages = [...selectedImages];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedPicture = e.target.result;
        const existingImageIndex = updatedSelectedImages.findIndex((img) => img === uploadedPicture);
        if (existingImageIndex !== -1) {
          updatedSelectedImages[existingImageIndex] = uploadedPicture;
        } else {
          updatedSelectedImages.push(uploadedPicture);
        }
        setSelectedImages(updatedSelectedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    dispatch(uploadStart());

    // Validate profile picture
    if (!uploadedPicture) {
      setIsSubmitting(false);
      swal.fire({
        icon: "warning",
        title: "Upload Profile Picture",
        text: "Please upload a profile picture.",
      });
      return;
    }

    // Validate service photos
    if (selectedImages.length < 4 || selectedImages.length > 11) {
      setIsSubmitting(false);
      swal.fire({
        icon: "warning",
        title: "Service Photos",
        text: "Please upload a minimum of 4 and a maximum of 11 service photos.",
      });
      return;
    }

    try {
      // Call the API to save the business profile picture
      const profileImageResult = await uploadBusinessProfileImageMutation({
        userId: authenticatedUserId,
        image: uploadedPicture,
        imageId: profilePictureId,
      });
  
      console.log("Business Profile Picture API Response:", profileImageResult);
  
      if (profileImageResult.data && profileImageResult.data.imageId) {
        setProfilePictureId(profileImageResult.data.imageId);
      }
     
      // Call the API to save the service photos
    // Call the API to save the service photos
    const servicePhotosResult = await uploadServicePhotosMutation({
      userId: authenticatedUserId,
      images: selectedImages,
    });

    console.log("Service Photos API Response:", servicePhotosResult);

      dispatch(uploadSuccess());

      swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Your profile picture and service photos have been uploaded successfully.",
      });

      setIsSubmitting(false);
    } catch (error) {
      dispatch(uploadFailure(error));
      setIsSubmitting(false);

      swal.fire({
        icon: "error",
        title: "Upload Error",
        text: "An error occurred while uploading. Please try again.",
      });
    }
  };

  return (
    <div className={styles.photos}>
      <div className={styles.frameParent}>
        <div className={styles.businessProfilePictureParent}>
          <div className={styles.businessProfilePictureContainer}>
            <span>Business profile picture</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.enhanceYourVisibility}>
            Enhance your visibility and stand out among competitors with an
            attractive business profile picture.
          </div>
        </div>
        <div className={styles.servicesPhotosParent}>
          <div className={styles.businessProfilePictureContainer}>
            Services Photos
          </div>
          <div className={styles.showcaseYourBusiness}>
            Showcase your business by displaying your products and services
          </div>
        </div>
        <div className={styles.phplusBoldWrapper}>
          <div onClick={openGallery}>
            {uploadedPicture ? (
              <img
                className={styles.uploadedImage}
                src={uploadedPicture}
                alt="Uploaded Picture"
              />
            ) : (
              <img
                className={styles.vectorIcon}
                alt=""
                src="/icons/ph_plus-bold.svg"
              />
            )}
          </div>
        </div>

        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.phplusBoldContainer}>
              <div
                onClick={openGalleryForMultiSelect}
                
              >
                
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="/icons/ph_plus-bold.svg"
                  />
            
              </div>
            </div>
            <div className={styles.selectedImagesWrapper}>
  {selectedImages.map((image, index) => (
    <div key={index} className={styles.selectedImageWrapper}>
      <img
        className={styles.selectedImage}
        src={image}
        alt="Selected Image"
      />
      <div
        className={styles.removeImage}
        onClick={() => removeImage(index)}
      >
        Remove
      </div>
    </div>
  ))}
</div>
          </div>
        </div>

        <div className={styles.submitWrapper}>
          <b className={styles.submit} onClick={handleSubmit} disabled={isSubmitting}>Submit</b>
        </div>
        <div className={styles.backWrapper} onClick={handleBackClick}>
          <b className={styles.back}>Back</b>
        </div>
      </div>
      <div className={styles.component101}>
        <div className={styles.businessInfoParent}>
          <div className={styles.businessInfo}>{`Business Info `}</div>
          <div className={styles.businessInfo}>{`Categories & services`}</div>
          <div className={styles.businessInfo}>Timings</div>
          <div className={styles.businessProfilePictureContainer}>Photos</div>
        </div>
        <div className={styles.component101Inner}>
          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
};

export default Photos;
