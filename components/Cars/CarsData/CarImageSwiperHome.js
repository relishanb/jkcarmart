import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { lightBoxActions } from "@/store/lightBox";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function CarImagesSwiperHome(props) {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function viewFullImage(image) {
    dispatch(lightBoxActions.showLightBox({ type: "image", url: image }));
  }

  function hideFullImage() {
 
  }

  return (
    <>
      <div className="swiper-container">
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
                  height: isMobile ? "150px" : "150px",
                  objectFit: isMobile ? "contain" : "cover",
                }}
                onClick={() => viewFullImage(item)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default CarImagesSwiperHome;
