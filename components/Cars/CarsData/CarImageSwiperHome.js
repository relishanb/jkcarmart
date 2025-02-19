import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { isMobile } from "react-device-detect";

function CarImagesSwiperHome(props) {

  return (
    <>
      <div className="border rounded-xl ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          navigation={!isMobile}
          modules={!isMobile ? [Navigation] : []}
          allowSlideNext={!isMobile}
          allowSlidePrev={!isMobile}
          allowTouchMove={!isMobile}
          className="mySwiper"
        >
          {props.images?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt={`Car Image ${index}`}
                style={{
                  width:"100%",
                  height: isMobile ? "250px" : "150px",
                  objectFit: isMobile ? "cover" : "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default CarImagesSwiperHome;
