import React from 'react';
import CarItem from './CarItem';

const CarList = ({ cars, toggleDrawer, handleSoldStatusChange }) => {
  return (
    <div>
      {cars.length > 0 ? (
        cars.map((car) => (
          <CarItem
            key={car.car_ID}
            car={car}
            toggleDrawer={toggleDrawer}
            handleSoldStatusChange={handleSoldStatusChange}
          />
        ))
      ) : (
        <p className="text-black">No cars found for this tab.</p>
      )}
    </div>
  );
};

export default CarList;