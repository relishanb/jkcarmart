import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { lightBoxActions } from "@/store/lightBox";
import { useDispatch } from "react-redux";


function CarImagesSwiper(props){

  const dispatch = useDispatch();

  function viewFullImage(image){  
    //console.log(image);
    dispatch(lightBoxActions.showLightBox({type:"image",url:image}));
  }
  function hideFullImage(){  
    setFullImage();
  } 


    return (
        <>

          <Swiper                      
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            key={props.carId}
          >

{props.images?.map((item,index)=>{


  
  if(props.onImageClick=="ViewCarDetails")  return <SwiperSlide key={index}><img src={item} onClick={()=>props.viewCarDetails()} /></SwiperSlide>
  if(props.onImageClick=="ViewFullImage")  return <SwiperSlide key={index}><img src={item} onClick={()=>viewFullImage(item)} /></SwiperSlide>



})}
    
          </Swiper>


         



          
        </>
        )
}

export default CarImagesSwiper;