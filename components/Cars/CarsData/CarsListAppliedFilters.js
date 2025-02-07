import { filterNames, filterActions } from "@/store/filters";
import styles from "./CarsListAppliedFilters.module.css";
import { FaTimes } from "react-icons/fa";
import { useGetColorsQuery } from "@/store/apiServices/apiServices";
import { useDispatch } from "react-redux";

function CarsListAppliedFilters(props) {

  const { data: allColors } = useGetColorsQuery();

  //console.log("props.data",props)

  const filterText = [];

  props.filtersData.map((filter) => {

    const filterName = Object.keys(filter)[0]
    if (filter[filterName].length > 0) {
      switch (filterName) {
        case filterNames.Location:
          filterText.push(<li> {filter[filterName][0]} <span onClick={() => clearFilter(filterNames.Location)}><FaTimes /></span></li>);
          break;
        case filterNames.Brand:
          filter[filterName].map((item) => {
            filterText.push(<li>{item.brandName} <span onClick={() => toogleBrand(filterName, item.brand)}><FaTimes /></span></li>);
          })
          break;
        case filterNames.Price:
          filterText.push(<li>{`₹${filter[filterName][0]} - ₹${filter[filterName][1]}`} <span onClick={() => clearFilter(filterNames.Price)}><FaTimes /></span></li>);
          break;
        case filterNames.Mileage:
          filterText.push(<li>{`${filter[filterName][0]}kms - ${filter[filterName][1]}kms`} <span onClick={() => clearFilter(filterNames.Mileage)}><FaTimes /></span></li>);
          break;
        case filterNames.RegistrationYear:
          filterText.push(<li>{`${filter[filterName][0]} - ${filter[filterName][1]}`} <span onClick={() => clearFilter(filterNames.RegistrationYear)}><FaTimes /></span></li>);
          break;
        case filterNames.FuelType:
        case filterNames.OwnerType:
        case filterNames.BodyType:
        case filterNames.Transmission:
          filter[filterName].map((item) => {
            filterText.push(<li>{item} <span onClick={() => toogleFilter(filterName, item)}><FaTimes /></span></li>);
          })
          break;
        case filterNames.Seats:
          filter[filterName].map((item) => {
            filterText.push(<li>{item} Seater <span onClick={() => toogleFilter(filterName, item)}><FaTimes /></span></li>);
          })
          break;
        case filterNames.Color:
          filter[filterName].map((item) => {
            const colorName = allColors?.find(({ colorId }) => colorId == item).colorName;
            filterText.push(<li>{colorName} <span onClick={() => toogleFilter(filterName, item)}><FaTimes /></span></li>);
          })
          break;
      }
    }

  })


  const dispatch = useDispatch();
  function clearFilter(filterName) {
    dispatch(filterActions.clearFilter(filterName));
  }
  function toogleFilter(filterName, filterValue) {
    dispatch(filterActions.updateFilterData({ filterName: filterName, value: filterValue }));
    dispatch(filterActions.applyFilter());
  }
  function toogleBrand(filterName, filterValue) {
    dispatch(filterActions.updateFilterData({ filterName: filterName, brand: filterValue }));
    dispatch(filterActions.applyFilter());
  }


  return (

    <ul className={styles.applied_filters}>{filterText}</ul>

  )


}
export default CarsListAppliedFilters;