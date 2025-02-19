import React, { useEffect, useState } from 'react'
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5'
import Styles from "./Home.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import CarInfo from '../Cars/CarsData/CarInfo';
import { useGetAdsQuery } from '@/store/apiServices/apiServices';

export const NewCars = ({ viewAllCars}) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const [displayAllCars, setDisplayAllCars] = useState(false);

    const { data: newlyAdded } = useGetAdsQuery({
        filterList: [
          {
            "propertyName": "brandName!=''",
            "propertyVal": "",
            "operator": "",
            "conjuction": ""
          }
        ],
        paging: {
          "pageNumber": 1,
          "pageLines": 12
        },
        sortList: [
          {
            "propertyName": "ci.createDate",
            "sortType": "desc"
          }
        ]
      });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767) {
                setIsMobileView(true);
            } else {
                setIsMobileView(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const checkIsMobileView = () => {
            setIsMobileView(window.innerWidth <= 728);
        };

        checkIsMobileView();

        window.addEventListener("resize", checkIsMobileView);

        return () => {
            window.removeEventListener("resize", checkIsMobileView);
        };
    }, []);

    const handleRightArrowClick = () => {
        const newIndex = (displayedIndex + itemsPerPage) % totalItems;
        setDisplayedIndex(newIndex);
    };

    const handleLeftArrowClick = () => {
        const newIndex = (displayedIndex - itemsPerPage + totalItems) % totalItems;
        setDisplayedIndex(newIndex);
    };

    let displayedCars, totalItems, itemsPerPage;

    if (newlyAdded) {
        itemsPerPage = 4;
        totalItems = newlyAdded.length;
        displayedCars = isMobileView
            ? newlyAdded
            : displayAllCars
                ? newlyAdded
                : newlyAdded.slice(displayedIndex, displayedIndex + itemsPerPage);
    }
    return (
        <section>
            <div id='custom' className="container relative z-[-3]">
                <div className={Styles.NewlyText}>
                    <div className="sec-heading md:pb-4">
                        <span className="text-lg md:text-2xl text-black font-semibold px-1 md:px-0">Newly Added cars for sale</span>
                    </div>
                    <span className={Styles.Arrow}>
                        <span onClick={handleLeftArrowClick}>
                            <IoArrowBackCircleOutline isLight={displayedIndex === 0} />
                        </span>{" "}
                        <span onClick={handleRightArrowClick}>
                            <IoArrowForwardCircleOutline
                                isLight={displayedIndex + itemsPerPage >= totalItems}
                            />
                        </span>
                    </span>
                </div>


                {isMobileView ? (

                    <Swiper
                        spaceBetween={1}
                        slidesPerView={1.05}
                    >
                        {displayedCars?.map((element) => (
                            <SwiperSlide key={element.carId}>
                                <CarInfo carInfo={element} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (

                    <div className={Styles.newlyAdded}>
                        {displayedCars?.map((element) => (
                            <CarInfo carInfo={element} key={element.carId} />
                        ))}
                    </div>
                )}
                <div className="text-center pt-4">
                    <button
                        onClick={() => viewAllCars()}
                        className={`${Styles.ViewButton} btn_border_primary gtmEvent_latestCars_viewCars`}
                    >
                        View all cars
                    </button>
                </div>
            </div>
        </section>
    )
}
