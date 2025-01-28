import { useEffect, useState } from "react";
import CarInfo from "../CarsData/CarInfo";
import NoRecordFound from "@/components/UI/NoRecordFound";

import { useDispatch, useSelector } from "react-redux";
import { userInterestedCarsActions } from "@/store/userInterestedCars";

import { useGetAdsQuery } from "@/store/apiServices/apiServices";


function CarsShortlistedInner() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInterestedCarsActions.fillShortlistedCars());
  }, []);

  const shortlistedCarsIds = useSelector(
    (state) => state.userInterestedCars.shortlistedCars
  );

let filterProperties="";

shortlistedCarsIds.forEach((shortlistedCarId,index) => {
  filterProperties+= `${index>0?" or ":""}ci.car_ID=${shortlistedCarId}`;
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

  return (
    <div className="flex flex-wrap mx-2 gap-y-6 py-10 md:py-24">
      {cars?.length > 0 ?
      cars?.map((element, i) => (
        <CarInfo carInfo={element} key={i} />
      ))
      :
      <NoRecordFound />
      }
    </div>
  );
}

export default CarsShortlistedInner;
