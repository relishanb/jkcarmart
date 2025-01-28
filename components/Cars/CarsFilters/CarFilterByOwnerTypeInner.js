import { filterNames } from "../../../store/filters";
import OptionsList from "./SharedComponents/OptionsList";

import Accordation from "./SharedComponents/Accordion";

function CarFilterByOwnerTypeInner(props) {

  const options = [
    { id: 1, name: "1st Owner" },
    { id: 2, name: "2nd Owner" },
    { id: 3, name: "3rd Owner" },  
    { id: 4, name: "4th Owner" },
  ];

  return ( 
    <Accordation heading="Owners" filterActive={props.filterActive}>      
    <OptionsList name={filterNames.OwnerType} options={options} />
  </Accordation>
  );
}
export default CarFilterByOwnerTypeInner;
