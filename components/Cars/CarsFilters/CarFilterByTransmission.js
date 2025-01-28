import OptionsList from "./SharedComponents/OptionsList";
import { filterNames } from "../../../store/filters";

import Accordation from "./SharedComponents/Accordion";

function CarFilterByTransmission(props) {

  const options = [{id:1, name:"Manual"},{id:2, name:"Automatic"}];
 
  return (
    <Accordation heading="Transmission" filterActive={props.filterActive}>      
    <OptionsList name={filterNames.Transmission} options={options} />
  </Accordation>
    
  );
}
export default CarFilterByTransmission;
