import styles from "./MultiFilters.module.scss";
import PrimaryButton from "@/components/UI/PrimaryButton";
import WhiteButton from "@/components/UI/WhiteButton";

import CarFilterByBrandInner from "../ByBrandModel/CarFilterByBrandInner";
import CarFilterByMileageInner from "../CarFilterByMileageInner";
import CarFilterByPriceInner from "../CarFilterByPriceInner";
import CarFilterByRegistrationYearInner from "../CarFilterByRegistrationYearInner";
import CarFilterByFuelTypeInner from "../CarFilterByFuelTypeInner";
import CarFilterByOwnerTypeInner from "../CarFilterByOwnerTypeInner";

import CarFilterByBodyType from "../CarFilterByBodyType";
import CarFilterByTransmission from "../CarFilterByTransmission";
import CarFilterBySeats from "../CarFilterBySeats";
import CarFilterByColors from "../CarFilterByColors";

import {useDispatch,useSelector} from "react-redux";
import { filterActions,filterNames } from '../../../../store/filters';
import { useEffect } from "react";

import { FaRegTimesCircle } from "react-icons/fa";

function MultiFilters (props){

    

const filters = [
  { text: "Price", value: filterNames.Price },  
  { text: "Mileage", value: filterNames.Mileage },  
  { text: "Reg. Year", value: filterNames.RegistrationYear },
  { text: "Brand & Model", value: filterNames.Brand },
  { text: "Fuel Type", value: filterNames.FuelType },
  { text: "Past Owners", value: filterNames.OwnerType },
  { text: "Body Type", value: filterNames.BodyType },
  { text: "Transmission", value: filterNames.Transmission },
  { text: "Seats", value: filterNames.Seats },
  { text: "Colors", value: filterNames.Color },
];

const filterheadings = {
[filterNames.Brand]:"Brand and model",
[filterNames.Mileage]:"Kilometer driven",
[filterNames.Price]:"Price range",
[filterNames.RegistrationYear]:"Model year",
[filterNames.FuelType]:"Fuel type",
[filterNames.OwnerType]:"Owners",
[filterNames.BodyType]:"Body type",
[filterNames.Transmission]:"Transmission",
[filterNames.Seats]:"Seats",
[filterNames.Color]:"Colors",

};



//console.log(filterheadings);


    const dispatch = useDispatch();
    const selectedFiltersCount = useSelector((state) => state.filter.selectedFiltersCount);


    function closeFilter(){
        dispatch(filterActions.applyFilter());
        props.toogleMobileFilter();
    };
    function showFilter(value){
        dispatch(filterActions.setActiveMoreFilter(value))
    };
    function applyFilter(){
        dispatch(filterActions.applyFilter());
        props.toogleMobileFilter();
      }

      function clearFilter(){
        dispatch(filterActions.clearFilter("MultiFilters"));
        dispatch(filterActions.resetSelectedFiltersCount());
        props.toogleMobileFilter();
      }

      useEffect(()=>{
        dispatch(filterActions.fillFilterData());
      },[]);

      const savedFilters = useSelector((state)=>state.filter.filterData);      
        let filterKeys = [];
        savedFilters.map((el,index)=>{
          if(el[Object.keys(el)[0]].length > 0) filterKeys[index] = Object.keys(el)[0];
        });
        filterKeys = [filterKeys];

        //console.log(filterKeys);

        const activeMoreFilter = useSelector((state)=>state.filter.activeMoreFilter);
        


    return(
        <div className={styles.sidebar_overlay}>
        <div className={styles.sidebar}>
            <button className={styles.close_button} onClick={closeFilter}><FaRegTimesCircle /></button>           
            <div className={styles.filters_heading}>Filters </div>
            <div className={styles.tabs}>
                <div className={styles.tablist}>
                    <ul className={`${styles.nav} ${styles.nav_tabs}`}>

                        {                            
                            filters.map((el,index)=>{                                
                                return <li key={index} className={`${styles.nav_item} ${activeMoreFilter==filterNames[el.value]?styles.active:""} ${filterKeys[0].includes(filterNames[el.value])?styles.filter_applied:""}`}>                            
                                <a data-value={el.value} className={styles.nav_link} onClick={(e)=>showFilter(e.target.getAttribute("data-value"))}>
                                    {el.text}
                                </a>
                                </li>
                            })
                        }

                   

                    </ul>
                </div>
                <div className={styles.tab_details}>

                <div className={styles.filter_heading}>{filterheadings[activeMoreFilter]}</div>
                    
                {activeMoreFilter == filterNames.Price && <CarFilterByPriceInner />}                    
                    {activeMoreFilter == filterNames.Mileage && <CarFilterByMileageInner />}                    
                    {activeMoreFilter == filterNames.RegistrationYear && <CarFilterByRegistrationYearInner />}
                    {activeMoreFilter == filterNames.Brand && <CarFilterByBrandInner />}
                    {activeMoreFilter == filterNames.FuelType && <CarFilterByFuelTypeInner />}
                    {activeMoreFilter == filterNames.OwnerType && <CarFilterByOwnerTypeInner />}

                    {activeMoreFilter == filterNames.BodyType && <CarFilterByBodyType />}        
                    {activeMoreFilter == filterNames.Transmission && <CarFilterByTransmission />}     
                    {activeMoreFilter == filterNames.Seats && <CarFilterBySeats />}    
                    {activeMoreFilter == filterNames.Color && <CarFilterByColors />}      
                </div>               
            </div>
            <div className={styles.filters_footer}>
                <WhiteButton onClick={clearFilter}>Clear</WhiteButton>        
                <PrimaryButton onClick={applyFilter}>Apply</PrimaryButton>
            </div>
        </div>
    </div>
    );
}

export default MultiFilters;