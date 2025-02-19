import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAdsQuery } from "@/store/apiServices/apiServices";
import { filterNames, filterPositions, filterActions } from "@/store/filters";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import CarInfo from "./CarInfo";
import SearchBoxLocations from "@/components/Layout/Header/SearchBoxLocations";
import styles from "./HomeCarsList.module.scss";
import CarFilters from "../CarsFilters/FiltersList/CarFilters";
import CarsListAppliedFilters from "./CarsListAppliedFilters";
import { BuyBottom } from "./BuyBottom";
import useScreenType from "@/hooks/useScreenType";
import MobSearchLocation from "@/components/MobSearchLocation";
import MobSearchCar from "@/components/MobSearchCar";
import SearchBoxCars from "@/components/Layout/Header/SearchBoxCars";
import NoResults from "@/components/NoResults"; 
import SearchBox from "@/components/SearchBox";
import useHeroVisibility from "@/hooks/useHeroVisibility";
import { NewCars } from "@/components/Home/NewCars";
import { useRouter } from "next/router";

function HomeCarsList() {
  const isMobile = useScreenType();
  const isHeroVisible = useHeroVisibility();

  const filtersData = useSelector((state) => state.filter.filterData);
  const [pageNumber, setPageNumber] = useState(1);
  const [activeCarsList, setActiveCarsList] = useState([]);

  const route = useRouter();

  function viewAllCars() {
    dispatch(filterActions.clearAllFilters());
    route.push("/");
  }

  let filterProperties = useSelector((state) => state.filter.filterParameters);
  filterProperties = filterProperties.filterList;

  const userDetails = useSelector(
    (state) => state.filter.filterData[filterPositions[filterNames.User]][filterNames.User]
  );

  if (filterProperties == "" || filterProperties == undefined) filterProperties = "(brandname<>'')";

  useEffect(() => {
    setPageNumber(1);
    setActiveCarsList([]);
  }, [filterProperties]);

  const { data, refetch } = useGetAdsQuery({
    filterList: [
      {
        propertyName: filterProperties,
        propertyVal: "",
        operator: "",
        conjuction: "",
      },
    ],
    paging: {
      pageNumber: pageNumber,
      pageLines: 9,
    },
    sortList: [
      {
        propertyName: "ci.createDate",
        sortType: "desc",
      },
    ],
  });

  useEffect(() => {
    if (data) {
      pageNumber > 1 ? setActiveCarsList((prev) => [...prev, ...data]) : setActiveCarsList(data);
    }
  }, [data]);

  const dispatch = useDispatch();
  function clearUser() {
    dispatch(filterActions.clearFilter(filterNames.User));
  }

  function showMoreCars() {
    setPageNumber((prev) => prev + 1);
    refetch();
  }

  return (
    <>
      <section className="first_section">
        <div className="container mt-2 md:mt-40">
          <div>
            {isMobile && (
              // search and location box
              <div className={`flex justify-center gap-4 px-0  ${!isHeroVisible ? "fixed top-16 px-2.5 py-2 left-0 right-0 z-0 bg-white" : ""}`}>
                <MobSearchLocation />
                <div className="flex justify-center items-center rounded-full z-55">
                  <SearchBox />
                  {/* <MobSearchCar /> */}
                </div>
              </div>
            )}
          </div>
          <div className={`${styles.cars_section} px-1 -mt-14 md:mt-0`}>
            <CarFilters />
            <div className={styles.cars_list}>
              {userDetails && userDetails != "" && (
                <div className={styles.user_details}>
                  <span>
                    Cars from <span className={styles.name}>{userDetails[1]}</span>
                  </span>
                  <span title="Clear Dealer Filter" className={styles.clear_user} onClick={clearUser}>
                    Clear
                  </span>
                </div>
              )}

              <div className="flex justify-between mt-6 md:mt-0 ">
                {activeCarsList[0]?.totalCars > 0 ? (
                  <span className={styles.ad_list_title}>
                    <span>{activeCarsList[0].totalCars} Used Cars</span>
                    <span> For Sale</span>
                  </span>
                ) : (
                  <NoResults src="/Noresults.svg" title="0 cars found for search result" desc="No result for your search, please try something else or" />
                )}
              </div>
              {!isMobile && <CarsListAppliedFilters filtersData={filtersData} />}

              <div className={styles.ad_list}>
                {activeCarsList?.map((element, index) => (
                  <>
                    <CarInfo carInfo={element} key={element.carId} />
                    {(index + 1) % 10 === 0 && <NoResults src="/Noresults.svg" key={`no-results-${index}`} desc="Didn't find your desired car?" />}
                  </>
                ))}
              </div>

              {activeCarsList?.length > 0 && (
                <div className={`${styles.ad_view_more} z-[-3] relative`}>
                  <div className={styles.ad_show_count}>
                    Showing {activeCarsList?.length} of {activeCarsList[0]?.totalCars} Cars
                  </div>
                  {activeCarsList?.length < activeCarsList[0]?.totalCars && (
                    <div className={styles.ad_show_more}>
                      <a onClick={showMoreCars} className="btn btn_border_primary cars_list_load_more_cars">
                        Show More Cars
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <NewCars viewAllCars={viewAllCars} />
      </section>
      <BuyBottom />
    </>
  );
}

export default HomeCarsList;