import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OptionsList from "./SharedComponents/OptionsList";
import { useGetVariantsQuery } from "@/store/apiServices/apiServices";
import { sellCarStepNames, sellCarActions } from "@/store/sellCar";
import styles from "./SellCarContent.module.css";

function SellCarVariants() {
    const modelId = useSelector(
        (state) => state.sellCar.sellCarData[sellCarStepNames.Model]?.[0]?.id
    );
    const { data: variants, isLoading } = useGetVariantsQuery(modelId);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVariants, setFilteredVariants] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
         if(variants){
             setFilteredVariants(
                  variants.filter((variant) =>
                      variant.variantName.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map(({ variantId, variantName }) => ({ optionId: variantId, optionName: variantName }))
              );
         }
    }, [variants, searchTerm]);

    const onVariantSelect = (option)=>{
        dispatch(sellCarActions.setSellCarData({step:sellCarStepNames.Variant,value:[{id:option.optionId, value:option.optionName}]}));
     };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search Variants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
           {variants && (
                <OptionsList
                    className="gtmEvent_sellCarStep_variant"
                    options={filteredVariants.length>0? filteredVariants : variants.map(({ variantId, variantName }) => ({ optionId: variantId, optionName: variantName }))}
                     onSelect = {onVariantSelect}
                />
            )}
        </div>
    );
}
export default SellCarVariants;