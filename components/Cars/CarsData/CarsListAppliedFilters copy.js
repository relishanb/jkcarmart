import { filterNames } from "@/store/filters";
import styles from "./CarsListAppliedFilters.module.css";

function CarsListAppliedFilters(props){       

return(

    <ul className={styles.applied_filters}>

    {
        props.filtersData.map((filter)=>{
            let filterText="1";
            const filterName = Object.keys(filter)[0]
            if(filter[filterName].length > 0) {
              switch(filterName){
                  case filterNames.Price:
                    filterText = `₹${filter[filterName][0]} - ₹${filter[filterName][1]}`;
                  break;
                  case filterNames.Mileage:
                    filterText = `${filter[filterName][0]}kms - ${filter[filterName][1]}kms`;
                  break;
                  case filterNames.RegistrationYear:
                    filterText = `${filter[filterName][0]} - ${filter[filterName][1]}`;
                  break;
              }

              return <li>{filterText}</li>
            }
            
          })
    }

</ul>

)


}
export default CarsListAppliedFilters;