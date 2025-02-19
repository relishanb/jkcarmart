import { useState, useEffect, useRef } from 'react';
import SearchField from '@/components/SearchField';
import { useGetBrandsModelsVarientsQuery } from '@/store/apiServices/apiServices';
import { useDispatch } from 'react-redux';
import { filterActions } from '@/store/filters';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import SearchHeader from './SearchHeader';
import PopularItems from './PopularItems';
import NoRes from './NoRes'; 
import { popularCars, popularBrands } from './PopularData';

function SearchPage() {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const searchInputRef = useRef(null);

    const { data: brandsModelsVarients } = useGetBrandsModelsVarientsQuery();
    const [filteredCars, setFilteredCars] = useState([]);
    const carBrandModelsList = [];
    brandsModelsVarients?.forEach((elBrand) => {
        elBrand.models.forEach((elModel) => {
            const modelId = [elBrand.brandId, elBrand.brandName, elModel.modelId];
            const modelValue = `${elBrand.brandName} ${elModel.modelName}`;
            carBrandModelsList.push({ id: modelId, value: modelValue });
        });
    });

    useEffect(() => {
        if (searchValue) {
            const filtered = carBrandModelsList.filter((car) =>
                car.value.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredCars(filtered);
        } else {
            setFilteredCars([]);
        }
    }, [searchValue]);

    useEffect(() => {
        if (router.query.focus === 'true' && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [router.query]);

    const showCars = (values) => {
        dispatch(filterActions.updateSearchData({ searchData: values }));
        dispatch(filterActions.applyFilter());
        router.push('/');
    };

    const handleSelect = (item) => {
        setSearchValue(item.value);
        showCars(item);
    };

    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className="text-orange-500">{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="py-0 h-[1500vh] bg-white">
            <SearchHeader />
            <div className="py-3 px-4">
                <div className='h-20'>
                <SearchField
                    value={searchValue}
                    placeholder="Search your car"
                    onChange={(e) => setSearchValue(e.target.value)}
                    inputRef={searchInputRef}
                    />
                <FaSearch className="fixed text-gray-400 top-24 right-8" />
                    </div>
                {filteredCars.length === 0 && searchValue === '' ? (
                    <PopularItems popularCars={popularCars} popularBrands={popularBrands} />
                ) : filteredCars.length === 0 && searchValue !== '' ? (
                    <NoRes src="/Speech_Bubbles.svg" />
                ) : (
                    <div className='mt-12 px-1'>
                        {filteredCars.map((car) => (
                            <div
                                key={car.id}
                                className="border-b py-5 text-sm cursor-pointer "
                                onClick={() => handleSelect(car)}
                            >
                                {highlightText(car.value, searchValue)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;