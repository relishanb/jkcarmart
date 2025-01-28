import { filterNames } from "../../../store/filters";
import RangeSlider from "./SharedComponents/RangeSlider";
import styles from "./FiltersList/CarFilters.module.scss"

function CarFilterByPriceInner(props) {
  return (
    <RangeSlider filterActive={props.filterActive} heading="Price range"  name={filterNames.Price} value={{min:0,max:5000000,step:10000}} />
  );
}
export default CarFilterByPriceInner;
