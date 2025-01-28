import CarFilterCover from "../CarFilterCover";
import CarFilterByBrandInner from "./CarFilterByBrandInner";
import { filterNames } from '../../../../store/filters';

function CarBrandModelFilter(props) {
  // console.log("CarBrandModelFilter");
  return (
    <CarFilterCover filterName={filterNames.Brand} filterPosition={props.filterPosition} headerText="All Brand And Model">
      <CarFilterByBrandInner />
    </CarFilterCover>
  );
}
export default CarBrandModelFilter;
