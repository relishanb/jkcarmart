import React from 'react';
import { FaCircle, FaEye } from 'react-icons/fa';
import { FormatCurrency } from '@/components/UI/UIcomponents/FormatCurrency';
import StatusButton from '@/components/UI/UIcomponents/StatusButton';
import ToggleSwitch from '@/components/UI/ToggleSwitch';
import { isMobile } from 'react-device-detect';

const CarItem = ({ car, toggleDrawer, handleSoldStatusChange }) => {
  const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return ` ${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  };

  return (
    <>
      {car.postedCarStatus === "Pending" && isMobile && (
        <div className="border rounded-lg p-1 mb-1 flex items-center justify-center gap-64">
          <label className="text-sm text-gray-800 font-semibold mr-2">Sold</label>
          <ToggleSwitch
            checked={car.isSold}
            onChange={(e) => handleSoldStatusChange(car.car_ID, e.target.checked)}
          />
        </div>
      )}
      <div
        key={car.car_ID}
        className={`bg-white px-4 pb-0 pt-4 mb-4 rounded-lg shadow-sm border cursor-pointer ${car.postedCarStatus === "Sold" ? "relative" : ""
          }`}
        onClick={() => toggleDrawer(car)}
      >
        {car.postedCarStatus === "Sold" && (
          <div className="absolute top-0 left-0 right-0 bg-black text-white py-2 text-center font-semibold">
            Sold
          </div>
        )}

        <div className="flex">
          <div className="flex flex-col">
            <div className="flex border-b">
              <div className="w-28 h-28">
                {car.carImagesList?.length > 0 ? (
                  <img
                    src={car.carImagesList[0]}
                    alt="Car"
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
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
                <div className="flex gap-2">
                  <div className="text-sm text-gray-500 font-medium">
                    <span>{formatNumber(car.totalDriven)} km</span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    <span>{car.fuelType} </span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
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
                <div className="flex mt-2 gap-1 text-sm font-medium text-gray-500">
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
    </>
  );
};

export default CarItem; 