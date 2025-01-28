import RangeInputSlider from "@/components/UI/RangeInputSlider";

import { useDispatch, useSelector } from "react-redux";
import { filterActions, filterPositions, filterNames } from "../../../../store/filters";

import styles from "./RangeSlider.module.css";

function RangeSlider(props){
    const dispatch = useDispatch();

    const initialRangeValues = [props.value.min, props.value.max];
  
    let rangeValue = useSelector(
      (state) => state.filter.filterData[filterPositions[props.name]][props.name]
    );  
  
    // const stateRangeValue = rangeValue;
    // useEffect(()=>{
      
    //   if (stateRangeValue.length < 1) dispatch(filterActions.updateFilterData({ filterName: props.name, values: initialRangeValues }));
    // },[]);
  
    if (rangeValue.length < 1) {
      rangeValue = initialRangeValues;   
    }  
  
    function updateRange(value) {
      dispatch(filterActions.updateFilterData({ filterName: props.name, values: value }));
      window.innerWidth > 767 && dispatch(filterActions.applyFilter());
    }

    return(
        <div className={props.filterActive?styles.active:""}>
          <h3 className={styles.filter_title}>{props.heading}</h3>
          <RangeInputSlider
        data={{
          initialRangeValues: initialRangeValues,
          rangeValue: rangeValue,
          step:props.value.step,
          type:props.heading
        }}
        onChange={updateRange}
      />
        </div>
    );
}
export default RangeSlider;