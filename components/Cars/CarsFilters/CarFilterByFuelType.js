import CarFilterCover from "./CarFilterCover";
import { filterNames } from "../../../store/filters";

import CarFilterByFuelTypeInner from "./CarFilterByFuelTypeInner";

function CarFilterByFuelType(props) {
//  console.log("fuelType");
  return (
    <CarFilterCover filterName={filterNames.FuelType}
      filterPosition={props.filterPosition}
      headerText="Fuel Type"
    >
      
      <CarFilterByFuelTypeInner  />

    </CarFilterCover>
  );
}
export default CarFilterByFuelType;
