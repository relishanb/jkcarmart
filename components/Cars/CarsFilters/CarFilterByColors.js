import OptionsList from "./SharedComponents/OptionsList";
import { filterNames } from "../../../store/filters";
import { useGetColorsQuery } from "@/store/apiServices/apiServices";
import Accordation from "./SharedComponents/Accordion";

function CarFilterByColors(props) {

  const {data:colors} = useGetColorsQuery();

  let options = [];

  colors?.map(({colorId,colorName,colorCode})=>{
    options.push({id:colorId,name:colorName,colorCode:colorCode});
  });
 
  return (
    colors &&
    <Accordation heading="Colors" filterActive={props.filterActive}>      
    <OptionsList name={filterNames.Color} options={options} />
  </Accordation>    
  );

}
export default CarFilterByColors;
