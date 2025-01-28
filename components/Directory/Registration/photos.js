import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Photos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useUploadBusinessProfileImageMutation,
  useUploadServicePhotosMutation,
} from "@/store/apiServices/apiServices";
import {
  setBusinessProfilePicture,
  addServicePhoto,
  removeServicePhoto,
  clearImages,
} from "@/store/photos";
import Swal from "sweetalert2";

const Photos = ({ onBackClick }) => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    onBackClick();
    window.scrollTo(0, 0); 
  }, [onBackClick]);

  const [uploadedPicture, setUploadedPicture] = useState(null);
  const [displayedPicture, setDisplayedPicture] = useState(null);
  const [displayedServicePicture, setDisplayedServicePicture] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const authenticatedUserId = parseInt(
    useSelector((state) => state.authentication.userId)
  );

  // Redux dispatch
  const dispatch = useDispatch();
  const [selectedImagesArray, setSelectedImagesArray] = useState([]);

  const [uploadBusinessProfileImage, uploadBusinessProfileImageResponse] =
    useUploadBusinessProfileImageMutation();

  const [uploadServicePhotos, uploadServicePhotosResponse] =
    useUploadServicePhotosMutation();

  const handleBusinessProfilePictureSubmit = () => {
    if (!uploadedPicture) {
      Swal.fire({
        icon: "error",
        title: "Business profile picture is mandatory",
        text: "Please upload a business profile picture.",
      });
      return;
    }

    dispatch(setBusinessProfilePicture(uploadedPicture));
  };

  const handleServicePhotosSubmit = () => {
    if (selectedImages.length < 4 || selectedImages.length > 11) {
      Swal.fire({
        icon: "error",
        title: "Invalid number of service photos",
        text: "Please select a minimum of 4 photos and a maximum of 11 photos.",
      });
      return;
    }

    selectedImages.forEach((image) => {
      dispatch(addServicePhoto(image));
      setSelectedImagesArray((prevSelectedImages) => [
        ...prevSelectedImages,
        image,
      ]);
    });
  };

  const handleFormSubmit = () => {
    handleBusinessProfilePictureSubmit();

    const formData = new FormData();
    formData.append("file", uploadedPicture);

    uploadBusinessProfileImage({
      userId: authenticatedUserId,
      formData: formData,
      file: uploadedPicture,
    })
      .unwrap()
      .then((response) => {})
      .catch((error) => {});

    handleServicePhotosSubmit();

    const formData2 = new FormData();
    selectedImages.forEach((image) => {
      formData2.append("files", image);
    });

    uploadServicePhotos({
      userId: authenticatedUserId,
      formData: formData2,
      files: selectedImages,
    })
      .unwrap()
      .then((response) => {})
      .catch((error) => {
        if (error?.data?.errors) {
        }
      });
    if (
      uploadedPicture &&
      selectedImages.length >= 4 &&
      selectedImages.length <= 11
    ) {
      Swal.fire({
        icon: "success",
        title: "Submitted Successfully",
        text: "Your photos have been submitted successfully.",
      });
    }
  };

  const removeImage = (index) => {
    const removedImage = selectedImages[index];
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    dispatch(removeServicePhoto(removedImage));
  };

  const openGallery = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const displayedPicture = e.target.result;
        setUploadedPicture(file);
        setDisplayedPicture(displayedPicture);
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
        const isDuplicate = images.some((image) => image.name === file.name);

        if (!isDuplicate) {
          images.push(file);
        }
      }

      setSelectedImages(images);
    };

    input.click();
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
            {displayedPicture ? (
              <img
                className={styles.uploadedImage}
                src={displayedPicture}
                alt="Displayed Picture"
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
              <div onClick={openGalleryForMultiSelect}>
                <img
                  className={styles.vectorIcon}
                  alt=""
                  src="/icons/ph_plus-bold.svg"
                />
              </div>
            </div>
            <div className={styles.selectedImagesWrapper}>
              {selectedImages.map((file, index) => (
                <div key={index} className={styles.selectedImageWrapper}>
                  <img
                    className={styles.selectedImage}
                    src={URL.createObjectURL(file)}
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
          <b className={styles.submit} onClick={handleFormSubmit}>
            Submit
          </b>
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
