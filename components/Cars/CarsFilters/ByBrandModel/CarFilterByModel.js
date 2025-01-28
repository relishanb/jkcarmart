import Button from "@/components/UI/Button";

import styles from "./CarFilterByBrandInner.module.scss";
import stylesSub from "./CarFilterByModel.module.scss";


import { useDispatch,useSelector } from 'react-redux';
import { filterActions } from '../../../../store/filters';


function CarFilterByModel(props) {

  const filterModels = useSelector((state) => state.filter.filterData[0].Brand).filter((el) => el.brand==props.brand).map(el => el.models);
  
  console.log(`filter models ${filterModels}`);

  const dispatch = useDispatch();

  function toggleActivate(brand,brandName,model){    
    dispatch(filterActions.updateFilterData({filterName:"Model", brand:brand, brandName:brandName, model:model}));
    window.innerWidth > 767 && dispatch(filterActions.applyFilter());
  }

  return (
    <div className={stylesSub.filter_items_sub}>
      <div className={stylesSub.filter_items_sub_inner}>
        {props.models.map((x, i) => (
          <div className={stylesSub.filter_item_sub} key={i}>
            {/* <Button              
              className={`${styles.filter_item_sub_btn} ${
                filterModels[0] && filterModels[0].includes(x.modelId) ? styles.filter_item_sub_btn_active : ""
              }`}
              onClick={(e) => toggleActivate(props.brand, x.modelId)}
            >
              {x.modelName}
            </Button> */}

            <div className={styles.filter_check}>
              <input
                name="brand"
                value={x.modelId}
                id={i}
                type="checkbox"
                checked={
                  filterModels[0] && filterModels[0].includes(x.modelId)
                    ? "checked"
                    : ""
                }
                className={filterModels[0] && filterModels[0].includes(x.modelId) ? "" : "gtmEvent_filter_selected gtmEvent_filterModel_selected gtmEvent_filterBrandModel_selected"}
                onClick={(e) =>
                  toggleActivate(props.brand, props.brandName, x.modelId)
                }
              />
              <span></span>
            </div>
            {x.modelName}
          </div>
        ))}
      </div>
    </div>
  );
}
export default CarFilterByModel;
