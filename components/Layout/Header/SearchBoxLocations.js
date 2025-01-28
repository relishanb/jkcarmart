import 'react-datalist-input/dist/styles.css';

import DataList from '@/components/UI/DataList';
import { useDispatch, useSelector } from 'react-redux';
import { filterActions,filterPositions,filterNames } from '@/store/filters';
import { useRouter } from 'next/router';

import { useGetLocationsQuery } from '@/store/apiServices/apiServices';

function SearchBoxLocations(){

  const location = useSelector(state=>state.filter.filterData[filterPositions.Location].Location[0]);  

const dispatch = useDispatch();
const route = useRouter();

const {data} = useGetLocationsQuery();

const locations=[];

data?.map(item=>locations.push({id:item.districtId,value:item.districtName}))


  function showCars(values){ 
    dispatch(filterActions.updateSearchLocation(values.value));
    dispatch(filterActions.applyFilter());    
    route.push("/buy");
  }

  function clearSearch(){
    dispatch(filterActions.clearFilter(filterNames.Location));
  }

return(
  <>
    <DataList value={location} placeholder="Select Location" items={locations} onSearch={showCars} itemClass="datalist_input_location_search_item" />
    {location && <button className="clear_search" onClick={clearSearch}>Clear</button>}
    </>
)
}
export default SearchBoxLocations;