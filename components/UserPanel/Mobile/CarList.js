import React from 'react';
import CarItem from './CarItem';

const CarList = ({ cars, toggleDrawer, handleSoldStatusChange }) => {
  return (
    <div className='pt-20'>
      {cars.map((car) => (
        <CarItem
          key={car.car_ID}
          car={car}
          toggleDrawer={toggleDrawer}
          handleSoldStatusChange={handleSoldStatusChange}
        />
      ))}
    </div>
  );
};

export default CarList;