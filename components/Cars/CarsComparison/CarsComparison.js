import React, { useEffect } from "react";
import styles from './CarsComparison.module.scss';
import {ComparisonFields} from './ComparisonFields';
import CarInfo from "../CarsData/CarInfo";
import NoRecordFound from "@/components/UI/NoRecordFound";

import { useDispatch,useSelector } from "react-redux";

import { userInterestedCarsActions } from "@/store/userInterestedCars";

import { useGetAdsQuery } from "@/store/apiServices/apiServices";

const CarsComparison = () => {

    const dispatch = useDispatch();
   
    useEffect(() => {
      dispatch(userInterestedCarsActions.fillComparedCars());
    }, []);
  
    const comparedCarsIds = useSelector(
      (state) => state.userInterestedCars.comparedCars
    );  
  
  let filterProperties="";
  
  comparedCarsIds.forEach((comparedCarId,index) => {
    filterProperties+= `${index>0?" or ":""}ci.car_ID=${comparedCarId}`;
  });
  
  if(filterProperties=="" || filterProperties==undefined) filterProperties = "(ci.car_ID='empty')";
  
    const {data:cars,error} = useGetAdsQuery({
      filterList: [
        {
          "propertyName": filterProperties,
          "propertyVal": "",
          "operator": "",
          "conjuction": ""
        }
      ],
      paging: {
        "pageNumber": 1,
        "pageLines": 20
      },
      sortList: [
        {
          "propertyName": "salecity",
          "sortType": "asc"
        }
      ]
    });

//console.log(cars);










return (
  <section className="first_section">
    <div className="container">
      <div className="sec-heading">
        <h2>
          Compare <span>Cars</span>
        </h2>
      </div>
{cars?.length > 1 ?
      <>

      <table className={`${styles.table} ${styles.table_simple} ${styles.hide_mobile}`}>
        <tbody>
          <tr>
            <td></td>

            {cars?.map((element, i) => (
              <td key={i}>
                <CarInfo width="Full" carInfo={element}  />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <table className={`${styles.table} ${styles.compare_table}`}>
        <thead className={styles.thead_primary}>
          <tr>
            <th>Comparison</th>
            {cars?.map((element,i) => (
              
                <th key={i}>{`${element.brand} ${element.modelName}`}</th>
             
            ))}
          </tr>
        </thead>
        <tbody>
          {ComparisonFields.map(
            (
              { heading, fieldName, fieldSymbol = "", fieldSymbolPosition },
              index
            ) => (
              <tr key={index}>
                <th>{heading}</th>

                {cars?.map((element,i) => {
                  let columnData;
                  if (heading == "Posted Date") {
                    const date = new Date(element[fieldName]);
                    const postDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                    columnData = postDate;
                  } else {
                    columnData =
                      fieldSymbolPosition == "before"
                        ? `${fieldSymbol}${element[fieldName]}`
                        : `${element[fieldName]} ${fieldSymbol}`;
                  }

                  return <td key={i}>{columnData}</td>;
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
      </>
    
    :
<NoRecordFound message={{heading:"Minimum 2 Cars Required For Comparison"}} />

}

    </div>
  </section>
);
};

export default CarsComparison;