import OptionsList from "./SharedComponents/OptionsList";
import { filterNames } from "../../../store/filters";
import Accordation from "./SharedComponents/Accordion";

function CarFilterBySeats(props) {

  const options = [    
    { id: 2, name: "2" },    
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
  ];
 
  return (    
    <Accordation heading="Seats" filterActive={props.filterActive}>      
    <OptionsList name={filterNames.Seats} options={options} />
  </Accordation>
  );
}
export default CarFilterBySeats;
