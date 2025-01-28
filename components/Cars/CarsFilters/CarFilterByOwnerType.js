import CarFilterCover from "./CarFilterCover";
import { filterNames } from "../../../store/filters";

import CarFilterByOwnerTypeInner from "./CarFilterByOwnerTypeInner";

function CarFilterByOwnerType(props) {

  return (
    <CarFilterCover filterName={filterNames.OwnerType}
      filterPosition={props.filterPosition}
      headerText="Past Owners"
    >
      <CarFilterByOwnerTypeInner />
      
    </CarFilterCover>
  );
}
export default CarFilterByOwnerType;
