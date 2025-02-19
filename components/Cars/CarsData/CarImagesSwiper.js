import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { lightBoxActions } from "@/store/lightBox";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function CarImagesSwiper(props) {
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
    // setFullImage(); // This line seems to be commented out or missing
  }

  return (
    <>
      <div className="swiper-container ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {props.images?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt={`Car Image ${index}`}
                style={{
                  width: isMobile ? "120%" : "100%",
                  height: isMobile ? "60vh" : "100%",
                  objectFit: "contain",
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

export default CarImagesSwiper;