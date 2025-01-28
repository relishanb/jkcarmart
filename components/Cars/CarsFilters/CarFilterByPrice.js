import CarFilterCover from "./CarFilterCover";
import CarFilterByPriceInner from "./CarFilterByPriceInner";
import {filterNames} from "../../../store/filters";

function CarFilterByPrice(props) {
  return (
    <CarFilterCover filterName={filterNames.Price} filterPosition={props.filterPosition} headerText="Price" initialValues={{min:50000,max:1000000}}>
      <CarFilterByPriceInner />
    </CarFilterCover>
  );
}
export default CarFilterByPrice;
