import CarFilterCover from "./CarFilterCover";
import CarFilterByMileageInner from "./CarFilterByMileageInner";
import {filterNames} from "../../../store/filters";

function CarFilterByMileage(props) {
  return (
    <CarFilterCover filterName={filterNames.Mileage} filterPosition={props.filterPosition} headerText="Kilometer Driven" initialValues={{min:20000,max:500000}}>
      <CarFilterByMileageInner  />
    </CarFilterCover>
  );
}
export default CarFilterByMileage;
