import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OptionsList from "./SharedComponents/OptionsList";
import { sellCarStepNames, sellCarActions } from "@/store/sellCar";
import { useGetModelsQuery } from "@/store/apiServices/apiServices";
import styles from "./SellCarContent.module.css";

function SellCarModels() {
    const selectedBrandId = useSelector(
        (state) => state.sellCar.sellCarData[sellCarStepNames.Brand]?.[0]?.id
    );
    const { data: models, isLoading } = useGetModelsQuery(selectedBrandId);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredModels, setFilteredModels] = useState([]);
     const dispatch = useDispatch();

    useEffect(() => {
         if (models) {
            setFilteredModels(
                 models.filter((model) =>
                    model.modelName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(({ modelId, modelName }) => ({ optionId: modelId, optionName: modelName }))
            );
        }
    }, [models, searchTerm]);

    const onModelSelect = (option)=>{
        dispatch(sellCarActions.setSellCarData({step:sellCarStepNames.Model,value:[{id:option.optionId, value:option.optionName}]}));
     };


    if (isLoading) {
        return <div>Loading...</div>; // Loading indication
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Search Models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
            {models && (
                <OptionsList
                   className="gtmEvent_sellCarStep_model"
                   options={filteredModels.length > 0 ? filteredModels : models.map(({ modelId, modelName }) => ({ optionId: modelId, optionName: modelName }))}
                    onSelect = {onModelSelect}
                />
            )}
        </div>
    );
}
export default SellCarModels;