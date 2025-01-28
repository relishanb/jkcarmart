import ListButton from "@/components/UI/ListButton";
import styles from "./OptionsList.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { sellCarActions } from "@/store/sellCar";
import { sellCarStepNames } from "@/store/sellCar";


function OptionsList(props) {

  const sellCarInfo =  useSelector((state)=>state.sellCar);

  const activeStep = sellCarInfo.activeStep;



const dispatch = useDispatch();

function updateData(id,value){

  // const sell_tabs = document.getElementById("sell_tabs");
  //   console.log(sell_tabs.scrollLeft);
  //   sell_tabs.scrollLeft = sell_tabs.scrollLeft + 120;


  // const sell_tab = document.querySelectorAll('[data-value="Location"]')[0];
  // console.log(sell_tab);
  // sell_tab.scrollIntoView({ inline: "center" });

  dispatch(sellCarActions.updateSellCarData({step:sellCarStepNames[activeStep],id:id,value:value}));



};


  const options = props.options;  

//console.log(options);



  return (
    <>
    {options.map((element, index) => (
        <ListButton key={index} type="button" value={element.optionId} className={`${props.className} ${styles.btn} ${sellCarInfo.sellCarData[activeStep]==element?styles.selected:""}`} onClick={(e)=>updateData(element.optionId,element.optionName)}>
          {element.optionName}
        </ListButton>
      ))}
    </>
  );
}
export default OptionsList;
