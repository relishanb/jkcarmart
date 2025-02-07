import 'react-datalist-input/dist/styles.css';

import DataList from '@/components/UI/DataList';

import { useGetBrandsModelsVarientsQuery } from '@/store/apiServices/apiServices';

import { useDispatch, useSelector } from 'react-redux';
import { filterActions } from '@/store/filters';
import { useRouter } from 'next/router';

import { filterNames } from '@/store/filters';
import { useEffect, useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';

function MobSearchCar() {
    const [savedCarSearchValues, setSavedCarSearchValues] = useState();
    useEffect(() => {
        setSavedCarSearchValues("");
    }, [savedCarSearchValues]);

    const dispatch = useDispatch();
    const route = useRouter();

    const { data: brandsModelsVarients } = useGetBrandsModelsVarientsQuery();

    let carBrandModelsList = [];
    brandsModelsVarients?.map(function (elBrand) {
        elBrand.models.map(function (elModel) {
            const modelId = [elBrand.brandId, elBrand.brandName, elModel.modelId];
            const modelValue = elBrand.brandName + " " + elModel.modelName;
            carBrandModelsList.push({ id: modelId, value: modelValue });
        });
    });

    function showCars(values) {

        dispatch(filterActions.updateSearchData({ searchData: values }));

        dispatch(filterActions.applyFilter());



        setSavedCarSearchValues({ searchData: values });

        route.push("/buy");
    }
    return (
        <>
            <DataList value={savedCarSearchValues} placeholder="Search your car" items={carBrandModelsList} onSearch={showCars} itemClass=" datalist_input_car_search_item relative" />
            <FaSearch className='text-gray-400 absolute right-11 '/>
            {/* {savedCarSearchValues && <button className="clear_search" onClick={clearSearch}>Clear</button>} */}
        </>
    )
}
export default MobSearchCar;