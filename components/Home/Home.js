import React, { useEffect, useState } from "react";
import Styles from "./Home.module.scss";

import CarInfo from "../Cars/CarsData/CarInfo";
import { useGetAdsQuery } from "@/store/apiServices/apiServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { filterActions } from "@/store/filters";

import { useGetModelsQuery } from "@/store/apiServices/apiServices";

import AppInfoVideo from "./AppInfoVideo";


import { faqDataBuyCar, faqDataSellCar, faqDataDealers } from "../StaticPages/FaqData";
import Accordion from "../StaticPages/Accordion";
import StyleFaq from "../StaticPages/Faq.module.scss";
import Popover from "../UI/UIcomponents/Popover";
import Button from "../UI/UIcomponents/Button";
import MortgageCalculator from "../Emicalculator/Emicalculator";
import EMIBox from "../Emicalculator/EmiBox";
import TestimonialSection from "./Testimonials";
import Head from "next/head";
import { AppDownload } from "./AppDownload";

// import {
//   Dot,
//   HeartIcon,
//   LeftArrow,
//   RightArrow,
// } from "@/components/Directory/userInterface/Icons/Icons";

const Home = () => {

  const dispatch = useDispatch();
  const route = useRouter();

  function viewAllCars() {
    dispatch(filterActions.clearAllFilters());
    route.push("buy");
  }

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

  const [selectedBodyType, setSelectedBodyType] = useState("Hatchback");

  const { data: carsByBodyType, refetch: refetchCarsByBodyType } = useGetAdsQuery({
    filterList: [
      {
        "propertyName": `BodyType='${selectedBodyType}'`,
        "propertyVal": "",
        "operator": "",
        "conjuction": ""
      }
    ],
    paging: {
      "pageNumber": 1,
      "pageLines": 4
    },
    sortList: [
      {
        "propertyName": "ci.createDate",
        "sortType": "desc"
      }
    ]
  });

  useEffect(() => {
    refetchCarsByBodyType();
  }, [selectedBodyType]);

  function viewCarsByBodyType(bodyType) {
    dispatch(filterActions.clearAllFilters());
    dispatch(filterActions.updateFilterData({ filterName: "BodyType", value: bodyType }));
    dispatch(filterActions.applyFilter());
    route.push("buy");
  }

  const [selectedBrand, setSelectedBrand] = useState();
  const { data: brandModels } = useGetModelsQuery(selectedBrand, { skip: selectedBrand ? false : true });

  function viewCarsByBrand(brandId, brandName) {
    setSelectedBrand([brandId, brandName]);
  }

  useEffect(() => {
    if (selectedBrand && brandModels) {
      //console.log("brandModels",brandModels);
      dispatch(filterActions.clearAllFilters());
      dispatch(filterActions.updateFilterData({ filterName: "Brand", brand: selectedBrand[0], brandName: selectedBrand[1], models: brandModels.map(({ modelId }) => modelId) }));
      dispatch(filterActions.applyFilter());
      route.push("buy");
    }
  }, [selectedBrand, brandModels]);



  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [displayAllCars, setDisplayAllCars] = useState(false);
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleCarSwiperSlideChange = (index) => {
    setCurrentCarIndex(index);
  };

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




  const vectors = [
    {
      src: "/vector/Vector1.png",
      text: "Find your car",
      paragraph: "Search from variety of cars ",
      paraghaphExt: "listed by direct sellers & dealers.",
    },
    {
      src: "/vector/Vector2.png",
      text: "Make a call",
      paragraph: "Contact seller verified mobile number ",
      paraghaphExt: "directly for details you need.",
    },
    {
      src: "/vector/Vector3.png",
      text: "Make a deal",
      paragraph: "Arrange a meeting, inspect the ",
      paraghaphExt: "car and close the deal in person.",
    },
  ];

  const carTypes = [
    { src: "/carType/HatchBack.png", text: "Hatchback" },
    { src: "/carType/Sedans.png", text: "Sedan" },
    { src: "/carType/SUV.png", text: "SUV" },
    { src: "/carType/MUV.png", text: "MUV" },
  ];

  const chooseType = [
    { src: "/public/Creta.jpg", name: "Hyundai Creta", price: "12.50 Lakh" },
    { src: "/public/Creta.jpg", name: "Hyundai Crv", price: "12.50 Lakh" },
    { src: "/public/Creta.jpg", name: "Hyundai Creta", price: "12.50 Lakh" },
    { src: "/public/Creta.jpg", name: "Hyundai Creta", price: "12.50 Lakh" },
  ];

  const popularBrands = [
    { src: "/carBrands/MarutiSuzuki.png", name: "Maruti Suzuki", id: 1 },
    { src: "/carBrands/Mahindra.png", name: "Mahindra", id: 4 },
    { src: "/carBrands/Tata.png", name: "Tata", id: 3 },
    { src: "/carBrands/Ford.png", name: "Ford", id: 20 },
    { src: "/carBrands/Hundai.png", name: "Hyundai", id: 2 },
    { src: "/carBrands/Toyota.png", name: "Toyota", id: 5 },
    { src: "/carBrands/Renault.png", name: "Renault", id: 14 },
    { src: "/carBrands/Kia.png", name: "Kia", id: 8 },
  ];



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
    <>
      <Head>
        <title>
          Buy & Sell Used Cars in Jammu & Kashmir – JKCarmart
        </title>
        <meta name="description" content="
        Looking for a used car in Jammu and kashmir? Find verified sellers and buyers with ease. Safe, direct, and convenient car transactions with no hidden costs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.jkcarmart.com/" />
        <meta property="og:title" content="JKCarMart" />
        <meta property="og:site_name" content="JKCarMart" />
        <meta property="og:url" content="https://www.jkcarmart.com" />
        <meta property="og:description" content="Buy and sell Jammu and Kashmir-registered cars on JKCarmart, a free platform connecting buyers and sellers directly, with no agents or hidden costs." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.jkcarmart.com/team.jpg" />
        <meta property="og:image:secure_url" content="https://www.jkcarmart.com/team.jpg" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="JKCarMart" />


      </Head>

      <div className={Styles.overAllDiv}>

        <section className={`bg_white ${Styles.section_hero}`}>
          <div className="container mt-20 md:mt-44">

            <div className={Styles.ContainerFirst}>
              <div className={Styles.Heading}>
                <h1 className={Styles.HeadingText}>
                  Say Hi 👋 to the free platform <br />
                  <span className={Styles.Buying}>Buy </span>{" "}
                  <span className={Styles.And}>&amp;</span>{" "}
                  <span className={Styles.Selling}>Sell </span>
                  Used Cars in J&amp;K
                </h1>

                <span className={Styles.JkCarMartText}>Direct buyers &amp; sellers.  No agents, no fees, or hidden costs!</span>

                <div className="flex flex-col items-center md:items-start gap-6 mt-8">
                  {/* Browse All Cars Section */}
                  <div className="flex flex-row gap-2">

                    <div className="flex flex-col items-center md:items-start gap-3">
                      <button
                        onClick={() => viewAllCars()}
                        className={`${Styles.BrowseButton} gtmEvent_heroSection_viewCars`}
                      >
                        Browse all cars
                      </button>
                      <Link href="https://play.google.com/store/apps/details?id=anb.group.jkcarmart&pli=1" target="_blank" rel="noopener noreferrer">
                        <img
                          src="play-store.svg"
                          alt="Download on the App Store"
                          className="w-40 md:w-44"
                        />
                      </Link>
                    </div>

                    {/* Sell Your Car Section */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                      <Link
                        href="sell"
                        className={`${Styles.SellButton} gtmEvent_heroSection_sellCar`}
                      >
                        Sell your car
                      </Link>
                      <Link href="https://apps.apple.com/in/app/jkcarmart/id1629198882" target="_blank" rel="noopener noreferrer">
                        <img
                          src="app-store.svg"
                          alt="Download on the App Store"
                          className="w-36 md:w-40"
                        />
                      </Link>
                    </div>
                  </div>
                </div>




                <div className=" mt-4">

                </div>

              </div>


              {/* Heading ends here */}

              <div className={Styles.HeroImage}>
                <img src="/heroImage.png" alt="" />
                {/* <AppInfoVideo video={{link: "https://www.youtube.com/watch?v=kzwagefN1io", title: "Sell Car As New User", img: '/heroImage.png'}} /> */}
              </div>
            </div>

          </div>
        </section>

        <section >
          <div className="container">

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
            <div className="text-center">
              <button
                onClick={() => viewAllCars()}
                className={`${Styles.ViewButton} btn_border_primary gtmEvent_latestCars_viewCars`}
              >
                View all cars
              </button>
            </div>
          </div>
        </section>
        <div className={Styles.ConatinerThirdHeadingMobile}>
          <div className="container">

            <h2 className={`${Styles.JKcarmartWorks} text-lg font-semibold text-black px-1`}>
              How JKcarmart works
            </h2>
          </div>
        </div>


        <div className={Styles.ConatinerThird}>
          <section className="bg_white">
            <div >
              <div className="container">
                <div className={Styles.ConatinerThirdHeadingDesktop}>
                  <div className="sec-heading pb-4">
                    <span className="text-2xl text-black font-semibold">
                      3 steps to get your dream car directly from seller
                    </span>
                  </div>
                </div>

                <div className={Styles.Vectors}>
                  {vectors.map((vector, index) => (
                    <div className={Styles.VectorList} key={index}>
                      <img
                        src={vector.src}
                        alt={vector.text}
                        className={Styles.vectorImg}
                      />
                      <div>
                        <span className={Styles.Text}>{vector.text}</span>
                        <span className={Styles.paragraph}>
                          {vector.paragraph} <br /> {vector.paraghaphExt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section>
          <div className="container">
            <div className="sec-heading md:pb-4">
              <span className="text-lg md:text-2xl text-black font-semibold px-1 md:px-0">Choose cars from popular body types</span>
            </div>
            <div className={Styles.center}>
              <div className={Styles.CarType}>
                {carTypes.map((choose, index) => (
                  <div id={choose.text} key={index} className={`gtmEvent_popularBodyType_bodyTypeSelected ${Styles.CarTypeList} ${selectedBodyType == choose.text ? Styles.active : ""}`} onClick={() => setSelectedBodyType(choose.text)}>
                    <img
                      src={choose.src}
                      alt={choose.text}
                      className={Styles.CarTypeImg}
                    />
                    <span className={Styles.CarTypeText}>{choose.text}</span>
                  </div>
                ))}
              </div>
            </div>


            <div className={Styles.newlyAdded}>
              {isMobileView ? (

                <Swiper
                  spaceBetween={1}
                  slidesPerView={1.05}
                  onSlideChange={(swiper) => handleCarSwiperSlideChange(swiper.activeIndex)}
                >
                  {carsByBodyType?.map((element) => (
                    <SwiperSlide key={element.carId} className="w-full">
                      <CarInfo carInfo={element} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (

                carsByBodyType?.map((element) => (
                  <CarInfo carInfo={element} key={element.carId} />
                ))
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => viewCarsByBodyType(selectedBodyType)}
                className={`${Styles.ViewButton} btn_border_primary gtmEvent_popularBodyType_viewCars`}
              >
                View all {selectedBodyType} cars
              </button>
            </div>
          </div>
        </section>


        <section className="bg_white">
          <div className="container">
            <div className="sec-heading md:pb-4">
              <span className="text-xl md:text-2xl text-black font-semibold px-1 md:px-0">
                Choose cars from popular brands
              </span>
            </div>
            <div className={Styles.PopularBrands}>
              {popularBrands.map((popular, index) => (
                <div id={popular.name} key={index} className={`${Styles.PopularList} gtmEvent_popularBrands_brandSelected`} onClick={() => viewCarsByBrand(popular.id, popular.name)}>
                  <img
                    src={popular.src}
                    alt={popular.text}
                    className={Styles.popularImg}
                  />
                  <span className={Styles.popularName}>{popular.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center"><button onClick={() => viewAllCars()} className={`${Styles.ViewButton} btn_border_primary gtmEvent_popularBrands_viewCars`}>View all cars </button></div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="sec-heading">
              <h2>
                Know Some of the Benefits to Gain!
              </h2>
            </div>
            <p>
              At JK Carmart, we offer a free platform to buy and sell used car online that connects direct buyers and sellers without any involvement of agents, fees, or hidden costs.
            </p>
            <ul className="list_dotted">
              <li><strong>No Middlemen:</strong> Connect directly with sellers, ensuring a transparent and hassle-free process when buying or selling second hand cars in jammu.</li>
              <li><strong>Free &amp; Best Used Car Platform:</strong> Enjoy the convenience of buying and selling used cars in jammu without any hidden fees.</li>
              <li><strong>Wide Selection:</strong> Browse through a diverse range of used cars in Jammu available on our platform.</li>
              <li><strong>Verified Listings:</strong> Rest easy with verified mobile numbers of owners of cars for sales in jammu for secure transactions like a value car mart.</li>
            </ul>
          </div>
        </section>

        <AppDownload />

        <section className="bg_color">
          <div className='container'>
            <div className="sec-heading md:pb-4">
              <span className="text-xl md:text-2xl text-black font-semibold px-1 md:px-0">
                Frequently Asked Questions
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-md md:text-lg font-bold px-1 md:px-0">Buying Cars in Jammu</span>
                <div className={`${StyleFaq.accordion}`}>
                  {faqDataBuyCar.map(({ title, content }, index) => (
                    <Accordion key={index} title={title} content={content} />
                  ))}
                </div>
              </div>

              <div>

                <span className="text-md md:text-lg font-bold px-1 md:px-0 ">Selling Cars in Jammu</span>
                <div className={StyleFaq.accordion}>
                  {faqDataSellCar.map(({ title, content }, index) => (
                    <Accordion key={index} title={title} content={content} />
                  ))}
                </div>
              </div>

              <div>

                <span className="text-md md:text-lg font-bold px-1 md:px-0">Dealing with Dealers</span>
                <div className={StyleFaq.accordion}>
                  {faqDataDealers.map(({ title, content }, index) => (
                    <Accordion key={index} title={title} content={content} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <TestimonialSection/> */}

        <section>
          <div className="container">
            <div className="sec-heading">
              <h2>
                Explore Our Free Buying/Selling Used Car App
              </h2>
            </div>
            <p>
              Unlock a world of possibilities with the JK Carmart's best car selling app. Seamlessly navigate through our user-friendly platform among the best car buying sites and experience the following benefits of our used car buying app that involves the feature to sell old cars:
            </p>
            <ul className="list_dotted">
              <li><strong>Convenience at Your Fingertips:</strong> Browse and explore listings anytime, anywhere with our mobile used car buying app.</li>
              <li><strong>Instant Notifications:</strong> Stay updated on new listings, price drops, and more via our app to buy and sell used car online.</li>
              <li><strong>Quick Access to Sellers:</strong> Connect with sellers on the go for a swift and efficient transaction both via out free platform and used car buying app.</li>
            </ul>
          </div>
        </section>


      </div>



    </>
  );
};

export default Home;
