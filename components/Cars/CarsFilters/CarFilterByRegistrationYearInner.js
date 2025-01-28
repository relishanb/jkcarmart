import { filterNames } from "../../../store/filters";
import RangeSlider from "./SharedComponents/RangeSlider";
import styles from "./FiltersList/CarFilters.module.scss";

function CarFilterByRegistrationYearInner(props) {
  return (
    <RangeSlider filterActive={props.filterActive} heading="Model year" name={filterNames.RegistrationYear} value={{min:2005,max:2024,step:1}} />
  );
}
export default CarFilterByRegistrationYearInner;
