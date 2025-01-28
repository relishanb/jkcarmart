import { useEffect, useState } from "react";
import OptionsList from "./SharedComponents/OptionsList";
import { useGetLocationsQuery } from "@/store/apiServices/apiServices";
import styles from "./SellCarContent.module.css";
import { useDispatch } from "react-redux";
import { sellCarActions, sellCarStepNames } from "@/store/sellCar";


function SellCarLocations() {
    const { data: locations, isLoading } = useGetLocationsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(locations){
            setFilteredLocations(
                locations.filter((location) =>
                    location.districtName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(({ districtId, districtName }) => ({ optionId: districtId, optionName: districtName }))
            );
        }
    }, [locations, searchTerm]);


    const onLocationSelect = (option)=>{
         dispatch(sellCarActions.setSellCarData({step:sellCarStepNames.Location,value:[{id:option.optionId, value:option.optionName}]}));
      };

    if (isLoading) {
        return <div>Loading...</div>; // Loading indication
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Search Locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
           {locations && (
                <OptionsList
                    className="gtmEvent_sellCarStep_location"
                    options={filteredLocations.length>0? filteredLocations : locations.map(({ districtId, districtName }) => ({ optionId: districtId, optionName: districtName }))}
                    onSelect = {onLocationSelect}
                />
            )}
        </div>
    );
}
export default SellCarLocations;