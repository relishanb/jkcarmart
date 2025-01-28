import React, { useState } from 'react'
import Styles from "./MoreInfo.module.scss";
import {  RiCollageFill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import {  FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import {
  ContactIcon,
  EyeIcon,
} from "./Icons/Icons";

function renderStars(rating) {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const decimalPart = rating - filledStars;
  const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75;

  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i}>★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half">★½</span>);
  }

  const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty${i}`}>☆</span>);
  }

  return stars;
}

const MoreInfo = () => {
  const imageGallery = [
    {
      src: "/userInterface/searchList/enigma.png",
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
    },
    {
      src: "/userInterface/searchList/chowdary.png",
     
    },
    {
      src: "/userInterface/searchList/byc.png",
    },
    {
      src: "/userInterface/searchList/enigma.png",
    },
    {
      src: "/userInterface/searchList/car-n-style.png",
    },
    {
      src: "/userInterface/searchList/byc.png",
    },
    {
      src: "/userInterface/searchList/chowdary.png",
    },
    {
      src: "/userInterface/searchList/enigma.png",
    },
  ];

  const topRatedBusinesses = [
    {
      name: "Car-N-Style",
      review: "12 review",
      address: "Gandhi Nagar, Jmammu",
      rating: 4.0,
    },

  ];

  const list = [
    { name: "music" },
    { name: "seat covers" },
    { name: "mats" },
    { name: "damping" },
  ];


  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
 
    setCurrentImageIndex(0);
  
  
    if (showModal) {
      document.body.classList.remove("modal-open");
    } else {
      document.body.classList.add("modal-open");
    }
  };
  

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageGallery.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imageGallery.length - 1 ? 0 : prevIndex + 1));
  };

  const [showMoreAbout, setShowMoreAbout] = useState(false);

  const toggleAboutText = () => {
    setShowMoreAbout(!showMoreAbout);
  };

  return (
    <div className='container'>
      <div className={Styles.main}>
      <div className={Styles.section1}>
        <div className={Styles.imageGallery}>
          {imageGallery.slice(0, 4).map((business, index) => (
            <div key={index} className={Styles.searchList}>
              <img
                src={business.src}
                alt={business.name}
                className={Styles.img}
              />
            </div>
          ))}
          <div className={Styles.galleryIcon}>
            <RiCollageFill size={42} onClick={toggleModal} />
          </div>
        </div>
        {showModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
            <FaArrowCircleLeft size={64} onClick={previousImage} />
              {imageGallery.slice(currentImageIndex, currentImageIndex + 4).map((business, index) => (
                <div key={index} className={Styles.modalImage}>
                  <img
                    src={business.src}
                    alt={business.name}
                    className={Styles.img}
                  />
                </div>
              ))}
              <div className={Styles.modalControls}>
               
                <FaArrowCircleRight size={64} onClick={nextImage} />
              </div>
            </div>
            <div className={Styles.modalClose} onClick={toggleModal}>
              Close
            </div>
          </div>
        )}


        <div className={Styles.mainImageContent}>
          <img src="/userInterface/searchList/car-n-style.png" className={Styles.mainImg}/>

          <div className={Styles.searchLists}>
            {topRatedBusinesses.map((business, index) => (
              <div key={index} className={Styles.searchList}>
         

                <div className={Styles.contentList}>
                  <div className={Styles.searchItemContent}>
                    <span className={Styles.name}>{business.name}</span>
                    <span className={Styles.address}>{business.address}</span>
                    <div className={Styles.ratingSection}>
                      <div className={Styles.ratingNumber}>
                        {business.rating.toFixed(1)}
                      </div>
                      <div className={Styles.rating}>
                        {renderStars(business.rating)}
                      </div>

                      <div className={Styles.review}>{business.review}</div>
                    </div>

                    <div className={Styles.lists}>
                      {list.map((list, index) => (
                        <div
                          key={index}
                          className={Styles.list}
                          onClick={() => handleItemClick(index)}
                        >
                          <p className={Styles.listName}>{list.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className={Styles.view}>
                      <div className={Styles.contact}>
                        <div>
                          <span className={Styles.number}>
                            {" "}
                            <ContactIcon />{" "}
                            <span className={Styles.contactNumber}>
                              9796228282
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className={Styles.number}>
                            {" "}
                            <EyeIcon />{" "}
                            <span className={Styles.contactNumber}>
                              103 Viewed
                            </span>
                          </span>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className={Styles.section2}>

        <div className={Styles.aboutSection}>
          <span className={Styles.about}>About</span>
          <span className={Styles.aboutContent}>
              {showMoreAbout
                ? `We are passionate about providing exceptional products and services to our valued customers. With years of experience in the industry, we strive to be a reliable and trusted partner for all your needs. Our mission is to deliver innovative solutions that enhance your. We take pride in our commitment to quality, craftsmanship, and customer satisfaction.  Our mission is to deliver innovative solutions that enhance your. We take pride in our commitment to quality, craftsmanship, and customer satisfaction. Our mission is to deliver innovative solutions that enhance your. We take pride in our commitment to quality, craftsmanship, and customer satisfaction`
                : `We are passionate about providing exceptional products and services to our valued customers. With years of experience in the industry, we strive to be a reliable and trusted partner for all your needs. Our mission is to deliver innovative solutions that enhance your. We take pride in our commitment to quality, craftsmanship, and customer satisfaction.  Our mission is to deliver innovative solutions that enhance your. We take pride in our commitment to quality, craftsmanship, and customer......`}
              {showMoreAbout ? (
                <span className={Styles.readMore} onClick={toggleAboutText}>
                &nbsp;&nbsp; .....Read less
                </span>
              ) : (
                <span className={Styles.readMore} onClick={toggleAboutText}>
                &nbsp;&nbsp; .....Read more
                </span>
              )}
            </span>
          </div>

          <div className={Styles.highlight}>
            <div className={Styles.businessHighlight}>Business Highlight</div>
            <div className={Styles.details}>
              <div className={Styles.ptb}>
                <span>Mode of Payment</span>
              </div>
            </div>
          </div>
</div>
      </div>
    </div>
  );
};

export default MoreInfo