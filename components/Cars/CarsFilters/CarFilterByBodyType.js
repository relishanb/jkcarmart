import OptionsList from "./SharedComponents/OptionsList";
import { filterNames } from "../../../store/filters";
import { useGetBodyTypesQuery } from "@/store/apiServices/apiServices";

import Accordation from "./SharedComponents/Accordion";

function CarFilterByBodyType(props) {

  const {data:bodyTypes} = useGetBodyTypesQuery();
  
  let options = [];

  bodyTypes?.map(({bodyId,bodyType})=>{
    options.push({id:bodyId,name:bodyType});
  });
 
  return (

    bodyTypes &&
<Accordation heading="Body type" filterActive={props.filterActive}>      
<OptionsList name={filterNames.BodyType} options={options} />
  </Accordation>


  );
}
export default CarFilterByBodyType;
