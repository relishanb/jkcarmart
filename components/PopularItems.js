import { useDispatch } from 'react-redux';
import { filterActions } from '@/store/filters';
import { useRouter } from 'next/router';
import { UpArrowIcon } from './Layout/Icons/Icons';

const PopularItems = ({ popularCars, popularBrands }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handlePopularCarClick = (car) => {
        dispatch(filterActions.updateSearchData({ searchData: car.filter }));
        dispatch(filterActions.applyFilter());
        router.push('/');
        // window.location.reload();
    };

    const handlePopularBrandClick = (brand) => {
        dispatch(filterActions.updateSearchData({ searchData: brand.filter }));
        dispatch(filterActions.applyFilter());
        router.push('/');
        // window.location.reload();
    };

    return (
        <div className='flex flex-col gap-2 bg-white py-6 pt-16 h-[75vh]'>
            <div className='flex flex-col'>
                <div className="mt-5 text-base text-gray-600 flex flex-row gap-0.5">
                    <div className="text-sm">Popular cars</div>
                    <UpArrowIcon />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {popularCars.map((car, index) => (
                        <button
                            key={index}
                            className="px-3 py-2 rounded-lg text-sm bg-orange-200 text-orange-700"
                            onClick={() => handlePopularCarClick(car)}
                        >
                            {car.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="mt-5 text-base text-gray-600 flex flex-row gap-0.5">
                    <div className="text-sm">Popular brands</div>
                    <UpArrowIcon />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {popularBrands.map((brand, index) => (
                        <button
                            key={index}
                            className="px-3 py-2 rounded-lg text-sm bg-orange-200 text-orange-700"
                            onClick={() => handlePopularBrandClick(brand)}
                        >
                            {brand.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularItems;