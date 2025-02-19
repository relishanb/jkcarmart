import { useState, useEffect, useRef } from "react";
import Button from "@/components/UI/Button";

import CarFilterByBrandInner from "../ByBrandModel/CarFilterByBrandInner";
import CarFilterByMileageInner from "../CarFilterByMileageInner";
import CarFilterByPriceInner from "../CarFilterByPriceInner";
import CarFilterByRegistrationYearInner from "../CarFilterByRegistrationYearInner";
import CarFilterByFuelTypeInner from "../CarFilterByFuelTypeInner";
import CarFilterByOwnerTypeInner from "../CarFilterByOwnerTypeInner";
import CarFilterByBodyType from "../CarFilterByBodyType";
import CarFilterByTransmission from "../CarFilterByTransmission";
import CarFilterBySeats from "../CarFilterBySeats";
import CarFilterByColors from "../CarFilterByColors";
import MultiFilters from "../MultiFilters/MultiFilters";

import { FaUndo } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { filterActions, filterNames } from '../../../../store/filters';

import styles from "./CarFilters.module.scss";
import { FilterIcon } from "@/components/Layout/Icons/Icons";
import useHeroVisibility from "@/hooks/useHeroVisibility";

function CarFilters() {
  const filters = [
    { text: "Price", value: filterNames.Price },
    { text: "Mileage", value: filterNames.Mileage },
    { text: "Reg. Year", value: filterNames.RegistrationYear },
    { text: "Brand & Model", value: filterNames.Brand },
    { text: "Fuel Type", value: filterNames.FuelType },
    { text: "Past Owners", value: filterNames.OwnerType },
    { text: "Body Type", value: filterNames.BodyType },
    { text: "Transmission", value: filterNames.Transmission },
    { text: "Seats", value: filterNames.Seats },
    { text: "Colors", value: filterNames.Color },
  ];

  const [mobileFilterActive, setMobileFilterActive] = useState(false);
  function toogleMobileFilter() {
    setMobileFilterActive(!mobileFilterActive);
  }

  const dispatch = useDispatch();
  const isHeroVisible = useHeroVisibility();

  useEffect(() => {
    dispatch(filterActions.fillFilterData());
  }, [dispatch]);

  const savedFilters = useSelector((state) => state.filter.storedFilterData);
  useEffect(() => {
    const savedFilterData = JSON.parse(localStorage.getItem('filterData') || '[]');
    if (savedFilterData.length > 0) {
      dispatch(filterActions.fillStoredFilterData(savedFilterData));
    } else {
      dispatch(filterActions.fillFilterData());
    }
  }, [dispatch]);

  const selectedFiltersCount = useSelector((state) => state.filter.selectedFiltersCount);

  let filterKeys = [];
  let i = 0;
  savedFilters.map((el, index) => {
    if (el[Object.keys(el)[0]].length > 0) {
      filterKeys[i] = Object.keys(el)[0];
      i++;
    };
  });
  filterKeys = [filterKeys];

  function clearAllFilters() {
    dispatch(filterActions.clearAllFilters());
    localStorage.removeItem('carFilters');
  }

  useEffect(() => {
    localStorage.setItem('carFilters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  return (
    <>
      <div className={styles.car_filters}>
        <div className={styles.car_filters_header}>
          <h3>Filters</h3>
          {filterKeys[0].length > 0 &&
            <span onClick={clearAllFilters}><FaUndo /> reset all</span>
          }
        </div>
        <CarFilterByPriceInner filterActive={filterKeys[0].includes(filterNames.Price)} />
        <CarFilterByMileageInner filterActive={filterKeys[0].includes(filterNames.Mileage)} />
        <CarFilterByRegistrationYearInner filterActive={filterKeys[0].includes(filterNames.RegistrationYear)} />
        <CarFilterByBrandInner filterActive={filterKeys[0].includes(filterNames.Brand)} />
        <CarFilterByFuelTypeInner filterActive={filterKeys[0].includes(filterNames.FuelType)} />
        <CarFilterByOwnerTypeInner filterActive={filterKeys[0].includes(filterNames.OwnerType)} />
        <CarFilterByBodyType filterActive={filterKeys[0].includes(filterNames.BodyType)} />
        <CarFilterByTransmission filterActive={filterKeys[0].includes(filterNames.Transmission)} />
        <CarFilterBySeats filterActive={filterKeys[0].includes(filterNames.Seats)} />
        <CarFilterByColors filterActive={filterKeys[0].includes(filterNames.Color)} />
      </div>
      {mobileFilterActive && <MultiFilters toogleMobileFilter={toogleMobileFilter} />}
      {/* mobile filters */}
      <div className={`md:hidden flex gap-2 mt-[70px]  ${!isHeroVisible ? "fixed top-12 z-[-1] left-0 right-0 px-2 py-2 bg-white" : ""}`}>
        <div className={styles.car_filters_header}>
          <Button
            type="button"
            value="MoreFilters"
            className={`${styles.filter_btn} ${styles.more_filter}`}
            onClick={toogleMobileFilter}
          >
            <span>
              <FilterIcon />{''}
            </span>
            <span className={styles.Text}>Filters </span>
            <span className={`${styles.Count} ${!isHeroVisible ? "fixed  bottom-7" : "top-[352px]"}`}>
              <span>{selectedFiltersCount > 0 ? `${selectedFiltersCount}` : '0'}</span>
            </span>
          </Button>
        </div>

        <div className={styles.quick_filter_list}>
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => {
                toogleMobileFilter();
                dispatch(filterActions.setActiveMoreFilter(filter.value));
              }}
              className={` ${styles.more_filter}`}
            >
              <span>{filter.text}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CarFilters;