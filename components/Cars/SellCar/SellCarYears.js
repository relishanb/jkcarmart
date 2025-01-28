import { useEffect, useState } from "react";
import OptionsList from "./SharedComponents/OptionsList";
import styles from "./SellCarContent.module.css";
import { sellCarActions, sellCarStepNames } from "@/store/sellCar";
import { useDispatch } from "react-redux";

function SellCarYears() {
    let year = 2005;
    const endYear = 2024;
    let allYears = [];

    while (year <= endYear) {
        allYears.push({ optionId: year, optionName: year });
        year++;
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredYears, setFilteredYears] = useState([]);
     const dispatch = useDispatch();

    useEffect(() => {
        setFilteredYears(
            allYears.filter((year) =>
                String(year.optionName).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, allYears]);

   const onYearSelect = (option)=>{
       dispatch(sellCarActions.setSellCarData({step:sellCarStepNames.RegistrationYear,value:[{id:option.optionId, value:option.optionName}]}));
    };
    
    return (
        <div>
            <input
                type="text"
                placeholder="Search Years..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
             <OptionsList
                className="gtmEvent_sellCarStep_year"
                options={filteredYears.length > 0 ? filteredYears : allYears}
                onSelect={onYearSelect}
            />
        </div>
    );
}

export default SellCarYears;