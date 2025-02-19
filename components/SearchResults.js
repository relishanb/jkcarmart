// import CarInfo from '../Cars/CarsData/CarInfo';
import CarInfo from './Cars/CarsData/CarInfo';
const SearchResults = ({ filteredCars }) => {
    return (
        <div className="mt-1.5">
            {filteredCars.map((car, index) => (
                <CarInfo carInfo={car} key={index} />
            ))}
        </div>
    );
};

export default SearchResults;