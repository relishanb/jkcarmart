import styles from "./CarFilterCover.module.scss";
import {useDispatch, useSelector} from "react-redux";
import { filterActions,filterNames,filterPositions } from '../../../store/filters';


function CarFilterCover(props) {
  
  let stateRangeValues = useSelector(
    (state) => state.filter.filterData[filterPositions[props.filterName]][props.filterName]
  );

const dispatch = useDispatch();

function applyFilter(){ 
  
if(props.filterName==filterNames.Mileage || props.filterName==filterNames.Price || props.filterName==filterNames.RegistrationYear){
  const initialRangeValues = [props.initialValues.min, props.initialValues.max];
  if (stateRangeValues.length < 1) dispatch(filterActions.updateFilterData({ filterName: props.filterName, values: initialRangeValues }));
}

  dispatch(filterActions.applyFilter(props.filterName));

}

function clearFilter(){
  dispatch(filterActions.clearFilter(props.filterName));
}
  
  return (
    <div className={styles.filter_popup} style={{top:props.filterPosition.top, left:props.filterPosition.left}}>
      <div className={styles.filter_popup_inner}>
        <div className={styles.filter_arrow}></div>
        <div className={styles.filter_header}>
          <div className={styles.filter_header_text}>{props.headerText}</div>
        </div>
        <div className={styles.filter_body}>{props.children}</div>
        <div className={styles.filter_action}>
          <button className={styles.filter_clear} onClick={clearFilter}>
            <span>Clear</span>
          </button>
          <button className={styles.filter_apply} onClick={applyFilter}>
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CarFilterCover;
