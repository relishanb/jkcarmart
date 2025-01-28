import OptionsList from "./SharedComponents/OptionsList";
import { filterNames } from "../../../store/filters";


import Accordation from "./SharedComponents/Accordion";

function CarFilterByFuelTypeInner(props) {

  const options = [
    { id: 1, name: "Petrol" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "CNG" },
    { id: 4, name: "LPG" },
    { id: 5, name: "Electric" }, 
  ];
 
  return (
    <Accordation heading="Fuel type" filterActive={props.filterActive}>      
      <OptionsList name={filterNames.FuelType} options={options} />
    </Accordation>
  );
}
export default CarFilterByFuelTypeInner;
