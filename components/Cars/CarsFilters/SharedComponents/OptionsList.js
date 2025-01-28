import FilterButton from "@/components/UI/FilterButton";
import styles from "./OptionsList.module.scss";
import stylesFilter from "../FiltersList/CarFilters.module.scss"
import { useDispatch, useSelector } from "react-redux";
import {
  filterActions,
  filterPositions,
  filterNames,
} from "../../../../store/filters";

function OptionsList(props) {
  const options = props.options;

  //console.log(options);

  const dispatch = useDispatch();

  const appliedOptions = useSelector(
    (state) => state.filter.filterData[filterPositions[props.name]][props.name]
  );

  // console.log("appliedOptions");
  // console.log(appliedOptions);

  function toggleFuelType(value) {
    //console.log(window.innerWidth);
    dispatch(
      filterActions.updateFilterData({ filterName: props.name, value: value })
    );
    window.innerWidth > 767 && dispatch(filterActions.applyFilter());
  }

  return (
    <div className={styles.filter_form}>
      {options.map((element, i) => (
        // <FilterButton
        //   key={index}
        //   value={props.name == filterNames.Color ? element.id : element.name}
        //   className={`${styles.btn} ${
        //     props.name == "Color" ? styles.color_btn_2 : ""
        //   }  ${appliedOptions.includes(props.name == filterNames.Color ? element.id.toString() : element.name) ? "active" : ""}`}

        //   // style = {props.name == "Color" ? {color:"red"} : {}}

        //   onClick={(e) => toggleFuelType(e.target.value)}
        // >
        //   {props.name == filterNames.Seats ? `${element.name} Seater` : element.name}
        // </FilterButton>

        <div key={i} className={styles.filter_check_block}>
          <div className={stylesFilter.filter_check}>
            <input
              name="brand"
              value={
                props.name == filterNames.Color ? element.id : element.name
              }
              id={`${element.name.replaceAll(' ', '')}_${i}`}
              type="checkbox"
              checked={
                appliedOptions.includes(
                  props.name == filterNames.Color
                    ? element.id.toString()
                    : element.name
                )
                  ? "checked"
                  : ""
              }
              className={appliedOptions.includes(props.name == filterNames.Color ? element.id.toString() : element.name)  ? "":`gtmEvent_filter_selected gtmEvent_filter${props.name}_selected`}
              onClick={(e) => toggleFuelType(e.target.value)}
              onChange={() => {}}
            />
            <span></span>
          </div>
          {element.name}
        </div>
      ))}
    </div>
  );
}
export default OptionsList;
