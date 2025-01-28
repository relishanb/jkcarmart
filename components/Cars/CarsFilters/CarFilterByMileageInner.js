import { filterNames } from "../../../store/filters";
import RangeSlider from "./SharedComponents/RangeSlider";
import styles from "./FiltersList/CarFilters.module.scss";

function CarFilterByMileageInner(props) {
  return (   
    <RangeSlider filterActive={props.filterActive} heading="Kilometer driven" name={filterNames.Mileage} value={{min:0,max:1000000,step:5000}} />
  );
}
export default CarFilterByMileageInner;
