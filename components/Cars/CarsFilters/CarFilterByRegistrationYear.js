import CarFilterCover from "./CarFilterCover";
import { filterNames } from "../../../store/filters";
import CarFilterByRegistrationYearInner from "./CarFilterByRegistrationYearInner";

function CarFilterByRegistrationYear(props) {
  return (
    <CarFilterCover filterName={filterNames.RegistrationYear} filterPosition={props.filterPosition} headerText="Registration Year" initialValues={{min:2005,max:2024}}>
      <CarFilterByRegistrationYearInner  />
    </CarFilterCover>
  );
}
export default CarFilterByRegistrationYear;
