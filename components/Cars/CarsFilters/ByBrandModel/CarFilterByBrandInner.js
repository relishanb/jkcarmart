import { FaAngleDown,FaAngleUp } from "react-icons/fa";

import CarFilterByModel from "./CarFilterByModel";
import styles from "./CarFilterByBrandInner.module.scss";
import { useState } from "react";

import { useDispatch,useSelector } from 'react-redux';
import { filterActions,filterNames } from '../../../../store/filters';

import { useGetBrandsModelsVarientsQuery } from "@/store/apiServices/apiServices";

import stylesFilter from "../FiltersList/CarFilters.module.scss";
import Accordation from "../SharedComponents/Accordion";

function CarFilterByBrandInner(props) {

// console.log("CarFilterByBrandInner");

  const dispatch = useDispatch();

  const filterBrands = useSelector((state) => state.filter.filterData[0] ? (state.filter.filterData[0].Brand).map(({brand}) => brand) : []);
  // console.log("filterBrands");
  // console.log(filterBrands);

  const {data:brandsModelsVarients} = useGetBrandsModelsVarientsQuery();

  // console.log("brandsModelsVarients");
  // console.log(brandsModelsVarients);


  //localStorage.removeItem("BrandsModelsVarients");

//localStorage.setItem("BrandsModelsVarients", JSON.stringify(brandsModelsVarients));

// console.log(brandsModelsVarients);

//CarBrandsModels.map((x, i) => console.log(x.brand));


const [showModels,setShowModels] = useState([]);

function toggleBrandCheck(e,brandName) { 
    dispatch(filterActions.updateFilterData({filterName:"Brand", brand:Number(e.target.value), brandName:brandName, models:brandsModelsVarients[e.target.id].models.map(({modelId})=>modelId)}));
    window.innerWidth > 767 && dispatch(filterActions.applyFilter());
  }

function toggleModels(index){   
   setShowModels((prevState) => [...prevState].includes(index)?[...prevState.filter((el)=> el!=index)]:[...prevState, index]);
}


  return (
    <Accordation heading="Brand and model" filterActive={props.filterActive}>
      <div className={styles.filter_items}>
        {brandsModelsVarients?.map((x, i) => (
          <div className={styles.filter_item} key={i} id={x.brandName}>
            <div className={styles.filter_item_main}>
              <div className={styles.filter_check}>
                <input
                  name="brand"
                  value={x.brandId}
                  id={i}
                  type="checkbox"
                  checked={filterBrands.includes(x.brandId) ? "checked" : ""}
                  className={filterBrands.includes(x.brandId) ? "" : "gtmEvent_filter_selected gtmEvent_filterBrand_selected gtmEvent_filterBrandModel_selected"}
                  onChange={(e) => toggleBrandCheck(e, x.brandName)}
                />
                <span></span>
              </div>
              <div
                className={styles.filter_content}
                onClick={() => toggleModels(i)}
              >
                <div className={styles.filter_text}>{x.brandName}</div>
                <div className={styles.filter_icon}>
                  <i className={styles.icon}>
                    {showModels.includes(i) ? <FaAngleUp /> : <FaAngleDown />}
                  </i>
                </div>
              </div>
            </div>

            {showModels.includes(i) && (
              <CarFilterByModel
                brand={x.brandId}
                brandName={x.brandName}
                models={x.models}
              />
            )}
          </div>
        ))}
      </div>
    </Accordation>
  );
}
export default CarFilterByBrandInner;
