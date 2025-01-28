import { useEffect, useState } from "react";
import OptionsList from "./SharedComponents/OptionsList";
import { useGetBrandsQuery } from "@/store/apiServices/apiServices";
import styles from "./SellCarContent.module.css";

function SellCarBrands() {
    const { data: brands, isLoading } = useGetBrandsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBrands, setFilteredBrands] = useState([]);

    useEffect(() => {
        if (brands) {
            // Filter brands based on the search term
           setFilteredBrands(
                brands.filter(brand =>
                    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(({ brandId, brandName }) => ({ optionId: brandId, optionName: brandName }))
            );
        }
    }, [brands, searchTerm]);



    if (isLoading) {
      return  <div>Loading...</div> // Add loading indication
    }

    return (
        <div >
            <input
                type="text"
                placeholder="Search Brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
            {brands && (
                <OptionsList
                  className="gtmEvent_sellCar_initiated"
                  options={filteredBrands.length>0? filteredBrands : brands.map(({ brandId, brandName }) => ({ optionId: brandId, optionName: brandName }))}
                  />
            )}
        </div>
    );
}

export default SellCarBrands;