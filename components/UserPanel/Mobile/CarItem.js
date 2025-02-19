import React, { useState } from 'react';
import { FaCircle, FaEye } from 'react-icons/fa';
import { FormatCurrency } from '@/components/UI/UIcomponents/FormatCurrency';
import StatusButton from '@/components/UI/UIcomponents/StatusButton';
import { isMobile } from 'react-device-detect';
import { FuelIcon, MeterIcon, PetrolIcon } from '@/components/Layout/Icons/Icons';

const CarItem = ({ car, toggleDrawer, handleSoldStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return ` ${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  };

  const handleConfirmSold = () => {
    handleSoldStatusChange(car.car_ID, true);
    setIsModalOpen(false);
  };

  return (
    <div className='px-3 pb-10'>
      <div
        key={car.car_ID}
        className={`bg-white px-4 pb-0 pt-4 mb-3 rounded-lg shadow-sm border cursor-pointer ${car.postedCarStatus === "Sold" ? "relative blur-sm" : ""
          }`}
        onClick={() => toggleDrawer(car)}
      >
        {car.postedCarStatus === "Sold" && (
          <div className="absolute top-0 left-0 bg-red-500 text-white py-1 px-2 text-xs font-semibold">
            Sold
          </div>
        )}

        <div className="flex pb-2">
          <div className="flex flex-col">
            <div className="flex border-b">
              <div className="w-28 h-28">
                {car.carImagesList?.length > 0 ? (
                  <img
                    src={car.carImagesList[0]}
                    alt="Car"
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
                )}
              </div>

              <div className="flex flex-col mt-1">
                {/* First Line: Year, Brand, Variant */}
                <div className="flex justify-start gap-2 items-center flex-wrap text-xs font-semibold text-gray-500 mb-2">
                  <span>{car.modelYear}</span>
                  <span className="flex items-center gap-1">
                    <FaCircle className="text-[6px]" /> {car.brandName}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCircle className="text-[6px]" /> {car.variantName}
                  </span>
                </div>
                {/* Second Line: Price */}
                <p className="text-lg text-black font-semibold mb-1 border-b pb-2">
                  {FormatCurrency(car.expectedPrice)}
                </p>

                {/* Third Line: Distance Traveled */}
                <div className='flex flex-col items-start gap-2 py-1'>
                <div className="flex gap-4">
                  <div className="flex justify-center gap-1 items-center text-sm text-gray-500 font-medium whitespace-nowrap">
                    <MeterIcon />
                    <span>{formatNumber(car.totalDriven)} km</span>
                  </div>
                  <div className="flex justify-center gap-1 items-center text-sm text-gray-500 font-medium">
                    <PetrolIcon />
                    <span>{car.fuelType} </span>
                  </div>
                </div>
                  <div className="flex justify-center gap-1 items-center text-sm text-gray-500 font-medium">
                    <FuelIcon />
                    <span>{car.transmission} </span>
                  </div>
                  </div>
              </div>
            </div>

            <div className="flex justify-between gap-14 mt-1">
              {/* Post Date */}
              <div className="text-md font-medium text-gray-500 mt-3 whitespace-nowrap">
                {formatDate(car.createDate)}
              </div>

              {/* Show Total Views only if Approved */}
              {car.postedCarStatus === "Approved" ? (
                <div className="flex mt-2 gap-1 text-sm font-medium text-gray-500 whitespace-nowrap">
                  <FaEye size={20} />
                  <span> {formatNumber(car.totalViews)} views</span>
                </div>
              ) : (
                <div className="flex mt-2 gap-1 text-sm font-medium text-gray-500">
                  <FaEye color="white" size={20} />
                  <span className="text-white"> {formatNumber(car.totalViews)} views</span>
                </div>
              )}

              <StatusButton status={car.postedCarStatus} />
            </div>
          </div>
        </div>
      </div>
      {car.postedCarStatus === "Approved" && isMobile && (
        // <div className="border rounded-lg p-1 mb-1 flex items-center justify-center gap-64 bg-white">
        <button
          className="text-sm w-full font-semibold mr-2 bg-orange-100 text-orange-500 py-2 px-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Mark as Sold
        </button>
        // </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 py-10 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure this car is sold?</h2>
            <div className="flex gap-4">
              <button
                className="border-2 w-full border-orange-500 text-orange-500 py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded w-full "
                onClick={handleConfirmSold}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarItem;