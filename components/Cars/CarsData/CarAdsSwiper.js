import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import CarInfo from "./CarInfo";

function CarAdsSwiper(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (swiperRef) swiperRef.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef) swiperRef.slideNext();
  };

  return (
    <div className="swiper-container relative">
      {/* Navigation arrows for PC view */}
      {/* {!isMobile && ( */}
        <div className="absolute right-7 md:right-4 pb-12 md:pb-20 transform -translate-y-1/2 flex items-center space-x-2 z-10">
          <button
            onClick={handlePrev}
            className="bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      {/* )} */}

      <Swiper
        onSwiper={setSwiperRef}
        spaceBetween={10}
        slidesPerView={isMobile ? 1.05 : 3}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {props.carAdsList.map((element, index) => (
          <SwiperSlide key={index}>
            <CarInfo carInfo={element} width="Full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarAdsSwiper;
